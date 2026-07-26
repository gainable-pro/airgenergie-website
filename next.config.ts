import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // ─────────────────────────────────────────────────────────────────
  // Redirections 301 — Migration transparente depuis Wix
  // Ces redirections transfèrent le "jus SEO" des anciennes URLs Wix
  // vers les nouvelles URLs Next.js identiques ou équivalentes.
  // Google ne voit aucune rupture.
  // ─────────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // ── Pages Wix système (ne doivent jamais retourner 404) ──
      {
        source: '/booking',
        destination: '/entretien',
        permanent: true,
      },
      {
        source: '/booking/:path*',
        destination: '/entretien',
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
    ];
  },
};

export default nextConfig;
