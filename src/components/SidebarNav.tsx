"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, ShoppingCart, Palette, Factory, 
  Settings, Package, Truck, BarChart, Contact, Settings2
} from 'lucide-react';

const ROUTES = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['OWNER', 'MANAGER', 'HR', 'EMPLOYEE'] },
  { name: 'Customers', href: '/customers', icon: Users, roles: ['OWNER', 'MANAGER', 'HR'] },
  { name: 'Orders', href: '/orders', icon: ShoppingCart, roles: ['OWNER', 'MANAGER', 'DESIGNER', 'HR'] },
  { name: 'Designs', href: '/designs', icon: Palette, roles: ['OWNER', 'MANAGER', 'DESIGNER'] },
  { name: 'Production', href: '/production', icon: Factory, roles: ['OWNER', 'MANAGER', 'EMPLOYEE'] },
  { name: 'Machines', href: '/machines', icon: Settings2, roles: ['OWNER', 'MANAGER', 'EMPLOYEE'] },
  { name: 'Inventory', href: '/inventory', icon: Package, roles: ['OWNER', 'MANAGER', 'HR'] },
  { name: 'Employees', href: '/employees', icon: Contact, roles: ['OWNER', 'MANAGER', 'HR', 'EMPLOYEE'] },
  { name: 'Dispatch', href: '/dispatch', icon: Truck, roles: ['OWNER', 'MANAGER', 'HR'] },
  { name: 'Reports', href: '/reports', icon: BarChart, roles: ['OWNER', 'MANAGER', 'HR'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['OWNER'] },
];

export default function SidebarNav({ userRoles }: { userRoles: string[] }) {
  const pathname = usePathname();

  const visibleRoutes = ROUTES.filter(route => 
    route.roles.some(role => userRoles.includes(role))
  );

  return (
    <nav className="flex-1 overflow-y-auto py-4 space-y-1">
      {visibleRoutes.map((route) => {
        const Icon = route.icon;
        // Check if current path matches the route's path
        const isActive = pathname.startsWith(route.href);
        
        return (
          <Link 
            key={route.name} 
            href={route.href}
            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-gray-950 text-white border-l-4 border-blue-500 pl-5' // Darker background & blue line for active
                : 'text-gray-300 hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
            }`}
          >
            <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
            {route.name}
          </Link>
        );
      })}
    </nav>
  );
}
