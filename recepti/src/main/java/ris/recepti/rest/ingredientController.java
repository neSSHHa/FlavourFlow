package ris.recepti.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ris.recepti.dao.SestavinaRepository;
import ris.recepti.vao.ingredient;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "*")
public class ingredientController {

    @Autowired
    SestavinaRepository sestavinaRepository;

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
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (sestavinaRepository.existsById(id)) {
            sestavinaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
