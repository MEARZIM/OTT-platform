import {
  ChevronRight,
  CircleHelp,
  HomeIcon,
  LayoutGrid,
  LogOut,
  Settings,
  SquareTerminal,
  User
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
import { Link } from "react-router-dom"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../components/ui/tooltip"

const SidebarComponent = () => {
  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-gray-900 text-white">
        {/* Profile Section */}
        <div className="p-6 flex flex-col items-center justify-center text-center border-b border-gray-700">
          <img
            src="/assets/avatar.png"
            alt="Profile"
            className="w-16 h-16 rounded-full mb-2"
          />
          <p className="text-lg font-semibold">John Doe</p>
          <p className="text-sm text-gray-400">Premium Member</p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="mt-6 px-4 text-gray-400 text-sm uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-gray-800 text-white text-lg hover:text-white">
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
                    <SidebarMenuButton className="cursor-pointer hover:bg-gray-800 text-white text-lg">
                      <LayoutGrid size={22} />
                      <span>Categories</span>
                      <ChevronRight size={24} className="ml-auto group-hover:rotate-90 transition-transform" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {["Romance", "Action", "Horror", "Comedy", "Thriller"].map((genre, index) => (
                      <SidebarMenuSub key={index}>
                        <SidebarMenuSubButton className="hover:bg-gray-800 text-white">
                          <span className="text-md text-white">{genre}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSub>
                    ))}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* My Stuff */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-gray-800 text-white text-lg hover:text-white">
                  <Link to="/mystuff">
                    <User size={22} />
                    <span>My Stuff</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Help */}
              <Collapsible>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="cursor-pointer hover:bg-gray-800 text-white text-lg hover:text-white">
                      <CircleHelp size={22} />
                      <span>Help</span>
                      <ChevronRight size={24} className="ml-auto transition-transform" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {["Support", "Feedback"].map((item, index) => (
                      <SidebarMenuSub key={index}>
                        <SidebarMenuSubButton className="hover:bg-gray-800 text-white">
                          <span className="text-md text-white">{item}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSub>
                    ))}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Playground */}
              <Collapsible>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="cursor-pointer hover:bg-gray-800 text-white text-lg hover:text-white">
                      <SquareTerminal size={22} />
                      <span>Playground</span>
                      <ChevronRight size={24} className="ml-auto transition-transform" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {["History", "Starred"].map((item, index) => (
                      <SidebarMenuSub key={index}>
                        <SidebarMenuSubButton className="hover:bg-gray-800 text-white">
                          <span className="text-md text-white">{item}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSub>
                    ))}
                    <SidebarMenuSub>
                      <SidebarMenuSubButton className="hover:bg-gray-800 text-white">
                        <Link to="/settings">
                          <span className="text-md text-white">Settings</span>
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/subscription" className="block px-4 py-4 bg-gray-900">
              <button className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:opacity-90 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300">
                🚀 Upgrade to Premium
              </button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-sm bg-gray-800 text-white border border-gray-700">
            Upgrade to Premium to watch with no ads
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Footer */}
      <SidebarFooter className="bg-gray-900 text-white border-t border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <Link
            to="#"
            className="flex items-center gap-2 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span className="text-md">Sign Out</span>
          </Link>
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
