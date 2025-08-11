import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import type { FileRouteTypes } from '@/routeTree.gen';
import { Link, useRouterState } from '@tanstack/react-router';
import React from 'react';

const routeConfig: Record<FileRouteTypes['to'], string> = {
  '/': 'Home',
  '/quizzes': 'Quizzes',
  '/quizzes/create': 'Create Quiz',
  '/quizzes/$id': 'Quiz Details',
};

const arrToPathname = (arr: string[], count: number) =>
  arr.slice(0, count).join('/');

function matchPathToLabel(path: string) {
  if (routeConfig[path as FileRouteTypes['to']]) {
    return routeConfig[path as FileRouteTypes['to']];
  }

  for (const pattern of Object.keys(routeConfig) as FileRouteTypes['to'][]) {
    const regex = new RegExp(
      '^' +
        pattern
          .split('/')
          .map((part) => (part.startsWith('$') ? '[^/]+' : part))
          .join('/') +
        '$',
    );
    if (regex.test(path)) {
      return routeConfig[pattern];
    }
  }

  return decodeURIComponent(path.split('/').pop() || '');
}

export default function AppBreadcrumbs() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    { href: '/', label: routeConfig['/'] },
    ...segments.map((_, i, arr) => {
      const href = `/${arrToPathname(arr, i + 1)}`;
      const label = matchPathToLabel(href);
      return { href, label };
    }),
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <React.Fragment key={crumb.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
