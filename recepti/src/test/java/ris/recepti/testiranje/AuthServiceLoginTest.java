package ris.recepti.testiranje;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import ris.recepti.service.AuthService;
import ris.recepti.service.JwtService;
import ris.recepti.dao.UserRepository;
import ris.recepti.dto.AuthResponse;
import ris.recepti.dto.LoginRequest;
import ris.recepti.vao.User;
import ris.recepti.vao.UserRole;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceLoginTest {

    
    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setup() {

        ReflectionTestUtils.setField(authService, "userRepository", userRepository);
        ReflectionTestUtils.setField(authService, "jwtService", jwtService);
        
        passwordEncoder = new BCryptPasswordEncoder();
        ReflectionTestUtils.setField(authService, "passwordEncoder", passwordEncoder);
    }

    //pozitivan test
    @Test
    @Tag("positive")
    @DisplayName("LOGIN – uspešno: ispravni username i password")
    void login_success_whenCredentialsAreValid() {
        //pripravimo vhodne podatke i mock 
        String username = "testuser";
        String rawPassword = "testpass123";
        String hashedPassword = passwordEncoder.encode(rawPassword);
        
        LoginRequest request = new LoginRequest();
        request.setUsername(username);
        request.setPassword(rawPassword);

        User existingUser = new User();
        existingUser.setId(1L);
        existingUser.setUsername(username);
        existingUser.setPassword(hashedPassword); 
        existingUser.setRole(UserRole.USER);

        when(userRepository.findByUsername(username))
                .thenReturn(existingUser);

        String expectedToken = "TEST_JWT_TOKEN_12345";
        when(jwtService.generateToken(1L, username, UserRole.USER))
                .thenReturn(expectedToken);

        AuthResponse response = authService.login(request);

        assertTrue(response.isSuccess(), "Login bi trebalo da bude uspešan");
        assertEquals("Login successful", response.getMessage(), 
                "Poruka bi trebala biti 'Login successful'");
        assertEquals(1L, response.getUserId(), 
                "User ID bi trebalo da bude 1L");
        assertEquals(username, response.getUsername(), 
                "Username bi trebalo da bude 'testuser'");
        assertEquals(UserRole.USER, response.getRole(), 
                "Role bi trebalo da bude USER");
        assertEquals(expectedToken, response.getToken(), 
                "Token bi trebalo da bude generisan");

        
        verify(userRepository, times(1)).findByUsername(username);
        verify(jwtService, times(1)).generateToken(1L, username, UserRole.USER);
    }

    //negativan test
    @Test
    @Tag("negative")
    @DisplayName("LOGIN – neuspešno: pogrešan password")
    void login_fail_whenPasswordIsIncorrect() {
        
        
        //pripravimo podatke sa pogrešnim passwordom
        String username = "testuser";
        String correctPassword = "correctpass123";
        String wrongPassword = "wrongpass123";
        String hashedPassword = passwordEncoder.encode(correctPassword); 
        
        LoginRequest request = new LoginRequest();
        request.setUsername(username);
        request.setPassword(wrongPassword); 

        User existingUser = new User();
        existingUser.setId(1L);
        existingUser.setUsername(username);
        existingUser.setPassword(hashedPassword); 
        existingUser.setRole(UserRole.USER);

        when(userRepository.findByUsername(username))
                .thenReturn(existingUser);

        AuthResponse response = authService.login(request);

        assertFalse(response.isSuccess(), 
                "Login bi trebalo da ne uspe zbog pogrešnog passworda");
        assertEquals("Invalid username or password", response.getMessage(), 
                "Poruka bi trebala biti 'Invalid username or password'");
        assertNull(response.getToken(), 
                "Token bi trebalo da bude null jer login nije uspeo");
        assertNull(response.getUserId(), 
                "User ID bi trebalo da bude null");
        assertNull(response.getUsername(), 
                "Username bi trebalo da bude null");

        verify(userRepository, times(1)).findByUsername(username);
        verify(jwtService, never()).generateToken(any(), any(), any());
    }
}
