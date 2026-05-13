import { Link } from "react-router-dom"
import civicImage from "../assets/civic.jpeg"


function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm text-slate-600 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Citizen-first civic platform
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Report public <br />
            issues.{" "}
            <span className="text-blue-600">
              Get them resolved.
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl mb-8 leading-relaxed">
            CivicConnect bridges citizens and government departments.
            Report potholes, streetlight failures, water leaks and more —
            track every step until it is fixed.
          </p>

          <div className="flex gap-4 mb-10">
            <Link
              to="/submit"
              className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              File a Complaint →
            </Link>

            <Link
              to="/register"
              className="bg-white border px-7 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              REGISTER
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-500">
            <span>✅ Secure JWT auth</span>
            <span>📍 Location-aware</span>
            <span>🔔 Real-time updates</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">

            <img src={civicImage} alt="Civic System" className="w-full rounded-3xl shadow-2xl object-cover h-450px" />

          <div className="absolute -bottom-8 left-10 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-4">
            <div className="bg-green-100 text-green-600 w-10 h-10 rounded-xl flex items-center justify-center">
              ✓
            </div>

            <div>
              <h3 className="font-bold">
              CIVIC SYSTEM
              </h3>
              <p className="text-sm text-slate-500">
               Citizen-first civic platform
              </p>
            </div>
          </div>

        </div>

      </section>
      <section className="max-w-6xl mx-auto px-6 py-16">

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

    <div className="bg-white p-8 rounded-2xl shadow text-center">
      <h2 className="text-4xl font-bold text-blue-600">
        12K+
      </h2>
      <p className="text-slate-600 mt-2">
        Complaints Submitted
      </p>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow text-center">
      <h2 className="text-4xl font-bold text-green-600">
        9K+
      </h2>
      <p className="text-slate-600 mt-2">
        Issues Resolved
      </p>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow text-center">
      <h2 className="text-4xl font-bold text-orange-500">
        500+
      </h2>
      <p className="text-slate-600 mt-2">
        Active Officers
      </p>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow text-center">
      <h2 className="text-4xl font-bold text-purple-600">
        95%
      </h2>
      <p className="text-slate-600 mt-2">
        Resolution Rate
      </p>
    </div>

  </div>

</section>

<section id="departments" className="max-w-6xl mx-auto px-6 py-16">

  <h2 className="text-4xl font-bold text-center mb-12">
    Complaint Categories
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

    <div className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition">
      <div className="text-5xl mb-4">🚧</div>
      <h3 className="text-2xl font-bold mb-2">
        Potholes
      </h3>
      <p className="text-slate-600">
        Report damaged roads and potholes.
      </p>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition">
      <div className="text-5xl mb-4">💡</div>
      <h3 className="text-2xl font-bold mb-2">
        Streetlights
      </h3>
      <p className="text-slate-600">
        Report broken or non-working lights.
      </p>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition">
      <div className="text-5xl mb-4">💧</div>
      <h3 className="text-2xl font-bold mb-2">
        Water Leakage
      </h3>
      <p className="text-slate-600">
        Report pipeline and water leakage issues.
      </p>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition">
      <div className="text-5xl mb-4">🗑</div>
      <h3 className="text-2xl font-bold mb-2">
        Garbage
      </h3>
      <p className="text-slate-600">
        Report garbage and sanitation problems.
      </p>
    </div>

  </div>

</section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <h2 id="features"  className="text-3xl font-bold text-center mb-10">
          Platform Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-3">
              File Complaints
            </h3>
            <p className="text-slate-600">
              Citizens can report civic issues with image proof,
              category, description and location.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-3">
              Track Progress
            </h3>
            <p className="text-slate-600">
              Track complaint status as Pending, In Progress,
              and Resolved.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-3">
              Officer Action
            </h3>
            <p className="text-slate-600">
              Officers can update status and upload proof of
              resolution.
            </p>
          </div>

        </div>
      </section>
      <footer className="bg-slate-900 text-white mt-20">

  <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

    <div>
      <h2 className="text-2xl font-bold mb-4">
        CivicConnect
      </h2>

      <p className="text-slate-400">
        Smart platform for efficient civic issue reporting and tracking.
      </p>
    </div>

    <div>
      <h3 className="font-bold mb-4">
        Quick Links
      </h3>

      <ul className="space-y-2 text-slate-400">

  <li>
    <Link
    to="/"
    onClick={() => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }, 100)
    }}
    className="hover:text-white transition"
  >
    Home
  </Link>
  </li>

  <li>
    <Link
      to="/login"
      className="hover:text-white transition"
    >
      Login
    </Link>
  </li>

  <li>
    <Link
      to="/register"
      className="hover:text-white transition"
    >
      Register
    </Link>
  </li>

  <li>
   <Link to="/public-dashboard" className="hover:text-white">
  Dashboard
</Link>
  </li>

</ul>
    </div>

    <div>
      <h3 className="font-bold mb-4">
        Departments
      </h3>

     
        <ul className="space-y-2 text-slate-400">
        <li>Roads</li>
        <li>Water</li>
        <li>Electricity</li>
        <li>Sanitation</li>
      </ul>
  
    </div>

    <div>
      <h3 className="font-bold mb-4">
        Contact
      </h3>

      <p className="text-slate-400">
        support@civicconnect.com
      </p>

      <p className="text-slate-400 mt-2">
        +91 9876543210
      </p>
    </div>

  </div>

  <div className="border-t border-slate-700 py-5 text-center text-slate-400">
    © 2026 CivicConnect. All rights reserved.
  </div>

</footer>

    </div>
  )
}

export default Home