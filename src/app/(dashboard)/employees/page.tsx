import { Contact, UserPlus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_EMPLOYEES = [
  { id: 'EMP-001', name: 'Rajesh Kumar', role: 'Operator', shift: 'Morning', status: 'Present' },
  { id: 'EMP-002', name: 'Anil Sharma', role: 'Operator', shift: 'Morning', status: 'Absent' },
  { id: 'EMP-003', name: 'Suresh Verma', role: 'Supervisor', shift: 'Morning', status: 'Present' },
  { id: 'EMP-004', name: 'Priya Singh', role: 'Designer', shift: 'General', status: 'Present' },
];

export default function EmployeesPage() {
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
          <Button className="bg-sky-600 hover:bg-sky-700 text-white">
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
              {MOCK_EMPLOYEES.map((emp) => (
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
    </div>
  );
}
