import { useState } from "react"
import { ChevronDown, Edit, Plus, Search, Trash } from "lucide-react"

import { Button } from "../../../../../components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../../components/ui/table"

const bookingData = [
    {
      id: 1,
      name: "Ram Kailash",
      phone: "9905598912",
      bookingId: "SDK89635",
      nights: 2,
      roomType: "1 King Room",
      guests: 2,
      paid: "rsp.150",
      cost: "rsp.1500",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Samira Karki",
      phone: "9815394203",
      bookingId: "SDK89635",
      nights: 4,
      roomType: ["1 Queen", "1 King Room"],
      guests: 5,
      paid: "paid",
      cost: "rsp.5500",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Jeevan Rai",
      phone: "9865328452",
      bookingId: "SDK89635",
      nights: 1,
      roomType: ["1 Deluxe", "1 King Room"],
      guests: 3,
      paid: "rsp.150",
      cost: "rsp.2500",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      name: "Bindu Sharma",
      phone: "9845653124",
      bookingId: "SDK89635",
      nights: 3,
      roomType: ["1 Deluxe", "1 King Room"],
      guests: 2,
      paid: "rsp.150",
      cost: "rsp.3000",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]


const AdminList = () => {
    const [_, setActiveTab] = useState("stays")
    return (
        <>
            <Card className="mb-6">
                <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-base font-medium">
                        Todays Booking <span className="text-xs font-normal text-gray-500">(8 Guest today)</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <Tabs defaultValue="stays" className="w-full">
                        <TabsList className="mb-4 border-b w-full justify-start rounded-none bg-transparent p-0">
                            <TabsTrigger
                                value="stays"
                                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                onClick={() => setActiveTab("stays")}
                            >
                                Stays
                            </TabsTrigger>
                            <TabsTrigger
                                value="packages"
                                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                onClick={() => setActiveTab("packages")}
                            >
                                Packages
                            </TabsTrigger>
                            <TabsTrigger
                                value="arrivals"
                                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                onClick={() => setActiveTab("arrivals")}
                            >
                                Arrivals
                            </TabsTrigger>
                            <TabsTrigger
                                value="departure"
                                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                onClick={() => setActiveTab("departure")}
                            >
                                Departure
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search guest by name or phone number or booking ID"
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-[400px] text-sm"
                                />
                            </div>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Booking
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="whitespace-nowrap">
                                            <div className="flex items-center">
                                                NAME <ChevronDown className="h-4 w-4 ml-1" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="whitespace-nowrap">BOOKING ID</TableHead>
                                        <TableHead className="whitespace-nowrap">NIGHTS</TableHead>
                                        <TableHead className="whitespace-nowrap">ROOM TYPE</TableHead>
                                        <TableHead className="whitespace-nowrap">GUESTS</TableHead>
                                        <TableHead className="whitespace-nowrap">PAID</TableHead>
                                        <TableHead className="whitespace-nowrap">COST</TableHead>
                                        <TableHead className="whitespace-nowrap">ACTION</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookingData.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Avatar className="h-8 w-8 mr-3">
                                                        <AvatarImage src={booking.avatar} alt={booking.name} />
                                                        <AvatarFallback>
                                                            {booking.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{booking.name}</p>
                                                        <p className="text-xs text-gray-500">{booking.phone}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{booking.bookingId}</TableCell>
                                            <TableCell>{booking.nights}</TableCell>
                                            <TableCell>
                                                {Array.isArray(booking.roomType) ? (
                                                    <div>
                                                        {booking.roomType.map((type, index) => (
                                                            <p key={index}>{type}</p>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    booking.roomType
                                                )}
                                            </TableCell>
                                            <TableCell>{booking.guests} Guests</TableCell>
                                            <TableCell>
                                                {booking.paid === "paid" ? (
                                                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">paid</span>
                                                ) : (
                                                    booking.paid
                                                )}
                                            </TableCell>
                                            <TableCell>{booking.cost}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button variant="link" className="text-blue-500 hover:text-blue-600">
                                See other Bookings
                            </Button>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </>
    )
}

export default AdminList
