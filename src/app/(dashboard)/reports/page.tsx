import { BarChart3, TrendingUp, PackageSearch, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Reports & Analytics</h2>
          <p className="text-sm text-gray-500">Business insights, production output, and sales data.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Download className="w-4 h-4 mr-2" /> Export All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Production Report Card */}
        <div className="bg-white p-6 rounded-md shadow border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Production</h3>
          </div>
          <p className="text-sm text-gray-500 mb-6">Output by machine, operator, and stage.</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total Meters (This Week)</span>
              <span className="font-bold text-gray-900">12,450 m</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Avg Machine Utilization</span>
              <span className="font-bold text-gray-900">82%</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-6 text-teal-700 border-teal-200 hover:bg-teal-50">
            View Production Report
          </Button>
        </div>

        {/* Sales Report Card */}
        <div className="bg-white p-6 rounded-md shadow border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-lg">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Sales & Revenue</h3>
          </div>
          <p className="text-sm text-gray-500 mb-6">Orders generated and revenue by customer.</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Revenue (This Month)</span>
              <span className="font-bold text-gray-900">$45,200</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Pending Payments</span>
              <span className="font-bold text-gray-900">$8,100</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-6 text-indigo-700 border-indigo-200 hover:bg-indigo-50">
            View Sales Report
          </Button>
        </div>

        {/* Inventory Report Card */}
        <div className="bg-white p-6 rounded-md shadow border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-lg">
              <PackageSearch className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Inventory</h3>
          </div>
          <p className="text-sm text-gray-500 mb-6">Raw material consumption and stock aging.</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Items Low on Stock</span>
              <span className="font-bold text-red-600">2 Items</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Raw Material Consumed</span>
              <span className="font-bold text-gray-900">1,200 kg</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-6 text-amber-700 border-amber-200 hover:bg-amber-50">
            View Inventory Report
          </Button>
        </div>
      </div>
    </div>
  );
}
