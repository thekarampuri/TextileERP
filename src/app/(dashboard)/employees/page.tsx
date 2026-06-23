"use client";

import { useState } from 'react';
import { Contact, UserPlus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal';

const INITIAL_EMPLOYEES = [
  { id: 'EMP-001', name: 'Rajesh Kumar', role: 'Operator', shift: 'Morning', status: 'Present' },
  { id: 'EMP-002', name: 'Anil Sharma', role: 'Operator', shift: 'Morning', status: 'Absent' },
  { id: 'EMP-003', name: 'Suresh Verma', role: 'Supervisor', shift: 'Morning', status: 'Present' },
  { id: 'EMP-004', name: 'Priya Singh', role: 'Designer', shift: 'General', status: 'Present' },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('Operator');
  const [shift, setShift] = useState('Morning');

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `EMP-00${employees.length + 1}`;
    setEmployees([...employees, { id: newId, name, role, shift, status: 'Present' }]);
    setIsModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">HR & Employees</h2>
          <p className="text-sm text-gray-500">Manage staff directory and daily attendance.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="text-gray-600 bg-white border-gray-300">
            <Clock className="w-4 h-4 mr-2" /> Mark Attendance
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="bg-sky-600 hover:bg-sky-700 text-white">
            <UserPlus className="w-4 h-4 mr-2" /> Add Employee
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md shadow border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Emp ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Shift</th>
                <th className="px-6 py-3">Today's Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{emp.id}</td>
                  <td className="px-6 py-4 text-gray-700">{emp.name}</td>
                  <td className="px-6 py-4 text-gray-500">{emp.role}</td>
                  <td className="px-6 py-4 text-gray-500">{emp.shift}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      emp.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Employee">
        <form onSubmit={handleAddEmployee} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-500" 
              placeholder="e.g. John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-500"
            >
              <option>Operator</option>
              <option>Supervisor</option>
              <option>Designer</option>
              <option>HR</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
            <select 
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-500"
            >
              <option>Morning</option>
              <option>Evening</option>
              <option>Night</option>
              <option>General</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white">Save Employee</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
