import {
    Bar,
    BarChart as RechartsBarChart,
    Line,
    LineChart as RechartsLineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
} from "recharts";
import {
    ChevronDown,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle} from "../../../../../components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu"
import { Button } from "../../../../../components/ui/button"

const revenueData = [
    { name: "Sun", value: 8 },
    { name: "Mon", value: 10 },
    { name: "Tue", value: 12 },
    { name: "Wed", value: 11 },
    { name: "Thu", value: 9 },
    { name: "Fri", value: 11 },
    { name: "Sat", value: 12 },
  ]

  const guestsData = [
    { name: "Sun", value: 8000 },
    { name: "Mon", value: 10000 },
    { name: "Tue", value: 12000 },
    { name: "Wed", value: 9000 },
    { name: "Thu", value: 6000 },
    { name: "Fri", value: 8000 },
  ]

  const roomsData = [
    { name: "Sun", occupied: 15, booked: 10, available: 25 },
    { name: "Mon", occupied: 20, booked: 12, available: 18 },
    { name: "Tue", occupied: 18, booked: 15, available: 17 },
    { name: "Wed", occupied: 22, booked: 10, available: 18 },
    { name: "Thu", occupied: 20, booked: 15, available: 15 },
    { name: "Fri", occupied: 18, booked: 12, available: 20 },
    { name: "Sat", occupied: 15, booked: 10, available: 25 },
  ]


const Charts = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                        <CardTitle className="text-base font-medium">Revenue</CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 text-xs">
                                    this week <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>This Month</DropdownMenuItem>
                                <DropdownMenuItem>This Year</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis hide={true} />
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-white p-2 border rounded shadow-sm">
                                                        <p className="text-xs">{`${payload[0].value} K`}</p>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                        <CardTitle className="text-base font-medium">Guests</CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 text-xs">
                                    this week <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>This Month</DropdownMenuItem>
                                <DropdownMenuItem>This Year</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsLineChart data={guestsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis hide={true} />
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-white p-2 border rounded shadow-sm">
                                                        <p className="text-xs">{`${payload[0].value}`}</p>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        dot={{ r: 4, fill: "white", stroke: "#3B82F6", strokeWidth: 2 }}
                                        activeDot={{ r: 6 }}
                                        fill="url(#colorUv)"
                                    />
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="value" stroke="none" fill="url(#colorUv)" />
                                </RechartsLineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                        <CardTitle className="text-base font-medium">Rooms</CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 text-xs">
                                    this week <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>This Month</DropdownMenuItem>
                                <DropdownMenuItem>This Year</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-xs mb-2">
                            <div className="flex items-center justify-between">
                                <p>Total 50 Rooms</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                        <span>Occupied</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                        <span>Booked</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                                        <span>Available</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[180px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={roomsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis hide={true} />
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-white p-2 border rounded shadow-sm">
                                                        <p className="text-xs">{`Occupied: ${payload[0].value}`}</p>
                                                        <p className="text-xs">{`Booked: ${payload[1].value}`}</p>
                                                        <p className="text-xs">{`Available: ${payload[2].value}`}</p>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Bar dataKey="occupied" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="booked" fill="#10B981" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="available" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Charts
