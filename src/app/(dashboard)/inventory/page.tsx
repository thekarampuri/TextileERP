import { Package, ArrowDownUp, Box, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_INVENTORY = [
  { id: 'INV-RAW-001', name: '2/40s Cotton Yarn', type: 'Raw Material', stock: '2,500 kg', reorderLevel: '500 kg', status: 'Healthy' },
  { id: 'INV-RAW-002', name: '10s Viscose Yarn', type: 'Raw Material', stock: '120 kg', reorderLevel: '200 kg', status: 'Low Stock' },
  { id: 'INV-FIN-001', name: 'Floral Jacquard Fabric', type: 'Finished Good', stock: '5,000 meters', reorderLevel: '0', status: 'Ready to Dispatch' },
  { id: 'INV-FIN-002', name: 'Geometric Pattern 01', type: 'Finished Good', stock: '1,200 meters', reorderLevel: '0', status: 'Ready to Dispatch' },
  { id: 'INV-CHM-001', name: 'Sizing Chemical', type: 'Chemicals', stock: '50 liters', reorderLevel: '100 liters', status: 'Low Stock' },
];

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Inventory Management</h2>
          <p className="text-sm text-gray-500">Track raw materials, finished goods, and stock transactions.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="text-gray-600 bg-white border-gray-300">
            <ArrowDownUp className="w-4 h-4 mr-2" /> Add Transaction
          </Button>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">
            <Package className="w-4 h-4 mr-2" /> Add Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-md shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Raw Materials</p>
            <p className="text-xl font-bold text-gray-900">12 Items</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-md shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Finished Goods</p>
            <p className="text-xl font-bold text-gray-900">45 Items</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-md shadow-sm border border-red-200 bg-red-50 flex items-center space-x-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-800">Low Stock Alerts</p>
            <p className="text-xl font-bold text-red-900">2 Items</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md shadow border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Item ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Current Stock</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MOCK_INVENTORY.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 text-gray-700">{item.name}</td>
                  <td className="px-6 py-4 text-gray-500">{item.type}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{item.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Healthy' || item.status === 'Ready to Dispatch' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
