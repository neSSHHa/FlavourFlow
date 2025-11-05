package ris.recepti.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ris.recepti.vao.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByTitleContainingIgnoreCase(String keyword);

    List<Recipe> findByDurationMinutesLessThan(int minutes);
    List<Recipe> findByDurationMinutesGreaterThanEqual(int minutes);

    // v ozadju se ustvari
    // SELECT * FROM recipe WHERE LOWER(title) LIKE LOWER('%pizza%')
}
