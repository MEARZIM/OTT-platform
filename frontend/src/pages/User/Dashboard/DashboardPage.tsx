import { Link } from 'react-router-dom';

import Banner from './components/Banner';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import { useUser } from '../../../hooks/use-user';
import PopularContent from './components/PopularContent';
import MostLikedContent from './components/MostLikedContent';
import { ModeToggle } from '../../../components/mode-toggle';
import { SidebarProvider, SidebarTrigger } from '../../../components/ui/sidebar';
import RecommendedContent from './components/Recommendation';

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <div className="bg-white h-full text-black dark:bg-zinc-900 dark:text-white w-full flex flex-col md:flex-row overflow-hidden">
      <SidebarProvider>
        {/* Sidebar - hidden on small screens, toggle with SidebarTrigger */}
        {user && (
          <div className="hidden md:block">
            <Sidebar user={user} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {/* Navbar */}
          <div className="flex flex-col sm:flex-row sm:items-center p-4 gap-4 bg-white dark:bg-zinc-900 w-full">
            <div className="flex items-center justify-start gap-x-4 w-fit">
              <SidebarTrigger />
              <Link to="/" className="flex-shrink-0">
                <img src="/assets/PrimeViewLogo.png" alt="Logo" className="h-10 w-auto sm:h-12" />
              </Link>
            </div>

            {/* Search Bar */}
            <div className='flex flex-row items-center w-full'>
              <div className="w-full sm:flex-1">
                <SearchBar />
              </div>

              {/* Mode Toggle */}
              <div className="flex justify-end sm:ml-4">
                <ModeToggle />
              </div>

            </div>
          </div>

          {/* Sections */}
          <div className="">
            <Banner />
          </div>

        {
          user && 

          <div >
            <RecommendedContent />
          </div>
        }
          

          <div>
            <PopularContent />
          </div>

          <div>
            <MostLikedContent />
          </div>

          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardPage;
