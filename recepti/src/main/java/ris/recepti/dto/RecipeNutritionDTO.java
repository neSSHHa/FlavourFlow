package ris.recepti.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeNutritionDTO {
    private Integer calorie; // kcal
    private Integer proteinGram; // g
    private Integer fatGram; // g
    private Integer carbsGram; // g
}
