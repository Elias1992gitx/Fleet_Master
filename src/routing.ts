import { NextRequest, NextResponse } from 'next/server';

export const routes = [
  { path: '/', component: 'landing' },
  { path: '/landing', component: 'landing' },
  { path: '/dashboard', component: 'dashboard', layout: true },
  { path: '/fuel-management', component: 'fuel-management', layout: true },
  { path: '/parts-management', component: 'parts-management', layout: true },
  { path: '/vehicle-inspection', component: 'vehicle-inspection', layout: true },
  { path: '/issues', component: 'issues', layout: true },
  { path: '/fleet-reminders', component: 'fleet-reminders', layout: true },
  { path: '/vehicle-management', component: 'vehicle-management', layout: true },
  { path: '/equipment-management', component: 'equipment-management', layout: true },
  { path: '/service-task', component: 'service-task', layout: true },
  { path: '/vendor', component: 'vendor', layout: true },
  { path: '/fleet-contacts', component: 'fleet-contacts', layout: true },
];

export function handleRouting(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  const route = routes.find(r => r.path === pathname);

  if (route) {
    if (route.path === '/' || route.path === '/landing') {
      url.pathname = `/${route.component}`;
    } else {
      url.pathname = pathname;
    }
    return NextResponse.rewrite(url);
  }

  url.pathname = '/landing';
  return NextResponse.redirect(url);
}