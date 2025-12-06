package ris.recepti.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ris.recepti.dto.AuthResponse;
import ris.recepti.dto.LoginRequest;
import ris.recepti.dto.RegisterRequest;
import ris.recepti.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController { // kontroler koji prima HTTP zahteve za login/register, salje ih na AuthService za obradu, vraća AuthResponse sa tokenom i informacijama o korisniku
    @Autowired
    private AuthService authService;

    // REGISTRACIJA ENDPOINT
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        
        if(response.isSuccess()) {
            // 201
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        else {
            // 400
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // LOGIN ENDPOINT
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        if(response.isSuccess()) {
            // 200
            return ResponseEntity.ok(response);
        }
        else {
            // 401
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}