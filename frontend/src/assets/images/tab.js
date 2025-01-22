import React, { useState } from "react";
import car1 from "../assets/images/crysta.jpeg";
import car2 from "../assets/images/toyota.jpeg";
import car3 from "../assets/images/glanza.jpeg";
import car4 from "../assets/images/brezza.jpeg";
import car5 from "../assets/images/force.jpeg";
import car6 from "../assets/images/scorpio.jpeg";
import car7 from "../assets/images/force1.jpeg";

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
    // Check if clicked outside the modal (background)
    if (e.target === e.currentTarget) {
      setSelectedCar(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-8 px-2 text-center uppercase text-orange-600">
        Wide Range Of Vehicles
      </h1>

      {/* Filter buttons */}
      <div className="mb-4 flex flex-col sm:flex-row justify-center ">
        {[
          {
            name: "All",
            value: "all",
            color: "blue-500",
            hoverColor: "blue-600",
          },
          {
            name: "Mahindra",
            value: "Mahindra",
            color: "purple-500",
            hoverColor: "purple-600",
          },
          {
            name: "Suzuki",
            value: "suzuki",
            color: "yellow-500",
            hoverColor: "yellow-600",
          },
          {
            name: "Toyota",
            value: "toyota",
            color: "green-500",
            hoverColor: "green-600",
          },
          {
            name: "Force",
            value: "Force",
            color: "red-500",
            hoverColor: "red-600",
          },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 rounded-lg m-2 ${
              filter === tab.value
                ? `text-white bg-${tab.color}`
                : `text-black border  border-${tab.color} hover:bg-${tab.hoverColor} hover:text-white`
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Car Grid */}
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 ">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="relative overflow-hidden rounded-lg shadow-xl hover:bg-black hover:opacity-50 cursor-pointer"
            onClick={() => openLightbox(car)}
          >
            <img
              src={car.imgSrc}
              alt={car.category}
              className="w-full h-72 object-cover rounded-t-lg hover:shadow-lg hover:bg-black hover:opacity-10"
              // Open lightbox on click
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-4xl">+</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedCar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <div className="relative">
            <img
              src={selectedCar.imgSrc}
              alt="Selected Car"
              className=" max-h-[400px] rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-black text-3xl"
              onClick={closeLightbox}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tabs;
