import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '../ui/sidebar';
import { NavMenu, type NavMenuItem } from './nav-menu';
import { logo } from '@/assets';
import { House, Puzzle, SquarePlus } from 'lucide-react';

const navMenu: NavMenuItem[] = [
  {
    name: 'Home',
    url: '/',
    icon: House,
  },
  {
    name: 'Quizzes',
    url: '/quizzes',
    icon: Puzzle,
  },
  {
    name: 'Create Quizz',
    url: '/quizzes/create',
    icon: SquarePlus,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div>
                <Avatar className="size-5 rounded-sm">
                  <AvatarImage src={logo} alt="logo" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-semibold">Quizz Builder</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={navMenu} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
