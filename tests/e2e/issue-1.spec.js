// Pruebas E2E del Issue #1: Catálogo de sabores de la heladería.
// Derivadas únicamente de los criterios de aceptación. Se ejecutan en el ambiente de QA del pipeline.
const { test, expect } = require('@playwright/test');

test('la página principal muestra el título "Heladería" (criterio: título e interfaz)', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('titulo-app')).toHaveText('Heladería');
});

test('la página principal muestra una tarjeta por cada sabor con su nombre y precio en pesos colombianos', async ({ page }) => {
  await page.goto('/');

  // Interpretación literal: "precio en pesos colombianos" implica el símbolo $ junto al valor,
  // permitiendo separador de miles con punto o coma (no lo especifica el criterio).
  const sabores = [
    { slug: 'vainilla', nombre: 'Vainilla', precio: /\$\s?4[.,]?000/ },
    { slug: 'chocolate', nombre: 'Chocolate', precio: /\$\s?4[.,]?500/ },
    { slug: 'maracuya', nombre: 'Maracuyá', precio: /\$\s?5[.,]?000/ },
  ];

  for (const sabor of sabores) {
    await expect(page.getByTestId(`tarjeta-sabor-${sabor.slug}`)).toBeVisible();
    await expect(page.getByTestId(`nombre-sabor-${sabor.slug}`)).toHaveText(sabor.nombre);
    await expect(page.getByTestId(`precio-sabor-${sabor.slug}`)).toContainText(sabor.precio);
  }
});
