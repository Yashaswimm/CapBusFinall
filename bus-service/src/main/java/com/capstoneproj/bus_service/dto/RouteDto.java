package com.capstoneproj.bus_service.dto;

import java.util.List;

public class RouteDto {

    private String routeId;
    private String routeSource;
    private String routeDestination;
    private List<String> routeStops;
    private int routeCapacity;
    private int routeTraffic ;


    // Default constructor
    public RouteDto() {}

    public int getRouteCapacity() {
        return routeCapacity;
    }

    public void setRouteCapacity(int routeCapacity) {
        this.routeCapacity = routeCapacity;
    }

    public int getRouteTraffic() {
        return routeTraffic;
    }

    public void setRouteTraffic(int routeTraffic) {
        this.routeTraffic = routeTraffic;
    }

    // Constructor to initialize all fields
    public RouteDto(String routeId, String routeSource, String routeDestination, List<String> routeStops) {
        this.routeId = routeId;
        this.routeSource = routeSource;
        this.routeDestination = routeDestination;
        this.routeStops = routeStops;
    }

    // Getters and Setters
    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getRouteSource() {
        return routeSource;
    }

    public void setRouteSource(String routeSource) {
        this.routeSource = routeSource;
    }

    public String getRouteDestination() {
        return routeDestination;
    }

    public void setRouteDestination(String routeDestination) {
        this.routeDestination = routeDestination;
    }

    public List<String> getRouteStops() {
        return routeStops;
    }

    public void setRouteStops(List<String> routeStops) {
        this.routeStops = routeStops;
    }


}
