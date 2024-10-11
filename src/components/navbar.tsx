'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Search, Bell, Plus, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Component() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: [0.5, 1, 0.5],
      transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
    })
  }, [controls])

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Slick effect */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"
            style={{
              left: 0,
              right: 0,
              top: `${(i + 1) * 5}%`,
            }}
            animate={controls}
          />
        ))}
      </div>

      <div className="flex items-center space-x-4 z-10">
        <motion.div
          initial={{ width: 200 }}
          animate={{ width: isSearchFocused ? 300 : 200 }}
          className="relative"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search Fleetio"
            className="pl-10 pr-4 py-2 bg-gray-800 bg-opacity-50 border-0 text-white placeholder-gray-400 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-opacity-75 transition-all duration-300"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </motion.div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[100px] bg-gray-800 bg-opacity-50 border-0 text-white rounded-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="vehicles">Vehicles</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-4 z-10">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-gray-700 hover:bg-opacity-50"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </motion.div>
        <motion.div
          className="flex items-center space-x-2 cursor-pointer bg-gray-800 bg-opacity-50 rounded-full px-3 py-1"
          whileHover={{ backgroundColor: 'rgba(75,85,99,0.75)' }}
        >
          <span className="font-medium">My Dashboard</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </div>
    </header>
  )
}
