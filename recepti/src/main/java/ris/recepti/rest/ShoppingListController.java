package ris.recepti.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ris.recepti.dao.ShoppingListRepository;
import ris.recepti.dao.UserRepository;
import ris.recepti.dao.RecipeRepository;
import ris.recepti.vao.ShoppingList;
import ris.recepti.vao.User;
import ris.recepti.vao.Recipe;
import ris.recepti.vao.Recipeingredient;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;

import java.io.ByteArrayOutputStream;
import java.text.Normalizer;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/shopping-list")
@CrossOrigin(origins = "*")
public class ShoppingListController {

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    // GET: Vrati sve izabrane recepte za korisnika
    @GetMapping("/{userId}")
    public ResponseEntity<List<Long>> getShoppingList(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Long> recipeIds = shoppingListRepository.findByUser(user)
                .stream()
                .map(item -> item.getRecipe().getId())
                .collect(Collectors.toList());

        return ResponseEntity.ok(recipeIds);
    }

    // POST: Sačuvaj izabrane recepte za korisnika
    @PostMapping("/{userId}")
    public ResponseEntity<Void> saveShoppingList(
            @PathVariable Long userId,
            @RequestBody List<Long> recipeIds) {

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // Obriši sve postojeće iz shopping liste za ovog korisnika
        shoppingListRepository.findByUser(user).forEach(shoppingListRepository::delete);

        // Dodaj nove izabrane recepte
        for (Long recipeId : recipeIds) {
            Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
            if (recipe != null) {
                ShoppingList item = new ShoppingList();
                item.setUser(user);
                item.setRecipe(recipe);
                shoppingListRepository.save(item);
            }
        }

        return ResponseEntity.ok().build();
    }

    // DELETE: Obriši jedan recept iz shopping liste
    @DeleteMapping("/{userId}/{recipeId}")
    public ResponseEntity<Void> removeFromShoppingList(
            @PathVariable Long userId,
            @PathVariable Long recipeId) {

        User user = userRepository.findById(userId).orElse(null);
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        if (user == null || recipe == null) {
            return ResponseEntity.notFound().build();
        }

        shoppingListRepository.deleteByUserAndRecipe(user, recipe);
        return ResponseEntity.ok().build();
    }

    // GET: Export shopping liste u PDF
    @GetMapping("/{userId}/export-pdf")
    public ResponseEntity<byte[]> exportShoppingListToPdf(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            // 1) Uzmi sve recepte iz shopping liste korisnika
            List<ShoppingList> shoppingListItems = shoppingListRepository.findByUser(user);
            if (shoppingListItems.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            List<Recipe> recipes = shoppingListItems.stream()
                    .map(ShoppingList::getRecipe)
                    .collect(Collectors.toList());

            // 2) Agregiraj sastojke (saberi količine)
            Map<Long, IngredientTotal> ingredientTotals = new HashMap<>();

            for (Recipe recipe : recipes) {
                List<Recipeingredient> recipeIngredients = recipe.getIngredients();
                if (recipeIngredients == null) continue;

                for (Recipeingredient ri : recipeIngredients) {
                    if (ri == null || ri.getIngredient() == null) continue;
                    // getKolicinaGram je primitive double -> samo > 0
                    if (ri.getKolicinaGram() <= 0) continue;

                    Long ingId = ri.getIngredient().getId();
                    String title = ri.getIngredient().getTitle();

                    ingredientTotals.putIfAbsent(
                            ingId,
                            new IngredientTotal(title, 0.0)
                    );
                    ingredientTotals.get(ingId).totalGrams += ri.getKolicinaGram();
                }
            }

            // 3) Generiši PDF 
            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            try (PDDocument document = new PDDocument()) {

                PDPage page = new PDPage(PDRectangle.A4);
                document.addPage(page);

                float pageWidth = page.getMediaBox().getWidth();
                float pageHeight = page.getMediaBox().getHeight();
                float margin = 50;
                float bottomMargin = 50;
                float lineHeight = 16;

                float y = pageHeight - margin;

                PDPageContentStream contentStream = new PDPageContentStream(document, page);

                String title = "Shopping List";
                PDType1Font fontBold = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
                PDType1Font fontRegular = new PDType1Font(Standard14Fonts.FontName.HELVETICA);

                float titleWidth = fontBold.getStringWidth(title) / 1000 * 22;

                contentStream.beginText();
                contentStream.setFont(fontBold, 22);
                contentStream.newLineAtOffset((pageWidth - titleWidth) / 2, y);
                contentStream.showText(title);
                contentStream.endText();
                y -= lineHeight * 2;

                // Datum (eng meseci)
                String dateStr = LocalDate.now()
                        .format(DateTimeFormatter.ofPattern("MMMM dd, yyyy", Locale.ENGLISH));

                float dateWidth = fontRegular.getStringWidth(dateStr) / 1000 * 12;
                contentStream.beginText();
                contentStream.setFont(fontRegular, 12);
                contentStream.newLineAtOffset((pageWidth - dateWidth) / 2, y);
                contentStream.showText(pdfSafe(dateStr));
                contentStream.endText();
                y -= lineHeight * 2;

                // Info o broju recepata
                contentStream.beginText();
                contentStream.setFont(fontBold, 12);
                contentStream.newLineAtOffset(margin, y);
                contentStream.showText("Selected recipes: " + recipes.size());
                contentStream.endText();
                y -= lineHeight * 2;

                // Lista recepata
                for (Recipe r : recipes) {
                    if (y < bottomMargin) {
                        contentStream.close();
                        page = new PDPage(PDRectangle.A4);
                        document.addPage(page);
                        pageWidth = page.getMediaBox().getWidth();
                        pageHeight = page.getMediaBox().getHeight();
                        y = pageHeight - margin;
                        contentStream = new PDPageContentStream(document, page);
                    }

                    String line = "- " + (r.getTitle() != null ? r.getTitle() : "Recipe");
                    contentStream.beginText();
                    contentStream.setFont(fontRegular, 11);
                    contentStream.newLineAtOffset(margin, y);
                    contentStream.showText(pdfSafe(line));
                    contentStream.endText();
                    y -= lineHeight;
                }

                y -= lineHeight;

                // Header za tabelu sastojaka
                if (y < bottomMargin + lineHeight * 3) {
                    contentStream.close();
                    page = new PDPage(PDRectangle.A4);
                    document.addPage(page);
                    pageWidth = page.getMediaBox().getWidth();
                    pageHeight = page.getMediaBox().getHeight();
                    y = pageHeight - margin;
                    contentStream = new PDPageContentStream(document, page);
                }

                contentStream.beginText();
                contentStream.setFont(fontBold, 12);
                contentStream.newLineAtOffset(margin, y);
                contentStream.showText("Ingredients (total):");
                contentStream.endText();
                y -= lineHeight;

                List<IngredientTotal> sortedIngredients = new ArrayList<>(ingredientTotals.values());
                sortedIngredients.sort(Comparator.comparing(it -> it.title.toLowerCase()));

                int index = 1;
                for (IngredientTotal it : sortedIngredients) {

                    if (y < bottomMargin) {
                        contentStream.close();
                        page = new PDPage(PDRectangle.A4);
                        document.addPage(page);
                        pageWidth = page.getMediaBox().getWidth();
                        pageHeight = page.getMediaBox().getHeight();
                        y = pageHeight - margin;
                        contentStream = new PDPageContentStream(document, page);
                    }

                    String ingredientLine = index + ". " + (it.title != null ? it.title : "Ingredient");
                    String qtyLine = String.format(Locale.ENGLISH, "%.1f g", it.totalGrams);

                    contentStream.beginText();
                    contentStream.setFont(fontRegular, 11);
                    contentStream.newLineAtOffset(margin, y);
                    contentStream.showText(pdfSafe(ingredientLine));
                    contentStream.endText();

                    contentStream.beginText();
                    contentStream.setFont(fontRegular, 11);
                    float qtyX = pageWidth - margin - 80;
                    contentStream.newLineAtOffset(qtyX, y);
                    contentStream.showText(pdfSafe(qtyLine));
                    contentStream.endText();

                    contentStream.beginText();
                    contentStream.setFont(fontRegular, 11);
                    float cbxX = pageWidth - margin - 20;
                    contentStream.newLineAtOffset(cbxX, y);
                    contentStream.endText();

                    y -= lineHeight;
                    index++;
                }

                // Footer
                if (y < bottomMargin) {
                    contentStream.close();
                    page = new PDPage(PDRectangle.A4);
                    document.addPage(page);
                    pageWidth = page.getMediaBox().getWidth();
                    pageHeight = page.getMediaBox().getHeight();
                    y = bottomMargin;
                    contentStream = new PDPageContentStream(document, page);
                }

                String footer = "Generated by Flavor Flow Recipe App";
                float footerWidth = fontRegular.getStringWidth(footer) / 1000 * 8;

                contentStream.beginText();
                contentStream.setFont(fontRegular, 8);
                contentStream.newLineAtOffset((pageWidth - footerWidth) / 2, bottomMargin - 10);
                contentStream.showText(pdfSafe(footer));
                contentStream.endText();

                contentStream.close();
                document.save(baos);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData(
                    "attachment",
                    "shopping-list-" + LocalDate.now() + ".pdf"
            );

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(baos.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    private static class IngredientTotal {
        String title;
        double totalGrams;

        IngredientTotal(String title, double totalGrams) {
            this.title = title;
            this.totalGrams = totalGrams;
        }
    }

    private String pdfSafe(String text) {
        if (text == null) return "";
        String normalized = Normalizer.normalize(text, Normalizer.Form.NFD);
        normalized = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        return normalized.replaceAll("[^\\x20-\\x7E]", "");
    }
}
