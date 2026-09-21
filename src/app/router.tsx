import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { AdminPage } from '../admin/AdminPage'
import { PublicLayout } from '../components/layout/PublicLayout'
import { DisplayPage } from '../display/DisplayPage'
import { AboutPage } from '../pages/AboutPage'
import { HistoryPage } from '../pages/HistoryPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProgramsPage } from '../pages/ProgramsPage'
import { VisitPage } from '../pages/VisitPage'

export const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'visit', element: <VisitPage /> },
      { path: 'programs', element: <ProgramsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: 'design/borders',
    lazy: async () => {
      const { BorderDesignLab } = await import('../pages/BorderDesignLab')
      return { Component: BorderDesignLab }
    },
  },
  { path: 'display', element: <DisplayPage /> },
  { path: 'admin', element: <AdminPage /> },
]

export const router = createBrowserRouter(routes)
