package com.example.reviewservice.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF protection (use cautiously)
                .authorizeRequests(auth -> auth
                        .requestMatchers("/reviews/add", "/reviews/movie/**", "/reviews/user/**", "/reviews/update/**").permitAll() // Allow unauthenticated access to review-related endpoints
                        .anyRequest().authenticated() // Secure other endpoints
                );

        return http.build();
    }
}
