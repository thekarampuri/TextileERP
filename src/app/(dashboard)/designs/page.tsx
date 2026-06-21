import Link from 'next/link';
import { Plus, Search, Image as ImageIcon, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_DESIGNS = [
  { id: 'DSGN-1001', name: 'Floral Jacquard Motif', status: 'APPROVED', warp: '2/40s Cotton', weft: '10s Viscose', date: '2026-06-15' },
  { id: 'DSGN-1002', name: 'Geometric Pattern 01', status: 'PENDING', warp: '30s Spun', weft: '20s Cotton', date: '2026-06-20' },
  { id: 'DSGN-1003', name: 'Traditional Border 4-inch', status: 'REJECTED', warp: '2/60s PC', weft: '30s Cotton', date: '2026-06-18' },
];

const STATUS_ICONS: Record<string, any> = {
  'PENDING': <Clock className="w-4 h-4 text-amber-500 mr-1" />,
  'APPROVED': <CheckCircle className="w-4 h-4 text-green-500 mr-1" />,
  'REJECTED': <XCircle className="w-4 h-4 text-red-500 mr-1" />,
};

export default function DesignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Design Library</h2>
          <p className="text-sm text-gray-500">Manage textile motifs, weave parameters, and approvals.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Upload New Design
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left sidebar for filtering */}
        <div className="md:col-span-1 bg-white p-4 rounded-md shadow border border-gray-200 self-start">
          <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Search</label>
              <div className="relative mt-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Design name or ID..." 
                  className="pl-8 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" defaultChecked />
                  <span>Pending Approval</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" defaultChecked />
                  <span>Approved</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right side for grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_DESIGNS.map((design) => (
            <div key={design.id} className="bg-white rounded-md shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gray-100 flex items-center justify-center border-b border-gray-200">
                <ImageIcon className="w-12 h-12 text-gray-300" />
                {/* Normally an <img /> goes here */}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900 truncate pr-2" title={design.name}>{design.name}</h4>
                  <span className="text-xs text-gray-500">{design.id}</span>
                </div>
                
                <div className="flex items-center text-xs font-medium mb-3">
                  {STATUS_ICONS[design.status]}
                  <span className={{
                    'PENDING': 'text-amber-700',
                    'APPROVED': 'text-green-700',
                    'REJECTED': 'text-red-700'
                  }[design.status]}>
                    {design.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Warp:</span>
                    <span>{design.warp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weft:</span>
                    <span>{design.weft}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400">{design.date}</span>
                  <Button variant="outline" className="text-xs h-7 px-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    View Specs
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
