export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Textile ERP</h3>
        <p className="text-gray-500">
          This is your dashboard. Because we are in Frontend-First mode, database features are disabled. 
          Use the sidebar to navigate to the mock modules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h4 className="font-semibold text-blue-800">Active Orders</h4>
          <p className="text-3xl font-bold text-blue-900 mt-2">12</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h4 className="font-semibold text-green-800">Production Jobs</h4>
          <p className="text-3xl font-bold text-green-900 mt-2">5</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
          <h4 className="font-semibold text-amber-800">Pending Designs</h4>
          <p className="text-3xl font-bold text-amber-900 mt-2">2</p>
        </div>
      </div>
    </div>
  );
}
