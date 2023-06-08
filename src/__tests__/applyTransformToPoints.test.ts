import { applyTransformToPoints } from '../applyTransformToPoints';
import { AffineTransform } from '../getAffineTransform';

test('rectangle with scale = 2', () => {
  const source = [
    [1, -4],
    [5, -4],
    [5, -2],
    [1, -2],
  ];
  const expected = [
    [-6, 10],
    [-6, 2],
    [-2, 2],
    [-2, 10],
  ];
  const transform: AffineTransform = {
    translation: { x: 2, y: 12 },
    rotation: -90,
    scale: 2,
  };
  const result = applyTransformToPoints(source, transform);

  expect(result).toBeDeepCloseTo(expected);
});
