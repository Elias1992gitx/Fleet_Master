'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Calendar,
  Wrench,
  Truck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Layout from '@/components/Layout'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Task {
  id: number; // Add this line
  status: keyof typeof statusIcons;
  title: string;
  vehicle: string;
  type: string;
  date: string;
  time: string;
  assignee: string; // Add this line
}

const serviceTasks: Task[] = [
  {
    id: 1,
    title: 'Oil Change',
    vehicle: 'Truck 101',
    assignee: 'John Doe',
    status: 'Scheduled',
    date: '2024-06-01',
    time: '09:00 AM',
    type: 'Maintenance',
  },
  {
    id: 2,
    title: 'Brake Inspection',
    vehicle: 'Van 203',
    assignee: 'Jane Smith',
    status: 'In Progress',
    date: '2024-06-03',
    time: '10:30 AM',
    type: 'Inspection',
  },
  {
    id: 3,
    title: 'Tire Rotation',
    vehicle: 'Car 305',
    assignee: 'Mike Johnson',
    status: 'Completed',
    date: '2024-05-28',
    time: '02:00 PM',
    type: 'Maintenance',
  },
  {
    id: 4,
    title: 'Engine Diagnostics',
    vehicle: 'Truck 102',
    assignee: 'Sarah Brown',
    status: 'Delayed',
    date: '2024-05-25',
    time: '11:00 AM',
    type: 'Repair',
  },
  {
    id: 5,
    title: 'Annual Maintenance',
    vehicle: 'Bus 401',
    assignee: 'Chris Lee',
    status: 'Scheduled',
    date: '2024-06-10',
    time: '08:00 AM',
    type: 'Maintenance',
  },
  {
    id: 6,
    title: 'Transmission Service',
    vehicle: 'Van 205',
    assignee: 'Alex Chen',
    status: 'In Progress',
    date: '2024-06-05',
    time: '01:30 PM',
    type: 'Repair',
  },
]

const statusColors: Record<string, string> = {
  Scheduled: 'bg-blue-500',
  'In Progress': 'bg-yellow-500',
  Completed: 'bg-green-500',
  Delayed: 'bg-red-500',
}

const statusIcons = {
  Scheduled: Calendar,
  'In Progress': Clock,
  Completed: CheckCircle,
  Delayed: AlertTriangle,
}

const ServiceTaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const StatusIcon = statusIcons[task.status]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6 mb-4 relative"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Truck className="w-4 h-4 mr-2" />
            {task.vehicle}
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Wrench className="w-4 h-4 mr-2" />
            {task.type}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {task.date} at {task.time}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div
            className={`flex items-center ${statusColors[task.status] || 'bg-gray-500'
              } text-white px-3 py-1 rounded-full text-sm mb-2`}
          >
            <StatusIcon className="w-4 h-4 mr-2" />
            {task.status}
          </div>
          <div className="text-sm text-gray-600">{task.assignee}</div>
        </div>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg"></div>
    </motion.div>
  )
}

export default function page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [activeMenuItem, setActiveMenuItem] = useState('service-task')
  const [typeFilter, setTypeFilter] = useState('All')

  const filteredTasks = serviceTasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.vehicle.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'All' || task.status === statusFilter) &&
      (typeFilter === 'All' || task.type === typeFilter)
  )

  return (
    <Layout activeMenuItem={activeMenuItem}>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Service Tasks</h1>
            <Button>
              <Plus className="w-5 h-5 mr-2" /> Create Task
            </Button>
          </div>

          <Tabs defaultValue="timeline" className="mb-6">
            <TabsList>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
            <TabsContent value="timeline">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative flex-grow sm:flex-grow-0">
                    <Input
                      placeholder="Search tasks"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="bg-white border-gray-300 rounded-md">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Statuses</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Delayed">Delayed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={typeFilter}
                    onValueChange={setTypeFilter}
                  >
                    <SelectTrigger className="bg-white border-gray-300 rounded-md">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Inspection">Inspection</SelectItem>
                      <SelectItem value="Repair">Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="bg-white">
                  <Filter className="w-4 h-4 mr-2" /> More Filters
                </Button>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {filteredTasks.map((task) => (
                    <ServiceTaskItem key={task.id} task={task} />
                  ))}
                </AnimatePresence>
              </div>

              {filteredTasks.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-600 text-lg">
                    No service tasks found matching your criteria.
                  </p>
                </motion.div>
              )}

              {filteredTasks.length > 0 && (
                <div className="mt-8 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Showing {filteredTasks.length} of {serviceTasks.length} tasks
                  </p>
                  <Button variant="outline" className="bg-white">
                    Load More <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="calendar">
              Calendar view coming soon...
            </TabsContent>
            <TabsContent value="list">List view coming soon...</TabsContent>
          </Tabs>
        </div>
      </div>

    </Layout>
  )
}
