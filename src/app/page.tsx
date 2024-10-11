'use client'
import Layout from '@/components/Layout'

import LandingPage from './landing/page'
import { routes } from '@/routing'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/sidebar'

export default function Home() {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') {
      router.push('/landing')
    } else {
      const route = routes.find(r => r.path === pathname)
      if (route) {
        setActiveMenuItem(route.path.slice(1))
      }
    }
  }, [pathname, router])

  const handleMenuItemClick = (path: string) => {
    router.push(`/${path}`)
  }

  if (pathname === '/landing') {
    return <LandingPage />
  }

  const PageComponent = routes.find(r => r.path === pathname)?.component

  return (
    <Layout activeMenuItem={activeMenuItem}>
      {PageComponent && <PageComponent />}
    </Layout>
  )
}