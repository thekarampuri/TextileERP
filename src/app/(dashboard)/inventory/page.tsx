"use client";

import { useState } from 'react';
import { Package, ArrowDownUp, Box, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal';

const INITIAL_INVENTORY = [
  { id: 'INV-RAW-001', name: '2/40s Cotton Yarn', type: 'Raw Material', stock: '2500', unit: 'kg', status: 'Healthy' },
  { id: 'INV-RAW-002', name: '10s Viscose Yarn', type: 'Raw Material', stock: '120', unit: 'kg', status: 'Low Stock' },
  { id: 'INV-FIN-001', name: 'Floral Jacquard Fabric', type: 'Finished Good', stock: '5000', unit: 'meters', status: 'Ready to Dispatch' },
  { id: 'INV-FIN-002', name: 'Geometric Pattern 01', type: 'Finished Good', stock: '1200', unit: 'meters', status: 'Ready to Dispatch' },
  { id: 'INV-CHM-001', name: 'Sizing Chemical', type: 'Chemicals', stock: '50', unit: 'liters', status: 'Low Stock' },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState('Raw Material');
  const [stock, setStock] = useState('');
  const [unit, setUnit] = useState('kg');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = type === 'Raw Material' ? 'INV-RAW' : type === 'Finished Good' ? 'INV-FIN' : 'INV-CHM';
    const newId = `${prefix}-00${Math.floor(Math.random() * 900) + 100}`;
    const status = parseInt(stock) < 200 ? 'Low Stock' : 'Healthy';
    
    setInventory([...inventory, { id: newId, name, type, stock, unit, status }]);
    setIsModalOpen(false);
    setName('');
    setStock('');
  };

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
          <Button onClick={() => setIsModalOpen(true)} className="bg-amber-600 hover:bg-amber-700 text-white">
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
            <p className="text-sm font-medium text-gray-500">Total Items</p>
            <p className="text-xl font-bold text-gray-900">{inventory.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-md shadow-sm border border-red-200 bg-red-50 flex items-center space-x-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-800">Low Stock Alerts</p>
            <p className="text-xl font-bold text-red-900">
              {inventory.filter(i => i.status === 'Low Stock').length} Items
            </p>
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
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 text-gray-700">{item.name}</td>
                  <td className="px-6 py-4 text-gray-500">{item.type}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{item.stock} {item.unit}</td>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Inventory Item">
        <form onSubmit={handleAddItem} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-500" 
              placeholder="e.g. 60s Cotton Yarn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-500"
            >
              <option>Raw Material</option>
              <option>Finished Good</option>
              <option>Chemicals</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock</label>
              <input 
                required
                type="number" 
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-500" 
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <select 
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-amber-500"
              >
                <option>kg</option>
                <option>meters</option>
                <option>liters</option>
                <option>pieces</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">Save Item</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
