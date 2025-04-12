'use client';

export default function Projects() {

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example project cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Project 1</h2>
          <p className="text-gray-600">Project description goes here...</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Project 2</h2>
          <p className="text-gray-600">Project description goes here...</p>
        </div>
      </div>
    </div>
  );
}