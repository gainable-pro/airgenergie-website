import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REDIRECTS: Record<string, string> = {
  '/book-online': '/entretien#reserve',
  '/installation-climatisation/fontvieille-': '/fontvieille/climatisation',
  '/installation-climatisation/fontvieille': '/fontvieille/climatisation',
  '/installation-climatisation/velaux': '/velaux/climatisation',
  '/installation-climatisation/gainable-grans': '/grans/gainable',
  '/installation-climatisation/senas': '/senas/climatisation',
  '/installation-climatisation/la-grande-motte': '/la-grande-motte/climatisation',
  '/installation-climatisation/daikin-la-grand-motte': '/la-grande-motte/climatisation',
  '/installation-climatisation/saint-chamas': '/saint-chamas/climatisation',
  '/service-page/diagnostic-rapport-de-panne': '/entretien',
  '/service-page/tri-split-entretien-de-climatisation': '/entretien',
  '/pompe-a-chaleur-miramas': '/miramas/pompe-a-chaleur',
  '/contacter-air-energie': '/contact',
  '/depannage-plomberie': '/contact',
  '/pompe-a-chaleur/saint-remy-de-provence-daikin': '/saint-remy-de-provence/pompe-a-chaleur',
  '/installation-climatisation/cabannes': '/cabannes/climatisation',
  '/installation-climatisation-miramas': '/miramas/climatisation',
  '/plomberie-sanitaire': '/contact',
  '/interventions-realisations': '/zones-intervention',
  '/installation-climatisation/mouries': '/mouries/climatisation',
  '/installation-climatisation/eygalieres': '/eygalieres/climatisation'
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  if (REDIRECTS[pathname]) {
    const target = REDIRECTS[pathname];
    const url = new URL(target, request.url);
    return NextResponse.redirect(url, 301); // 301 Permanent Redirect for SEO
  }
  
  // Handle domain preview overrides for local testing (e.g., ?domain=fr or ?domain=com)
  const url = request.nextUrl;
  const domainParam = url.searchParams.get('domain');
  
  let response;
  if (domainParam === 'fr' || domainParam === 'com') {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-domain-override', domainParam);
    
    response = NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    });
    // Store in cookie for persistent navigation
    response.cookies.set('domain_override', domainParam, { path: '/' });
    return response;
  }
  
  // Fallback to cookie check if no query param is present
  const cookieDomain = request.cookies.get('domain_override')?.value;
  if (cookieDomain === 'fr' || cookieDomain === 'com') {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-domain-override', cookieDomain);
    
    response = NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    });
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
