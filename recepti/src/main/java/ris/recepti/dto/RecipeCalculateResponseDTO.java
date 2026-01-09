package ris.recepti.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeCalculateResponseDTO {
    private double portions;
    private double factor;
    private List<CalculatedIngredientDTO> ingredients;
    private RecipeNutritionDTO nutrition;

    private RecipeDailyValuePercentDTO dailyValuePercent;

}
