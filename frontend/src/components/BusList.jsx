import React from "react";

import Button from "./Button";

import {

 Bus,

 Users,

 UserCheck,

 MapPin,

 Navigation,

 Trash2,

 Plus,

 Filter,

} from "lucide-react";

export default function BusList({

 buses,

 onDelete,

 onAddNewBus,

 onAssignRoute,

 onFilter,

}) {

 return (

  <div className="container mx-auto px-6 py-8 max-w-full">

   <div className="flex justify-between items-center mb-8">

    <h2 className="text-2xl font-bold text-gray-900"></h2>

    <div className="flex gap-4">

    
     <Button

      onClick={onAddNewBus}

      className="px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"

      style={{

       backgroundColor: "#fbbf24",

       color: "black",

      }}

      onMouseOver={(e) => (e.target.style.backgroundColor = "#f59e0b")}

      onMouseOut={(e) => (e.target.style.backgroundColor = "#fbbf24")}

     >

      <Plus className="w-5 h-5" />

      Add New Bus

     </Button>

    </div>

   </div>

   <div className="space-y-6">

    <div className="space-y-4">

     {buses.map((bus) => (

      <div key={bus.busId} className="bg-white rounded-lg shadow p-6">

       <div className="grid grid-cols-12 gap-8 items-center">

        <div className="col-span-2">

         <h3 className="text-sm uppercase tracking-wider font-bold text-gray-900 mb-2 flex items-center gap-2">

          <Bus className="w-5 h-5 text-blue-600" />

          Bus Reg Number

         </h3>

         <p className="text-gray-600 text-base">{bus.busId}</p>

        </div>

        <div className="col-span-2">

         <h3 className="text-sm uppercase tracking-wider font-bold text-gray-900 mb-2 flex items-center gap-2">

          <Users className="w-5 h-5 text-blue-600" />

          Capacity

         </h3>

         <p className="text-gray-600 text-base">{bus.seatCapacity}</p>

        </div>

        <div className="col-span-2">

         <h3 className="text-sm uppercase tracking-wider font-bold text-gray-900 mb-2 flex items-center gap-2">

          <UserCheck className="w-5 h-5 text-blue-600" />

          Occupancy

         </h3>

         <p className="text-gray-600 text-base">

          {bus.currentOccupancy}

         </p>

        </div> 

        

        <div className="col-span-2">

         <h3 className="text-sm uppercase tracking-wider font-bold text-gray-900 mb-2 flex items-center gap-2">

          <MapPin className="w-5 h-5 text-blue-600" />

          Location

         </h3>

         <p className="text-gray-600 text-base">

         {(() => {
                  try {
                    const parsedLocation = JSON.parse(bus.currentLocation)?.currentLocation;
                    return parsedLocation || bus.currentLocation; // Return parsed value or fallback
                  } catch (e) {
                    return bus.currentLocation || "Unknown"; // Fallback for invalid JSON
                  }
                })()}
         </p>

        </div>

        <div className="col-span-2">

         <h3 className="text-sm uppercase tracking-wider font-bold text-gray-900 mb-2 flex items-center gap-2">

          <Navigation className="w-5 h-5 text-blue-600" />

          Route Number

         </h3>

         <div className="text-gray-600 text-base">

          {(bus.routeId && bus.routeId !== "null") ? (

           bus.routeId

          ) : (

           <Button onClick={() => onAssignRoute(bus.busId)}>

            Assign Route

           </Button>

          )}

         </div>

        </div>

        <div className="col-span-2 flex items-center justify-end space-x-4">

         <Button

          variant="danger"

          onClick={() => onDelete(bus.busId)}

          className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 hover:shadow-md"

          title="Delete"

         >

          <Trash2 className="w-5 h-5" />

         </Button>

        </div>

       </div>

      </div>

     ))}

    </div>

   </div>

  </div>

 );

}