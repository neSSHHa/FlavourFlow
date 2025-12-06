package ris.recepti.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ris.recepti.vao.UserRole;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse { // Objekat koji backend vraća frontend-u nakon registracije ili login-a
    private Long userId;
    private String username;
    private UserRole role;
    private String token;
    private String message;
    private boolean success;
}