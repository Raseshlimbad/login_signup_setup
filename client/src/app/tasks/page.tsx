'use client';

export default function Tasks() {


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Tasks</h1>
      <div className="space-y-4">
        {/* Example task items */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Task 1</h2>
            <p className="text-gray-600">Task description goes here...</p>
          </div>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
            In Progress
          </span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Task 2</h2>
            <p className="text-gray-600">Task description goes here...</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
            Completed
          </span>
        </div>
      </div>
    </div>
  );
}