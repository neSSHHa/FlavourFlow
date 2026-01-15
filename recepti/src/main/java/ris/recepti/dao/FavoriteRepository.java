package ris.recepti.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ris.recepti.vao.Favorite;
import ris.recepti.vao.Recipe;
import ris.recepti.vao.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    
    // Poišči vse priljubljene recepte za določenega uporabnika
    List<Favorite> findByUser(User user);
    
    // Preveri ali je recept že med priljubljenimi za uporabnika
    Optional<Favorite> findByUserAndRecipe(User user, Recipe recipe);
    
    // Preveri ali obstaja priljubljeni recept
    boolean existsByUserIdAndRecipeId(Long userId, Long recipeId);
}

