'use client'

import { Card, CardContent } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  BarChart,
  CheckCircle,
  FileText,
  MapPin,
  Shield,
  TrendingUp,
  Truck,
  UserCheck,
  XCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'

interface DataPoint {
  month: string
  value: number
}

interface DataPoint {
  month: string
  value: number
}

interface ChartDataPoint {
  month: string
  emergency: number
  nonScheduled: number
  scheduled: number
}

interface InsuranceDataPoint {
  month: string
  premium: number
  claims: number
}

export default function Page() {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard')
  const [activeTab, setActiveTab] = useState('all')
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{
    data: ChartDataPoint | InsuranceDataPoint
    index: number
    type: string
  } | null>(null)
  const [generalAnalysisData] = useState<DataPoint[]>([
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 59 },
    { month: 'Mar', value: 80 },
    { month: 'Apr', value: 71 },
    { month: 'May', value: 56 },
    { month: 'Jun', value: 55 },
    { month: 'Jul', value: 40 },
  ])

  const AnimatedGraph = ({ data }: { data: DataPoint[] }) => {
    return (
      <svg className="w-full h-64" viewBox="0 0 300 100">
        <defs>
          <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d={`M 0 ${100 - data[0].value} ${data
            .map(
              (point, i) =>
                `L ${(i / (data.length - 1)) * 300} ${100 - point.value}`
            )
            .join(' ')}`}
          fill="none"
          stroke="black"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.path
          d={`M 0 ${100 - data[0].value} ${data
            .map(
              (point, i) =>
                `L ${(i / (data.length - 1)) * 300} ${100 - point.value}`
            )
            .join(' ')} L 300 100 L 0 100`}
          fill="url(#graphGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        {data.map((point, i) => (
          <motion.circle
            key={i}
            cx={(i / (data.length - 1)) * 300}
            cy={100 - point.value}
            r="4"
            fill="black"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 + 2 }}
          />
        ))}
      </svg>
    )
  }

  const [criticalFaults, setCriticalFaults] = useState([
    {
      id: 1,
      vehicle: 'Truck 001',
      fault: 'Engine Overheating',
      urgency: 'high',
      progress: 75,
    },
    {
      id: 2,
      vehicle: 'Van 003',
      fault: 'Brake System Failure',
      urgency: 'critical',
      progress: 30,
    },
    {
      id: 3,
      vehicle: 'Car 005',
      fault: 'Transmission Issues',
      urgency: 'medium',
      progress: 50,
    },
  ])

  const [vehicleAssignments, setVehicleAssignments] = useState([
    { status: 'Active', count: 8, color: 'bg-green-500 text-white' },
    { status: 'Inactive', count: 3, color: 'bg-gray-500 text-white' },
    { status: 'In Shop', count: 2, color: 'bg-yellow-500 text-white' },
    { status: 'Out of Service', count: 1, color: 'bg-red-500 text-white' },
  ])

  const [vehicleLocations, setVehicleLocations] = useState([
    {
      id: 1,
      name: 'Truck 001',
      location: 'Warehouse A',
      status: 'On Time',
      eta: '2 hours',
    },
    {
      id: 2,
      name: 'Van 002',
      location: 'City Center',
      status: 'Delayed',
      eta: '45 minutes',
    },
    {
      id: 3,
      name: 'Car 003',
      location: 'Airport',
      status: 'On Time',
      eta: '30 minutes',
    },
  ])

  const [insuranceData, setInsuranceData] = useState([
    { month: 'Jan', premium: 5000, claims: 2000 },
    { month: 'Feb', premium: 5200, claims: 1800 },
    { month: 'Mar', premium: 5100, claims: 2200 },
    { month: 'Apr', premium: 5300, claims: 1900 },
    { month: 'May', premium: 5400, claims: 2100 },
    { month: 'Jun', premium: 5600, claims: 1700 },
  ])

  const [driversData, setDriversData] = useState([
    {
      name: 'John Doe',
      performance: 92,
      status: 'Active',
      licenseValid: true,
      licenseExpiry: '2024-12-31',
    },
    {
      name: 'Jane Smith',
      performance: 88,
      status: 'Active',
      licenseValid: true,
      licenseExpiry: '2023-11-30',
    },
    {
      name: 'Mike Johnson',
      performance: 95,
      status: 'On Leave',
      licenseValid: true,
      licenseExpiry: '2025-06-30',
    },
    {
      name: 'Sarah Williams',
      performance: 90,
      status: 'Active',
      licenseValid: false,
      licenseExpiry: '2023-05-15',
    },
  ])

  const chartData = [
    { month: 'Dec', emergency: 20, nonScheduled: 30, scheduled: 50 },
    { month: 'Jan', emergency: 25, nonScheduled: 35, scheduled: 40 },
    { month: 'Feb', emergency: 15, nonScheduled: 40, scheduled: 45 },
    { month: 'Mar', emergency: 30, nonScheduled: 25, scheduled: 45 },
    { month: 'Apr', emergency: 20, nonScheduled: 30, scheduled: 50 },
    { month: 'May', emergency: 10, nonScheduled: 45, scheduled: 45 },
  ]

  const overdueReminders = [4, 6, 3, 5, 7, 2]

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicleAssignments((prev) =>
        prev.map((item) => ({
          ...item,
          count: Math.floor(Math.random() * 10) + 1,
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleDataPointHover = (
    data: ChartDataPoint | InsuranceDataPoint,
    index: number,
    type: string
  ) => {
    setHoveredDataPoint({ data, index, type })
  }

  const handleDataPointLeave = () => {
    setHoveredDataPoint(null)
  }

  return (
    <Layout activeMenuItem={activeMenuItem}  >
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Fleet Dashboard</h1>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${activeTab === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:bg-blue-100'
                }`}
              onClick={() => setActiveTab('all')}
            >
              All Groups
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${activeTab === 'compact'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:bg-blue-100'
                }`}
              onClick={() => setActiveTab('compact')}
            >
              Compact
            </button>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <motion.div
            className="w-full px-4 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <BarChart className="w-6 h-6 mr-2 text-blue-500" />
                  Repair Priority Class Trends
                </h2>
                <div className="w-full h-64 relative">
                  <svg width="100%" height="100%" viewBox="0 0 600 240">
                    {/* Y-axis */}
                    <line x1="40" y1="20" x2="40" y2="220" stroke="#e5e7eb" />
                    <text x="10" y="25" fontSize="12" fill="#6b7280">
                      100%
                    </text>
                    <text x="10" y="220" fontSize="12" fill="#6b7280">
                      0%
                    </text>

                    {/* X-axis */}
                    <line x1="40" y1="220" x2="580" y2="220" stroke="#e5e7eb" />

                    {/* Data lines */}
                    {['emergency', 'nonScheduled', 'scheduled'].map(
                      (key, lineIndex) => (
                        <motion.path
                          key={key}
                          d={chartData
                            .map((point, index) => {
                              const x =
                                40 + (540 / (chartData.length - 1)) * index
                              const y =
                                220 -
                                ((point[key as keyof typeof point] as number) /
                                  100) *
                                200
                              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
                            })
                            .join(' ')}
                          fill="none"
                          stroke={['#ef4444', '#f59e0b', '#3b82f6'][lineIndex]}
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: 'easeInOut' }}
                        />
                      )
                    )}

                    {/* Data points */}
                    {chartData.map((point, index) => (
                      <g key={point.month}>
                        {['emergency', 'nonScheduled', 'scheduled'].map(
                          (key, dotIndex) => (
                            <motion.circle
                              key={`${point.month}-${key}`}
                              cx={40 + (540 / (chartData.length - 1)) * index}
                              cy={
                                220 -
                                ((point[key as keyof typeof point] as number) /
                                  100) *
                                200
                              }
                              r="4"
                              fill={['#ef4444', '#f59e0b', '#3b82f6'][dotIndex]}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                duration: 0.5,
                                delay: 2 + index * 0.1 + dotIndex * 0.5,
                              }}
                              onMouseEnter={() =>
                                handleDataPointHover(point, index, key)
                              }
                              onMouseLeave={handleDataPointLeave}
                            />
                          )
                        )}
                        <text
                          x={40 + (540 / (chartData.length - 1)) * index}
                          y="235"
                          fontSize="12"
                          fill="#6b7280"
                          textAnchor="middle"
                        >
                          {point.month}
                        </text>
                      </g>
                    ))}
                  </svg>
                  {hoveredDataPoint && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bg-white p-2 rounded shadow-lg text-sm"
                      style={{
                        left: `${40 +
                          (540 / (chartData.length - 1)) * hoveredDataPoint.index
                          }px`,
                        top: `${220 -
                          ((
                            hoveredDataPoint.data as unknown as Record<
                              string,
                              number
                            >
                          )[hoveredDataPoint.type] /
                            100) *
                          200
                          }px`,
                        transform: 'translate(-50%, -100%)',
                      }}
                    >
                      <p className="font-semibold">
                        {(hoveredDataPoint.data as { month: string }).month}
                      </p>
                      <p>
                        {hoveredDataPoint.type}:{' '}
                        {
                          (
                            hoveredDataPoint.data as unknown as Record<
                              string,
                              number
                            >
                          )[hoveredDataPoint.type]
                        }
                        %
                      </p>
                    </motion.div>
                  )}
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm">Emergency</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm">Non-Scheduled</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Scheduled</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-yellow-500" />
                  Service Reminders
                </h2>
                <div className="flex justify-around mb-4">
                  <div className="text-center">
                    <motion.p
                      className="text-4xl font-bold text-red-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                    >
                      3
                    </motion.p>
                    <p className="text-sm text-gray-500">Overdue</p>
                  </div>
                  <div className="text-center">
                    <motion.p
                      className="text-4xl font-bold text-yellow-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
                    >
                      2
                    </motion.p>
                    <p className="text-sm text-gray-500">Due Soon</p>
                  </div>
                </div>
                <div className="h-32">
                  <svg width="100%" height="100%" viewBox="0 0 300 100">
                    {overdueReminders.map((value, index) => (
                      <motion.rect
                        key={index}
                        x={index * 50 + 10}
                        y={100 - value * 10}
                        width="30"
                        height={value * 10}
                        fill="#ef4444"
                        initial={{ height: 0, y: 100 }}
                        animate={{ height: value * 10, y: 100 - value * 10 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    ))}
                  </svg>
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  Overdue Reminders Trend (4+ days)
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-orange-500" />
                  Open Issues
                </h2>
                <div className="flex justify-around">
                  <div className="text-center">
                    <motion.p
                      className="text-4xl font-bold text-orange-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                    >
                      5
                    </motion.p>
                    <p className="text-sm text-gray-500">Overdue</p>
                  </div>
                  <div className="text-center">
                    <motion.p
                      className="text-4xl font-bold text-blue-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
                    >
                      2
                    </motion.p>
                    <p className="text-sm text-gray-500">Due Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Truck className="w-6 h-6 mr-2 text-green-500" />
                  Vehicle Assignments
                </h2>
                <div className="space-y-2">
                  <AnimatePresence>
                    {vehicleAssignments.map((item, index) => (
                      <motion.div
                        key={item.status}
                        className="flex justify-between items-center"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span>{item.status}</span>
                        <motion.span
                          className={`px-2 py-1 rounded ${item.color}`}
                          key={item.count}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.count}
                        </motion.span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="shadow-lg h-full overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-blue-500" />
                  Vehicle Location
                </h2>
                <div className="space-y-4">
                  {vehicleLocations.map((vehicle) => (
                    <motion.div
                      key={vehicle.id}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-indigo-700">
                          {vehicle.name}
                        </span>
                        <span
                          className={`text-sm px-2 py-1 rounded ${vehicle.status === 'On Time'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {vehicle.status}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                        <span className="text-sm">{vehicle.location}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        ETA: {vehicle.eta}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
                  Critical Faults
                </h2>
                <div className="space-y-4">
                  {criticalFaults.map((fault) => (
                    <motion.div
                      key={fault.id}
                      className="bg-white p-4 rounded-lg shadow-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-2">
                        <AlertTriangle
                          className={`w-5 h-5 mr-2 ${fault.urgency === 'critical'
                              ? 'text-red-500'
                              : fault.urgency === 'high'
                                ? 'text-orange-500'
                                : 'text-yellow-500'
                            }`}
                        />
                        <span className="font-medium">{fault.vehicle}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{fault.fault}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div
                          className={`h-2.5 rounded-full ${fault.urgency === 'critical'
                              ? 'bg-red-500'
                              : fault.urgency === 'high'
                                ? 'bg-orange-500'
                                : 'bg-yellow-500'
                            }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${fault.progress}%` }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-indigo-500" />
                  Fleet Insurance
                </h2>
                <div className="w-full h-64 relative">
                  <svg width="100%" height="100%" viewBox="0 0 300 200">
                    {/* Y-axis */}
                    <line x1="40" y1="20" x2="40" y2="180" stroke="#e5e7eb" />
                    <text x="10" y="25" fontSize="12" fill="#6b7280">
                      6000
                    </text>
                    <text x="10" y="180" fontSize="12" fill="#6b7280">
                      0
                    </text>

                    {/* X-axis */}
                    <line x1="40" y1="180" x2="290" y2="180" stroke="#e5e7eb" />

                    {/* Data lines */}
                    {['premium', 'claims'].map((key, lineIndex) => (
                      <motion.path
                        key={key}
                        d={insuranceData
                          .map((point, index) => {
                            const x =
                              40 + (250 / (insuranceData.length - 1)) * index
                            const y =
                              180 -
                              ((point[key as keyof typeof point] as number) /
                                60) *
                              160
                            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
                          })
                          .join(' ')}
                        fill="none"
                        stroke={lineIndex === 0 ? '#818cf8' : '#f87171'}
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                      />
                    ))}

                    {/* Data points */}
                    {insuranceData.map((point, index) => (
                      <g key={point.month}>
                        {['premium', 'claims'].map((key, dotIndex) => (
                          <motion.circle
                            key={`${point.month}-${key}`}
                            cx={40 + (250 / (insuranceData.length - 1)) * index}
                            cy={
                              180 -
                              (Number(point[key as keyof typeof point]) / 60) *
                              160
                            }
                            r="4"
                            fill={dotIndex === 0 ? '#818cf8' : '#f87171'}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              duration: 0.5,
                              delay: 2 + index * 0.1 + dotIndex * 0.5,
                            }}
                            onMouseEnter={() =>
                              handleDataPointHover(point, index, key)
                            }
                            onMouseLeave={handleDataPointLeave}
                          />
                        ))}
                        <text
                          x={40 + (250 / (insuranceData.length - 1)) * index}
                          y="195"
                          fontSize="12"
                          fill="#6b7280"
                          textAnchor="middle"
                        >
                          {point.month}
                        </text>
                      </g>
                    ))}
                  </svg>
                  {hoveredDataPoint && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bg-white p-2 rounded shadow-lg text-sm"
                      style={{
                        left: `${40 +
                          (250 / (insuranceData.length - 1)) *
                          hoveredDataPoint.index
                          }px`,
                        top: `${180 -
                          ((
                            hoveredDataPoint.data as unknown as Record<
                              string,
                              number
                            >
                          )[hoveredDataPoint.type] /
                            60) *
                          160
                          }px`,
                        transform: 'translate(-50%, -100%)',
                      }}
                    >
                      <p className="font-semibold">
                        {(hoveredDataPoint.data as { month: string }).month}
                      </p>
                      <p>
                        {hoveredDataPoint.type}: $
                        {
                          (
                            hoveredDataPoint.data as unknown as Record<
                              string,
                              number
                            >
                          )[hoveredDataPoint.type]
                        }
                      </p>
                    </motion.div>
                  )}
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full mr-2"></div>
                    <span className="text-sm">Premium</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                    <span className="text-sm">Claims</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 px-4 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-gray-800" />
                  General Fleet Performance Analysis
                </h2>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-inner">
                  <AnimatedGraph data={generalAnalysisData} />
                  <div className="mt-4 flex justify-between">
                    {generalAnalysisData.map((point, index) => (
                      <div key={index} className="text-center">
                        <motion.div
                          className="text-sm font-semibold text-gray-700"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 2.5 }}
                        >
                          {point.value}%
                        </motion.div>
                        <motion.div
                          className="text-xs text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 3 }}
                        >
                          {point.month}
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    The graph above shows the overall fleet performance trend over
                    the past 7 months. A higher percentage indicates better
                    overall efficiency and fewer issues.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 px-4 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <UserCheck className="w-6 h-6 mr-2 text-teal-500" />
                  Driver Performance
                </h2>
                <div className="space-y-4">
                  {driversData.map((driver, index) => (
                    <motion.div
                      key={driver.name}
                      className="bg-white p-4 rounded-lg shadow-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{driver.name}</span>
                        <span
                          className={`text-sm px-2 py-1 rounded ${driver.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {driver.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <motion.div
                          className="h-2.5 rounded-full bg-teal-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${driver.performance}%` }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        ></motion.div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          {driver.performance}% Performance
                        </span>
                        <span
                          className={`flex items-center ${driver.licenseValid
                              ? 'text-green-600'
                              : 'text-red-600'
                            }`}
                        >
                          {driver.licenseValid ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Valid until {driver.licenseExpiry}
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 mr-1" />
                              Expired on {driver.licenseExpiry}
                            </>
                          )}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
