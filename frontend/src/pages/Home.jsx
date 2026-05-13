import { Link } from "react-router-dom"
import civicImage from "../assets/civic.jpeg"

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm text-slate-600 mb-6 sm:mb-8 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Citizen-first civic platform
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
            Report public <br />
            issues.{" "}
            <span className="text-blue-600">
              Get them resolved.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mb-6 sm:mb-8 leading-relaxed">
            CivicConnect bridges citizens and government departments.
            Report potholes, streetlight failures, water leaks and more —
            track every step until it is fixed.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
            <Link
              to="/submit"
              className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-center"
            >
              File a Complaint →
            </Link>

            <Link
              to="/register"
              className="bg-white border px-7 py-3 rounded-xl font-semibold hover:bg-gray-100 transition text-center"
            >
              REGISTER
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-slate-500">
            <span>✅ Secure JWT auth</span>
            <span>📍 Location-aware</span>
            <span>🔔 Real-time updates</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative mt-6 lg:mt-0">
          <img src={civicImage} alt="Civic System" className="w-full rounded-3xl shadow-2xl object-cover" />

          <div className="absolute -bottom-6 left-4 sm:left-10 bg-white rounded-2xl shadow-xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
            <div className="bg-green-100 text-green-600 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">CIVIC SYSTEM</h3>
              <p className="text-xs sm:text-sm text-slate-500">Citizen-first civic platform</p>
            </div>
          </div>
        </div>

      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-8 rounded-2xl shadow text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">12K+</h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">Complaints Submitted</p>
          </div>
          <div className="bg-white p-5 sm:p-8 rounded-2xl shadow text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-600">9K+</h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">Issues Resolved</p>
          </div>
          <div className="bg-white p-5 sm:p-8 rounded-2xl shadow text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-orange-500">500+</h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">Active Officers</p>
          </div>
          <div className="bg-white p-5 sm:p-8 rounded-2xl shadow text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-600">95%</h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">Resolution Rate</p>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section id="departments" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
          Complaint Categories
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <div className="bg-white p-5 sm:p-8 rounded-2xl shadow hover:scale-105 transition">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🚧</div>
            <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Potholes</h3>
            <p className="text-slate-600 text-sm sm:text-base">Report damaged roads and potholes.</p>
          </div>
          <div className="bg-white p-5 sm:p-8 rounded-2xl shadow hover:scale-105 transition">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💡</div>
            <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Streetlights</h3>
            <p className="text-slate-600 text-sm sm:text-base">Report broken or non-working lights.</p>
          </div>
          <div className="bg-white p-5 sm:p-8 rounded-2xl shadow hover:scale-105 transition">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💧</div>
            <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Water Leakage</h3>
            <p className="text-slate-600 text-sm sm:text-base">Report pipeline and water leakage issues.</p>
          </div>
          <div className="bg-white p-5 sm:p-8 rounded-2xl shadow hover:scale-105 transition">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🗑</div>
            <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Garbage</h3>
            <p className="text-slate-600 text-sm sm:text-base">Report garbage and sanitation problems.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-3">File Complaints</h3>
            <p className="text-slate-600">
              Citizens can report civic issues with image proof,
              category, description and location.
            </p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-3">Track Progress</h3>
            <p className="text-slate-600">
              Track complaint status as Pending, In Progress,
              and Resolved.
            </p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-3">Officer Action</h3>
            <p className="text-slate-600">
              Officers can update status and upload proof of
              resolution.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white mt-16 sm:mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">CivicConnect</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Smart platform for efficient civic issue reporting and tracking.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/" onClick={() => { setTimeout(() => { window.scrollTo({ top: 0, behavior: "smooth" }) }, 100) }} className="hover:text-white transition">Home</Link>
              </li>
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
              <li><Link to="/public-dashboard" className="hover:text-white">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Departments</h3>
            <ul className="space-y-2 text-slate-400">
              <li>Roads</li>
              <li>Water</li>
              <li>Electricity</li>
              <li>Sanitation</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p className="text-slate-400 text-sm sm:text-base">support@civicconnect.com</p>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">+91 9876543210</p>
          </div>
        </div>

        <div className="border-t border-slate-700 py-5 text-center text-slate-400 text-sm">
          © 2026 CivicConnect. All rights reserved.
        </div>
      </footer>

    </div>
  )
}

export default Home
