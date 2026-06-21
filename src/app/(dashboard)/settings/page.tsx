import { Save, UserCircle, Building, Bell, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500">Manage company profile, user roles, and system configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          <button className="w-full flex items-center px-4 py-2.5 text-sm font-medium bg-gray-100 text-gray-900 rounded-md">
            <Building className="w-4 h-4 mr-3 text-gray-500" /> Company Profile
          </button>
          <button className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
            <UserCircle className="w-4 h-4 mr-3 text-gray-400" /> Users & Roles
          </button>
          <button className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
            <Cog className="w-4 h-4 mr-3 text-gray-400" /> Production Stages Config
          </button>
          <button className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
            <Bell className="w-4 h-4 mr-3 text-gray-400" /> Notifications
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white shadow rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Company Profile</h3>
              <p className="text-sm text-gray-500">Update your mill's details and contact information.</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" defaultValue="Solapur Textile Mill" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / GST No.</label>
                  <input type="text" defaultValue="27AADCS1234F1Z5" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address</label>
                  <textarea rows={3} defaultValue="MIDC Area, Solapur, Maharashtra, India" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input type="email" defaultValue="contact@solapurmill.com" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="text" defaultValue="+91 217 123 4567" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <Button className="bg-gray-900 hover:bg-black text-white">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
