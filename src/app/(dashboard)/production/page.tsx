"use client";

import { useState } from 'react';
import { Plus, MoreHorizontal, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal';

const STAGES = [
  { id: 'WARPING', name: 'Warping' },
  { id: 'WEAVING', name: 'Weaving' },
  { id: 'FINISHING', name: 'Finishing' },
  { id: 'PACKING', name: 'Packing' },
];

const INITIAL_JOBS = [
  { id: 'JOB-101', orderItem: 'ORD-1001-A', stage: 'WARPING', machine: 'Warp-01', operator: 'Rajesh', progress: 80, issue: false },
  { id: 'JOB-102', orderItem: 'ORD-1002-A', stage: 'WEAVING', machine: 'Loom-14', operator: 'Kumar', progress: 45, issue: false },
  { id: 'JOB-103', orderItem: 'ORD-1002-B', stage: 'WEAVING', machine: 'Loom-15', operator: 'Suresh', progress: 10, issue: true },
  { id: 'JOB-104', orderItem: 'ORD-1001-B', stage: 'FINISHING', machine: 'Stenter-01', operator: 'Raju', progress: 100, issue: false },
  { id: 'JOB-105', orderItem: 'ORD-1004-A', stage: 'PACKING', machine: 'Pack-02', operator: 'Anil', progress: 60, issue: false },
];

export default function ProductionBoardPage() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [orderItem, setOrderItem] = useState('');
  const [machine, setMachine] = useState('');
  const [operator, setOperator] = useState('');

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `JOB-${100 + jobs.length + 1}`;
    setJobs([...jobs, { 
      id: newId, 
      orderItem, 
      stage: 'WARPING', 
      machine, 
      operator, 
      progress: 0, 
      issue: false 
    }]);
    setIsModalOpen(false);
    setOrderItem('');
    setMachine('');
    setOperator('');
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Production Board</h2>
          <p className="text-sm text-gray-500">Kanban view of active production jobs.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="text-gray-600 bg-white border-gray-300">
            Export Report
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="bg-teal-600 hover:bg-teal-700 text-white">
            <Plus className="w-4 h-4 mr-2" /> New Job
          </Button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex h-full space-x-6 min-w-max">
          
          {STAGES.map((stage) => {
            const stageJobs = jobs.filter(j => j.stage === stage.id);
            
            return (
              <div key={stage.id} className="w-80 flex flex-col bg-gray-100 rounded-lg shadow-sm border border-gray-200">
                {/* Column Header */}
                <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg flex justify-between items-center">
                  <h3 className="font-semibold text-gray-700 uppercase text-xs tracking-wider">
                    {stage.name} <span className="ml-2 bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full">{stageJobs.length}</span>
                  </h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {stageJobs.map(job => (
                    <div key={job.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-teal-500">
                      
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-gray-500">{job.id}</span>
                        {job.issue && <AlertTriangle className="w-4 h-4 text-amber-500" title="Issue reported" />}
                      </div>
                      
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{job.orderItem}</h4>
                      
                      <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-600">
                        <div>
                          <span className="block text-gray-400">Machine</span>
                          <span className="font-medium">{job.machine}</span>
                        </div>
                        <div>
                          <span className="block text-gray-400">Operator</span>
                          <span className="font-medium">{job.operator}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{job.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${job.issue ? 'bg-amber-500' : 'bg-teal-500'}`} 
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                      </div>

                    </div>
                  ))}
                  
                  {stageJobs.length === 0 && (
                    <div className="text-center p-4 text-xs text-gray-400 border-2 border-dashed border-gray-300 rounded-md">
                      No jobs in {stage.name}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Job">
        <form onSubmit={handleCreateJob} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Item Ref</label>
            <input 
              required
              type="text" 
              value={orderItem}
              onChange={(e) => setOrderItem(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500" 
              placeholder="e.g. ORD-1005-A"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Machine</label>
            <input 
              required
              type="text" 
              value={machine}
              onChange={(e) => setMachine(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500" 
              placeholder="e.g. Warp-02"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Operator</label>
            <input 
              required
              type="text" 
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500" 
              placeholder="e.g. Manish"
            />
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">Create Job</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
