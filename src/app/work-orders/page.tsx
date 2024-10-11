"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Filter, ChevronDown, Clock, CheckCircle, AlertTriangle, XCircle, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Layout from '@/components/Layout'

interface WorkOrder {
  id: number;
  title: string;
  vehicle: string;
  assignee: string;
  status: keyof typeof statusColors;
  dueDate: string;
  progress: number;
}

const statusColors = {
  'In Progress': 'bg-blue-500',
  'Pending': 'bg-yellow-500',
  'Completed': 'bg-green-500',
  'Overdue': 'bg-red-500',
} as const;

const statusIcons = {
  'In Progress': Clock,
  'Pending': AlertTriangle,
  'Completed': CheckCircle,
  'Overdue': XCircle,
}

const workOrders: WorkOrder[] = [
  { id: 1, title: 'Oil Change - Fleet A', vehicle: 'Truck 101', assignee: 'John Doe', status: 'In Progress', dueDate: '2024-06-01', progress: 65 },
  { id: 2, title: 'Brake Inspection - Fleet B', vehicle: 'Van 203', assignee: 'Jane Smith', status: 'Pending', dueDate: '2024-06-03', progress: 0 },
  { id: 3, title: 'Tire Rotation - Fleet C', vehicle: 'Car 305', assignee: 'Mike Johnson', status: 'Completed', dueDate: '2024-05-28', progress: 100 },
  { id: 4, title: 'Engine Diagnostics - Fleet A', vehicle: 'Truck 102', assignee: 'Sarah Brown', status: 'Overdue', dueDate: '2024-05-25', progress: 30 },
  { id: 5, title: 'Annual Maintenance - Fleet D', vehicle: 'Bus 401', assignee: 'Chris Lee', status: 'In Progress', dueDate: '2024-06-10', progress: 45 },
  { id: 6, title: 'Transmission Service - Fleet B', vehicle: 'Van 205', assignee: 'Alex Chen', status: 'Pending', dueDate: '2024-06-05', progress: 0 },
]

const WorkOrderCard = ({ order }: { order: WorkOrder }) => {
  const StatusIcon = statusIcons[order.status]
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{order.title}</h3>
          <p className="text-sm text-gray-600">{order.vehicle}</p>
        </div>
        <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
      </div>
      <div className="flex items-center mb-4">
        <div className={`w-3 h-3 rounded-full ${statusColors[order.status]} mr-2`}></div>
        <span className="text-sm font-medium">{order.status}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Assignee</span>
        <span className="text-sm font-medium">{order.assignee}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">Due Date</span>
        <span className="text-sm font-medium">{order.dueDate}</span>
      </div>
      <Progress value={order.progress} className="mb-2" />
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Progress</span>
        <span>{order.progress}%</span>
      </div>
    </motion.div>
  )
}

export default function page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | keyof typeof statusColors>('All')
  const [sortBy, setSortBy] = useState('created')

  const [activeMenuItem, setActiveMenuItem] = useState('work-orders')
  // Explicitly type filteredOrders
  const filteredOrders: WorkOrder[] = workOrders.filter(order => 
    (order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.vehicle.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || order.status === statusFilter)
  )

  return (
    <Layout activeMenuItem={activeMenuItem}>
      <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Work Orders</h1>
          <Button><Plus className="w-5 h-5 mr-2" /> Create Work Order</Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Input 
                placeholder="Search work orders" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Select 
              value={statusFilter} 
              onValueChange={(value: string) => setStatusFilter(value as 'All' | keyof typeof statusColors)}
            >
              <SelectTrigger className="bg-white border-gray-300 rounded-md">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="bg-white">
              <Filter className="w-4 h-4 mr-2" /> More Filters
            </Button>
            <Select 
              value={sortBy}
              onValueChange={(value: string) => setSortBy(value)}
            >
              <SelectTrigger className="bg-white border-gray-300 rounded-md">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">Sort: Date Created</SelectItem>
                <SelectItem value="due">Sort: Due Date</SelectItem>
                <SelectItem value="status">Sort: Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order: WorkOrder) => (
            <WorkOrderCard key={order.id} order={order} />
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">No work orders found matching your criteria.</p>
          </motion.div>
        )}

        {filteredOrders.length > 0 && (
          <div className="mt-8 flex justify-between items-center">
            <p className="text-sm text-gray-600">Showing {filteredOrders.length} of {workOrders.length} work orders</p>
            <Button variant="outline" className="bg-white">
              Load More <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
    </Layout>
  )
}