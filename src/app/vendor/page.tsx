'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Layout from '@/components/Layout'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AnimatePresence, motion } from 'framer-motion'

import {
  ChevronDown,
  DollarSign,
  Filter,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  TrendingDown,
  TrendingUp,
  Truck,
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface Vendor {
  id: number
  name: string
  type: string
  lastOrder: string
  totalSpent: number
  performance: number
}

interface CustomChartProps {
  data: number[]
  color: string
}

interface CardWithChartProps {
  title: string
  value: string
  icon: React.ElementType
  color: string
  chartData: number[]
}

const vendorData: Vendor[] = [
  {
    id: 1,
    name: 'AutoPro Services',
    type: 'Maintenance',
    lastOrder: '2024-05-15',
    totalSpent: 12450,
    performance: 4.8,
  },
  {
    id: 2,
    name: 'TireMaster Co.',
    type: 'Tires',
    lastOrder: '2024-05-10',
    totalSpent: 8320,
    performance: 4.5,
  },
  {
    id: 3,
    name: 'FleetFuel Inc.',
    type: 'Fuel',
    lastOrder: '2024-05-18',
    totalSpent: 22150,
    performance: 4.9,
  },
  {
    id: 4,
    name: 'AutoParts Express',
    type: 'Parts',
    lastOrder: '2024-05-12',
    totalSpent: 5780,
    performance: 4.2,
  },
  {
    id: 5,
    name: 'CleanFleet Services',
    type: 'Cleaning',
    lastOrder: '2024-05-16',
    totalSpent: 3200,
    performance: 4.6,
  },
]

const generateChartData = () => {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
}

const CustomChart: React.FC<CustomChartProps> = ({ data, color }) => {
  const max = Math.max(...data)
  return (
    <div className="flex items-end h-16 gap-1">
      {data.map((value, index) => (
        <motion.div
          key={index}
          className={`w-1 bg-${color}-500 rounded-t`}
          initial={{ height: 0 }}
          animate={{ height: `${(value / max) * 100}%` }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        />
      ))}
    </div>
  )
}

const CardWithChart: React.FC<CardWithChartProps> = ({
  title,
  value,
  icon: Icon,
  color,
  chartData,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-${color}-500`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </h2>
          <p className="text-2xl font-bold dark:text-white">{value}</p>
        </div>
        <Icon className={`w-8 h-8 text-${color}-500`} />
      </div>
      <CustomChart data={chartData} color={color} />
    </motion.div>
  )
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [chartData, setChartData] = useState({
    vendors: generateChartData(),
    spending: generateChartData(),
    performance: generateChartData(),
    orders: generateChartData(),
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => ({
        vendors: [
          ...prevData.vendors.slice(1),
          Math.floor(Math.random() * 100),
        ],
        spending: [
          ...prevData.spending.slice(1),
          Math.floor(Math.random() * 100),
        ],
        performance: [
          ...prevData.performance.slice(1),
          Math.floor(Math.random() * 100),
        ],
        orders: [...prevData.orders.slice(1), Math.floor(Math.random() * 100)],
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const [activeMenuItem, setActiveMenuItem] = useState('vendor')
  return (
    <Layout activeMenuItem={activeMenuItem}>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-8 rounded-lg ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vehicle Vendor Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add New Vendor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CardWithChart
          title="Total Vendors"
          value="24"
          icon={Truck}
          color="blue"
          chartData={chartData.vendors}
        />
        <CardWithChart
          title="Monthly Spending"
          value="$45,280"
          icon={DollarSign}
          color="green"
          chartData={chartData.spending}
        />
        <CardWithChart
          title="Avg. Performance"
          value="4.6"
          icon={TrendingUp}
          color="yellow"
          chartData={chartData.performance}
        />
        <CardWithChart
          title="Pending Orders"
          value="7"
          icon={TrendingDown}
          color="red"
          chartData={chartData.orders}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <motion.div
            className="relative flex-grow md:flex-grow-0"
            initial={false}
            animate={{ width: isSearchFocused ? 300 : 200 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              placeholder="Search vendors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`pl-10 pr-10 py-2 w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </motion.div>
          <Select defaultValue="all">
            <SelectTrigger
              className={`border-gray-300 rounded-md ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
            >
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="tires">Tires</SelectItem>
              <SelectItem value="fuel">Fuel</SelectItem>
              <SelectItem value="parts">Parts</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className={isDarkMode ? 'bg-gray-800' : 'bg-white'}
          >
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            5 of 24
          </span>
          <Button
            variant="outline"
            size="icon"
            className={isDarkMode ? 'bg-gray-800' : 'bg-white'}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Select defaultValue="name">
            <SelectTrigger
              className={`border-gray-300 rounded-md ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by: Name</SelectItem>
              <SelectItem value="performance">Sort by: Performance</SelectItem>
              <SelectItem value="spent">Sort by: Total Spent</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className={isDarkMode ? 'bg-gray-800' : 'bg-white'}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div
        className={`rounded-lg shadow-md overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {vendorData
                .filter(
                  (vendor) =>
                    vendor.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    vendor.type.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((vendor) => (
                  <motion.tr
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700`}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.type}</TableCell>
                    <TableCell>{vendor.lastOrder}</TableCell>
                    <TableCell>${vendor.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{vendor.performance}</span>
                        <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <motion.div
                            className="bg-green-500 h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${vendor.performance * 20}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </motion.div>
    </Layout>
  )
}
