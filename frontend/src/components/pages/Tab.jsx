import React, { useState } from "react";
import car1 from "../../assets/images/crysta.jpeg";
import car2 from "../../assets/images/toyota.jpeg";
import car3 from "../../assets/images/glanza.jpeg";
import car4 from "../../assets/images/brezza.jpeg";
import car5 from "../../assets/images/force.jpeg";
import car6 from "../../assets/images/scorpio.jpeg";
import car7 from "../../assets/images/force1.jpeg";
import "../../styles/tab.css"
export const cars = [
  { id: 1, category: "toyota", imgSrc: car2 },
  { id: 2, category: "suzuki", imgSrc: car4 },
  {
    id: 3,
    category: "suzuki",
    imgSrc:
      "https://th.bing.com/th/id/OIP.jLRRwXXEj1ZhvVtE41h7igHaFD?rs=1&pid=ImgDetMain",
  },
  {
    id: 4,
    category: "Mahindra",
    imgSrc: "https://ashishtaxi.com/wp-content/uploads/2021/01/Scorpio.jpg",
  },
  { id: 5, category: "Mahindra", imgSrc: car6 },
  { id: 6, category: "toyota", imgSrc: car3 },
  { id: 7, category: "toyota", imgSrc: car1 },
  { id: 8, category: "Force", imgSrc: car5 },
  { id: 9, category: "Force", imgSrc: car7 },
];

function Tabs() {
  const [filter, setFilter] = useState("all");
  const [selectedCar, setSelectedCar] = useState(null);

  // Filter cars based on category
  const filteredCars =
    filter === "all" ? cars : cars.filter((car) => car.category === filter);

  // Handle image click to open lightbox
  const openLightbox = (car) => setSelectedCar(car);

  // Handle closing the lightbox
  const closeLightbox = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedCar(null);
    }
  };

  return (
    <div className="container my-4">
        <p className="m-0" style={{fontFamily:"Island Moments",
            fontSize: '2.2rem',
            fontWeight: '500',
            color: '#0634e0',
        }}>Vehicles</p>
      <h1 className="text-start text-black mb-4">Wide Range Of Vehicles</h1>

      {/* Filter buttons */}
      <div className="d-flex justify-content-start flex-wrap mb-4">
        {[
          { name: "All", value: "all", color: "primary" },
          { name: "Mahindra", value: "Mahindra", color: "secondary" },
          { name: "Suzuki", value: "suzuki", color: "warning" },
          { name: "Toyota", value: "toyota", color: "success" },
          { name: "Force", value: "Force", color: "danger" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`btn btn-${
              filter === tab.value ? tab.color : "outline-" + tab.color
            } m-2`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Car Grid */}
      <div className="row">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="col-12 col-sm-6 col-lg-4  mb-3"
            onClick={() => openLightbox(car)}
          >
            <div
              className="card position-relative"
              style={{
                cursor: "pointer",
              }}
            >
              <img
                src={car.imgSrc}
                alt={car.category}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="overlay position-absolute w-100 h-100 top-0 start-0 d-flex justify-content-center align-items-center">
                <span className="badge bg-dark text-white fs-4">+</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedCar && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={closeLightbox}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedCar(null)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedCar.imgSrc}
                  alt="Selected Car"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tabs;
