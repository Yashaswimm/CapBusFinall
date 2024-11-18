package com.capstoneproj.route_service.entity;



import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document()
@Data
public class Route {

    @Id
    private String routeId;
    private String routeSource;
    private String routeDestination;
    private List<String> routeStops;
    private int routeCapacity =0; // depends on the number of buses on the route
    // 3 bus with 30 capacity each so 3*30 = 120 total capacity
    private int routeTraffic = 0;

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

