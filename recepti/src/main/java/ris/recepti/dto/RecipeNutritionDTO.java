package ris.recepti.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeNutritionDTO {
    private Double calorie; // kcal
    private Double proteinGram; // g
    private Double fatGram; // g
    private Double carbsGram; // g
}
