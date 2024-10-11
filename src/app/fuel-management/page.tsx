'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select' // Assuming this is the structure for the Select component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from '@/components/Layout'
import { ChevronDown, Filter, Search, Settings, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

const fuelData = [
  {
    id: 1,
    vehicle: '2100. [2016 Ford F-150]',
    date: 'Wed, May. 2, 2024, :07am',
    usage: '56,362 mi',
    volume: '19.113 gallons',
    total: '$46.23',
    fuelEconomy: '13.45 mpg(US)',
    costPerMeter: '$0.18 / mile',
  },
  {
    id: 2,
    vehicle: '1100. [2018 Toyota Prius]',
    date: 'Tue, May. 21, 2024, 11:28pm',
    usage: '20,682 mi',
    volume: '7.010 gallons',
    total: '$17.26',
    fuelEconomy: '60.63 mpg(US)',
    costPerMeter: '$0.04 / mile',
  },
  {
    id: 3,
    vehicle: '2100. [2016 Ford F-150]',
    date: 'Sun, May. 19, 2024, 9:22pm',
    usage: '56,105 mi',
    volume: '18.371 gallons',
    total: '$45.82',
    fuelEconomy: '14.81 mpg(US)',
    costPerMeter: '$0.17 / mile',
  },
  {
    id: 4,
    vehicle: '3100. [2014 Chevrolet Express Cargo]',
    date: 'Sun, May. 19, 2024, 7:07am',
    usage: '136,654 mi',
    volume: '23.124 gallons',
    total: '$62.41',
    fuelEconomy: '18.77 mpg(US)',
    costPerMeter: '$0.14 / mile',
  },
]

const generateChartData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 1000) + 500,
  }))
}

interface ChartDataPoint {
  name: string
  value: number
}

interface CardWithChartProps {
  title: string
  value: string
  color: string
  initialData: ChartDataPoint[]
}

const cardColors = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-700',
    gradient: ['#3B82F6', '#93C5FD'],
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-700',
    gradient: ['#10B981', '#6EE7B7'],
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-700',
    gradient: ['#F59E0B', '#FCD34D'],
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-500',
    text: 'text-purple-700',
    gradient: ['#8B5CF6', '#C4B5FD'],
  },
}

const CardWithChart: React.FC<CardWithChartProps> = ({
  title,
  value,
  color,
  initialData,
}) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>(initialData)
  const [isHovered, setIsHovered] = useState(false)
  

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData: ChartDataPoint[]) => [
        ...prevData.slice(1),
        {
          name: `Day ${
            parseInt(prevData[prevData.length - 1].name.split(' ')[1]) + 1
          }`,
          value: Math.floor(Math.random() * 1000) + 500,
        },
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const colorSet = cardColors[color as keyof typeof cardColors]

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`${colorSet.bg} p-6 rounded-lg shadow-md border-l-4 ${colorSet.border}`}
    >
      <h2 className="text-sm text-gray-600 mb-2">{title}</h2>
      <p className={`text-2xl font-bold mb-4 ${colorSet.text}`}>{value}</p>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`color${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colorSet.gradient[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colorSet.gradient[1]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip />
            <XAxis dataKey="name" hide />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colorSet.gradient[0]}
              fillOpacity={1}
              fill={`url(#color${color})`}
              strokeWidth={2}
            >
              <animate attributeName="d" dur="0.3s" />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('fuel-management')
  return (
    <Layout activeMenuItem={activeMenuItem}>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-gray-50 rounded-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Fuel History</h1>
        <Button>Add Fuel Entry</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CardWithChart
          title="Total Fuel Cost"
          value="$2,631.35"
          color="blue"
          initialData={generateChartData()}
        />
        <CardWithChart
          title="Total Volume"
          value="977.08 gallons"
          color="green"
          initialData={generateChartData()}
        />
        <CardWithChart
          title="Avg. Fuel Economy"
          value="22.04 mpg (us)"
          color="yellow"
          initialData={generateChartData()}
        />
        <CardWithChart
          title="Avg. Cost"
          value="$2.69 / gallon"
          color="purple"
          initialData={generateChartData()}
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
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="pl-10 pr-10 py-2 w-full bg-white border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Updated Select component */}
          <Select defaultValue="vehicle">
            <SelectTrigger className="bg-white border-gray-300 rounded-md">
              Vehicle
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vehicle">Vehicle</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="group">
            <SelectTrigger className="bg-white border-gray-300 rounded-md">
              Vehicle Group
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="group">Vehicle Group</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="bg-white">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <Button variant="outline" className="bg-white">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Fuel Economy</TableHead>
            <TableHead>Cost per Meter</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fuelData.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.vehicle}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.usage}</TableCell>
              <TableCell>{entry.volume}</TableCell>
              <TableCell>{entry.total}</TableCell>
              <TableCell>{entry.fuelEconomy}</TableCell>
              <TableCell>{entry.costPerMeter}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
    </Layout>
  )
}