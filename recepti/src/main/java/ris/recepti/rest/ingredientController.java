package ris.recepti.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import ris.recepti.dao.RecipeingredientRepository;
import ris.recepti.dao.SestavinaRepository;
import ris.recepti.vao.ingredient;
import ris.recepti.vao.Recipeingredient;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "*")
public class ingredientController {

    @Autowired
    SestavinaRepository sestavinaRepository;

    @Autowired
    RecipeingredientRepository recipeingredientRepository;

    @GetMapping
    public List<ingredient> getAll() {
        return sestavinaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ingredient> create(@RequestBody ingredient nova) {
        // Osiguraj da recepti lista nije null
        if (nova.getRecpies() == null) {
            nova.setRecpies(new java.util.ArrayList<>());
        }
        ingredient saved = sestavinaRepository.save(nova);
        return ResponseEntity.status(201).body(saved);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ingredient ingredient = sestavinaRepository.findById(id).orElse(null);
        if (ingredient == null) {
            return ResponseEntity.notFound().build();
        }

        // Prvo dohvati sve Recipeingredient zapise koji koriste ovaj ingredient
        List<Recipeingredient> recipeIngredients = recipeingredientRepository.findByIngredient(ingredient);
        
        // Obriši sve Recipeingredient zapise
        if (!recipeIngredients.isEmpty()) {
            recipeingredientRepository.deleteAll(recipeIngredients);
        }

        // Zatim obriši ingredient
        sestavinaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
