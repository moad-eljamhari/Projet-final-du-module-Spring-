package com.example.recommendationservice.conf;

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
                        .requestMatchers("/recommendations/**").permitAll() // Allow unauthenticated access to recommendation endpoints
                        .anyRequest().authenticated() // Secure other endpoints (if any)
                );

        return http.build();
    }
}
