package ris.recepti.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                   
@AllArgsConstructor     
@NoArgsConstructor      
public class IngredientSelectionDTO {

    private Long id;              
    private String title;         
    private boolean selected;     
    private Double kolicinaGram;  
}
