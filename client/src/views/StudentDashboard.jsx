import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import Footer from "../components/Footer";

function StudentDashboard() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <Heading text="Student Dashboard" />
          <p className="mt-4 text-gray-700">
            Welcome to the Student Dashboard. Here students can apply for room allotment, view application status, raise maintenance complaints, and track requests.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border rounded-lg p-5 shadow-sm bg-purple-50">
              <h2 className="font-semibold text-lg">Room Allotment</h2>
              <p className="text-sm text-gray-600 mt-2">Submit a room request and follow your application status.</p>
            </div>
            <div className="border rounded-lg p-5 shadow-sm bg-purple-50">
              <h2 className="font-semibold text-lg">Maintenance Complaints</h2>
              <p className="text-sm text-gray-600 mt-2">Report issues for water, electricity, or furniture and track resolution progress.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentDashboard;
