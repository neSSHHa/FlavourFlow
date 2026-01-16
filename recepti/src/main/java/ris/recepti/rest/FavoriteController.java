package ris.recepti.rest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import ris.recepti.dao.FavoriteRepository;
import ris.recepti.dao.RecipeRepository;
import ris.recepti.dao.UserRepository;
import ris.recepti.service.JwtService;
import ris.recepti.vao.Favorite;
import ris.recepti.vao.Recipe;
import ris.recepti.vao.User;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private JwtService jwtService;

    // Helper metoda za ekstraktovanje tokena iz header-a
    private String extractToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }

    // Helper metoda za dobijanje userId iz tokena
    private Long getUserIdFromRequest(String authHeader) {
        String token = extractToken(authHeader);
        if (token == null) {
            return null;
        }
        return jwtService.getUserIdFromToken(token);
    }

    // POST /api/favorites/{recipeId} - Dodaj recept med priljubljene
    @PostMapping("/{recipeId}")
    public ResponseEntity<Void> addFavorite(
            @PathVariable Long recipeId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        Long userId = getUserIdFromRequest(authHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userRepository.findById(userId).orElse(null);
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        if (user == null || recipe == null) {
            return ResponseEntity.notFound().build();
        }

        // Proveri da li već postoji
        if (favoriteRepository.findByUserAndRecipe(user, recipe).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409 Already exists
        }

        // Kreiraj novi favorite
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setRecipe(recipe);
        favoriteRepository.save(favorite);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // DELETE /api/favorites/{recipeId} - Odstrani recept iz priljubljenih
    @DeleteMapping("/{recipeId}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long recipeId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        Long userId = getUserIdFromRequest(authHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userRepository.findById(userId).orElse(null);
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        if (user == null || recipe == null) {
            return ResponseEntity.notFound().build();
        }

        // Pronađi favorite i obriši ga
        Optional<Favorite> favorite = favoriteRepository.findByUserAndRecipe(user, recipe);
        if (favorite.isPresent()) {
            favoriteRepository.delete(favorite.get());
        }
        
        return ResponseEntity.noContent().build();
    }

    // GET /api/favorites - Pridobi seznam priljubljenih receptov
    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<List<Recipe>> getFavorites(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        Long userId = getUserIdFromRequest(authHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Favorite> favorites = favoriteRepository.findByUser(user);
        List<Recipe> recipes = favorites.stream()
                .map(fav -> {
                    // Eksplicitno učitaj Recipe iz repository-ja da bi se svi podaci pravilno učitali
                    Recipe recipe = recipeRepository.findById(fav.getRecipe().getId()).orElse(null);
                    if (recipe != null) {
                        // Eksplicitno učitaj ingredients listu da bi se izbegao lazy loading problem
                        recipe.getIngredients().size(); // Trigger lazy loading
                        // Ukloni Hibernate proxy wrapper ako postoji
                        if (recipe instanceof HibernateProxy) {
                            recipe = (Recipe) ((HibernateProxy) recipe).getHibernateLazyInitializer().getImplementation();
                        }
                    }
                    return recipe;
                })
                .filter(recipe -> recipe != null) // Ukloni null vrednosti ako neki recipe ne postoji
                .collect(Collectors.toList());

        return ResponseEntity.ok(recipes);
    }
}