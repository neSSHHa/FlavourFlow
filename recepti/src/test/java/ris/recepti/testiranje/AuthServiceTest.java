package ris.recepti.testiranje;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.test.util.ReflectionTestUtils;

import ris.recepti.service.AuthService;
import ris.recepti.service.JwtService;
import ris.recepti.dao.UserRepository;
import ris.recepti.dto.AuthResponse;
import ris.recepti.dto.RegisterRequest;
import ris.recepti.vao.User;
import ris.recepti.vao.UserRole;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * UNIT TESTI za AuthService
 * Testiramo logiko registracije uporabnika
 */
@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    // MOCK objekti (ponarejene odvisnosti)
    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    // Razred, ki ga testiramo
    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setup() {
        // ročno nastavimo mocke v AuthService
        ReflectionTestUtils.setField(authService, "userRepository", userRepository);
        ReflectionTestUtils.setField(authService, "jwtService", jwtService);
    }

    /**
     * NEGATIVEN TEST
     * Registracija NE uspe, če je uporabniško ime prazno
     */
    @Test
    @DisplayName("REGISTER – neuspešno: prazen uporabniški naziv")
    void register_fail_whenUsernameIsEmpty() {

        // ARRANGE – pripravimo vhodne podatke
        RegisterRequest request = new RegisterRequest();
        request.setUsername("");
        request.setPassword("1234");

        when(userRepository.existsByUsername(anyString()))
                .thenReturn(false);

        // ACT – poklicemo metodo
        AuthResponse response = authService.register(request);

        // ASSERT – preverimo rezultat
        assertFalse(response.isSuccess());
        assertEquals("Username is required", response.getMessage());
        assertNull(response.getToken());

        // preverimo, da se NI zgodilo shranjevanje
        verify(userRepository, never()).save(any());
        verify(jwtService, never()).generateToken(any(), any(), any());
    }

    /**
     * POZITIVEN TEST
     * Registracija uspe, če so podatki pravilni
     */
    @Test
    @DisplayName("REGISTER – uspešno: veljavni podatki")
    void register_success_whenDataIsValid() {

        // ARRANGE
        RegisterRequest request = new RegisterRequest();
        request.setUsername("ana");
        request.setPassword("1234");

        when(userRepository.existsByUsername("ana"))
                .thenReturn(false);

        User savedUser = new User("ana", "hashed", UserRole.USER);
        savedUser.setId(1L);

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

        when(jwtService.generateToken(1L, "ana", UserRole.USER))
                .thenReturn("TEST_TOKEN");

        // ACT
        AuthResponse response = authService.register(request);

        // ASSERT
        assertTrue(response.isSuccess());
        assertEquals("Registration successful", response.getMessage());
        assertEquals(1L, response.getUserId());
        assertEquals("ana", response.getUsername());
        assertEquals("TEST_TOKEN", response.getToken());

        verify(userRepository).save(any(User.class));
        verify(jwtService).generateToken(1L, "ana", UserRole.USER);
    }
}
