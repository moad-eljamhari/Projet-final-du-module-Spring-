package com.example.userservice.controller;

import com.example.userservice.model.User;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:4200")  // Allow Angular frontend to access this endpoint
    public ResponseEntity<User> register(@RequestBody User user) {
        return new ResponseEntity<>(userService.register(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:4200")  // Allow Angular frontend to access this endpoint
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        logger.info("Login attempt for user: {}", user.getUsername());

        User foundUser = userService.findByUsername(user.getUsername());
        Map<String, Object> response = new HashMap<>();

        if (foundUser == null) {
            logger.warn("User not found: {}", user.getUsername());
            response.put("success", false);
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        if (!foundUser.getPassword().equals(user.getPassword())) {
            logger.warn("Incorrect password for user: {}", user.getUsername());
            response.put("success", false);
            response.put("message", "Incorrect password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        logger.info("Login successful for user: {}", user.getUsername());
        response.put("success", true);
        response.put("message", "Login successful");
        return ResponseEntity.ok(response);
    }

    // New endpoint to fetch user by username
    @GetMapping("/{username}")
    @CrossOrigin(origins = "http://localhost:4200")  // Allow Angular frontend to access this endpoint
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }
}
