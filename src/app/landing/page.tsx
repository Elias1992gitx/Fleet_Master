'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  BarChart2,
  Battery,
  ChevronRight,
  Clock,
  MapPin,
  Menu,
  Moon,
  Quote,
  Sun,
  Truck,
  Wifi,
  Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const Sprinkle = ({
  delay,
  isDarkMode,
}: {
  delay: number
  isDarkMode: boolean
}) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: [0.7, 0],
      scale: [0, 1],
      y: ['0%', '100%'],
      transition: {
        duration: Math.random() * 2 + 1,
        delay: delay,
        ease: 'easeOut',
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1,
      },
    })
  }, [controls, delay])

  return (
    <motion.div
      className={`absolute w-1 h-1 ${
        isDarkMode ? 'bg-white' : 'bg-blue-500'
      } rounded-full`}
      style={{
        left: `${Math.random() * 100}%`,
        top: '-5%',
      }}
      animate={controls}
    />
  )
}

export default function LandingPage() {
  const controls = useAnimation()
  const [email, setEmail] = useState('')
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])
  const [sprinkles, setSprinkles] = useState<number[]>([])
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    setSprinkles(Array.from({ length: 50 }, (_, i) => i))
  }, [])

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    })
  }, [controls])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'
      } overflow-hidden transition-colors duration-300`}
    >
      <FancyHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: isDarkMode
              ? [
                  'linear-gradient(45deg, rgba(255,0,255,0.7), rgba(0,255,255,0.7))',
                  'linear-gradient(45deg, rgba(255,0,255,0.7), rgba(255,255,0,0.7))',
                  'linear-gradient(45deg, rgba(0,255,255,0.7), rgba(255,255,0,0.7))',
                  'linear-gradient(45deg, rgba(255,0,255,0.7), rgba(0,255,255,0.7))',
                ]
              : [
                  'linear-gradient(45deg, rgba(100,149,237,0.3), rgba(0,191,255,0.3))',
                  'linear-gradient(45deg, rgba(100,149,237,0.3), rgba(135,206,250,0.3))',
                  'linear-gradient(45deg, rgba(0,191,255,0.3), rgba(135,206,250,0.3))',
                  'linear-gradient(45deg, rgba(100,149,237,0.3), rgba(0,191,255,0.3))',
                ],
          }}
          transition={{
            duration: 10,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
        <div
          className={`absolute inset-0 z-10 backdrop-filter backdrop-blur-sm ${
            isDarkMode ? 'bg-black bg-opacity-30' : 'bg-white bg-opacity-30'
          }`}
        />
        <motion.div
          className={`absolute inset-0 z-20 ${
            isDarkMode
              ? 'bg-gradient-to-r from-purple-400/30 to-pink-600/30'
              : 'bg-gradient-to-r from-blue-400/30 to-cyan-600/30'
          }`}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
        {sprinkles.map((_, index) => (
          <Sprinkle
            key={index}
            delay={Math.random() * 2}
            isDarkMode={isDarkMode}
          />
        ))}
        <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className={`text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              Fleet Management Reimagined
            </motion.h1>
            <motion.p
              className={`text-xl sm:text-2xl md:text-3xl mb-8 max-w-3xl mx-auto ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Revolutionize your fleet operations with cutting-edge technology
            </motion.p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className={`${
                  isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors duration-300`}
                onClick={() => (window.location.href = '/dashboard')}
              >
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="absolute inset-0 z-40 pointer-events-none"
          animate={{
            background: [
              `radial-gradient(circle, ${
                isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
              } 0%, ${
                isDarkMode ? 'rgba(255,255,255,0)' : 'rgba(0,0,0,0)'
              } 50%)`,
              `radial-gradient(circle, ${
                isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
              } 0%, ${
                isDarkMode ? 'rgba(255,255,255,0)' : 'rgba(0,0,0,0)'
              } 50%)`,
              `radial-gradient(circle, ${
                isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
              } 0%, ${
                isDarkMode ? 'rgba(255,255,255,0)' : 'rgba(0,0,0,0)'
              } 50%)`,
            ],
          }}
          transition={{
            duration: 5,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      </section>

      {/* Features Section */}
      <section
        className={`py-20 px-4 relative overflow-hidden ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="h-12 w-12" />,
                title: 'Real-time Tracking',
                description:
                  "Monitor your fleet's location and status in real-time",
              },
              {
                icon: <BarChart2 className="h-12 w-12" />,
                title: 'Performance Analytics',
                description:
                  "Gain insights to optimize your fleet's efficiency",
              },
              {
                icon: <Clock className="h-12 w-12" />,
                title: 'Maintenance Scheduling',
                description: 'Automate maintenance to reduce downtime',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card
                  className={`${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  } overflow-hidden`}
                >
                  <CardContent className="p-6">
                    <motion.div
                      className={`absolute inset-0 ${
                        isDarkMode
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                          : 'bg-gradient-to-br from-blue-400 to-cyan-500'
                      } opacity-0`}
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className={`mb-4 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    >
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section
        className={`py-20 px-4 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
        } relative overflow-hidden`}
      >
        <GlobeAnimation isDarkMode={isDarkMode} />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Real-time Fleet Tracking
          </h2>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <motion.img
              src="/images/dashboard.png"
              alt="Interactive Fleet Map"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className={`absolute inset-0 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-gradient-to-r from-blue-400 to-cyan-500'
              } mix-blend-overlay`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            {[
              { top: '20%', left: '30%', delay: 1 },
              { top: '50%', left: '60%', delay: 1.5 },
              { top: '70%', left: '40%', delay: 2 },
            ].map((pin, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{ top: pin.top, left: pin.left }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: pin.delay }}
              >
                <MapPin
                  className={`h-8 w-8 ${
                    isDarkMode ? 'text-red-500' : 'text-blue-600'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <AnimatedStatsSection isDarkMode={isDarkMode} />

      {/* Technology Showcase Section */}
      <section
        className={`py-20 px-4 relative overflow-hidden ${
          isDarkMode ? 'bg-black' : 'bg-white'
        }`}
      >
        <StarryBackground isDarkMode={isDarkMode} />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Cutting-edge Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-12 w-12" />,
                title: 'AI-Powered Optimization',
                description:
                  'Advanced algorithms for route planning and resource allocation',
              },
              {
                icon: <Wifi className="h-12 w-12" />,
                title: 'IoT Integration',
                description:
                  'Seamless connectivity with various sensors and devices',
              },
              {
                icon: <Battery className="h-12 w-12" />,
                title: 'Energy Management',
                description:
                  'Optimize fuel consumption and support electric vehicle fleets',
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card
                  className={`${
                    isDarkMode
                      ? 'bg-gray-900 border-gray-800'
                      : 'bg-white border-gray-200'
                  } overflow-hidden`}
                >
                  <CardContent className="p-6">
                    <motion.div
                      className={`absolute inset-0 ${
                        isDarkMode
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                          : 'bg-gradient-to-br from-blue-400 to-cyan-500'
                      } opacity-0`}
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className={`mb-4 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {tech.icon}
                    </motion.div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {tech.title}
                    </h3>
                    <p
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    >
                      {tech.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section
        className={`py-20 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Interactive Fleet Management
          </h2>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <motion.img
              src="/images/dashboard2.png"
              alt="Fleet Management Dashboard"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className={`absolute inset-0 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-gradient-to-r from-blue-400 to-cyan-500'
              } mix-blend-overlay`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button
                size="lg"
                className={
                  isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              >
                Try Interactive Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialSection isDarkMode={isDarkMode} />

      {/* CTA Section */}
      <section
        className={`py-20 px-4 ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-600 to-purple-600'
            : 'bg-gradient-to-r from-blue-400 to-cyan-500'
        } relative overflow-hidden`}
      >
        <StarryBackground isDarkMode={isDarkMode} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Ready to Optimize Your Fleet?
          </h2>
          <p
            className={`text-xl mb-8 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Join thousands of companies already using our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className={`w-full sm:w-64 ${
                isDarkMode ? 'bg-white text-black' : 'bg-gray-100 text-gray-900'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              size="lg"
              className={`w-full sm:w-auto ${
                isDarkMode
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Fancy Animated Footer */}
      <FancyFooter isDarkMode={isDarkMode} />
    </div>
  )
}

function FancyHeader({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean
  toggleDarkMode: () => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    [
      isDarkMode ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)',
      isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 1)',
    ]
  )
  const textColor = useTransform(
    scrollY,
    [0, 100],
    ['#ffffff', isDarkMode ? '#ffffff' : '#1f2937']
  )

  const menuItems = ['Features', 'Pricing', 'About', 'Contact']

  return (
    <motion.header
      style={{ backgroundColor: headerBg }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="flex items-center">
        <h1 className="text-4xl font-pacifico">Fleet Master</h1>
        {/* Other header elements */}
      </div>

        </motion.div>
        <nav className="hidden md:flex space-x-8 items-center">
          {menuItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{ color: textColor }}
              className="hover:text-blue-400 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item}
            </motion.a>
          ))}
          <GetStartedButton isDarkMode={isDarkMode} />
          <DarkModeToggle
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </nav>

        <div className="md:hidden flex items-center space-x-4">
          <DarkModeToggle
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu
              className={`h-6 w-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          className={`absolute top-full left-0 right-0 ${
            isDarkMode ? 'bg-black' : 'bg-white'
          } py-4 shadow-lg`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {menuItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`block py-2 px-6 ${
                isDarkMode
                  ? 'text-white hover:text-blue-400'
                  : 'text-gray-900 hover:text-blue-600'
              } transition-colors`}
              whileHover={{ x: 5 }}
              whileTap={{ x: 0 }}
            >
              {item}
            </motion.a>
          ))}
          <div className="px-6 pt-4">
            <GetStartedButton isDarkMode={isDarkMode} />
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

function DarkModeToggle({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean
  toggleDarkMode: () => void
}) {
  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Sun
        className={`h-5 w-5 ${
          isDarkMode ? 'text-gray-400' : 'text-yellow-500'
        }`}
      />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleDarkMode}
        className={`${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
      />
      <Moon
        className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-gray-400'}`}
      />
    </motion.div>
  )
}

function GetStartedButton({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        className={`${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
        } border-0 rounded-full px-6 py-2 font-semibold`}
        onClick={() => (window.location.href = '/dashboard')}
      >
        Get Started <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  )
}

function GlobeAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20">
      <motion.div
        className={`w-96 h-96 border-2 ${
          isDarkMode ? 'border-blue-500' : 'border-blue-400'
        } rounded-full`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <motion.div
          className={`w-full h-full border-2 ${
            isDarkMode ? 'border-purple-500' : 'border-cyan-400'
          } rounded-full`}
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <motion.div
            className={`w-full h-full border-2 ${
              isDarkMode ? 'border-green-500' : 'border-green-400'
            } rounded-full`}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

function AnimatedStatsSection({ isDarkMode }: { isDarkMode: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { value: 500, label: 'Fleet Vehicles Managed' },
    { value: 98, label: 'Customer Satisfaction' },
    { value: 30, label: 'Fuel Savings' },
  ]

  return (
    <section
      ref={ref}
      className={`py-20 px-4 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-100'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div
                className={`text-6xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-600'
                }`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 2, delay: index * 0.2 }}
              >
                {isInView ? <Counter from={0} to={stat.value} /> : 0}
                {stat.label.includes('Satisfaction') && '%'}
                {stat.label.includes('Savings') && '%'}
              </motion.div>
              <div
                className={`text-xl ${
                  isDarkMode ? 'text-blue-100' : 'text-blue-800'
                }`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Counter({ from, to }: { from: number; to: number }) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / 2000, 1)
      setCount(Math.floor(progress * (to - from) + from))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrame)
  }, [from, to])

  return <>{count.toLocaleString()}</>
}

function TestimonialSection({ isDarkMode }: { isDarkMode: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const testimonials = [
    {
      quote:
        "This fleet management system has transformed our operations. We've seen a 30% increase in efficiency and significant cost savings.",
      author: 'John Doe',
      company: 'TransportCo',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      quote:
        "The real-time tracking and analytics have given us unprecedented visibility into our fleet's performance. It's been a game-changer for our business.",
      author: 'Jane Smith',
      company: 'Logistics Plus',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      quote:
        "The customer support team is exceptional. They've been there every step of the way, ensuring we get the most out of the platform.",
      author: 'Mike Johnson',
      company: 'City Express',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ]

  return (
    <section
      className={`py-20 px-4 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 to-gray-800'
          : 'bg-gradient-to-br from-gray-100 to-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card
                className={`${
                  isDarkMode ? 'bg-gray-800 shadow-xl' : 'bg-white shadow-md'
                } h-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <CardContent className="p-6 h-full flex flex-col justify-between relative">
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 ${
                      isDarkMode ? 'bg-blue-500' : 'bg-blue-200'
                    } rounded-full transform translate-x-16 -translate-y-16 opacity-10`}
                  />
                  <div className="relative z-10">
                    <Quote
                      className={`${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      } mb-4 h-8 w-8`}
                    />
                    <p
                      className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } italic text-lg mb-6`}
                    >
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center relative z-10">
                    <Avatar
                      className={`h-12 w-12 mr-4 ring-2 ${
                        isDarkMode ? 'ring-blue-400' : 'ring-blue-500'
                      }`}
                    >
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.author}
                      />
                      <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p
                        className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {testimonial.author}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`mt-1 ${
                          isDarkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {testimonial.company}
                      </Badge>
                    </div>
                  </div>
                  {hoveredIndex === index && (
                    <motion.div
                      className={`absolute inset-0 ${
                        isDarkMode
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                          : 'bg-gradient-to-br from-blue-200 to-cyan-200'
                      } opacity-10`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StarryBackground({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 ${
            isDarkMode ? 'bg-white' : 'bg-blue-500'
          } rounded-full`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function FancyFooter({ isDarkMode }: { isDarkMode: boolean }) {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: '-100px' })

  return (
    <motion.footer
      ref={footerRef}
      className={`${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      } py-12 px-6 relative overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3
            className={`text-2xl font-bold mb-4 bg-clip-text text-transparent ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-400 to-purple-600'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600'
            }`}
          >
            FleetMaster
          </h3>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Revolutionizing fleet management for businesses worldwide.
          </p>
        </motion.div>
        {[
          { title: 'Product', items: ['Features', 'Pricing', 'Integrations'] },
          { title: 'Company', items: ['About Us', 'Careers', 'Contact'] },
          { title: 'Connect', items: ['Twitter', 'LinkedIn', 'Facebook'] },
        ].map((column, index) => (
          <motion.div
            key={column.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
          >
            <h4
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-600'
              }`}
            >
              {column.title}
            </h4>
            <ul className="space-y-2">
              {column.items.map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className={`${
                      isDarkMode
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-blue-600'
                    } transition-colors`}
                    whileHover={{ x: 5 }}
                    whileTap={{ x: 0 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <motion.div
        className={`mt-8 pt-8 border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-300'
        } text-center ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        } relative z-10`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p>&copy; 2024 FleetMaster. All rights reserved.</p>
      </motion.div>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${
              isDarkMode ? 'bg-blue-500' : 'bg-blue-300'
            } rounded-full`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </motion.footer>
  )
}
