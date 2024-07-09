/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as StudiesIndexImport } from './routes/studies/index'
import { Route as StudiesStudyIdImport } from './routes/studies/$studyId'
import { Route as ApplyMentorImport } from './routes/apply/mentor'
import { Route as ApplyMemberImport } from './routes/apply/member'

// Create Virtual Routes

const TeamLazyImport = createFileRoute('/team')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const TeamLazyRoute = TeamLazyImport.update({
  path: '/team',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/team.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const StudiesIndexRoute = StudiesIndexImport.update({
  path: '/studies/',
  getParentRoute: () => rootRoute,
} as any)

const StudiesStudyIdRoute = StudiesStudyIdImport.update({
  path: '/studies/$studyId',
  getParentRoute: () => rootRoute,
} as any)

const ApplyMentorRoute = ApplyMentorImport.update({
  path: '/apply/mentor',
  getParentRoute: () => rootRoute,
} as any)

const ApplyMemberRoute = ApplyMemberImport.update({
  path: '/apply/member',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/team': {
      id: '/team'
      path: '/team'
      fullPath: '/team'
      preLoaderRoute: typeof TeamLazyImport
      parentRoute: typeof rootRoute
    }
    '/apply/member': {
      id: '/apply/member'
      path: '/apply/member'
      fullPath: '/apply/member'
      preLoaderRoute: typeof ApplyMemberImport
      parentRoute: typeof rootRoute
    }
    '/apply/mentor': {
      id: '/apply/mentor'
      path: '/apply/mentor'
      fullPath: '/apply/mentor'
      preLoaderRoute: typeof ApplyMentorImport
      parentRoute: typeof rootRoute
    }
    '/studies/$studyId': {
      id: '/studies/$studyId'
      path: '/studies/$studyId'
      fullPath: '/studies/$studyId'
      preLoaderRoute: typeof StudiesStudyIdImport
      parentRoute: typeof rootRoute
    }
    '/studies/': {
      id: '/studies/'
      path: '/studies'
      fullPath: '/studies'
      preLoaderRoute: typeof StudiesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  AboutLazyRoute,
  TeamLazyRoute,
  ApplyMemberRoute,
  ApplyMentorRoute,
  StudiesStudyIdRoute,
  StudiesIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/team",
        "/apply/member",
        "/apply/mentor",
        "/studies/$studyId",
        "/studies/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/team": {
      "filePath": "team.lazy.tsx"
    },
    "/apply/member": {
      "filePath": "apply/member.tsx"
    },
    "/apply/mentor": {
      "filePath": "apply/mentor.tsx"
    },
    "/studies/$studyId": {
      "filePath": "studies/$studyId.tsx"
    },
    "/studies/": {
      "filePath": "studies/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
