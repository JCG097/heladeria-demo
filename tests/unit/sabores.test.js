const { listarSabores, buscarSabor } = require('../../app/src/sabores');
const { ErrorNegocio } = require('../../app/src/errores');

describe('sabores', () => {
  test('listarSabores devuelve los 3 sabores con su nombre y precio', () => {
    expect(listarSabores()).toEqual([
      { nombre: 'Vainilla', precio: 4000 },
      { nombre: 'Chocolate', precio: 4500 },
      { nombre: 'Maracuyá', precio: 5000 },
    ]);
  });

  test('buscarSabor encuentra un sabor por su nombre exacto', () => {
    expect(buscarSabor('Chocolate')).toEqual({ nombre: 'Chocolate', precio: 4500 });
  });

  test('buscarSabor no distingue mayúsculas, minúsculas ni tildes', () => {
    expect(buscarSabor('maracuya')).toEqual({ nombre: 'Maracuyá', precio: 5000 });
    expect(buscarSabor('VAINILLA')).toEqual({ nombre: 'Vainilla', precio: 4000 });
  });

  test('buscarSabor lanza ErrorNegocio 404 si el sabor no existe', () => {
    expect(() => buscarSabor('menta')).toThrow(ErrorNegocio);
    try {
      buscarSabor('menta');
      throw new Error('Se esperaba que buscarSabor lanzara un error');
    } catch (err) {
      expect(err.status).toBe(404);
      expect(err.message).toBe('El sabor menta no está disponible.');
    }
  });
});
