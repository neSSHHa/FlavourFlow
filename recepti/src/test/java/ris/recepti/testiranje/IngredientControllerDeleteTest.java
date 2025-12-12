package ris.recepti.testiranje;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import ris.recepti.dao.RecipeingredientRepository;
import ris.recepti.dao.SestavinaRepository;
import ris.recepti.rest.ingredientController;
import ris.recepti.vao.Recipeingredient;
import ris.recepti.vao.ingredient;


class IngredientControllerDeleteStandaloneTest {

    @Test
    @Tag("positive")
    @DisplayName("DELETE /api/ingredients/{id} -> 204 when ingredient exists (deletes relations + ingredient)")
    void deleteIngredient_whenExists_returns204() throws Exception {
        // Arrange
        SestavinaRepository sestavinaRepository = Mockito.mock(SestavinaRepository.class);
        RecipeingredientRepository recipeingredientRepository = Mockito.mock(RecipeingredientRepository.class);

        ingredientController controller = new ingredientController();

        ReflectionTestUtils.setField(controller, "sestavinaRepository", sestavinaRepository);
        ReflectionTestUtils.setField(controller, "recipeingredientRepository", recipeingredientRepository);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(controller).build();

        Long ingredientId = 1L;

        ingredient ing = new ingredient();
        ing.setId(ingredientId);
        ing.setTitle("Sugar");

        Recipeingredient ri = new Recipeingredient();
        ri.setId(10L);
        ri.setIngredient(ing);

        when(sestavinaRepository.findById(ingredientId)).thenReturn(Optional.of(ing));
        when(recipeingredientRepository.findByIngredient(ing)).thenReturn(List.of(ri));

        // Act + Assert
        mockMvc.perform(delete("/api/ingredients/{id}", ingredientId))
               .andExpect(status().isNoContent());
                
        // Verify 
        verify(sestavinaRepository, times(1)).findById(ingredientId);
        verify(recipeingredientRepository, times(1)).findByIngredient(ing);
        verify(recipeingredientRepository, times(1)).deleteAll(List.of(ri));
        verify(sestavinaRepository, times(1)).deleteById(ingredientId);
    }

    @Test
    @Tag("negative")
    @DisplayName("DELETE /api/ingredients/{id} -> 404 when ingredient does not exist")
    void deleteIngredient_whenMissing_returns404() throws Exception {
        // Arrange
        SestavinaRepository sestavinaRepository = Mockito.mock(SestavinaRepository.class);
        RecipeingredientRepository recipeingredientRepository = Mockito.mock(RecipeingredientRepository.class);

        ingredientController controller = new ingredientController();
        ReflectionTestUtils.setField(controller, "sestavinaRepository", sestavinaRepository);
        ReflectionTestUtils.setField(controller, "recipeingredientRepository", recipeingredientRepository);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(controller).build();

        Long ingredientId = 99L;

        when(sestavinaRepository.findById(ingredientId)).thenReturn(Optional.empty());

        // Act + Assert
        mockMvc.perform(delete("/api/ingredients/{id}", ingredientId))
               .andExpect(status().isNotFound());
                
        // Verify 
        verify(sestavinaRepository, times(1)).findById(ingredientId);
        verify(recipeingredientRepository, never()).findByIngredient(any());
        verify(recipeingredientRepository, never()).deleteAll(any());
        verify(sestavinaRepository, never()).deleteById(anyLong());
    }
}
