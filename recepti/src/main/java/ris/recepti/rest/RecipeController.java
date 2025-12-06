package ris.recepti.rest;

import java.util.ArrayList;
import java.util.List;


import java.util.Map;
import java.util.stream.Collectors;


import ris.recepti.dao.SestavinaRepository;
import ris.recepti.dto.IngredientSelectionDTO;
import ris.recepti.vao.Recipeingredient;
import ris.recepti.vao.ingredient;

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

    @Autowired
    private SestavinaRepository sestavinaRepository;

    /*
     * private final RecipeRepository repository;
     * public RecipeController(RecipeRepository repository) {
     * this.repository = repository;
     * }
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
     * @PutMapping("/{id}")
     * public ResponseEntity<Recipe> update(@PathVariable Long id, @RequestBody
     * Recipe newData) {
     * return repository.findById(id)
     * .map(existing -> {
     * existing.setTitle(newData.getTitle());
     * existing.setIngredients(newData.getIngredients());
     * existing.setInstructions(newData.getInstructions());
     * existing.setDurationMinutes(newData.getDurationMinutes());
     * return ResponseEntity.ok(repository.save(existing));
     * })
     * .orElse(ResponseEntity.notFound().build());
     * }
     */

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> update(@PathVariable Long id, @RequestBody Recipe newData) {
        Recipe existing = repository.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        existing.setTitle(newData.getTitle());
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
        if (type.equals("short")) {
            return repository.findByDurationMinutesLessThan(30);
        } else if (type.equals("long")) {
            return repository.findByDurationMinutesGreaterThanEqual(30);
        } else {
            return repository.findAll();
        }
    }

    @GetMapping("/{id}/ingredients")
    public ResponseEntity<List<IngredientSelectionDTO>> getIngredientsForRecipe(@PathVariable Long id) {
        // 1) nađemo recept po id-ju
        Recipe recipe = repository.findById(id).orElse(null);
        if (recipe == null) {
            return ResponseEntity.notFound().build();
        }

        // 2) uzmemo sve recipeIngredients za taj recept
        List<Recipeingredient> recipeIngredients = recipe.getIngredients();

        // 3) mapa: id sastojine -> Recipeingredient
        Map<Long, Recipeingredient> mapByIngredientId = recipeIngredients.stream()
                .collect(Collectors.toMap(
                        ri -> ri.getIngredient().getId(),
                        ri -> ri
                ));

        // 4) sve sastojine koje postoje u bazi
        List<ingredient> allIngredients = sestavinaRepository.findAll();

        // 5) za svaku sastojinu napravimo DTO
        List<IngredientSelectionDTO> result = allIngredients.stream()
                .map(ing -> {
                    Recipeingredient ri = mapByIngredientId.get(ing.getId());
                    boolean selected = (ri != null);
                    Double kolicina = (ri != null) ? ri.getKolicinaGram() : null;

                    return new IngredientSelectionDTO(
                            ing.getId(),
                            ing.getTitle(),
                            selected,
                            kolicina
                    );
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

     @PutMapping("/{id}/ingredients")
    public ResponseEntity<Void> updateIngredientsForRecipe(
            @PathVariable Long id,
            @RequestBody List<IngredientSelectionDTO> dtos) {

        // 1) nađemo recept; ako ne postoji -> 404
        Recipe recipe = repository.findById(id).orElse(null);
        if (recipe == null) {
            return ResponseEntity.notFound().build();
        }

        // 2) trenutne veze recept–sastojina mapiramo po id-ju sastojine
        Map<Long, Recipeingredient> currentMap = recipe.getIngredients().stream()
                .collect(Collectors.toMap(
                        ri -> ri.getIngredient().getId(),
                        ri -> ri
                ));

        // novi spisak veza koji će važiti posle ažuriranja
        List<Recipeingredient> newList = new ArrayList<>();

        // 3) prolazimo kroz DTO-e koje je frontend poslao
        for (IngredientSelectionDTO dto : dtos) {

            // nađemo sastojinu u bazi prema dto.getId()
            ingredient ing = sestavinaRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Ingredient not found: " + dto.getId()));

            // da li je već postojala veza za ovu sastojinu u ovom receptu?
            Recipeingredient existing = currentMap.get(ing.getId());

            if (dto.isSelected()) {
                // ako treba da bude u receptu:

                if (existing == null) {
                    // ako veza ne postoji, pravimo novu
                    existing = new Recipeingredient();
                    existing.setRecipe(recipe);
                    existing.setIngredient(ing);
                }

                // postavimo gramažu (ako je null, stavi 0.0)
                double grams = dto.getKolicinaGram() != null ? dto.getKolicinaGram() : 0.0;
                existing.setKolicinaGram(grams);

                // dodamo u novu listu veza
                newList.add(existing);
            } else {
                // ako nije selected:
                //  - NE dodajemo u newList
                //  - ako je postojala u currentMap, biće obrisana zbog orphanRemoval
            }
        }

        // 4) zamenimo staru listu veza novom
        recipe.getIngredients().clear();
        recipe.getIngredients().addAll(newList);

        // 5) snimimo recept; JPA će odraditi insert/update/delete u Recipeingredient tabeli
        repository.save(recipe);

        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
