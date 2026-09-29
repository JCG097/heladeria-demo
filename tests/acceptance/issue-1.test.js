// Pruebas de aceptación del Issue #1: Catálogo de sabores de la heladería.
// Derivadas únicamente de los criterios de aceptación de la historia, no del código existente.
const request = require('supertest');
const { crearApp } = require('../../app/src/app');

describe('Issue #1: Catálogo de sabores de la heladería', () => {
  let app;

  beforeEach(() => {
    app = crearApp();
  });

  test('GET /api/sabores responde 200 con la lista de 3 sabores y sus precios', async () => {
    const res = await request(app).get('/api/sabores');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { nombre: 'Vainilla', precio: 4000 },
      { nombre: 'Chocolate', precio: 4500 },
      { nombre: 'Maracuyá', precio: 5000 },
    ]);
  });

  test('GET /api/sabores/chocolate responde 200 con el nombre "Chocolate" y el precio 4500', async () => {
    const res = await request(app).get('/api/sabores/chocolate');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ nombre: 'Chocolate', precio: 4500 });
  });

  test('GET /api/sabores/menta (sabor que no existe) responde 404 con mensaje claro', async () => {
    const res = await request(app).get('/api/sabores/menta');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'El sabor menta no está disponible.' });
  });
});
