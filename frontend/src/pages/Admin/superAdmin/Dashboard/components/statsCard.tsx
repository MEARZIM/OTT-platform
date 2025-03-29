import { Card, CardContent } from "../../../../../components/ui/card"

const StatsCard = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                <Card>
                    <CardContent className="p-4 flex items-center">
                        <div className="bg-blue-50 p-3 rounded-full mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-blue-500"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Arrival <span className="text-xs">(This week)</span>
                            </p>
                            <div className="flex items-center">
                                <h3 className="text-2xl font-bold mr-2">73</h3>
                                <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded">+24%</span>
                            </div>
                            <p className="text-xs text-gray-500">Previous week: 35</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center">
                        <div className="bg-amber-50 p-3 rounded-full mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-amber-500"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M19 12H5"></path>
                                <path d="M12 19l-7-7 7-7"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Departure <span className="text-xs">(This week)</span>
                            </p>
                            <div className="flex items-center">
                                <h3 className="text-2xl font-bold mr-2">35</h3>
                                <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded">-12%</span>
                            </div>
                            <p className="text-xs text-gray-500">Previous week: 97</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center">
                        <div className="bg-cyan-50 p-3 rounded-full mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-cyan-500"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Booking <span className="text-xs">(This week)</span>
                            </p>
                            <div className="flex items-center">
                                <h3 className="text-2xl font-bold mr-2">237</h3>
                                <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded">+31%</span>
                            </div>
                            <p className="text-xs text-gray-500">Previous week: 187</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500 mb-2">Today Activities</p>
                        <div className="flex justify-between mb-2">
                            <div className="text-center">
                                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1">
                                    <span>5</span>
                                </div>
                                <p className="text-xs">
                                    Room
                                    <br />
                                    Available
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1">
                                    <span>10</span>
                                </div>
                                <p className="text-xs">
                                    Room
                                    <br />
                                    Blocked
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1">
                                    <span>15</span>
                                </div>
                                <p className="text-xs">Guest</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-gray-500">Total Revenue</p>
                            <p className="text-lg font-bold">Rs.35k</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default StatsCard
