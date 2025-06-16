import {
  random,
  randomFloat,
  formatNumber,
  formatThousands,
  toPercent,
  clamp,
  isEven,
  isOdd,
  average,
  variance,
  standardDeviation,
  median,
  formatFileSize,
  distance,
  toRadians,
  toDegrees,
  gcd,
  lcm,
} from '../utils/number';

describe('Number utilities', () => {
  describe('random', () => {
    it('should generate random integer within range', () => {
      const result = random(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
      expect(Number.isInteger(result)).toBe(true);
    });

    it('should handle same min and max', () => {
      expect(random(5, 5)).toBe(5);
    });

    it('should handle negative numbers', () => {
      const result = random(-10, -1);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-1);
    });
  });

  describe('randomFloat', () => {
    it('should generate random float within range', () => {
      const result = randomFloat(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });

    it('should respect precision', () => {
      const result = randomFloat(1, 2, 3);
      const decimalPlaces = (result.toString().split('.')[1] || '').length;
      expect(decimalPlaces).toBeLessThanOrEqual(3);
    });

    it('should handle zero precision', () => {
      const result = randomFloat(1, 10, 0);
      expect(Number.isInteger(result)).toBe(true);
    });
  });

  describe('formatNumber', () => {
    it('should format number with default precision', () => {
      expect(formatNumber(123.456)).toBe('123.46');
      expect(formatNumber(123)).toBe('123.00');
    });

    it('should format number with custom precision', () => {
      expect(formatNumber(123.456, 1)).toBe('123.5');
      expect(formatNumber(123.456, 0)).toBe('123');
    });
  });

  describe('formatThousands', () => {
    it('should format thousands with default separator', () => {
      expect(formatThousands(1234567)).toBe('1,234,567');
      expect(formatThousands(123)).toBe('123');
    });

    it('should format thousands with custom separator', () => {
      expect(formatThousands(1234567, ' ')).toBe('1 234 567');
      expect(formatThousands(1234567, '.')).toBe('1.234.567');
    });

    it('should handle decimal numbers', () => {
      expect(formatThousands(1234567.89)).toBe('1,234,567.89');
    });
  });

  describe('toPercent', () => {
    it('should convert to percentage with default precision', () => {
      expect(toPercent(0.1234)).toBe('12.34%');
      expect(toPercent(0.5)).toBe('50.00%');
    });

    it('should convert to percentage with custom precision', () => {
      expect(toPercent(0.1234, 1)).toBe('12.3%');
      expect(toPercent(0.1234, 0)).toBe('12%');
    });
  });

  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(5, 1, 10)).toBe(5);
      expect(clamp(-5, 1, 10)).toBe(1);
      expect(clamp(15, 1, 10)).toBe(10);
    });

    it('should handle edge cases', () => {
      expect(clamp(1, 1, 10)).toBe(1);
      expect(clamp(10, 1, 10)).toBe(10);
    });
  });

  describe('isEven', () => {
    it('should detect even numbers', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(4)).toBe(true);
      expect(isEven(0)).toBe(true);
      expect(isEven(-2)).toBe(true);
    });

    it('should detect odd numbers', () => {
      expect(isEven(1)).toBe(false);
      expect(isEven(3)).toBe(false);
      expect(isEven(-1)).toBe(false);
    });
  });

  describe('isOdd', () => {
    it('should detect odd numbers', () => {
      expect(isOdd(1)).toBe(true);
      expect(isOdd(3)).toBe(true);
      expect(isOdd(-1)).toBe(true);
    });

    it('should detect even numbers', () => {
      expect(isOdd(2)).toBe(false);
      expect(isOdd(4)).toBe(false);
      expect(isOdd(0)).toBe(false);
      expect(isOdd(-2)).toBe(false);
    });
  });

  describe('average', () => {
    it('should calculate average', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
      expect(average([2, 4, 6])).toBe(4);
    });

    it('should handle empty array', () => {
      expect(average([])).toBe(0);
    });

    it('should handle single element', () => {
      expect(average([5])).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(average([-2, -4, -6])).toBe(-4);
    });
  });

  describe('variance', () => {
    it('should calculate variance', () => {
      expect(variance([1, 2, 3, 4, 5])).toBe(2);
    });

    it('should handle empty array', () => {
      expect(variance([])).toBe(0);
    });

    it('should handle single element', () => {
      expect(variance([5])).toBe(0);
    });
  });

  describe('standardDeviation', () => {
    it('should calculate standard deviation', () => {
      expect(standardDeviation([1, 2, 3, 4, 5])).toBeCloseTo(Math.sqrt(2));
    });

    it('should handle empty array', () => {
      expect(standardDeviation([])).toBe(0);
    });
  });

  describe('median', () => {
    it('should calculate median for odd length array', () => {
      expect(median([1, 3, 5])).toBe(3);
      expect(median([5, 1, 3])).toBe(3);
    });

    it('should calculate median for even length array', () => {
      expect(median([1, 2, 3, 4])).toBe(2.5);
      expect(median([4, 1, 3, 2])).toBe(2.5);
    });

    it('should handle empty array', () => {
      expect(median([])).toBe(0);
    });

    it('should handle single element', () => {
      expect(median([5])).toBe(5);
    });
  });

  describe('formatFileSize', () => {
    it('should format file sizes', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
    });

    it('should handle custom precision', () => {
      expect(formatFileSize(1536, 1)).toBe('1.5 KB');
      expect(formatFileSize(1536, 0)).toBe('2 KB');
    });
  });

  describe('distance', () => {
    it('should calculate distance between two points', () => {
      expect(distance(0, 0, 3, 4)).toBe(5);
      expect(distance(1, 1, 4, 5)).toBe(5);
    });

    it('should handle same points', () => {
      expect(distance(1, 1, 1, 1)).toBe(0);
    });

    it('should handle negative coordinates', () => {
      expect(distance(-1, -1, 2, 3)).toBe(5);
    });
  });

  describe('toRadians', () => {
    it('should convert degrees to radians', () => {
      expect(toRadians(180)).toBeCloseTo(Math.PI);
      expect(toRadians(90)).toBeCloseTo(Math.PI / 2);
      expect(toRadians(0)).toBe(0);
    });
  });

  describe('toDegrees', () => {
    it('should convert radians to degrees', () => {
      expect(toDegrees(Math.PI)).toBeCloseTo(180);
      expect(toDegrees(Math.PI / 2)).toBeCloseTo(90);
      expect(toDegrees(0)).toBe(0);
    });
  });

  describe('gcd', () => {
    it('should calculate greatest common divisor', () => {
      expect(gcd(12, 8)).toBe(4);
      expect(gcd(17, 13)).toBe(1);
      expect(gcd(0, 5)).toBe(5);
    });

    it('should handle same numbers', () => {
      expect(gcd(6, 6)).toBe(6);
    });
  });

  describe('lcm', () => {
    it('should calculate least common multiple', () => {
      expect(lcm(4, 6)).toBe(12);
      expect(lcm(3, 5)).toBe(15);
    });

    it('should handle same numbers', () => {
      expect(lcm(6, 6)).toBe(6);
    });

    it('should handle one being zero', () => {
      expect(lcm(0, 5)).toBe(0);
    });
  });
});
