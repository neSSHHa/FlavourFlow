package ris.recepti.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ris.recepti.dao.UserRepository;
import ris.recepti.dto.AuthResponse;
import ris.recepti.dto.LoginRequest;
import ris.recepti.dto.RegisterRequest;
import ris.recepti.vao.UserRole;
import ris.recepti.vao.User;

@Service
public class AuthService {  // servis koji sadrzi logiku za registraciju i login korsnika
    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();    // hashuje lozinku korinsika sa BCrypt algoritmom

    @Autowired
    private JwtService jwtService;  // za generisanje JWT tokena

    // REGISTER
    public AuthResponse register(RegisterRequest request) {
        // Proveri da li korisnik sa tim username-om vec postoji
        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse(null, null, null, null, "Username already exists", false);
        }

        // Proveri da li username nije prazan ili null
        if(request.getUsername()==null  || request.getUsername().trim().isEmpty()) {
            return new AuthResponse(null, null, null, null, "Username is required", false);
        }

        // Proveri da li je password prazan ili nije dovoljno dug
        if(request.getPassword()==null || request.getPassword().length()<4) {
            return new AuthResponse(null, null, null, null, "Password must be at least 4 characters long", false);
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        UserRole role = (request.getRole() != null) ? request.getRole() : UserRole.USER;
        
        User newUser = new User(request.getUsername(), hashedPassword, role);
        User savedUser = userRepository.save(newUser);  // sacuvaj korisnika u bazu

        // Generisi JWT token za novog korisnika
        String token = jwtService.generateToken(
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getRole()
        );

        // Vrati uspesan odgovor sa tokenom i informacijama o korisniku
        return new AuthResponse(
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getRole(),
            token,
            "Registration successful",
            true
        );
    }

    // LOGIN
    public AuthResponse login(LoginRequest request) {

        // Najdi korisnika po username-u
        User user = userRepository.findByUsername(request.getUsername());

        if(user==null) {
            return new AuthResponse(null, null, null, null, "Invalid username or password", false);
        }

        // Proveri da li je password ispravan
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(null, null, null, null, "Invalid username or password", false);
        }

        // Lozinka je ispravna, generisi JWT token
        String token = jwtService.generateToken(
            user.getId(),
            user.getUsername(),
            user.getRole()
        );

        return new AuthResponse(
            user.getId(),
            user.getUsername(),
            user.getRole(),
            token,
            "Login successful",
            true
        );
    }

}