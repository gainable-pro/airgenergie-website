import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },

  // ─────────────────────────────────────────────────────────────────
  // Redirections 301 — Migration transparente depuis Wix & routes legacy
  // Ces redirections transfèrent le "jus SEO" des anciennes URLs
  // vers les nouvelles URLs canoniques www.airgenergie.fr.
  // ─────────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // ── Anciennes routes /ville/[slug] -> Hubs canoniques /[slug] ──
      {
        source: '/ville/:slug',
        destination: '/:slug',
        permanent: true,
      },
      // ── Commune hors-département (Hérault 34) retirée de la matrice 13 ──
      {
        source: '/la-grande-motte',
        destination: '/zones-intervention',
        permanent: true,
      },
      {
        source: '/la-grande-motte/:path*',
        destination: '/zones-intervention',
        permanent: true,
      },
      // ── Pages Wix système (ne doivent jamais retourner 404) ──
      {
        source: '/booking',
        destination: '/reservation-en-ligne',
        permanent: true,
      },
      {
        source: '/member-profiles',
        destination: '/',
        permanent: true,
      },
      {
        source: '/member-profiles/:path*',
        destination: '/',
        permanent: true,
      },

      // ── Variantes d'URL Wix courantes ──
      // Wix utilise parfois des tirets composés différemment
      {
        source: '/pompe-a-chaleur-air-eau',
        destination: '/pompe-a-chaleur',
        permanent: true,
      },
      {
        source: '/climatisation-reversible',
        destination: '/climatisation',
        permanent: true,
      },
      {
        source: '/climatisation-gainable',
        destination: '/gainable',
        permanent: true,
      },
      {
        source: '/entretien-climatisation',
        destination: '/entretien',
        permanent: true,
      },
      {
        source: '/depannage',
        destination: '/entretien',
        permanent: true,
      },
      {
        source: '/depannage/:path*',
        destination: '/entretien',
        permanent: true,
      },
      {
        source: '/sav',
        destination: '/entretien',
        permanent: true,
      },
      {
        source: '/maintenance',
        destination: '/entretien',
        permanent: true,
      },

      // ── Pages "À propos" / "Qui sommes-nous" Wix ──
      {
        source: '/a-propos',
        destination: '/',
        permanent: true,
      },
      {
        source: '/qui-sommes-nous',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },

      // ── Zone d'intervention ancienne ──
      {
        source: '/zone-intervention',
        destination: '/zones-intervention',
        permanent: true,
      },
      {
        source: '/zones',
        destination: '/zones-intervention',
        permanent: true,
      },

      // ── Blog/articles Wix ──
      {
        source: '/post/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },

      // ── Wix dynamic pages (page?id=xxx) ──
      // Ces pages Wix généraient parfois des URLs avec query params
      // On les redirige proprement
      {
        source: '/services',
        destination: '/climatisation',
        permanent: true,
      },

      // ─── 24 URLs Indexées Wix airgenergie.fr (Conservation Ancienneté & SEO) ───
      { source: '/plomberie-sanitaire', destination: '/contact', permanent: true },
      { source: '/depannage-plomberie', destination: '/contact', permanent: true },
      { source: '/contacter-air-energie', destination: '/contact', permanent: true },
      { source: '/book-online', destination: '/reservation-en-ligne', permanent: true },
      { source: '/interventions-realisations', destination: '/zones-intervention', permanent: true },

      // Villes directes Wix
      { source: '/installation-climatisation-miramas', destination: '/miramas/climatisation', permanent: true },
      { source: '/pompe-a-chaleur-miramas', destination: '/miramas/pompe-a-chaleur', permanent: true },
      { source: '/installation-climatisation/saint-chamas', destination: '/saint-chamas/climatisation', permanent: true },
      { source: '/installation-climatisation/lambesc', destination: '/lambesc/climatisation', permanent: true },
      { source: '/installation-climatisation/velaux', destination: '/velaux/climatisation', permanent: true },
      { source: '/installation-climatisation/senas', destination: '/senas/climatisation', permanent: true },
      { source: '/installation-climatisation/mouries', destination: '/mouries/climatisation', permanent: true },
      { source: '/installation-climatisation/jouques', destination: '/jouques/climatisation', permanent: true },
      { source: '/installation-climatisation/cabannes', destination: '/cabannes/climatisation', permanent: true },
      { source: '/installation-climatisation/gainable-grans', destination: '/grans/climatisation', permanent: true },
      { source: '/installation-climatisation/eco-expert-heiwa-lancon-provence', destination: '/lancon-provence/climatisation', permanent: true },

      // Pompes à chaleur villes Wix
      { source: '/pompe-a-chaleur/saint-victoret-heiwa', destination: '/pompe-a-chaleur', permanent: true },
      { source: '/pompe-a-chaleur/molleges-daikin', destination: '/molleges/pompe-a-chaleur', permanent: true },
      { source: '/pompe-a-chaleur/saint-remy-de-provence-daikin', destination: '/saint-remy-de-provence/pompe-a-chaleur', permanent: true },

      // Services / Forfaits Wix
      { source: '/service-page/entretien-de-climatisation-gainable', destination: '/reservation-en-ligne/gainable', permanent: true },
      { source: '/service-page/entretien-de-climatisation-cassette', destination: '/reservation-en-ligne/cassette', permanent: true },
      { source: '/service-page/tri-split-entretien-de-climatisation', destination: '/reservation-en-ligne/tri-split', permanent: true },
      { source: '/service-page/entretien-pompe-air-eau-1', destination: '/reservation-en-ligne/pac-air-eau', permanent: true },
      { source: '/service-page/entretien-pompe-a-chaleur-air-eau-1', destination: '/reservation-en-ligne/pac-air-eau', permanent: true },
      { source: '/service-page/:path*', destination: '/reservation-en-ligne', permanent: true },
    ];
  },
};

export default nextConfig;
