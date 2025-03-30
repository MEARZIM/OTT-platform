import StatsCard from "./components/statsCard"
import Charts from "./components/charts"
import AdminList from "./components/adminList"
import Rating from "./components/rating"
import Heading from "../../../components/ui/heading"

export default function AdminDashboard() {
  return (

    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Dashboard`}
          description="Details about PrimeView"
        />
      </div>

      {/* Stats Cards */}
      <StatsCard />


      {/* Charts */}
      <Charts />


      {/* Admin List */}
      <AdminList />


      {/* Rating */}
      <Rating />

    </>

  )
}

