import { Settings2, PlayCircle, StopCircle, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_MACHINES = [
  { id: 'MCH-001', name: 'Rapier Loom 01', type: 'Weaving', status: 'RUNNING', currentJob: 'JOB-102', utilization: '92%' },
  { id: 'MCH-002', name: 'Rapier Loom 02', type: 'Weaving', status: 'MAINTENANCE', currentJob: 'None', utilization: '45%' },
  { id: 'MCH-003', name: 'Airjet Loom 01', type: 'Weaving', status: 'RUNNING', currentJob: 'JOB-103', utilization: '98%' },
  { id: 'MCH-004', name: 'Warping M/c 01', type: 'Warping', status: 'RUNNING', currentJob: 'JOB-101', utilization: '85%' },
  { id: 'MCH-005', name: 'Stenter 01', type: 'Finishing', status: 'IDLE', currentJob: 'None', utilization: '60%' },
];

export default function MachinesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Machines</h2>
          <p className="text-sm text-gray-500">Monitor machine utilization and current status.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Settings2 className="w-4 h-4 mr-2" /> Add Machine
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Machines</h4>
          <p className="text-2xl font-bold text-gray-900">24</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 border-l-4 border-l-green-500">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Running</h4>
          <p className="text-2xl font-bold text-green-700">18</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 border-l-4 border-l-gray-400">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Idle</h4>
          <p className="text-2xl font-bold text-gray-700">4</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 border-l-4 border-l-red-500">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Maintenance</h4>
          <p className="text-2xl font-bold text-red-700">2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MACHINES.map((machine) => (
          <div key={machine.id} className="bg-white rounded-md shadow border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
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
                <Button className="h-8 text-xs px-3 bg-red-50 text-red-700 hover:bg-red-100 border-0">Halt</Button>
              ) : (
                <Button className="h-8 text-xs px-3 bg-green-50 text-green-700 hover:bg-green-100 border-0">Start</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
