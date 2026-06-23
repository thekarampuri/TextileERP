"use client";

import { useState } from 'react';
import { Truck, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal';

const INITIAL_DISPATCHES = [
  { id: 'DSP-8001', order: 'ORD-1002', date: '2026-06-21', vehicle: 'MH-12-AB-1234', transporter: 'Speed Express', status: 'IN_TRANSIT' },
  { id: 'DSP-8002', order: 'ORD-1001', date: '2026-06-22', vehicle: 'MH-14-XY-9876', transporter: 'Safe Cargo', status: 'SCHEDULED' },
  { id: 'DSP-8003', order: 'ORD-0998', date: '2026-06-18', vehicle: 'MH-12-CD-5678', transporter: 'Speed Express', status: 'DELIVERED' },
];

export default function DispatchPage() {
  const [dispatches, setDispatches] = useState(INITIAL_DISPATCHES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [order, setOrder] = useState('');
  const [transporter, setTransporter] = useState('');
  const [vehicle, setVehicle] = useState('');

  const handleCreateDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `DSP-${8000 + dispatches.length + 1}`;
    const date = new Date().toISOString().split('T')[0];
    
    setDispatches([{ id: newId, order, date, vehicle, transporter, status: 'SCHEDULED' }, ...dispatches]);
    setIsModalOpen(false);
    setOrder('');
    setTransporter('');
    setVehicle('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dispatch Management</h2>
          <p className="text-sm text-gray-500">Coordinate deliveries and track in-transit goods.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-orange-600 hover:bg-orange-700 text-white">
          <Truck className="w-4 h-4 mr-2" /> New Dispatch
        </Button>
      </div>

      <div className="bg-white rounded-md shadow border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-md">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search dispatch ID or order..." 
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Dispatch ID</th>
                <th className="px-6 py-3">Linked Order</th>
                <th className="px-6 py-3">Transporter</th>
                <th className="px-6 py-3">Vehicle No.</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dispatches.map((dispatch) => (
                <tr key={dispatch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{dispatch.id}</td>
                  <td className="px-6 py-4 text-orange-600 font-medium hover:underline cursor-pointer">{dispatch.order}</td>
                  <td className="px-6 py-4 text-gray-700">{dispatch.transporter}</td>
                  <td className="px-6 py-4 text-gray-500">{dispatch.vehicle}</td>
                  <td className="px-6 py-4 text-gray-500">{dispatch.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      dispatch.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                      dispatch.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {dispatch.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Dispatch">
        <form onSubmit={handleCreateDispatch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Linked Order ID</label>
            <input 
              required
              type="text" 
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500" 
              placeholder="e.g. ORD-1005"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transporter Name</label>
            <input 
              required
              type="text" 
              value={transporter}
              onChange={(e) => setTransporter(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500" 
              placeholder="e.g. Speed Express"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle No.</label>
            <input 
              required
              type="text" 
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500" 
              placeholder="e.g. MH-12-AB-1234"
            />
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">Create Dispatch</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
