import { useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

export const RouteStopsModal = ({ route, bus, onClose, onLocationUpdate }) => {
  let [selectedStops, setSelectedStops] = useState([]);
  let [nextStop, setNextStop] = useState(route.routeStops[0]);
  let [showConfetti, setShowConfetti] = useState(false); // State to trigger confetti
  const navigate = useNavigate(); // React Router navigation

  function handleChangeStop(stop) {
    console.log(stop);
    let allStops = [...route.routeStops];
    let index = allStops.indexOf(stop);
    let nextStop = allStops[index + 1];
    console.log("allStops in function:", allStops);
    console.log("next stopn in function:", nextStop);
    setNextStop(nextStop);
    setSelectedStops([...selectedStops, stop]);
    onLocationUpdate(stop);

    // Trigger confetti if the last stop is reached
    if (selectedStops.length + 1 === route.routeStops.length) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 20000); // Confetti duration: 5 seconds
    }
  }

  function handleLogout() {
    navigate("/"); // Navigate to home page
  }

  console.log("selectedStops:", selectedStops);
  console.log("nextStop:", nextStop);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}{" "}
      {/* Confetti animation */}
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Route Stops</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="w-6 h-6 text-gray-500">X</span>{" "}
              {/* Close icon as simple text */}
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-8rem)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">&#128205;</span>{" "}
              {/* Map Pin Emoji for "From" */}
              <span className="text-sm text-gray-600">
                From: {route.routeSource}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {route.routeStops.map((stop, index) => (
              <div
                key={`${stop}-${index}`}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    onChange={() => handleChangeStop(stop)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    checked={selectedStops.includes(stop) ? "checked" : ""}
                    disabled={nextStop == stop ? "" : "disabled"}
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{stop}</h4>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Stop #{index + 1}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-600">&#128205;</span>{" "}
            {/* Map Pin Emoji for "From" */}
            <span className="text-sm text-gray-600">
              To: {route.routeDestination}
            </span>
          </div>

          {/* Final Destination Message with Logout Button */}
          {selectedStops.length === route.routeStops.length && (
            <div className="mt-6 text-center">
              <span className="text-lg text-green-600 block mb-4">
                Reached Final Destination!!!!!
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
