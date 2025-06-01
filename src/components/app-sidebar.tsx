import { Users, TrendingUp, CreditCard } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { getCurrentUser } from "@/lib/supabase/session";
import { AppLogo } from "./icons";

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: TrendingUp,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Loan Application",
    url: "/loans",
    icon: CreditCard,
  },
];

export async function AppSidebar() {
  const user = await getCurrentUser();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
                <AppLogo />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Loan Finance Admin</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user?.user_metadata.full_name,
              email: user?.email ?? "",
              avatar: user?.user_metadata.avatar_url,
              isAdmin: user?.isAdmin,
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
