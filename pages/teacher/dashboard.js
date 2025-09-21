import Layout from '../../components/Layout';

export default function TeacherDashboard() {
  return (
    <Layout role="teacher" showSidebar={true}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Teacher Analytics Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Class Performance</h2>
            <div className="h-32 bg-green-100 rounded flex items-center justify-center">[Chart.js Placeholder]</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Student Activity</h2>
            <table className="w-full text-left">
              <thead>
                <tr><th>Name</th><th>Activity</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr><td>Student A</td><td>Math</td><td>Completed</td></tr>
                <tr><td>Student B</td><td>Science</td><td>In Progress</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="font-bold mb-2">Weak Topics</h2>
          <ul className="list-disc ml-4">
            <li>Algebra</li>
            <li>Physics: Motion</li>
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="font-bold mb-2">CSV Export</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Export Data</button>
        </div>
        <div className="mt-8">
          <h2 className="font-bold mb-2">Class Management</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Manage Classes</button>
        </div>
      </div>
    </Layout>
  );
}
