package ris.recepti.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ris.recepti.vao.ShoppingList;
import ris.recepti.vao.User;
import ris.recepti.vao.Recipe;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
    List<ShoppingList> findByUser(User user);
    List<ShoppingList> findByUserId(Long userId);
    Optional<ShoppingList> findByUserAndRecipe(User user, Recipe recipe);
    void deleteByUserAndRecipe(User user, Recipe recipe);
}
