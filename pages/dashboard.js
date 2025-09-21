import Layout from '../components/Layout';
import GamificationWidgets from '../components/GamificationWidgets';

export default function Dashboard() {
  return (
    <Layout role="student" showSidebar={true}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <GamificationWidgets />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Quick Actions</h2>
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Start Game</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded">Daily Challenge</button>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Today's Activities</h2>
            <ul className="list-disc ml-4">
              <li>Math Escape Room</li>
              <li>Peer Learning Session</li>
              <li>Avatar Creation</li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="font-bold mb-2">Recent Badges</h2>
          <div className="flex gap-2">
            <span className="bg-yellow-200 p-2 rounded">Math Master</span>
            <span className="bg-green-200 p-2 rounded">Science Star</span>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="font-bold mb-2">Avatar Creator</h2>
          <button className="bg-pink-500 text-white px-4 py-2 rounded">Create Avatar</button>
        </div>
        <div className="mt-8">
          <h2 className="font-bold mb-2">Audio Guidance</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Play Guidance</button>
        </div>
      </div>
    </Layout>
  );
}
