import { auth } from "@/auth";

export default async function Topbar() {
  const session = await auth();
  const userName = session?.user?.name || "Guest";

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10 relative">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-700">{userName}</span>
          <span className="text-xs text-gray-500">{session?.user?.roles?.join(", ")}</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold">
          {userName.charAt(0)}
        </div>
      </div>
    </header>
  );
}
