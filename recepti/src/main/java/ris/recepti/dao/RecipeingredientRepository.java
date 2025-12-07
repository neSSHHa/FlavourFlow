package ris.recepti.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ris.recepti.vao.Recipeingredient;
import ris.recepti.vao.ingredient;

import java.util.List;

public interface RecipeingredientRepository extends JpaRepository<Recipeingredient, Long> {
    List<Recipeingredient> findByIngredient(ingredient ingredient);
    void deleteByIngredient(ingredient ingredient);
}

