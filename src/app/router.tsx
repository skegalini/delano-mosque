import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { PublicLayout } from '../components/layout/PublicLayout'
import { DisplayPage } from '../display/DisplayPage'
import { AboutPage } from '../pages/AboutPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProgramsPage } from '../pages/ProgramsPage'
import { VisitPage } from '../pages/VisitPage'

export const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'visit', element: <VisitPage /> },
      { path: 'programs', element: <ProgramsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: 'display', element: <DisplayPage /> },
]

if (import.meta.env.DEV) {
  routes.push({
    path: 'design/borders',
    lazy: async () => {
      const { BorderDesignLab } = await import('../pages/BorderDesignLab')
      return { Component: BorderDesignLab }
    },
  })
}

export const router = createBrowserRouter(routes)
