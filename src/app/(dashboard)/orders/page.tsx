import Link from 'next/link';
import { Plus, Search, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_ORDERS = [
  { id: 'ORD-1001', customer: 'Alpha Textiles', date: '2026-06-20', status: 'IN_PRODUCTION', total: '$1,200', items: 1 },
  { id: 'ORD-1002', customer: 'Beta Garments', date: '2026-06-19', status: 'READY_TO_DISPATCH', total: '$850', items: 2 },
  { id: 'ORD-1003', customer: 'Gamma Fabrics', date: '2026-06-18', status: 'DRAFT', total: '$3,400', items: 3 },
  { id: 'ORD-1004', customer: 'Alpha Textiles', date: '2026-06-15', status: 'DELIVERED', total: '$2,100', items: 1 },
];

const STATUS_COLORS: Record<string, string> = {
  'DRAFT': 'bg-gray-100 text-gray-700',
  'CONFIRMED': 'bg-blue-100 text-blue-700',
  'IN_PRODUCTION': 'bg-purple-100 text-purple-700',
  'READY_TO_DISPATCH': 'bg-yellow-100 text-yellow-700',
  'DELIVERED': 'bg-green-100 text-green-700',
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Orders</h2>
          <p className="text-sm text-gray-500">Track and manage customer orders.</p>
        </div>
        <Link href="/orders/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" /> Create Order
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-md shadow border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-md">
          <div className="flex space-x-3 w-full max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline" className="flex items-center text-gray-600 border-gray-300">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.total}</td>
                  <td className="px-6 py-4 text-right">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 inline" />
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
