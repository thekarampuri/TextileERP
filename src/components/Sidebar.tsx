import Link from 'next/link';
import { 
  LayoutDashboard, Users, ShoppingCart, Palette, Factory, 
  Settings, Package, Truck, BarChart, Contact, Settings2
} from 'lucide-react';
import { auth } from '@/auth';

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

export default async function Sidebar() {
  const session = await auth();
  const userRoles = session?.user?.roles || [];

  const visibleRoutes = ROUTES.filter(route => 
    route.roles.some(role => userRoles.includes(role))
  );

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col shadow-xl">
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wider text-blue-400">TEXTILE ERP</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {visibleRoutes.map((route) => {
          const Icon = route.icon;
          return (
            <Link 
              key={route.name} 
              href={route.href}
              className="flex items-center px-6 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Icon className="w-5 h-5 mr-3 text-gray-400" />
              {route.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        Mock Mode: Role ({userRoles.join(', ')})
      </div>
    </aside>
  );
}
