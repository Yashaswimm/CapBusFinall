package com.capstoneproj.bus_service.controller;

import com.capstoneproj.bus_service.client.RouteClient;
import com.capstoneproj.bus_service.dto.RouteDto;
import com.capstoneproj.bus_service.entity.Bus;
import com.capstoneproj.bus_service.repository.BusRepository;
import com.capstoneproj.bus_service.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/buses")

public class BusController {

    @Autowired
    private BusService busService;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private RouteClient routeClient;

    // Add a new bus
    @PostMapping
    public ResponseEntity<Bus> addBus(@RequestBody Bus bus) {
        Bus savedBus = busService.addBus(bus);
        return ResponseEntity.ok(savedBus);
    }

    // Delete a bus
    @DeleteMapping("/{busId}")
    public ResponseEntity<Void> deleteBus(@PathVariable String busId) {
        busService.deleteBus(busId);
        return ResponseEntity.noContent().build();
    }

    // Update a bus
    @PutMapping("/{busId}")
    public ResponseEntity<Bus> updateBus(@PathVariable String busId, @RequestBody Bus busDetails) {
        Bus updatedBus = busService.updateBus(busId, busDetails);
        return ResponseEntity.ok(updatedBus);
    }

    @GetMapping("/route/{routeId}")
    public ResponseEntity<List<Bus>> getBusesByRoute(@PathVariable String routeId) {
        List<Bus> buses = busService.getBusesByRouteId(routeId);
        return ResponseEntity.ok(buses);
    }

    @GetMapping("/allBuses")
    public ResponseEntity<List<Bus>> getAllBuses()
    {
        return ResponseEntity.ok(busService.getAllBuses());
    }

    @PutMapping("/busLocationUpdate/{busId}")
    public ResponseEntity<String> busLocationUpdate(@PathVariable String busId, @RequestBody String stopName) {
        Optional<Bus> busOpt = busRepository.findById(busId);
        if (busOpt.isPresent()) {
            Bus bus = busOpt.get();
            bus.setCurrentLocation(stopName); // Update current location with the stop name
            busRepository.save(bus);
            return ResponseEntity.ok("Bus location updated successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bus not found");
    }

    @GetMapping("/bus/{busId}")
    public ResponseEntity<Bus> getBusById(@PathVariable String busId){
        return  new ResponseEntity<>(busService.getBusById(busId),HttpStatus.OK);
    }

    @PutMapping("/{busId}/board")
    public ResponseEntity<Void> busBoard(@PathVariable String busId){
         busService.busBoard(busId) ;
    return ResponseEntity.noContent().build();
    }

    @PutMapping("/{busId}/deboard")
    public ResponseEntity<Void> busDeBoard(@PathVariable String busId){
        busService.busDeBoard(busId); ;
        return ResponseEntity.noContent().build();
    }

    //update bus by route

    @PutMapping("/updateRoute/{busId}/{routeId}")
    public String updateBusByRoute(@PathVariable String busId, @PathVariable String routeId) {
        busService.updateBusByRoute(busId, routeId);
        return "updated";
    }


    @DeleteMapping("/deleteRoute/{routeId}")
    public void  getBusesByRouteForDeleting(@PathVariable String routeId) {
        List<Bus> buses = busService.getBusesByRouteId(routeId);
        for(Bus bus:buses)
        {
            bus.setRouteId("null");
            busRepository.save(bus);
        }


    }



    @PutMapping("/setRouteToBus/{busId}/{routeId}")
    public void setRouteToBus(@PathVariable String busId,@PathVariable String routeId)
    {
        Optional<Bus> bus=busRepository.findById(busId);
        if(bus.isPresent())
        {
            bus.get().setRouteId(routeId);
            busRepository.save(bus.get());
        }
    }




    @GetMapping("/getIdleBus")
    public String getIdleBus(){
        return busService.findIdleBus();
    }




}
