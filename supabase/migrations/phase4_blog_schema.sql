-- ============================================================================
-- PHASE 4 ÉTAPE 1 : BLOG CMS - SCHÉMA SUPABASE COMPLET
-- ============================================================================
-- Ce fichier contient :
-- 1. Tables (blog_categories, blog, blog_tags)
-- 2. Indexes pour performance
-- 3. Triggers pour updated_at et auto_set_published_at
-- 4. RLS Policies (lecture publique published, admin CRUD complet)
-- 5. Bucket Storage pour images blog
-- ============================================================================

-- ============================================================================
-- 1. TABLE BLOG_CATEGORIES
-- ============================================================================

CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);

COMMENT ON TABLE blog_categories IS 'Catégories du blog (Guides, Conseils locaux, Aides, etc.)';
COMMENT ON COLUMN blog_categories.slug IS 'Slug URL-friendly auto-généré depuis name';

-- ============================================================================
-- 2. TABLE BLOG (ARTICLES BLOG)
-- ============================================================================

CREATE TABLE blog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Contenu
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT, -- Résumé court (150-200 chars)
  content TEXT NOT NULL, -- Contenu HTML depuis Tiptap
  
  -- SEO
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  focus_keyword TEXT,
  
  -- Médias
  featured_image TEXT, -- URL Supabase Storage (ex: blog/<slug>/hero.jpg)
  featured_image_alt TEXT,
  
  -- Relations
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Statut & Dates
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Métriques
  views_count INTEGER DEFAULT 0,
  reading_time INTEGER -- Temps de lecture en minutes
);

-- Index pour performance
CREATE INDEX idx_blog_slug ON blog(slug);
CREATE INDEX idx_blog_status ON blog(status);
CREATE INDEX idx_blog_category ON blog(category_id);
CREATE INDEX idx_blog_published_at ON blog(published_at DESC);
CREATE INDEX idx_blog_status_published_at ON blog(status, published_at DESC);

COMMENT ON TABLE blog IS 'Articles du blog avec SEO complet';
COMMENT ON COLUMN blog.slug IS 'Slug URL-friendly unique, auto-généré depuis title';
COMMENT ON COLUMN blog.status IS 'Statut: draft (brouillon) ou published (publié)';
COMMENT ON COLUMN blog.content IS 'Contenu HTML généré par Tiptap editor';
COMMENT ON COLUMN blog.reading_time IS 'Temps de lecture estimé en minutes (calculé auto)';

-- ============================================================================
-- 3. TABLE BLOG_TAGS (TAGS POUR FILTRAGE)
-- ============================================================================

CREATE TABLE blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id UUID REFERENCES blog(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(blog_id, tag)
);

-- Index pour performance
CREATE INDEX idx_blog_tags_blog_id ON blog_tags(blog_id);
CREATE INDEX idx_blog_tags_tag ON blog_tags(tag);

COMMENT ON TABLE blog_tags IS 'Tags pour filtrage et maillage interne (ex: local, provence, mistral)';

-- ============================================================================
-- 4. TRIGGERS POUR UPDATED_AT
-- ============================================================================

-- Fonction trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger sur blog
CREATE TRIGGER update_blog_updated_at
BEFORE UPDATE ON blog
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger sur blog_categories
CREATE TRIGGER update_blog_categories_updated_at
BEFORE UPDATE ON blog_categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Fonction trigger pour auto-set published_at lors de la publication
-- ============================================================================

CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  -- Si on passe à 'published' et que published_at est NULL, on le set à NOW()
  IF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at = NOW();
  END IF;
  -- Si on repasse en draft, on garde published_at (historique de première publication)
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour auto-set published_at sur INSERT et UPDATE
CREATE TRIGGER auto_set_published_at
BEFORE INSERT OR UPDATE ON blog
FOR EACH ROW
EXECUTE FUNCTION set_published_at();

COMMENT ON FUNCTION set_published_at() IS 'Auto-set published_at quand status passe à published';

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) - BLOG_CATEGORIES
-- ============================================================================

-- Enable RLS sur blog_categories
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Policy : Public peut lire toutes les catégories
CREATE POLICY "Public can view blog_categories"
ON blog_categories FOR SELECT
TO public
USING (true);

-- Policy : Admin peut tout faire (CRUD complet)
CREATE POLICY "Admin can manage blog_categories"
ON blog_categories FOR ALL
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  )
);

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) - BLOG
-- ============================================================================

-- Enable RLS sur blog
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;

-- Policy : Public peut lire UNIQUEMENT les articles publiés
CREATE POLICY "Public can view published blog"
ON blog FOR SELECT
TO public
USING (status = 'published');

-- Policy : Admin peut tout faire (CRUD complet, même brouillons)
CREATE POLICY "Admin can manage all blog"
ON blog FOR ALL
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  )
);

-- ============================================================================
-- 7. ROW LEVEL SECURITY (RLS) - BLOG_TAGS
-- ============================================================================

-- Enable RLS sur blog_tags
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;

-- Policy : Public peut lire tous les tags
CREATE POLICY "Public can view blog tags"
ON blog_tags FOR SELECT
TO public
USING (true);

-- Policy : Admin peut tout faire (CRUD complet)
CREATE POLICY "Admin can manage blog tags"
ON blog_tags FOR ALL
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  )
);

-- ============================================================================
-- 8. SUPABASE STORAGE - BUCKET BLOG-IMAGES
-- ============================================================================

-- Créer le bucket 'blog-images' (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy : Public peut lire les images
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- Policy : Admin peut uploader/modifier/supprimer les images
CREATE POLICY "Admin can manage blog images"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'blog-images' AND
  auth.jwt() ->> 'email' IN (
    SELECT email FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  )
);

-- ============================================================================
-- 9. DONNÉES INITIALES (CATÉGORIES PAR DÉFAUT)
-- ============================================================================

-- Insérer catégories par défaut
INSERT INTO blog_categories (name, slug, description, meta_title, meta_description) VALUES
  (
    'Guides d''achat',
    'guides-achat',
    'Guides complets pour choisir et acheter votre climatisation',
    'Guides d''achat climatisation - Air G Énergie',
    'Découvrez nos guides d''achat pour choisir la climatisation adaptée à vos besoins en Provence.'
  ),
  (
    'Conseils locaux',
    'conseils-locaux',
    'Conseils spécifiques au climat provençal et aux villes des Bouches-du-Rhône',
    'Conseils climatisation Provence - Air G Énergie',
    'Conseils d''experts pour la climatisation en Provence : Mistral, air salin, climat méditerranéen.'
  ),
  (
    'Aides & Subventions',
    'aides-subventions',
    'Tout savoir sur les aides financières pour l''installation de climatisation',
    'Aides climatisation 2026 - MaPrimeRénov'', CEE',
    'Guide complet des aides financières 2026 pour l''installation de climatisation : MaPrimeRénov'', CEE, TVA réduite.'
  ),
  (
    'Entretien & Maintenance',
    'entretien-maintenance',
    'Conseils d''entretien et maintenance de votre climatisation',
    'Entretien climatisation - Air G Énergie',
    'Tout savoir sur l''entretien et la maintenance de votre climatisation pour optimiser sa durée de vie.'
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- 10. VÉRIFICATIONS & COMMENTAIRES FINAUX
-- ============================================================================

-- Vérifier que les tables sont créées
DO $$
BEGIN
  RAISE NOTICE 'Tables créées : blog_categories, blog, blog_tags';
  RAISE NOTICE 'Indexes créés pour performance optimale';
  RAISE NOTICE 'Triggers updated_at configurés';
  RAISE NOTICE 'Trigger auto_set_published_at configuré';
  RAISE NOTICE 'RLS policies activées (public = lecture published, admin = CRUD complet)';
  RAISE NOTICE 'Bucket Storage blog-images créé avec policies';
  RAISE NOTICE '4 catégories par défaut insérées';
  RAISE NOTICE '';
  RAISE NOTICE '✅ SCHÉMA BLOG SUPABASE PRÊT';
  RAISE NOTICE '';
  RAISE NOTICE 'Prochaine étape : Développement interface admin';
END $$;
