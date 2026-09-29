// Lógica de negocio del catálogo de sabores de la heladería.
const { ErrorNegocio } = require('./errores');

const SABORES = [
  { nombre: 'Vainilla', precio: 4000 },
  { nombre: 'Chocolate', precio: 4500 },
  { nombre: 'Maracuyá', precio: 5000 },
];

// Permite buscar por nombre sin distinguir mayúsculas ni tildes (ej. "maracuya" o "MARACUYA").
function normalizar(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function listarSabores() {
  return SABORES;
}

function buscarSabor(nombre) {
  const buscado = normalizar(nombre);
  const sabor = SABORES.find((s) => normalizar(s.nombre) === buscado);
  if (!sabor) {
    throw new ErrorNegocio(`El sabor ${nombre} no está disponible.`, 404);
  }
  return sabor;
}

module.exports = { listarSabores, buscarSabor };
