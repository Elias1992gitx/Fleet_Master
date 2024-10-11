'use client'

import { useState, useEffect } from 'react'
import { Variants } from 'framer-motion'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '@/components/Layout'
import {
  Search,
  Filter,
  Plus,
  Settings,
  BarChart2,
  RefreshCcw,
  Battery,
  AlertTriangle,
  Calendar,
  Zap,
  Clock,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { Progress } from '@/components/ui/progress'

const equipmentData = [
  {
    id: 1,
    name: 'Excavator XL2000',
    status: 'Operational',
    lastMaintenance: '2024-05-01',
    nextMaintenance: '2024-08-01',
    utilization: 85,
    health: 92,
  },
  {
    id: 2,
    name: 'Forklift F100',
    status: 'Under Maintenance',
    lastMaintenance: '2024-05-10',
    nextMaintenance: '2024-05-17',
    utilization: 0,
    health: 60,
  },
  {
    id: 3,
    name: 'Crane C500',
    status: 'Operational',
    lastMaintenance: '2024-04-15',
    nextMaintenance: '2024-07-15',
    utilization: 72,
    health: 88,
  },
  {
    id: 4,
    name: 'Bulldozer B2000',
    status: 'Idle',
    lastMaintenance: '2024-05-05',
    nextMaintenance: '2024-08-05',
    utilization: 45,
    health: 95,
  },
  {
    id: 5,
    name: 'Generator G1000',
    status: 'Operational',
    lastMaintenance: '2024-04-20',
    nextMaintenance: '2024-07-20',
    utilization: 98,
    health: 78,
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

type SortKey = keyof typeof equipmentData[0] | null;

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeMenuItem, setActiveMenuItem] = useState('equipment-management')
  const [filteredData, setFilteredData] = useState(equipmentData)
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' }>({
    key: null,
    direction: 'ascending',
  })
  const [activeStatus, setActiveStatus] = useState('All')

  useEffect(() => {
    const filtered = equipmentData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeStatus === 'All' || item.status === activeStatus)
    )
    setFilteredData(filtered)
  }, [searchTerm, activeStatus])

  const handleSort = (key: keyof typeof equipmentData[0]) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === null) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const statuses = ['All', 'Operational', 'Under Maintenance', 'Idle']

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Operational':
        return <Zap className="h-5 w-5 text-green-500" />
      case 'Under Maintenance':
        return <Wrench className="h-5 w-5 text-yellow-500" />
      case 'Idle':
        return <Clock className="h-5 w-5 text-gray-500" />
      default:
        return null
    }
  }

  return (

    <Layout activeMenuItem={activeMenuItem}  >
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
                Equipment Management
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
                      Total Equipment
                    </CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">
                      Across 5 categories
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div whileHover={pulse}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Utilization
                    </CardTitle>
                    <Battery className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                    <Progress value={78} className="mt-2" />
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div whileHover={pulse}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Upcoming Maintenance
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">Next 30 days</p>
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
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full md:w-64 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <motion.div
                    key={status}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant={activeStatus === status ? 'default' : 'outline'}
                      className="cursor-pointer transition-colors duration-300"
                      onClick={() => setActiveStatus(status)}
                    >
                      {status}
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
                    <SelectItem value="heavy">Heavy Equipment</SelectItem>
                    <SelectItem value="light">Light Equipment</SelectItem>
                    <SelectItem value="power">Power Tools</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Equipment
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
                      onClick={() => handleSort('name')}
                      className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                    >
                      Equipment Name{' '}
                      {sortConfig.key === 'name' &&
                        (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort('status')}
                      className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                    >
                      Status{' '}
                      {sortConfig.key === 'status' &&
                        (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort('lastMaintenance')}
                      className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                    >
                      Last Maintenance{' '}
                      {sortConfig.key === 'lastMaintenance' &&
                        (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort('nextMaintenance')}
                      className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                    >
                      Next Maintenance{' '}
                      {sortConfig.key === 'nextMaintenance' &&
                        (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort('utilization')}
                      className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                    >
                      Utilization{' '}
                      {sortConfig.key === 'utilization' &&
                        (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort('health')}
                      className="cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                    >
                      Health{' '}
                      {sortConfig.key === 'health' &&
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
                        <TableCell>
                          <div className="flex items-center">
                            {getStatusIcon(item.status)}
                            <span className="ml-2">{item.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.lastMaintenance}</TableCell>
                        <TableCell>{item.nextMaintenance}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">{item.utilization}%</span>
                            <Progress value={item.utilization} className="w-24" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">{item.health}%</span>
                            <Progress value={item.health} className="w-24" />
                          </div>
                        </TableCell>
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






// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Variants } from 'framer-motion'
// import {
//   Search,
//   Plus,
//   Filter,
//   ChevronDown,
//   Tool,
//   Truck,
//   Wrench,
//   Battery,
//   Zap,
//   Calendar,
//   AlertTriangle,
//   BarChart,
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Select } from '@/components/ui/select'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Progress } from '@/components/ui/progress'

// const equipment = [
//   {
//     id: 1,
//     name: 'Forklift 101',
//     type: 'Forklift',
//     status: 'Operational',
//     operator: 'John Doe',
//     batteryLevel: 75,
//     maintenanceHealth: 90,
//     lastInspection: '2024-05-15',
//     nextService: '2024-06-15',
//     utilization: 82,
//   },
//   {
//     id: 2,
//     name: 'Crane 203',
//     type: 'Crane',
//     status: 'In Use',
//     operator: 'Jane Smith',
//     batteryLevel: 45,
//     maintenanceHealth: 85,
//     lastInspection: '2024-05-10',
//     nextService: '2024-06-10',
//     utilization: 95,
//   },
//   {
//     id: 3,
//     name: 'Generator 305',
//     type: 'Generator',
//     status: 'Maintenance',
//     operator: 'Mike Johnson',
//     fuelLevel: 60,
//     maintenanceHealth: 75,
//     lastInspection: '2024-05-20',
//     nextService: '2024-06-20',
//     utilization: 0,
//   },
//   {
//     id: 4,
//     name: 'Excavator 401',
//     type: 'Excavator',
//     status: 'Operational',
//     operator: 'Sarah Brown',
//     fuelLevel: 80,
//     maintenanceHealth: 95,
//     lastInspection: '2024-05-18',
//     nextService: '2024-06-18',
//     utilization: 78,
//   },
//   {
//     id: 5,
//     name: 'Conveyor 501',
//     type: 'Conveyor',
//     status: 'In Use',
//     operator: 'Chris Lee',
//     powerUsage: 30,
//     maintenanceHealth: 88,
//     lastInspection: '2024-05-12',
//     nextService: '2024-06-12',
//     utilization: 100,
//   },
// ]

// const equipmentIcons = {
//   Forklift: Truck,
//   Crane: Tool,
//   Generator: Zap,
//   Excavator: Tool,
//   Conveyor: ChevronDown,
// }

// const statusColors = {
//   Operational: 'bg-green-500',
//   'In Use': 'bg-blue-500',
//   Maintenance: 'bg-yellow-500',
// }

// const EquipmentCard = ({ equipment }) => {
//   const EquipmentIcon = equipmentIcons[equipment.type]
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden"
//     >
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-lg font-semibold mb-1">{equipment.name}</h3>
//           <p className="text-sm text-gray-600">{equipment.operator}</p>
//         </div>
//         <div
//           className={`${
//             statusColors[equipment.status]
//           } text-white px-3 py-1 rounded-full text-sm`}
//         >
//           {equipment.status}
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <p className="text-sm text-gray-600 mb-1">
//             {equipment.batteryLevel !== undefined
//               ? 'Battery Level'
//               : 'Fuel Level'}
//           </p>
//           <Progress
//             value={
//               equipment.batteryLevel ||
//               equipment.fuelLevel ||
//               equipment.powerUsage
//             }
//             className="h-2"
//           />
//         </div>
//         <div>
//           <p className="text-sm text-gray-600 mb-1">Maintenance Health</p>
//           <Progress value={equipment.maintenanceHealth} className="h-2" />
//         </div>
//       </div>
//       <div className="flex justify-between text-sm text-gray-600">
//         <div className="flex items-center">
//           <Calendar className="w-4 h-4 mr-1" />
//           Last: {equipment.lastInspection}
//         </div>
//         <div className="flex items-center">
//           <Wrench className="w-4 h-4 mr-1" />
//           Next: {equipment.nextService}
//         </div>
//       </div>
//       <div className="mt-4 flex items-center justify-between text-sm">
//         <span className="text-gray-600">Utilization</span>
//         <span className="font-semibold">{equipment.utilization}%</span>
//       </div>
//       <Progress value={equipment.utilization} className="h-1 mt-1" />
//       <EquipmentIcon className="absolute right-2 bottom-2 w-16 h-16 text-gray-200 opacity-50" />
//     </motion.div>
//   )
// }

// const EquipmentList = ({ equipment }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     <AnimatePresence>
//       {equipment.map((item) => (
//         <EquipmentCard key={item.id} equipment={item} />
//       ))}
//     </AnimatePresence>
//   </div>
// )

// const StatCard = ({ title, value, icon: Icon, color }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${color}-500 flex items-center`}
//   >
//     <Icon className={`w-12 h-12 text-${color}-500 mr-4`} />
//     <div>
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//   </motion.div>
// )

// export default function Component() {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('All')
//   const [typeFilter, setTypeFilter] = useState('All')

//   const filteredEquipment = equipment.filter(
//     (item) =>
//       (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.operator.toLowerCase().includes(searchTerm.toLowerCase())) &&
//       (statusFilter === 'All' || item.status === statusFilter) &&
//       (typeFilter === 'All' || item.type === typeFilter)
//   )

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Equipment Management
//           </h1>
//           <Button>
//             <Plus className="w-5 h-5 mr-2" /> Add Equipment
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Equipment"
//             value={equipment.length}
//             icon={Tool}
//             color="blue"
//           />
//           <StatCard
//             title="Operational"
//             value={equipment.filter((e) => e.status === 'Operational').length}
//             icon={Zap}
//             color="green"
//           />
//           <StatCard
//             title="In Use"
//             value={equipment.filter((e) => e.status === 'In Use').length}
//             icon={BarChart}
//             color="yellow"
//           />
//           <StatCard
//             title="In Maintenance"
//             value={equipment.filter((e) => e.status === 'Maintenance').length}
//             icon={Wrench}
//             color="red"
//           />
//         </div>

//         <Tabs defaultValue="grid" className="mb-6">
//           <TabsList>
//             <TabsTrigger value="grid">Grid View</TabsTrigger>
//             <TabsTrigger value="list">List View</TabsTrigger>
//             <TabsTrigger value="calendar">Calendar View</TabsTrigger>
//           </TabsList>
//           <TabsContent value="grid">
//             <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//               <div className="flex items-center gap-4 w-full sm:w-auto">
//                 <div className="relative flex-grow sm:flex-grow-0">
//                   <Input
//                     placeholder="Search equipment"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md"
//                   />
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 </div>
//                 <Select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="bg-white border-gray-300 rounded-md"
//                 >
//                   <option value="All">All Statuses</option>
//                   <option value="Operational">Operational</option>
//                   <option value="In Use">In Use</option>
//                   <option value="Maintenance">Maintenance</option>
//                 </Select>
//                 <Select
//                   value={typeFilter}
//                   onChange={(e) => setTypeFilter(e.target.value)}
//                   className="bg-white border-gray-300 rounded-md"
//                 >
//                   <option value="All">All Types</option>
//                   <option value="Forklift">Forklift</option>
//                   <option value="Crane">Crane</option>
//                   <option value="Generator">Generator</option>
//                   <option value="Excavator">Excavator</option>
//                   <option value="Conveyor">Conveyor</option>
//                 </Select>
//               </div>
//               <Button variant="outline" className="bg-white">
//                 <Filter className="w-4 h-4 mr-2" /> More Filters
//               </Button>
//             </div>

//             <EquipmentList equipment={filteredEquipment} />

//             {filteredEquipment.length === 0 && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-center py-12"
//               >
//                 <p className="text-gray-600 text-lg">
//                   No equipment found matching your criteria.
//                 </p>
//               </motion.div>
//             )}

//             {filteredEquipment.length > 0 &&
//               filteredEquipment.length < equipment.length && (
//                 <div className="mt-8 flex justify-center">
//                   <Button variant="outline" className="bg-white">
//                     Load More <ChevronDown className="w-4 h-4 ml-2" />
//                   </Button>
//                 </div>
//               )}
//           </TabsContent>
//           <TabsContent value="list">List view coming soon...</TabsContent>
//           <TabsContent value="calendar">
//             Calendar view coming soon...
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }