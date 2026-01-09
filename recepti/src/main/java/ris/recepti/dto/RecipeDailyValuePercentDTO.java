package ris.recepti.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDailyValuePercentDTO {
    private Integer caloriePercent; // %
    private Integer proteinPercent; // %
    private Integer fatPercent; // %
    private Integer carbsPercent; // %
}
