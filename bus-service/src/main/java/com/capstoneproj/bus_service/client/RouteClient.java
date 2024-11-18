package com.capstoneproj.bus_service.client;

import com.capstoneproj.bus_service.dto.RouteDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "route-service",url = "http://localhost:8083/api/routes")
public interface RouteClient {



    @GetMapping("/{routeId}")
    RouteDto getRouteById(@PathVariable String routeId);

    @PutMapping("/{routeId}")
    RouteDto updateRoute(@PathVariable String routeId, @RequestBody RouteDto route);





}
