import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "./AxiosInstance";
const AdminPage = () => {
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: 0,
    photo: "",
    desc: "",
    price: 0,
    maxGroupSize: 0,
    featured: false,
  });
  const [editTourId, setEditTourId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const fetchTours = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:8000/api/v1/tours"); // Replace with your API URL
      setTours(res.data.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };
  
  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:8000/api/v1/booking");
      console.log(res.data.data);
      setBookings(res.data.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "testpreset"); // Replace with your Cloudinary unsigned upload preset
    formData.append("folder", "tours"); // Optional: Specify a folder in Cloudinary

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dlgyhmuxb/image/upload", formData);
      setFormData((prev) => ({ ...prev, photo: res.data.secure_url }));
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTourId) {
        await axiosInstance.put(`http://localhost:8000/api/v1/tours/${editTourId}`, formData); // Replace with your API URL
        alert("Tour updated successfully");
      } else {
        await axiosInstance.post("http://localhost:8000/api/v1/tours", formData); // Replace with your API URL
        alert("Tour created successfully");
      }
      setFormData({
        title: "",
        city: "",
        address: "",
        distance: 0,
        photo: "",
        desc: "",
        price: 0,
        maxGroupSize: 0,
        featured: false,
      });
      setEditTourId(null);
      fetchTours();
    } catch (error) {
      console.error("Error saving tour:", error);
      alert("Failed to save tour.");
    }
  };

  const handleEdit = (tour) => {
    setEditTourId(tour._id);
    setFormData({
      title: tour.title,
      city: tour.city,
      address: tour.address,
      distance: tour.distance,
      photo: tour.photo,
      desc: tour.desc,
      price: tour.price,
      maxGroupSize: tour.maxGroupSize,
      featured: tour.featured,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:8000/api/v1/tours/${id}`); // Replace with your API URL
      alert("Tour deleted successfully");
      fetchTours();
    } catch (error) {
      console.error("Error deleting tour:", error);
      alert("Failed to delete tour.");
    }
  };

  useEffect(() => {
    fetchTours();
    fetchBookings();
  }, []);
  const totalPages = Math.ceil(tours.length / itemsPerPage);

  // Get tours for the current page
  const currentTours = tours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const changePage = (page) => {
    setCurrentPage(page);
  };
  const [activePage, setActivePage] = useState(1);
  const recordsPerPage = 5; // Number of bookings per page
  
  // Calculate the total number of pages
  const totalPageCount = Math.ceil(bookings.length / recordsPerPage);
  
  // Get bookings for the active page
  const visibleBookings = bookings
    .sort(() => Math.random() - 0.5) // Shuffle bookings randomly
    .slice((activePage - 1) * recordsPerPage, activePage * recordsPerPage);
  
  // Handle page change
  const handlePageChange = (page) => {
    setActivePage(page);
  };
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Manage Tours</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="mb-4 p-4 border shadow-sm bg-light rounded">
  <div className="row g-3">
    <div className="col-md-6">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>
    <div className="col-md-6">
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>
    <div className="col-md-6">
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>
    <div className="col-md-6">
      <input
        type="number"
        name="distance"
        placeholder="Distance"
        value={formData.distance}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>
    <div className="col-md-6">
      <input
        type="file"
        onChange={handleImageUpload}
        className="form-control"
        accept="image/*"
        required={!formData.photo}
      />
    </div>
    <div className="col-md-6">
      {uploading && <p className="text-info">Uploading...</p>}
      {formData.photo && (
        <img src={formData.photo} alt="Uploaded" className="img-thumbnail" style={{ height: "80px" }} />
      )}
    </div>
    <div className="col-12">
      <textarea
        name="desc"
        placeholder="Description"
        value={formData.desc}
        onChange={handleChange}
        className="form-control"
        rows="3"
        required
      ></textarea>
    </div>
    <div className="col-md-6">
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>
    <div className="col-md-6">
      <input
        type="number"
        name="maxGroupSize"
        placeholder="Max Group Size"
        value={formData.maxGroupSize}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>
    <div className="col-12">
      <div className="form-check">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="form-check-input"
          id="featuredCheckbox"
        />
        <label htmlFor="featuredCheckbox" className="form-check-label">
          Featured
        </label>
      </div>
    </div>
  </div>
  <div className="mt-4 text-center">
    <button type="submit" className="btn btn-success px-4 py-2">
      {editTourId ? "Update Tour" : "Create Tour"}
    </button>
  </div>
</form>


      {/* Table Section */}
      <div className="table-responsive mt-4">
  <table className="table table-bordered table-striped table-hover shadow-sm">
    <thead className="bg-primary text-white text-center">
      <tr>
        <th scope="col">Title</th>
        <th scope="col">City</th>
        <th scope="col">Price</th>
        <th scope="col">Featured</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {currentTours.map((tour, index) => (
        <tr key={tour._id} className="text-center align-middle">
          <td>{tour.title}</td>
          <td>{tour.city}</td>
          <td>${tour.price}</td>
          <td>{tour.featured ? "Yes" : "No"}</td>
          <td>
            <div className="d-flex justify-content-center gap-2">
              <button
                onClick={() => handleEdit(tour)}
                className="btn btn-sm btn-warning text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tour._id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-3">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => changePage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${
                currentPage === i + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => changePage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => changePage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      <div className="table-responsive mt-4">
  <table className="table table-bordered table-striped table-hover shadow-sm">
    <thead className="bg-primary text-white text-center">
      <tr>
        <th scope="col">Sl. No</th>
        <th scope="col">Tour Name</th>
        <th scope="col">Full Name</th>
        <th scope="col">Guests</th>
        <th scope="col">Phone</th>
        <th scope="col">Booking Date</th>
        {/* <th scope="col">Actions</th> */}
      </tr>
    </thead>
    <tbody>
      {visibleBookings
        .sort(() => Math.random() - 0.5) // Shuffle the bookings randomly
        .map((tour, index) => (
          <tr key={tour._id} className="text-center align-middle">
            <td>{index + 1}</td>
            <td>{tour.tourName}</td>
            <td>{tour.fullName}</td>
            <td>{tour.guestSize}</td>
            <td>{tour.phone}</td>
            <td>{new Date(tour.bookAt).toLocaleDateString()}</td>
            {/* <td>
              <div className="d-flex justify-content-center gap-2">
                <button
                  onClick={() => handleEdit(tour)}
                  className="btn btn-sm btn-warning text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tour._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </td> */}
          </tr>
        ))}
    </tbody>
  </table>
</div>
<nav aria-label="Page navigation">
  <ul className="pagination justify-content-center mt-3">
    <li className={`page-item ${activePage === 1 ? "disabled" : ""}`}>
      <button
        className="page-link"
        onClick={() => handlePageChange(activePage - 1)}
      >
        Previous
      </button>
    </li>
    {Array.from({ length: totalPageCount }, (_, i) => (
      <li
        key={i + 1}
        className={`page-item ${activePage === i + 1 ? "active" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      </li>
    ))}
    <li
      className={`page-item ${activePage === totalPageCount ? "disabled" : ""}`}
    >
      <button
        className="page-link"
        onClick={() => handlePageChange(activePage + 1)}
      >
        Next
      </button>
    </li>
  </ul>
</nav>


    </div>
  );
};

export default AdminPage;
