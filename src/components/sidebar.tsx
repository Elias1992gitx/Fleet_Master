'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  Building,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Droplet,
  Home,
  MessageCircle,
  Package,
  Settings,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { routeModule } from 'next/dist/build/templates/app-page'

type Star = { x: number; y: number; size: number; duration: number }

const StarField = () => {
  //   const [stars, setStars] = useState([])
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 50; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 3 + 2,
        })
      }
      setStars(newStars)
    }

    generateStars()
    window.addEventListener('resize', generateStars)
    return () => window.removeEventListener('resize', generateStars)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden overflow-y-hidden">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gray-300"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  )
}

export default function Sidebar({ activeMenuItem }: { activeMenuItem: string }) {
  const [isOpen, setIsOpen] = useState(true)
  const [activeItem, setActiveItem] = useState(activeMenuItem)
  const router = useRouter()
  const menuItems = [
    { name: 'Dashboard', icon: Home, path: 'dashboard' },
    { name: 'Vehicles', icon: Truck, path: 'vehicle-management' },
    { name: 'Equipment', icon: Wrench, path: 'equipment-management' },
    { name: 'Inspections', icon: Clipboard, path: 'vehicle-inspection' },
    { name: 'Issues', icon: Bell, path: 'issues' },
    { name: 'Reminders', icon: Bell, path: 'fleet-reminders' },
    { name: 'Service', icon: Settings, path: 'service-task' },
    { name: 'Contacts', icon: Users, path: 'fleet-contacts' },
    { name: 'Vendors', icon: Building, path: 'vendor' },
    { name: 'Fuel', icon: Droplet, path: 'fuel-management' },
    { name: 'Parts', icon: Package, path: 'parts-management' },
  ]

  return (
    <TooltipProvider>
      <motion.div
        className="flex flex-col h-screen bg-black text-gray-300 relative overflow-hidden"
        animate={{ width: isOpen ? '240px' : '64px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <StarField />
        <div className="flex flex-col h-full z-10 backdrop-blur-sm bg-black/30">
          {/* Account Info Section */}
          <motion.div
            className="p-4 flex items-center space-x-3 bg-gray-900/50"
            animate={{ opacity: isOpen ? 1 : 0 }}
          >
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User avatar"
              />
              <AvatarFallback>HF</AvatarFallback>
            </Avatar>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-semibold text-gray-200 tracking-wide">
                    Fleet Master
                  </p>
                  <p className="text-sm text-gray-400">Admin</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-4 right-2 rounded-full hover:bg-gray-800/50 text-gray-300"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto overflow-x-hidden no-scrollbar">
              {menuItems.map((item) => (
                <Tooltip key={item.name} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <div
                    onClick={() => {
                      const itemPath = item.path
                      router.push(`/${itemPath}`)
                      setActiveItem(item.name)
                    }}
                    >
                      <motion.div
                        className={cn(
                          'flex items-center w-full p-3 my-1 rounded-lg transition-all duration-200 ease-in-out',
                          activeItem === item.name
                            ? 'bg-gray-700/50 text-white shadow-lg'
                            : 'hover:bg-gray-600/30 text-gray-300 hover:text-white'
                        )}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="p-2 bg-gray-500/20 rounded-md"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <item.icon size={20} className="text-gray-300" />
                        </motion.div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.span
                              className="ml-4 text-sm font-medium truncate tracking-wide"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-gray-700 text-white"
                  >
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </nav>

          {/* Chat AI Button */}
          <motion.div
            className="p-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className="w-full bg-gray-800 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-500 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {isOpen ? (
                'Chat with AI'
              ) : (
                <span className="sr-only">Chat with AI</span>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}
