import React from "react";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { Bus as BusIcon } from "lucide-react";

import { RouteStopsModal } from "../components/RouteStopsModal";
import { api } from "../components/api";
import { BusCard } from "../components/BusCard";

const queryClient = new QueryClient();

function BusOperatorDashboard() {
  const [selectedBus, setSelectedBus] = React.useState(null);
  const [selectedRoute, setSelectedRoute] = React.useState(null);

  const { data: buses, isLoading } = useQuery({
    queryKey: ["buses"],
    queryFn: api.getAllBuses,
  });

  const { mutate: updateBusLocation } = useMutation({
    mutationFn: ({ busId, location }) => api.updateBus(busId, { currentLocation: location }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      toast.success("Bus location updated successfully");
    },
    onError: () => {
      toast.error("Failed to update bus location");
    },
  });

  const handleViewRoute = async (bus) => {
    try {
      const route = await api.getRouteById(bus.routeId);
      setSelectedBus(bus);
      setSelectedRoute(route);
    } catch (error) {
      toast.error("Failed to load route details");
    }
  };

  const handleLocationUpdate = (stopName) => {
    if (selectedBus) {
      updateBusLocation({ busId: selectedBus.busId, location: stopName });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <BusIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Bus Operator Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses?.map((bus, index) => (
            <BusCard
              key={bus.busId || index} // Use index as a fallback if busId is undefined
              bus={bus}
              onViewRoute={() => handleViewRoute(bus)}
            />
          ))}
        </div>

        {selectedBus && selectedRoute && (
          <RouteStopsModal
            route={selectedRoute}
            bus={selectedBus}
            onClose={() => {
              setSelectedBus(null);
              setSelectedRoute(null);
            }}
            onLocationUpdate={handleLocationUpdate} // Pass the location update handler
          />
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default BusOperatorDashboard;
