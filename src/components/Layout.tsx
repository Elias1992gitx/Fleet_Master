import Navbar from './navbar'
import Sidebar from './sidebar'

interface LayoutProps {
  children: React.ReactNode
  activeMenuItem: string
}

export default function Layout({ children, activeMenuItem }: LayoutProps) {  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeMenuItem={activeMenuItem} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  )
}