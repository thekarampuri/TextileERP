"use client";

import { useState } from 'react';
import { Settings2, PlayCircle, StopCircle, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal';

const INITIAL_MACHINES = [
  { id: 'MCH-001', name: 'Rapier Loom 01', type: 'Weaving', status: 'RUNNING', currentJob: 'JOB-102', utilization: '92%' },
  { id: 'MCH-002', name: 'Rapier Loom 02', type: 'Weaving', status: 'MAINTENANCE', currentJob: 'None', utilization: '45%' },
  { id: 'MCH-003', name: 'Airjet Loom 01', type: 'Weaving', status: 'RUNNING', currentJob: 'JOB-103', utilization: '98%' },
  { id: 'MCH-004', name: 'Warping M/c 01', type: 'Warping', status: 'RUNNING', currentJob: 'JOB-101', utilization: '85%' },
  { id: 'MCH-005', name: 'Stenter 01', type: 'Finishing', status: 'IDLE', currentJob: 'None', utilization: '60%' },
];

export default function MachinesPage() {
  const [machines, setMachines] = useState(INITIAL_MACHINES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [type, setType] = useState('Weaving');

  const handleAddMachine = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `MCH-00${machines.length + 1}`;
    setMachines([...machines, { id: newId, name, type, status: 'IDLE', currentJob: 'None', utilization: '0%' }]);
    setIsModalOpen(false);
    setName('');
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'RUNNING' ? 'IDLE' : 'RUNNING';
    setMachines(machines.map(m => m.id === id ? { ...m, status: newStatus } : m));
  };

  const runningCount = machines.filter(m => m.status === 'RUNNING').length;
  const idleCount = machines.filter(m => m.status === 'IDLE').length;
  const maintCount = machines.filter(m => m.status === 'MAINTENANCE').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Machines</h2>
          <p className="text-sm text-gray-500">Monitor machine utilization and current status.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Settings2 className="w-4 h-4 mr-2" /> Add Machine
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Machines</h4>
          <p className="text-2xl font-bold text-gray-900">{machines.length}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 border-l-4 border-l-green-500">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Running</h4>
          <p className="text-2xl font-bold text-green-700">{runningCount}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 border-l-4 border-l-gray-400">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Idle</h4>
          <p className="text-2xl font-bold text-gray-700">{idleCount}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 border-l-4 border-l-red-500">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Maintenance</h4>
          <p className="text-2xl font-bold text-red-700">{maintCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((machine) => (
          <div key={machine.id} className="bg-white rounded-md shadow border border-gray-200 overflow-hidden transition-all">
            <div className={`p-4 border-b flex justify-between items-center ${machine.status === 'RUNNING' ? 'border-green-100 bg-green-50/30' : 'border-gray-100'}`}>
              <div>
                <h3 className="font-semibold text-gray-900">{machine.name}</h3>
                <span className="text-xs text-gray-500">{machine.type}</span>
              </div>
              <div className="flex items-center space-x-1">
                {machine.status === 'RUNNING' && <PlayCircle className="w-5 h-5 text-green-500" />}
                {machine.status === 'IDLE' && <StopCircle className="w-5 h-5 text-gray-400" />}
                {machine.status === 'MAINTENANCE' && <Wrench className="w-5 h-5 text-red-500" />}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Current Job</span>
                <span className="font-medium text-gray-900">{machine.currentJob}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Weekly Utilization</span>
                <span className="font-medium text-indigo-600">{machine.utilization}</span>
              </div>
            </div>
            
            <div className="p-3 border-t border-gray-100 flex justify-end space-x-2 bg-white">
              <Button variant="outline" className="h-8 text-xs px-3">View Logs</Button>
              {machine.status === 'RUNNING' ? (
                <Button 
                  onClick={() => toggleStatus(machine.id, machine.status)}
                  className="h-8 text-xs px-3 bg-red-50 text-red-700 hover:bg-red-100 border-0"
                >
                  Halt
                </Button>
              ) : machine.status === 'IDLE' ? (
                <Button 
                  onClick={() => toggleStatus(machine.id, machine.status)}
                  className="h-8 text-xs px-3 bg-green-50 text-green-700 hover:bg-green-100 border-0"
                >
                  Start
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Machine">
        <form onSubmit={handleAddMachine} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Machine Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" 
              placeholder="e.g. Airjet Loom 02"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option>Warping</option>
              <option>Weaving</option>
              <option>Finishing</option>
              <option>Packing</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Machine</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
