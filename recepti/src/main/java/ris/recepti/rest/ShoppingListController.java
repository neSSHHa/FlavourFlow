package ris.recepti.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ris.recepti.dao.ShoppingListRepository;
import ris.recepti.dao.UserRepository;
import ris.recepti.dao.RecipeRepository;
import ris.recepti.vao.ShoppingList;
import ris.recepti.vao.User;
import ris.recepti.vao.Recipe;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/shopping-list")
@CrossOrigin(origins = "*")
public class ShoppingListController {

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    // GET: Vrati sve izabrane recepte za korisnika
    @GetMapping("/{userId}")
    public ResponseEntity<List<Long>> getShoppingList(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Long> recipeIds = shoppingListRepository.findByUser(user)
                .stream()
                .map(item -> item.getRecipe().getId())
                .collect(Collectors.toList());

        return ResponseEntity.ok(recipeIds);
    }

    // POST: Sačuvaj izabrane recepte za korisnika
    @PostMapping("/{userId}")
    public ResponseEntity<Void> saveShoppingList(
            @PathVariable Long userId,
            @RequestBody List<Long> recipeIds) {

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // Obriši sve postojeće iz shopping liste za ovog korisnika
        shoppingListRepository.findByUser(user).forEach(shoppingListRepository::delete);

        // Dodaj nove izabrane recepte
        for (Long recipeId : recipeIds) {
            Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
            if (recipe != null) {
                ShoppingList item = new ShoppingList();
                item.setUser(user);
                item.setRecipe(recipe);
                shoppingListRepository.save(item);
            }
        }

        return ResponseEntity.ok().build();
    }

    // DELETE: Obriši jedan recept iz shopping liste
    @DeleteMapping("/{userId}/{recipeId}")
    public ResponseEntity<Void> removeFromShoppingList(
            @PathVariable Long userId,
            @PathVariable Long recipeId) {

        User user = userRepository.findById(userId).orElse(null);
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        if (user == null || recipe == null) {
            return ResponseEntity.notFound().build();
        }

        shoppingListRepository.deleteByUserAndRecipe(user, recipe);
        return ResponseEntity.ok().build();
    }
}
