'use client'

import { useState, useEffect } from 'react'
import { Variants } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Plus,
  Settings,
  BarChart2,
  RefreshCcw,
  Truck,
  Package,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Part {
  id: number
  name: string
  category: string
  stock: number
  price: number
  lastOrdered: string
}

const partsData: Part[] = [
  {
    id: 1,
    name: 'Air Filter',
    category: 'Engine',
    stock: 15,
    price: 29.99,
    lastOrdered: '2024-05-15',
  },
  {
    id: 2,
    name: 'Brake Pads',
    category: 'Brakes',
    stock: 8,
    price: 45.5,
    lastOrdered: '2024-05-10',
  },
  {
    id: 3,
    name: 'Oil Filter',
    category: 'Engine',
    stock: 20,
    price: 12.99,
    lastOrdered: '2024-05-18',
  },
  {
    id: 4,
    name: 'Spark Plugs',
    category: 'Ignition',
    stock: 30,
    price: 8.99,
    lastOrdered: '2024-05-12',
  },
  {
    id: 5,
    name: 'Windshield Wipers',
    category: 'Exterior',
    stock: 12,
    price: 22.5,
    lastOrdered: '2024-05-20',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
}

const pulse = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity },
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredData, setFilteredData] = useState<Part[]>(partsData)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Part | null
    direction: 'ascending' | 'descending'
  }>({
    key: null,
    direction: 'ascending',
  })
  const [activeCategory, setActiveCategory] = useState<string>('All')

  useEffect(() => {
    const filtered = partsData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeCategory === 'All' || item.category === activeCategory)
    )
    setFilteredData(filtered)
  }, [searchTerm, activeCategory])

  const [activeMenuItem, setActiveMenuItem] = useState('parts-management')
  const handleSort = (key: keyof Part) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === null) return 0
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  })

  const categories = ['All', 'Engine', 'Brakes', 'Ignition', 'Exterior']

  return (
    <Layout activeMenuItem={activeMenuItem}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <motion.div
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800">
              Parts Management
            </h1>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-blue-100 transition-colors duration-300"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-blue-100 transition-colors duration-300"
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-blue-100 transition-colors duration-300"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            variants={fadeInUp as Variants}
            initial="initial"
            animate="animate"
          >
            <motion.div whileHover={pulse}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Parts
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85</div>
                  <p className="text-xs text-muted-foreground">
                    +2% from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={pulse}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Low Stock Alerts
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    5 parts need reordering
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={pulse}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Vehicles Serviced
                  </CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-between items-center mb-6"
            variants={fadeInUp as Variants}
            initial="initial"
            animate="animate"
          >
            <div className="relative mb-4 md:mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search parts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={
                      activeCategory === category ? 'default' : 'outline'
                    }
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Badge>
                </motion.div>
              ))}
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="high-demand">High Demand</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
                <Plus className="h-4 w-4 mr-2" />
                Add Part
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => handleSort('name' as keyof Part)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  >
                    Part Name{' '}
                    {sortConfig.key === 'name' &&
                      (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('category' as keyof Part)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  >
                    Category{' '}
                    {sortConfig.key === 'category' &&
                      (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('stock' as keyof Part)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  >
                    Stock{' '}
                    {sortConfig.key === 'stock' &&
                      (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('price' as keyof Part)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  >
                    Price{' '}
                    {sortConfig.key === 'price' &&
                      (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort('lastOrdered' as keyof Part)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  >
                    Last Ordered{' '}
                    {sortConfig.key === 'lastOrdered' &&
                      (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {sortedData.map((item) => (
                    <motion.tr
                      key={item.id}
                      variants={fadeInUp as Variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      layout
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant={item.stock < 10 ? 'destructive' : 'default'}
                        >
                          {item.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.lastOrdered}</TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </motion.div>
    </div>
    </Layout>
  )
}
