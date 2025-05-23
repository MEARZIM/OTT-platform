import { Link } from "react-router-dom"

import { useSubscription } from '../../../../hooks/use-subscription';
import {
  ChevronRight,
  HomeIcon,
  LogOut,
  Settings,
  SquareTerminal,
  User,
  Crown,
  LayoutGrid
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton
} from "../../../../components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "../../../../components/ui/collapsible"

import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { User as UserType } from "../../../../types/User"
import { Button } from "../../../../components/ui/button"
import { BACKEND_URL } from "../../../../lib/utils"
import { useCategories } from "../../../../hooks/use-category";


interface SidebarProps {
  user: UserType | null;
}


const SidebarComponent = ({ user }: SidebarProps) => {

  const { categories, loading, error } = useCategories();

  const { subscription } = useSubscription();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    window.location.href = `${BACKEND_URL}/api/auth/logout`
  }


  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white">
        {/* Profile Section */}
        <div className="p-6 flex flex-col items-center justify-center text-center border-b border-gray-700">
          <Avatar>
            {user === null ? (
              <AvatarImage
                src={"/assets/avater.png"}
                alt={"User"}
              />
            ) :
              <Avatar>
                {user?.profileImage && (
                  <AvatarImage
                    src={user.profileImage}
                    alt={user.name ?? "User"}
                  />
                )}
                <AvatarFallback>
                  {user?.name?.split(" ").map(n => n[0]).join("") ?? "NA"}
                </AvatarFallback>
              </Avatar>
            }
          </Avatar>
          <p className="text-lg font-semibold inline-flex items-center gap-1">
            {user?.name}
            {subscription && (
              <Crown className="text-yellow-500 w-4 h-4" />
            )}
          </p>

          <p className="text-sm text-zinc-700 dark:text-zinc-400">Premium Member</p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="mt-6 px-4 text-zinc-700 dark:text-zinc-400 text-sm uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-zinc-400 dark:hover:bg-zinc-800 text-black dark:text-white text-lg dark:hover:text-white">
                  <Link to="/">
                    <HomeIcon size={22} />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Categories */}
              <Collapsible defaultOpen>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-800 text-black dark:text-white text-lg dark:hover:text-white">
                      <LayoutGrid size={22} />
                      <span>Categories</span>
                      <ChevronRight size={24} className="ml-auto group-hover:rotate-90 transition-transform" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    {

                      loading ?
                        <SidebarMenuSub>
                          <SidebarMenuSubButton>
                            <span className="text-sm text-zinc-500">Loading...</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSub>
                        : error ?
                          <SidebarMenuSub>
                            <SidebarMenuSubButton>
                              <span className="text-sm text-red-500">{error}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSub>
                          :


                          categories.map((category) => (
                            <SidebarMenuSub key={category.id}>
                              <SidebarMenuSubButton className="hover:bg-zinc-400 dark:hover:bg-zinc-800 text-black dark:text-white dark:hover:text-white">
                                <Link to={`/categories/${category.id}/${category.name}`}>
                                  <span className="text-md text-black dark:text-white">{category.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSub>
                          ))}

                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>


              {/* My Stuff */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-zinc-400 dark:hover:bg-zinc-800 text-black dark:text-white dark:hover:text-white">
                  <Link to="/mystuff">
                    <User size={22} />
                    <span className="text-lg">My Stuff</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>



              {/* Accounts */}
              <Collapsible defaultOpen>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-800 text-black dark:text-white dark:hover:text-white">
                      <SquareTerminal size={22} />
                      <span className="text-lg">Accounts</span>
                      <ChevronRight size={24} className="ml-auto transition-transform" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubButton className="hover:bg-zinc-400 dark:hover:bg-zinc-800 text-black dark:text-white dark:hover:text-white">
                        <Link to="/mystuff?tab=recently-watched">
                          <span className="text-md text-black dark:text-white">History</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                    <SidebarMenuSub>
                      <SidebarMenuSubButton className="hover:bg-zinc-400 dark:hover:bg-zinc-800 text-black dark:text-white dark:hover:text-white">
                        <Link to="/mystuff">
                          <span className="text-md text-black dark:text-white">Watchlist</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                    <SidebarMenuSub>
                      <SidebarMenuSubButton className="hover:bg-zinc-400 dark:hover:bg-zinc-800 text-black dark:text-white dark:hover:text-white">
                        <Link to="/settings">
                          <span className="text-md text-black dark:text-white">Settings</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Upgrade to Plus Button */}
      <div className="block px-4 py-4 bg-zinc-50 dark:bg-zinc-900 text-center">
        {!subscription && (
          <Link
            to="/subscription"
            className="w-full inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:opacity-90 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
          >
            🚀 Upgrade to Premium
          </Link>
        )}


      </div>

      {/* Footer */}
      <SidebarFooter className="bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white border-t border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <Button
            className="flex items-center gap-2 hover:text-red-400 transition-colors hover:cursor-pointer"
            onClick={handleLogout}
            variant={"outline"}
          >
            <LogOut size={20} />
            <span className="text-md">Sign Out</span>
          </Button>
          <Link
            to="/settings"
            className="hover:text-blue-400 transition-colors"
            title="Settings"
          >
            <Settings size={22} />
          </Link>
        </div>
      </SidebarFooter>

    </Sidebar>
  )
}

export default SidebarComponent
