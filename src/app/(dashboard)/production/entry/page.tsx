"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DailyOutputEntryPage() {
  const [jobId, setJobId] = useState('');
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link href="/production" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Daily Output Entry</h2>
          <p className="text-sm text-gray-500">Log meters produced, machine hours, and downtime.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-teal-50 border-b border-teal-100 flex items-start space-x-4">
          <div className="bg-teal-100 p-3 rounded-full text-teal-700">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-teal-900 uppercase tracking-wider mb-1">Operator Shift Log</h3>
            <p className="text-sm text-teal-800">Ensure all metrics are recorded accurately at the end of your shift.</p>
          </div>
        </div>

        <form className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Active Job ID</label>
              <select 
                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
              >
                <option value="">Select your assigned job...</option>
                <option value="JOB-101">JOB-101 (Warping - Loom 01)</option>
                <option value="JOB-102">JOB-102 (Weaving - Loom 14)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shift Date</label>
              <input type="date" defaultValue="2026-06-21" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Production Metrics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Output Produced (Meters)</label>
                <div className="relative">
                  <input type="number" placeholder="e.g., 250" className="w-full border border-gray-300 rounded-md p-2 pr-12 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 text-sm">
                    mtrs
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Machine Run Time (Hours)</label>
                <div className="relative">
                  <input type="number" step="0.5" placeholder="e.g., 7.5" className="w-full border border-gray-300 rounded-md p-2 pr-12 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 text-sm">
                    hrs
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Downtime & Issues (Optional)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Downtime (Minutes)</label>
                <input type="number" placeholder="0" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Downtime</label>
                <select className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                  <option value="">None</option>
                  <option value="YARN_BREAKAGE">Yarn Breakage</option>
                  <option value="POWER_FAILURE">Power Failure</option>
                  <option value="MAINTENANCE">Machine Maintenance</option>
                  <option value="MATERIAL_SHORTAGE">Material Shortage</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea rows={3} placeholder="Any issues or observations..." className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"></textarea>
            </div>
          </div>
        </form>

        <div className="p-6 bg-gray-50 flex justify-end space-x-3 border-t border-gray-200">
          <Button variant="outline" className="text-gray-700 border-gray-300 bg-white">Clear Form</Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <Save className="w-4 h-4 mr-2" /> Submit Log
          </Button>
        </div>
      </div>
    </div>
  );
}
