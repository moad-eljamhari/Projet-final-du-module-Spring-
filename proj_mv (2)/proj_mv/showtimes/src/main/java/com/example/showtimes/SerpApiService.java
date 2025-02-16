package com.example.showtimes;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class SerpApiService {
    private static final String API_KEY = "a473abdcbecc914938eadd3dd10c05a41e5f75f294835a56eeb7c0a87b04a37f";
    private static final String BASE_URL = "https://serpapi.com/search";

    private final RestTemplate restTemplate;

    public SerpApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // Existing method for general showtimes
    public Map<String, Object> getShowtimes(String location) {
        String url = String.format("%s?q=showtimes&location=%s&hl=en&gl=us&api_key=%s", BASE_URL, location, API_KEY);
        return restTemplate.getForObject(url, Map.class);
    }

    // New method for theater-specific showtimes
    public Map<String, Object> getTheaterShowtimes(String theaterName, String location) {
        String url = String.format("%s?q=%s&location=%s&hl=en&gl=us&api_key=%s",
                BASE_URL, theaterName.replace(" ", "+"), location, API_KEY);
        return restTemplate.getForObject(url, Map.class);
    }
}
