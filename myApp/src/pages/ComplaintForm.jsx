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

      const response = await API.post(
        "/complaints/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )

      alert(response.data.message)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Submit Complaint
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Title"
            className="border p-3 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="border p-3 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Pothole">Pothole</option>
            <option value="Streetlight">Streetlight</option>
            <option value="Garbage">Garbage</option>
          </select>

          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            className="border p-3 rounded-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="file"
            className="border p-3 rounded-lg"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button className="bg-red-600 text-white py-3 rounded-lg">
            Submit Complaint
          </button>

        </form>
      </div>
    </div>
  )
}

export default ComplaintForm