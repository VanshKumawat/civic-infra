import { useState } from "react"
import API from "../api/axios"

function ComplaintForm() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("category", category)
      formData.append("description", description)
      formData.append("location", location)
      formData.append("image", image)
      const response = await API.post("/complaints/create", formData)
      alert(response.data.message)
      setTitle("")
      setCategory("")
      setDescription("")
      setLocation("")
      setImage(null)
    } catch (error) {
      alert(error.response?.data?.message || "Complaint submission failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-900">
            Submit a Complaint
          </h1>
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Report civic problems with details and image proof.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

          {/* INFO CARD */}
          <div className="bg-blue-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              Help Improve Your Area
            </h2>
            <p className="text-gray-200 mb-6 sm:mb-8 text-sm sm:text-base">
              Submit complaints about public issues such as road damage,
              water leakage, garbage, drainage, or streetlight failure.
            </p>
            <div className="space-y-3 sm:space-y-5">
              <div className="bg-blue-800 p-4 sm:p-5 rounded-xl text-sm sm:text-base">✅ Upload clear issue photo</div>
              <div className="bg-blue-800 p-4 sm:p-5 rounded-xl text-sm sm:text-base">📍 Add correct location</div>
              <div className="bg-blue-800 p-4 sm:p-5 rounded-xl text-sm sm:text-base">📊 Track status anytime</div>
              <div className="bg-blue-800 p-4 sm:p-5 rounded-xl text-sm sm:text-base">🏢 Officer reviews and resolves complaint</div>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Complaint Title</label>
                <input
                  type="text"
                  placeholder="Example: Road pothole near college"
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-700"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Category</label>
                <select
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-700"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Pothole">Pothole</option>
                  <option value="Streetlight">Streetlight</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Drainage">Drainage</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Description</label>
                <textarea
                  placeholder="Describe the problem clearly..."
                  className="w-full border border-gray-300 p-3 rounded-lg h-28 sm:h-32 outline-none focus:border-blue-700"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Location</label>
                <input
                  type="text"
                  placeholder="Example: Near bus stand, Jaipur"
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-700"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Upload Issue Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
                {image && (
                  <p className="text-sm text-green-600 mt-2">Selected: {image.name}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Submit Complaint
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ComplaintForm
