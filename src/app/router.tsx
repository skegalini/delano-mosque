import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { AdminPage } from '../admin/AdminPage'
import { PublicLayout } from '../components/layout/PublicLayout'
import { DisplayPage } from '../display/DisplayPage'
import { AboutPage } from '../pages/AboutPage'
import { DonatePage } from '../pages/DonatePage'
import { HistoryPage } from '../pages/HistoryPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProgramsPage } from '../pages/ProgramsPage'

export const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'programs', element: <ProgramsPage /> },
      { path: 'donate', element: <DonatePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: 'display', element: <DisplayPage /> },
  { path: 'admin', element: <AdminPage /> },
]

export const router = createBrowserRouter(routes)
