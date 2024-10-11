'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  Car,
  Truck,
  Bus,
  Bike, // Replace Motorcycle with Bike
  Battery,
  Fuel,
  Calendar,
  Wrench, // Changed from Tool to Wrench
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

interface Vehicle {
  id: number;
  name: string;
  type: string;
  status: string;
  driver: string;
  fuelLevel: number;
  batteryHealth: number;
  lastMaintenance: string;
  nextService: string;
}

const vehicles = [
  {
    id: 1,
    name: 'Truck 101',
    type: 'Truck',
    status: 'Available',
    driver: 'John Doe',
    fuelLevel: 75,
    batteryHealth: 90,
    lastMaintenance: '2024-05-15',
    nextService: '2024-06-15',
  },
  {
    id: 2,
    name: 'Van 203',
    type: 'Van',
    status: 'In Use',
    driver: 'Jane Smith',
    fuelLevel: 45,
    batteryHealth: 85,
    lastMaintenance: '2024-05-10',
    nextService: '2024-06-10',
  },
  {
    id: 3,
    name: 'Car 305',
    type: 'Car',
    status: 'Maintenance',
    driver: 'Mike Johnson',
    fuelLevel: 60,
    batteryHealth: 75,
    lastMaintenance: '2024-05-20',
    nextService: '2024-06-20',
  },
  {
    id: 4,
    name: 'Bus 401',
    type: 'Bus',
    status: 'Available',
    driver: 'Sarah Brown',
    fuelLevel: 80,
    batteryHealth: 95,
    lastMaintenance: '2024-05-18',
    nextService: '2024-06-18',
  },
  {
    id: 5,
    name: 'Motorcycle 501',
    type: 'Motorcycle',
    status: 'In Use',
    driver: 'Chris Lee',
    fuelLevel: 30,
    batteryHealth: 88,
    lastMaintenance: '2024-05-12',
    nextService: '2024-06-12',
  },
]

const vehicleIcons = {
  Car: Car,
  Truck: Truck,
  Van: Truck,
  Bus: Bus,
  Motorcycle: Bike,
}

const statusColors: { [key: string]: string } = {
  Available: 'bg-green-500',
  'In Use': 'bg-blue-500',
  Maintenance: 'bg-yellow-500',
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const VehicleIcon = vehicleIcons[vehicle.type as keyof typeof vehicleIcons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{vehicle.name}</h3>
          <p className="text-sm text-gray-600">{vehicle.driver}</p>
        </div>
        <div
          className={`${
            statusColors[vehicle.status as keyof typeof statusColors] || 'bg-gray-500'
          } text-white px-3 py-1 rounded-full text-sm`}
        >
          {vehicle.status}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Fuel Level</p>
          <Progress value={vehicle.fuelLevel} className="h-2" />
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Battery Health</p>
          <Progress value={vehicle.batteryHealth} className="h-2" />
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          Last: {vehicle.lastMaintenance}
        </div>
        <div className="flex items-center">
          <Wrench className="w-4 h-4 mr-1" />
          Next: {vehicle.nextService}
        </div>
      </div>
      <VehicleIcon className="absolute right-2 bottom-2 w-16 h-16 text-gray-200 opacity-50" />
    </motion.div>
  )
}

const VehicleList: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <AnimatePresence>
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </AnimatePresence>
  </div>
)

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${color}-500 flex items-center`}
  >
    <Icon className={`w-12 h-12 text-${color}-500 mr-4`} />
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </motion.div>
)

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [activeMenuItem, setActiveMenuItem] = useState('vehicle-management')

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      (vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'All' || vehicle.status === statusFilter) &&
      (typeFilter === 'All' || vehicle.type === typeFilter)
  )

  return (
    <Layout activeMenuItem={activeMenuItem}>
       <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Vehicle Management
          </h1>
          <Button>
            <Plus className="w-5 h-5 mr-2" /> Add Vehicle
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Vehicles"
            value={vehicles.length}
            icon={Car}
            color="blue"
          />
          <StatCard
            title="Available"
            value={vehicles.filter((v) => v.status === 'Available').length}
            icon={Truck}
            color="green"
          />
          <StatCard
            title="In Use"
            value={vehicles.filter((v) => v.status === 'In Use').length}
            icon={Bus}
            color="yellow"
          />
          <StatCard
            title="In Maintenance"
            value={vehicles.filter((v) => v.status === 'Maintenance').length}
            icon={Wrench} // Changed from Tool to Wrench
            color="red"
          />
        </div>

        <Tabs defaultValue="grid" className="mb-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          <TabsContent value="grid">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <Input
                    placeholder="Search vehicles"
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
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="In Use">In Use</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
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
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Truck">Truck</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                    <SelectItem value="Bus">Bus</SelectItem>
                    <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="bg-white">
                <Filter className="w-4 h-4 mr-2" /> More Filters
              </Button>
            </div>

            <VehicleList vehicles={filteredVehicles} />

            {filteredVehicles.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <p className="text-gray-600 text-lg">
                  No vehicles found matching your criteria.
                </p>
              </motion.div>
            )}

            {filteredVehicles.length > 0 &&
              filteredVehicles.length < vehicles.length && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="bg-white">
                    Load More <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
          </TabsContent>
          <TabsContent value="list">List view coming soon...</TabsContent>
          <TabsContent value="map">Map view coming soon...</TabsContent>
        </Tabs>
      </div>
    </div>
    </Layout>
  )
}
