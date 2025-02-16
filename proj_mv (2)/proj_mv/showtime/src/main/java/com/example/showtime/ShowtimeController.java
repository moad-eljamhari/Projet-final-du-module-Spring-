package com.example.showtime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/showtime")
@CrossOrigin(origins = "http://localhost:4200") // Replace with your Angular frontend URL
public class ShowtimeController {

    @Autowired
    private ShowtimeService showtimeService;

    @GetMapping("/chains/cineplex")
    public String getCineplexChains() {
        return showtimeService.getCineplexChains();
    }

    @GetMapping("/countries")
    public String listCountries(@RequestParam(value = "sort", required = false) String sort) {
        return showtimeService.listCountries(sort);
    }

    @GetMapping("/countries/{countryCode}")
    public String getCountryDetails(@PathVariable String countryCode) {
        return showtimeService.getCountryDetails(countryCode);
    }

    @GetMapping("/films/{filmId}")
    public String getFilmDetails(@PathVariable String filmId) {
        return showtimeService.getFilmDetails(filmId);
    }

    @GetMapping("/films")
    public String listFilms(@RequestParam(value = "sort", required = false) String sort) {
        return showtimeService.listFilms(sort);
    }

    @GetMapping("/showtimes/{showtimeId}")
    public String getShowtimeDetails(@PathVariable String showtimeId) {
        return showtimeService.getShowtimeDetails(showtimeId);
    }

    @GetMapping("/theaters/{theaterId}")
    public String getTheaterDetails(@PathVariable String theaterId) {
        return showtimeService.getTheaterDetails(theaterId);
    }
}
