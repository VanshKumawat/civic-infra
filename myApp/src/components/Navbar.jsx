import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null")

    const navigate = useNavigate()



  function handleLogout() {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/login")
  }
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 shadow-lg">
      
       <div className="flex items-center justify-between">

      
      {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          CivicConnect
        </Link>

            {/* MENU */}
        <div className="flex items-center gap-6">

       <div className="flex items-center gap-8">

{!user && (
  <>
  <a href="#features" className="text-slate-100 hover:text-blue-600">
    Features
  </a>

  <a href="#departments" className="text-slate-1000 hover:text-blue-600">
    Departments
  </a>

  </>
)}

  {!user && (
    <>
      <Link
        to="/login"
        className="font-semibold text-slate-100 hover:text-blue-600"
      >
        Sign In
      </Link>

      <Link
        to="/register"
        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </>
  )}

</div> 

            {/* CITIZEN LINKS */}
          {user?.role === "citizen" && (
            <>
              <Link
                to="/submit"
                className="hover:text-gray-300"
              >
                Submit Complaint
              </Link>

                <Link
                to="/complaints"
                className="hover:text-gray-300"
              >
                My Complaints
              </Link>
            </>
          )}

               {/* OFFICER / ADMIN LINKS */}
         {user?.role === "officer" && (
  <>
    <Link
      to="/complaints"
      className="hover:text-gray-300"
    >
      Manage Complaints
    </Link>

    <Link
      to="/officer"
      className="hover:text-gray-300"
    >
      Officer Dashboard
    </Link>
  </>
)}

{user?.role === "admin" && (
  <>
    <Link
      to="/complaints"
      className="hover:text-gray-300"
    >
      Manage Complaints
    </Link>

    <Link
      to="/admin"
      className="hover:text-gray-300"
    >
      Admin Dashboard
    </Link>
  </>
)}

           


          {/* ROLE BADGE */}
{user && (

  <div className="flex items-center gap-3">

    <div className="bg-white text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">

      {user.role === "officer"
        ? user.department
        : user.role}

    </div>

    <p className="text-white font-medium">
      {user.name}
    </p>

  </div>

)}


        </div>

      

  
  
        

        {user && (
          <button
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("user")
              window.location.href = "/"
            }}
            className="text-red-300 hover:text-red-100"
          >
            Logout
          </button>
        )}

        
      </div>

    </nav>
  )
}

export default Navbar