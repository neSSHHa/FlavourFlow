package ris.recepti.service;

import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import ris.recepti.vao.UserRole;
import javax.crypto.SecretKey;

@Service
public class JwtService {
    private static final String SECRET_KEY = "mySecretKey123456789012345678901234567890";

    private static final long EXPIRATION_TIME = 86400000; // 24 hours

    public String generateToken(Long userId, String username, UserRole role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        return Jwts.builder()
            .subject(userId.toString())
            .claim("username", username)
            .claim("role", role.name())
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(key)
            .compact();
    }

    public boolean validateToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
            Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Long getUserIdFromToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
            Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();  // "telo" JWT tokena; JSON podatki so v objektu Claims
            return Long.parseLong(claims.getSubject()); // ID uporabnika je v subjectu
        } catch (Exception e) {
            return null;
        }
    }

    public String getUsernameFromToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
            Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
            return claims.get("username", String.class);
        } catch (Exception e) {
            return null;
        }
    }

    public UserRole getRoleFromToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
            Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

            String roleString = claims.get("role", String.class);
            return UserRole.valueOf(roleString); 
        } catch (Exception e) {
            return null;
        }
    }
}

