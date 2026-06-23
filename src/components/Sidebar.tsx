import { auth } from '@/auth';
import SidebarNav from './SidebarNav';

export default async function Sidebar() {
  const session = await auth();
  const userRoles = session?.user?.roles || [];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col shadow-xl">
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wider text-blue-400">TEXTILE ERP</h1>
      </div>
      
      <SidebarNav userRoles={userRoles} />
      
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        Mock Mode: Role ({userRoles.join(', ')})
      </div>
    </aside>
  );
}
