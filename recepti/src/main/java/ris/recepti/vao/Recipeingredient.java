package ris.recepti.vao;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recipeingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private ingredient ingredient;

    @Column(nullable = false, columnDefinition = "double default 0.0")
    private double kolicinaGram = 0.0;
}
