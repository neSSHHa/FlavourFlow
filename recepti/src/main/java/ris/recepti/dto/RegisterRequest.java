package ris.recepti.dto;

import lombok.Data;
import ris.recepti.vao.UserRole;

@Data
public class RegisterRequest {  // kaj se poslje pri registraciji; podatki za API
    private String username;
    private String password;
    private UserRole role;
}