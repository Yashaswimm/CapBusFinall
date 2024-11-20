import React from "react";

import Button from "./Button";

import {

 PenLine,

 Trash2,

 Plus,

 MapPin,

 Navigation,

 Lollipop,

} from "lucide-react";

export default function RouteList({ routes, onEdit, onDelete, onAddNewRoute }) {

 return (

  <div className="container mx-auto px-6 py-8 max-w-full">

   <div className="flex justify-between items-center mb-8">

    <h2 className="text-2xl font-bold text-gray-900"></h2>

    <Button

     onClick={onAddNewRoute}

     className="px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"

     style={{

      backgroundColor: '#fbbf24', // amber-400 - bright yellow

      color: 'black',

     }}

     onMouseOver={(e) => e.target.style.backgroundColor = '#f59e0b'} // amber-500 - slightly darker yellow for hover

     onMouseOut={(e) => e.target.style.backgroundColor = '#fbbf24'}

    >

     <Plus className="w-5 h-5" />

     Add New Route

    </Button>

   </div>

   <div className="space-y-6">

    {routes.map((route) => (

     <div

      key={route.routeId}

      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"

     >

      <div className="grid grid-cols-12 gap-8 items-center">

       <div className="col-span-2">

        <h3 className="text-sm uppercase tracking-wider font-bold text-gray-900 mb-2 flex items-center gap-2">

         <Navigation className="w-5 h-5 text-blue-600" />

         Route ID

        </h3>

        <p className="text-gray-600 text-base">{route.routeId}</p>

       </div>

       <div className="col-span-2">

        <h3 className="text-sm uppercase tracking-wider font-bold text-gray-900 mb-2 flex items-center gap-2">

         <MapPin className="w-5 h-5 text-blue-600" />

         Source

        </h3>

        <p className="text-gray-600 text-base">{route.routeSource}</p>

       </div>

       <div className="col-span-2">

        <h3 className="text-sm uppercase tracking-wider font-bold text-gray-900 mb-2 flex items-center gap-2">

         <MapPin className="w-5 h-5 text-blue-600" />

         Destination

        </h3>

        <p className="text-gray-600 text-base">

         {route.routeDestination}

        </p>

       </div>

       <div className="col-span-4">

        <h3 className="text-sm uppercase tracking-wider font-bold text-gray-900 mb-2 flex items-center gap-2">

         <Lollipop className="w-5 h-5 text-blue-600" />

         Stops

        </h3>

        <p className="text-gray-600 text-base">

         {route.routeStops.join(" • ")}

        </p>

       </div>

       <div className="col-span-2 flex items-center justify-end space-x-4">

        <Button

         variant="secondary"

         onClick={() => onEdit(route)}

         className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 hover:shadow-md"

         title="Edit"

        >

         <PenLine className="w-5 h-5" />

        </Button>

        <Button

         variant="danger"

         onClick={() => onDelete(route.routeId)}

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

 );

}

