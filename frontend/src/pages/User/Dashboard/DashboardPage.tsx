import { Link } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from '../../../components/ui/sidebar'
import Banner from './components/Banner'
import PopularContent from './components/PopularContent'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'
import SuggestedContent from './components/SuggestedContent'
import WatchNext from './components/WatchNext'
import Footer from './components/Footer'
import { ModeToggle } from '../../../components/mode-toggle'

const DashboardPage = () => {
  return (
    <div className="h-screen bg-white text-black dark:bg-zinc-900 dark:text-white w-full flex overflow-auto">
      <SidebarProvider>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar: Sidebar Trigger + Search Bar */}
          <div className="flex items-center p-4 bg-white dark:bg-zinc-900 w-full">
            <SidebarTrigger className="mr-4" /> {/* Sidebar Toggle Button */}
            <div className='flex items-center gap-10 z-50 mr-3'>
              <Link to='/'>
                <img src='/assets/PrimeViewLogo.png' alt='Logo' className='size-12' />
              </Link>
            </div>
            <div className="w-full ">
              <SearchBar />
            </div>
            <div className='flex items-center gap-10 z-50 mr-3'>
              <ModeToggle />
            </div>
          </div>

          {/* Banner Section */}
          <div className="flex-1">
            <Banner />
          </div>

          {/* Watch Next Section */}
          <div className="flex-1">
            <WatchNext />
          </div>

          {/* Suggested Content */}
          <div className="flex-1">
            <SuggestedContent />
          </div>

          {/* Popular Content */}
          <div className="flex-1">
            <PopularContent />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  )
}

export default DashboardPage
