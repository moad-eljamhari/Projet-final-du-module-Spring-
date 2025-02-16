package com.example.showtime;

public interface ShowtimeService {
    String getCineplexChains();

    String listCountries(String sort);

    String getCountryDetails(String countryCode);

    String getFilmDetails(String filmId);

    String listFilms(String sort);

    String getShowtimeDetails(String showtimeId);

    String getTheaterDetails(String theaterId);
}