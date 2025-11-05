package ris.recepti.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ris.recepti.dao.RecipeRepository;
import ris.recepti.vao.Recipe;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    /*
    private final RecipeRepository repository;
    public RecipeController(RecipeRepository repository) {
        this.repository = repository;
    }
    */

    @Autowired
    RecipeRepository repository;

    @GetMapping
    public List<Recipe> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getOne(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Recipe> create(@RequestBody Recipe recipe) {
        Recipe saved = repository.save(recipe);
        return ResponseEntity.status(201).body(saved);
    }

    /* 
    @PutMapping("/{id}")
    public ResponseEntity<Recipe> update(@PathVariable Long id, @RequestBody Recipe newData) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setTitle(newData.getTitle());
                    existing.setIngredients(newData.getIngredients());
                    existing.setInstructions(newData.getInstructions());
                    existing.setDurationMinutes(newData.getDurationMinutes());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    */

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> update(@PathVariable Long id, @RequestBody Recipe newData) {
        Recipe existing = repository.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        existing.setTitle(newData.getTitle());
        existing.setIngredients(newData.getIngredients());
        existing.setInstructions(newData.getInstructions());
        existing.setDurationMinutes(newData.getDurationMinutes());
        return ResponseEntity.ok(repository.save(existing));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public List<Recipe> searchByTitle(@RequestParam String keyword) {
        return repository.findByTitleContainingIgnoreCase(keyword);
    }

    @GetMapping("/filter")
    public List<Recipe> filterRecipes(@RequestParam String type) {
        if(type.equals("short")) {
            return repository.findByDurationMinutesLessThan(30);
        }
        else if(type.equals("long")) {
            return repository.findByDurationMinutesGreaterThanEqual(30);
        }
        else {
            return repository.findAll();
        }
    }
}
