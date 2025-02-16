package com.example.showtime;

import com.example.showtime.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class ShowtimeServiceImpl implements ShowtimeService {

    private static final String BASE_URL = "https://showtime-api.p.rapidapi.com/api/v1";
    private static final String API_KEY = "d621f2344dmshc2da89bfa9108dcp116ad6jsn942be808de1e";
    private static final String API_HOST = "showtime-api.p.rapidapi.com";

    private final RestTemplate restTemplate;

    public ShowtimeServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", API_KEY);
        headers.set("x-rapidapi-host", API_HOST);
        return headers;
    }

    @Override
    public String getCineplexChains() {
        String url = BASE_URL + "/chains/cineplex";
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    @Override
    public String listCountries(String sort) {
        String url = BASE_URL + "/countries" + (sort != null ? "?sort=" + sort : "");
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    @Override
    public String getCountryDetails(String countryCode) {
        String url = BASE_URL + "/countries/" + countryCode;
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    @Override
    public String getFilmDetails(String filmId) {
        String url = BASE_URL + "/films/" + filmId;
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    @Override
    public String listFilms(String sort) {
        String url = BASE_URL + "/films" + (sort != null ? "?sort=" + sort : "");
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    @Override
    public String getShowtimeDetails(String showtimeId) {
        String url = BASE_URL + "/showtimes/" + showtimeId;
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    @Override
    public String getTheaterDetails(String theaterId) {
        String url = BASE_URL + "/theaters/" + theaterId;
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }
}
