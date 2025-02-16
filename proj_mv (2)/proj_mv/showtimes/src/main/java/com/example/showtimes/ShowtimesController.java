package com.example.showtimes;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/showtimes")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend
public class ShowtimesController {

    private final SerpApiService serpApiService;

    public ShowtimesController(SerpApiService serpApiService) {
        this.serpApiService = serpApiService;
    }

    // Existing endpoint for general showtimes
    @GetMapping
    public Map<String, Object> getShowtimes(@RequestParam String location) {
        return serpApiService.getShowtimes(location);
    }

    // New endpoint for theater-specific showtimes
    @GetMapping("/theater")
    public Map<String, Object> getTheaterShowtimes(
            @RequestParam String theaterName,
            @RequestParam String location
    ) {
        return serpApiService.getTheaterShowtimes(theaterName, location);
    }
}
