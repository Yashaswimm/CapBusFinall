package com.capstoneproj.bus_service.service;

import com.capstoneproj.bus_service.client.AdminClient;
import com.capstoneproj.bus_service.client.RouteClient;
import com.capstoneproj.bus_service.dto.RouteDto;
import com.capstoneproj.bus_service.entity.Bus;
import com.capstoneproj.bus_service.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BusService {

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private AdminClient adminClient;

    @Autowired
    RouteClient routeClient;

    private static final int LOW_OCCUPANCY_THRESHOLD = 10;  // Threshold for adding a bus
    private static final int HIGH_OCCUPANCY_THRESHOLD = 30; // Threshold for deleting a bus
    private static final int MAX_CONSECUTIVE_STOPS = 3;     // Number of consecutive stops for threshold check

    private int consecutiveLowOccupancyStops = 0;


    // Add a new bus
    public Bus addBus(Bus bus) {
        bus.setCurrentOccupancy(bus.getSeatCapacity());
        // Initialize occupancy to zero
        return busRepository.save(bus);
    }

    // Delete a bus
    public void deleteBus(String busId) {
        if (!busRepository.existsById(busId)) {
            throw new RuntimeException("Bus not found");
        }
        busRepository.deleteById(busId);
    }


    //update busoccupancy when passenger is boarding

        public void busBoard(String busId)
        {
            Optional<Bus> bus=busRepository.findById(busId);
            RouteDto route = routeClient.getRouteById(bus.get().getRouteId());


            int routeTraffic = route.getRouteTraffic() + 1;
            route.setRouteTraffic(routeTraffic);
            routeClient.updateRoute(route.getRouteId(),route);
            if(bus.isPresent())
            {
                bus.get().setCurrentOccupancy((bus.get().getCurrentOccupancy())-1);
                busRepository.save(bus.get());
            }

        }

    //update busoccupancy when passenger is deboarding
    public void busDeBoard(String busId)
    {
        Optional<Bus> bus=busRepository.findById(busId);
        RouteDto route = routeClient.getRouteById(bus.get().getRouteId());
        int routeTraffic = route.getRouteTraffic() - 1;
        route.setRouteTraffic(routeTraffic);
        routeClient.updateRoute(route.getRouteId(),route);
        if(bus.isPresent())
        {
            bus.get().setCurrentOccupancy((bus.get().getCurrentOccupancy())+ 1);
            busRepository.save(bus.get());
        }

    }
    // Get buses by routeId
    public List<Bus> getBusesByRouteId(String routeId) {
        return busRepository.findAll().stream()
                .filter(bus -> routeId.equals(bus.getRouteId()))
                .collect(Collectors.toList());
    }




    //Get all Buses
    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }
   //----------------------
    //Shreyacode
   // Update bus details
   public Bus updateBus(String busId, Bus busDetails) {
       Bus bus = busRepository.findById(busId)
               .orElseThrow(() -> new RuntimeException("Bus not found"));
       bus.setCurrentLocation(busDetails.getCurrentLocation());
       // bus.setCurrentOccupancy(busDetails.getCurrentOccupancy());

       List<Integer> listo = bus.getOccupancyHistory();
       int newOccupancy = bus.getCurrentOccupancy();
       if (shouldNotifyAdmin(bus)) {
           bus.getOccupancyHistory().clear();
           notifyAdminToAddBus(bus);
       }
       if((newOccupancy <=10 || newOccupancy ==0) && listo != null ) {
           listo.add(newOccupancy);
       }
       if(bus.getCurrentOccupancy() >=10){
           bus.getOccupancyHistory().clear();
       }
       bus.setOccupancyHistory(listo);
       busRepository.save(bus);
       return bus;


   }


    //Check if the bus has low occupancy for 3 consecutive stops
    private boolean shouldNotifyAdmin(Bus bus) {
        List<Integer> occupancyHistory = bus.getOccupancyHistory();
        if(occupancyHistory != null)
            return occupancyHistory.size() == 3 && occupancyHistory.stream().allMatch(o -> o <= 10);
        else
            return false;
    }

    // Notify admin to add a new bus if occupancy is low
    public void notifyAdminToAddBus(Bus bus) {
        adminClient.notifyAdminToAddBus(bus.getRouteId());
    }

    public String findIdleBus(){
        List<Bus> idleBuses=  busRepository.findByRouteIdIsNull();
        if( !idleBuses.isEmpty() && idleBuses != null){
            return idleBuses.get(0).getBusId();
        }
        else return "there are no idle buses available at the current moment";
    }

    public Bus getBusById(String busId){
        return  busRepository.findById(busId).orElse(null);
    }

  public  String updateBusByRoute(String busId, String routeId){
        Bus bus1 = busRepository.findById(busId).orElse(null);
        bus1.setRouteId(routeId);
        busRepository.save(bus1);
        return "Bus updated";
  }
}
