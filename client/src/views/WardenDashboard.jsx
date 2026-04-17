import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import Footer from "../components/Footer";

function WardenDashboard() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <Heading text="Warden Dashboard" />
          <p className="mt-4 text-gray-700">
            Welcome to the Warden Dashboard. Manage student room requests, approve or reject applications, and oversee maintenance complaints.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border rounded-lg p-5 shadow-sm bg-blue-50">
              <h2 className="font-semibold text-lg">Room Requests</h2>
              <p className="text-sm text-gray-600 mt-2">Review all student room allotment applications and update statuses.</p>
            </div>
            <div className="border rounded-lg p-5 shadow-sm bg-blue-50">
              <h2 className="font-semibold text-lg">Complaints</h2>
              <p className="text-sm text-gray-600 mt-2">Track and assign maintenance complaints to ensure timely resolution.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WardenDashboard;
