import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { AdminPage } from '../admin/AdminPage'
import { PublicLayout } from '../components/layout/PublicLayout'
import { DisplayPage } from '../display/DisplayPage'
import { AboutPage } from '../pages/AboutPage'
import { CommunityPage } from '../pages/CommunityPage'
import { ContactPage } from '../pages/ContactPage'
import { DonatePage } from '../pages/DonatePage'
import { HistoryPage } from '../pages/HistoryPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PrayerTimesPage } from '../pages/PrayerTimesPage'

export const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'prayer-times', element: <PrayerTimesPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'donate', element: <DonatePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: 'display', element: <DisplayPage /> },
  { path: 'admin', element: <AdminPage /> },
]

export const router = createBrowserRouter(routes)
