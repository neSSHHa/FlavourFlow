package ris.recepti.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                   
@AllArgsConstructor     
@NoArgsConstructor      
public class IngredientSelectionDTO {

    private Long id;              // ID sastavine (ingredient.id)
    private String title;         // naziv sastavine (ingredient.title)
    private boolean selected;     // da li je ova sastavina u konkretnom receptu
    private Double kolicinaGram;  // gramaža za taj recept (npr. 150.0)
}
