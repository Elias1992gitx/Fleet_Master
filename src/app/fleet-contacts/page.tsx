'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Phone, Mail, Tractor, Truck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Layout from '@/components/Layout'

const contacts = [
  {
    name: 'Abebe Bekele',
    role: 'Tractor Operator',
    phone: '+251 91 234 5678',
    email: 'abebe.bekele@hetosa.coop',
    vehicle: 'Tractor',
    color: 'border-blue-400',
  },
  {
    name: 'Tigist Mengistu',
    role: 'Logistics Coordinator',
    phone: '+251 92 345 6789',
    email: 'tigist.mengistu@hetosa.coop',
    vehicle: 'Truck',
    color: 'border-purple-400',
  },
  {
    name: 'Dawit Tadesse',
    role: 'Harvester Operator',
    phone: '+251 93 456 7890',
    email: 'dawit.tadesse@hetosa.coop',
    vehicle: 'Tractor',
    color: 'border-green-400',
  },
  {
    name: 'Hiwot Gebre',
    role: 'Fleet Manager',
    phone: '+251 94 567 8901',
    email: 'hiwot.gebre@hetosa.coop',
    vehicle: 'Truck',
    color: 'border-red-400',
  },
  {
    name: 'Yohannes Alemu',
    role: 'Maintenance Technician',
    phone: '+251 95 678 9012',
    email: 'yohannes.alemu@hetosa.coop',
    vehicle: 'Tractor',
    color: 'border-yellow-400',
  },
]

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeMenuItem, setActiveMenuItem] = useState('fleet-contacts')

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout activeMenuItem={activeMenuItem}><div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 bg-white border-gray-300 focus:border-black transition-all duration-300 shadow-sm"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={`overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 ${contact.color} border-l-4`}
                >
                  <CardContent className="p-6">
                    <motion.div
                      className="flex items-center space-x-4 mb-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    >
                      <Avatar className="w-16 h-16 border-2 border-gray-200">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1508243771214-6e95d137426b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt={contact.name}
                        />
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {contact.name}
                        </h2>
                        <p className="text-sm text-gray-600">{contact.role}</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {contact.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {contact.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        {contact.vehicle === 'Tractor' ? (
                          <Tractor className="h-4 w-4 mr-2 text-gray-400" />
                        ) : (
                          <Truck className="h-4 w-4 mr-2 text-gray-400" />
                        )}
                        {contact.vehicle}
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    >
                      <Button className="w-full mt-4 bg-gray-800 hover:bg-black text-white transition-colors duration-300">
                        Contact
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </Layout>

  )
}
