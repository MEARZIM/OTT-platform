import { ChevronDown } from "lucide-react"


import { Progress } from "../../../../components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"
import { Button } from "../../../../components/ui/button"

const Rating = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-6">

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
                        <CardTitle className="text-base font-medium">Overall Rating</CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 text-xs">
                                    This Week <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>This Month</DropdownMenuItem>
                                <DropdownMenuItem>This Year</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="flex justify-center mb-6">
                            <div className="relative w-48 h-24">
                                <svg viewBox="0 0 100 50" className="w-full h-full">
                                    <path d="M 0 50 A 50 50 0 0 1 100 50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                                    <path d="M 0 50 A 50 50 0 0 1 90 50" fill="none" stroke="#3b82f6" strokeWidth="10" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-sm font-medium">Rating</p>
                                        <p className="text-2xl font-bold">4.5/5</p>
                                        <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded">+31%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Cleanliness</span>
                                <div className="flex items-center gap-2">
                                    <Progress value={90} className="h-2 w-32" />
                                    <span className="text-sm">4.5</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm">Facilities</span>
                                <div className="flex items-center gap-2">
                                    <Progress value={90} className="h-2 w-32" />
                                    <span className="text-sm">4.5</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm">Location</span>
                                <div className="flex items-center gap-2">
                                    <Progress value={50} className="h-2 w-32" />
                                    <span className="text-sm">2.5</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm">Room Comfort</span>
                                <div className="flex items-center gap-2">
                                    <Progress value={50} className="h-2 w-32" />
                                    <span className="text-sm">2.5</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm">Service</span>
                                <div className="flex items-center gap-2">
                                    <Progress value={76} className="h-2 w-32" />
                                    <span className="text-sm">3.8</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm">Value for money</span>
                                <div className="flex items-center gap-2">
                                    <Progress value={76} className="h-2 w-32" />
                                    <span className="text-sm">3.8</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Rating
