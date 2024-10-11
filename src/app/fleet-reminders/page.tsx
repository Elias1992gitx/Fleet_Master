"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Filter, ChevronDown, Bell, Calendar, MoreVertical, CheckCircle2, Clock, AlertTriangle, Truck, Car, Bus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from '@/components/Layout'  
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { LucideIcon } from 'lucide-react'

interface AnimatedIconProps {
  Icon: LucideIcon
  className?: string
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ Icon, className }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
    }}
  >
    <Icon className={className} />
  </motion.div>
)

const reminders = [
  { id: 1, title: 'Truck Inspection Due', vehicle: 'Truck 101', type: 'Inspection', dueDate: '2024-06-05', priority: 'High', status: 'Pending', icon: Truck },
  { id: 2, title: 'Van License Renewal', vehicle: 'Van 203', type: 'Documentation', dueDate: '2024-06-10', priority: 'Medium', status: 'In Progress', icon: Car },
  { id: 3, title: 'Car Maintenance', vehicle: 'Car 305', type: 'Maintenance', dueDate: '2024-06-15', priority: 'Low', status: 'Completed', icon: Car },
  { id: 4, title: 'Truck Insurance Expiry', vehicle: 'Truck 102', type: 'Documentation', dueDate: '2024-06-01', priority: 'High', status: 'Overdue', icon: Truck },
  { id: 5, title: 'Bus Fuel Efficiency Check', vehicle: 'Bus 401', type: 'Inspection', dueDate: '2024-06-20', priority: 'Medium', status: 'Pending', icon: Bus },
  { id: 6, title: 'Fleet Driver Training', vehicle: 'All Fleet', type: 'Training', dueDate: '2024-06-25', priority: 'Low', status: 'In Progress', icon: Car },
]

const priorityColors = {
  'High': 'bg-red-500',
  'Medium': 'bg-yellow-500',
  'Low': 'bg-green-500',
}

const statusIcons = {
  'Pending': Clock,
  'In Progress': AlertTriangle,
  'Completed': CheckCircle2,
  'Overdue': AlertTriangle,
}

const typeColors = {
  'Inspection': 'bg-blue-100 text-blue-800 border-blue-200',
  'Documentation': 'bg-purple-100 text-purple-800 border-purple-200',
  'Maintenance': 'bg-green-100 text-green-800 border-green-200',
  'Training': 'bg-orange-100 text-orange-800 border-orange-200',
}

interface Reminder {
  status: string
  icon: LucideIcon
  type: string
  title: string
  vehicle: string
  priority: string
  dueDate: string
}

interface ReminderCardProps {
  reminder: Reminder
}

const ReminderCard: React.FC<ReminderCardProps> = ({ reminder }) => {
  const StatusIcon = statusIcons[reminder.status as keyof typeof statusIcons]
  const VehicleIcon = reminder.icon

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className={`p-4 ${typeColors[reminder.type as keyof typeof typeColors]}`}>
          <div className="flex justify-between items-center">
            <AnimatedIcon Icon={VehicleIcon} className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-xs font-semibold">
              {reminder.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg mb-2">{reminder.title}</CardTitle>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{reminder.vehicle}</span>
            <div className="flex items-center">
              <motion.div 
                className={`w-2 h-2 rounded-full ${priorityColors[reminder.priority as keyof typeof priorityColors]} mr-2`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-xs font-medium">{reminder.priority}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{reminder.dueDate}</span>
            </div>
            <div className="flex items-center">
              <StatusIcon className={`h-4 w-4 mr-1 ${reminder.status === 'Overdue' ? 'text-destructive' : 'text-muted-foreground'}`} />
              <span className={`text-xs font-medium ${reminder.status === 'Overdue' ? 'text-destructive' : 'text-muted-foreground'}`}>
                {reminder.status}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeMenuItem, setActiveMenuItem] = useState('fleet-reminders')
  const [typeFilter, setTypeFilter] = useState('All')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredReminders = reminders.filter(reminder => 
    (reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     reminder.vehicle.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === 'All' || reminder.type === typeFilter)
  )

  return (
    <Layout activeMenuItem={activeMenuItem}>
      <div className="p-4 sm:p-6 md:p-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-0">Fleet Reminders</h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-5 h-5 mr-2" /> Create Reminder
            </Button>
          </motion.div>
        </div>

        <Card className="mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="filter">Filter</TabsTrigger>
              </TabsList>
              <TabsContent value="search">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Input 
                      placeholder="Search reminders" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <Select 
                    value={typeFilter} 
                    onValueChange={setTypeFilter}
                  >
                    <SelectTrigger className="w-full sm:w-auto">
                      {typeFilter}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      <SelectItem value="Inspection">Inspection</SelectItem>
                      <SelectItem value="Documentation">Documentation</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="filter">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Priority</label>
                    <Select>
                      <SelectTrigger className="w-full">Select Priority</SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Priorities</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
                    <Select>
                      <SelectTrigger className="w-full">Select Status</SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Due Date</label>
                    <Input type="date" className="w-full" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredReminders.map(reminder => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))}
        </div>

        {filteredReminders.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
              }}
            >
              <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            </motion.div>
            <p className="text-muted-foreground text-lg">No reminders found matching your criteria.</p>
          </motion.div>
        )}

        {filteredReminders.length > 0 && (
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 sm:mb-0">Showing {filteredReminders.length} of {reminders.length} reminders</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">
                Load More <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
    </Layout>
  )
}