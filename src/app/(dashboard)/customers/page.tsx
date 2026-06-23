"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal';

const INITIAL_CUSTOMERS = [
  { id: 'CUST-001', name: 'Alpha Textiles', phone: '+91 98765 43210', orders: 12, balance: '$4,500' },
  { id: 'CUST-002', name: 'Beta Garments', phone: '+91 91234 56789', orders: 5, balance: '$0' },
  { id: 'CUST-003', name: 'Gamma Fabrics', phone: '+91 99887 76655', orders: 28, balance: '$12,350' },
  { id: 'CUST-004', name: 'Delta Wear', phone: '+91 98765 12345', orders: 2, balance: '$800' },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `CUST-00${customers.length + 1}`;
    setCustomers([...customers, { id: newId, name, phone, orders: 0, balance: '$0' }]);
    setIsModalOpen(false);
    setName('');
    setPhone('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers</h2>
          <p className="text-sm text-gray-500">Manage your clients and view their order history.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Customer
        </Button>
      </div>

      <div className="bg-white rounded-md shadow border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-md">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Customer Name</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Total Orders</th>
                <th className="px-6 py-3">Outstanding Balance</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <Link href={`/customers/${customer.id}`} className="hover:text-blue-600 hover:underline">
                      {customer.name}
                    </Link>
                    <div className="text-xs text-gray-500 font-normal">{customer.id}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{customer.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{customer.orders}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.balance === '$0' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {customer.balance}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 text-xs text-gray-500 bg-gray-50 rounded-b-md flex justify-between items-center">
          <span>Showing 1 to {customers.length} of {customers.length} customers</span>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Customer">
        <form onSubmit={handleAddCustomer} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" 
              placeholder="e.g. Omega Fabrics"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              required
              type="text" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" 
              placeholder="e.g. +91 90000 00000"
            />
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save Customer</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
