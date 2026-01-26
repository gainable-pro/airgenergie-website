import pg from 'pg';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Client } = pg;

async function runMigration() {
    const client = new Client({
        connectionString: 'postgresql://postgres:gharibrabab23012017@db.gbqulqfqbgamtbhonsmw.supabase.co:5432/postgres',
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log('🔌 Connexion à Supabase...');
        await client.connect();
        console.log('✅ Connecté !');

        console.log('📦 Lecture du fichier SQL...');
        const sqlPath = join(__dirname, '..', 'supabase', 'migrations', 'phase4_blog_schema.sql');
        const sql = readFileSync(sqlPath, 'utf-8');

        console.log('🚀 Exécution de la migration SQL...');
        await client.query(sql);

        console.log('');
        console.log('✅ ✅ ✅ MIGRATION EXÉCUTÉE AVEC SUCCÈS ! ✅ ✅ ✅');
        console.log('');
        console.log('📊 Tables créées:');
        console.log('   - blog_categories (4 catégories par défaut)');
        console.log('   - blog (articles)');
        console.log('   - blog_tags (tags)');
        console.log('');
        console.log('🔒 RLS policies activées');
        console.log('🖼️  Bucket blog-images créé');
        console.log('⚡ Triggers configurés (updated_at, auto_set_published_at)');
        console.log('');
        console.log('🎯 Prochaine étape: Interface Admin');

    } catch (error) {
        console.error('❌ Erreur lors de l\'exécution:', error.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

runMigration();
