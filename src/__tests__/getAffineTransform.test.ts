import Matrix from 'ml-matrix';

import { getAffineTransform } from '../getAffineTransform';

test('3 points', () => {
  const sourceMatrix = new Matrix([
    [1, 1, -3],
    [2, -1, -1],
    [1, 1, 1],
  ]);
  const destinationMatrix = new Matrix([
    [2, -1, -1],
    [-1, -1, 3],
    [1, 1, 1],
  ]);

  const result = getAffineTransform(sourceMatrix, destinationMatrix);

  expect(result).toBeDeepCloseTo({
    translation: { x: 0, y: 0 },
    rotation: -90,
    scale: 1,
  });
});

test('6 points on a line', () => {
  const sourceMatrix = new Matrix([
    [2, 2, 2, 2, 2, 2],
    [2, 3, 4, 5, 6, 7],
    [1, 1, 1, 1, 1, 1],
  ]);
  const destinationMatrix = new Matrix([
    [-2, -2, -2, -2, -2, -2],
    [2, 1, 0, -1, -2, -3],
    [1, 1, 1, 1, 1, 1],
  ]);

  const result = getAffineTransform(sourceMatrix, destinationMatrix);

  expect(result).toBeDeepCloseTo({
    rotation: 180,
    translation: { x: 0, y: 4 },
    scale: 1,
  });
});

test('square', () => {
  const side = 3;

  const diagonal = side * Math.sqrt(2);

  const sourceMatrix = new Matrix([
    [0, 0, -side, -side],
    [0, side, side, 0],
    [1, 1, 1, 1],
  ]);
  const destinationMatrix = new Matrix([
    [0, diagonal / 2, diagonal, diagonal / 2],
    [0, -diagonal / 2, 0, diagonal / 2],
    [1, 1, 1, 1],
  ]);

  const result = getAffineTransform(sourceMatrix, destinationMatrix);

  expect(result).toBeDeepCloseTo({
    rotation: -135,
    translation: { x: 0, y: 0 },
    scale: 1,
  });
});

test('angle should be 45 degrees', () => {
  const side = 3;

  const diagonal = side * Math.sqrt(2);

  const sourceMatrix = new Matrix([
    [0, side, side, 0],
    [0, 0, side, side],
    [1, 1, 1, 1],
  ]);
  const destinationMatrix = new Matrix([
    [0, diagonal / 2, 0, -diagonal / 2],
    [0, diagonal / 2, diagonal, diagonal / 2],
    [1, 1, 1, 1],
  ]);

  const result = getAffineTransform(sourceMatrix, destinationMatrix);

  expect(result).toBeDeepCloseTo({
    rotation: 45,
    translation: { x: 0, y: 0 },
    scale: 1,
  });
});

test('polygon rotated 180 degrees', () => {
  const sourceMatrix = new Matrix([
    [4, 2, 5, 7, 6, 5],
    [3, 5, 6, 5, 3, 4],
    [1, 1, 1, 1, 1, 1],
  ]);
  const destinationMatrix = new Matrix([
    [5, 7, 4, 2, 3, 4],
    [-1, -3, -4, -3, -1, -2],
    [1, 1, 1, 1, 1, 1],
  ]);

  const result = getAffineTransform(sourceMatrix, destinationMatrix);

  expect(result).toBeDeepCloseTo({
    rotation: 180,
    translation: { x: 9, y: 2 },
    scale: 1,
  });
});

test('rectangle only rotated', () => {
  const source = new Matrix([
    [1, 5, 5, 1],
    [-4, -4, -2, -2],
    [1, 1, 1, 1],
  ]);
  const destination = new Matrix([
    [-4, -4, -2, -2],
    [-1, -5, -5, -1],
    [1, 1, 1, 1],
  ]);
  const result = getAffineTransform(source, destination);

  expect(result).toBeDeepCloseTo({
    translation: { x: 0, y: 0 },
    scale: 1,
    rotation: -90,
  });
});

test('rectangle with translation', () => {
  const source = new Matrix([
    [1, 5, 5, 1],
    [-4, -4, -2, -2],
    [1, 1, 1, 1],
  ]);
  const destination = new Matrix([
    [-5, -5, -3, -3],
    [8, 4, 4, 8],
    [1, 1, 1, 1],
  ]);
  const result = getAffineTransform(source, destination);
  expect(result).toBeDeepCloseTo({
    translation: { x: -1, y: 9 },
    scale: 1,
    rotation: -90,
  });
});

describe('scale different from 1', () => {
  it('triangle with a scale of 2', () => {
    const sourceMatrix = new Matrix([
      [1, 1, -3],
      [2, -1, -1],
      [1, 1, 1],
    ]);
    const destinationMatrix = new Matrix([
      [4, -2, -2],
      [-2, -2, 6],
      [1, 1, 1],
    ]);

    const result = getAffineTransform(sourceMatrix, destinationMatrix);

    expect(result).toBeDeepCloseTo({
      translation: { x: 0, y: 0 },
      scale: 2,
      rotation: -90,
    });
  });

  it('rectangle with a scale of 2', () => {
    const source = new Matrix([
      [1, 5, 5, 1],
      [-4, -4, -2, -2],
      [1, 1, 1, 1],
    ]);
    const destination = new Matrix([
      [-6, -6, -2, -2],
      [10, 2, 2, 10],
      [1, 1, 1, 1],
    ]);
    const result = getAffineTransform(source, destination);

    expect(result).toBeDeepCloseTo({
      translation: { x: 2, y: 12 },
      scale: 2,
      rotation: -90,
    });
  });

  it('scale = 0.5', () => {
    const source = new Matrix([
      [1, 5, 5, 1],
      [-4, -4, -2, -2],
      [1, 1, 1, 1],
    ]);
    const destination = new Matrix([
      [0.5, 2.5, 2.5, 0.5],
      [-2, -2, -1, -1],
      [1, 1, 1, 1],
    ]);
    const result = getAffineTransform(source, destination);

    expect(result).toBeDeepCloseTo({
      translation: { x: 0, y: 0 },
      scale: 0.5,
      rotation: 0,
    });
  });
});
