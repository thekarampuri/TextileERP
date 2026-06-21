"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CreateOrderPage() {
  const [customer, setCustomer] = useState('');
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link href="/orders" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Create New Order</h2>
          <p className="text-sm text-gray-500">Add order details and initial design references.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">General Information</h3>
          <p className="text-sm text-gray-500 mb-4">Select the customer and expected delivery date.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <select 
                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              >
                <option value="">Select a customer...</option>
                <option value="CUST-001">Alpha Textiles</option>
                <option value="CUST-002">Beta Garments</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
              <input type="date" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
            <Button variant="outline" className="text-sm h-8 bg-white">Add Item</Button>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-md p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Fabric Type</label>
                <input type="text" placeholder="e.g. Cotton Jacquard" className="w-full border border-gray-300 rounded-md p-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Quantity (Meters)</label>
                <input type="number" placeholder="5000" className="w-full border border-gray-300 rounded-md p-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Design Reference</label>
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                <option>New Custom Design (Pending Designer Approval)</option>
                <option>DSGN-102 (Floral Motif)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Specs (Width, GSM)</label>
              <input type="text" placeholder="Width 60 inch, 120 GSM" className="w-full border border-gray-300 rounded-md p-2 text-sm" />
            </div>
          </div>
        </div>

        <div className="p-6 flex justify-end space-x-3 bg-white">
          <Button variant="outline" className="text-gray-700 border-gray-300">Cancel</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="w-4 h-4 mr-2" /> Save as Draft
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Confirm Order
          </Button>
        </div>
      </div>
    </div>
  );
}
