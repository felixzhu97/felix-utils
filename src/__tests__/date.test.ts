import {
  formatDate,
  daysBetween,
  isToday,
  isYesterday,
  startOfDay,
  endOfDay,
  addDays,
  addMonths,
  getRelativeTime,
} from '../date';

describe('Date utilities', () => {
  describe('formatDate', () => {
    it('should format date with default format', () => {
      const date = new Date('2023-12-25 15:30:45');
      expect(formatDate(date)).toBe('2023-12-25 15:30:45');
    });

    it('should format date with custom format', () => {
      const date = new Date('2023-12-25 15:30:45');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2023-12-25');
      expect(formatDate(date, 'HH:mm:ss')).toBe('15:30:45');
    });

    it('should handle timestamp input', () => {
      const timestamp = new Date('2023-12-25 15:30:45').getTime();
      expect(formatDate(timestamp)).toBe('2023-12-25 15:30:45');
    });

    it('should throw error for invalid date', () => {
      expect(() => formatDate('invalid')).toThrow('Invalid date');
    });
  });

  describe('daysBetween', () => {
    it('should calculate days between two dates', () => {
      const date1 = new Date('2023-12-25');
      const date2 = new Date('2023-12-20');
      expect(daysBetween(date1, date2)).toBe(5);
    });

    it('should return negative for past dates', () => {
      const date1 = new Date('2023-12-20');
      const date2 = new Date('2023-12-25');
      expect(daysBetween(date1, date2)).toBe(-5);
    });
  });

  describe('isToday', () => {
    it('should return true for today', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('should return false for other dates', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });

    it('should return false for invalid date', () => {
      expect(isToday('invalid')).toBe(false);
    });
  });

  describe('addDays', () => {
    it('should add days to date', () => {
      const date = new Date('2023-12-25');
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(30);
    });

    it('should subtract days with negative number', () => {
      const date = new Date('2023-12-25');
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(20);
    });
  });

  describe('isYesterday', () => {
    it('should return true for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isYesterday(yesterday)).toBe(true);
    });

    it('should return false for other dates', () => {
      const today = new Date();
      expect(isYesterday(today)).toBe(false);
    });

    it('should return false for invalid date', () => {
      expect(isYesterday('invalid')).toBe(false);
    });
  });

  describe('startOfDay', () => {
    it('should return start of day', () => {
      const date = new Date('2023-12-25 15:30:45');
      const start = startOfDay(date);
      expect(start.getHours()).toBe(0);
      expect(start.getMinutes()).toBe(0);
      expect(start.getSeconds()).toBe(0);
      expect(start.getMilliseconds()).toBe(0);
    });

    it('should throw error for invalid date', () => {
      expect(() => startOfDay('invalid')).toThrow('Invalid date');
    });
  });

  describe('endOfDay', () => {
    it('should return end of day', () => {
      const date = new Date('2023-12-25 10:30:45');
      const end = endOfDay(date);
      expect(end.getHours()).toBe(23);
      expect(end.getMinutes()).toBe(59);
      expect(end.getSeconds()).toBe(59);
      expect(end.getMilliseconds()).toBe(999);
    });

    it('should throw error for invalid date', () => {
      expect(() => endOfDay('invalid')).toThrow('Invalid date');
    });
  });

  describe('addMonths', () => {
    it('should add months to date', () => {
      const date = new Date('2023-01-15');
      const result = addMonths(date, 2);
      expect(result.getMonth()).toBe(2); // March (0-indexed)
      expect(result.getFullYear()).toBe(2023);
    });

    it('should subtract months with negative number', () => {
      const date = new Date('2023-03-15');
      const result = addMonths(date, -1);
      expect(result.getMonth()).toBe(1); // February (0-indexed)
    });

    it('should throw error for invalid date', () => {
      expect(() => addMonths('invalid', 1)).toThrow('Invalid date');
    });
  });

  describe('getRelativeTime', () => {
    it('should return "刚刚" for recent time', () => {
      const now = new Date();
      const recent = new Date(now.getTime() - 30 * 1000); // 30 seconds ago
      expect(getRelativeTime(recent, now)).toBe('刚刚');
    });

    it('should return minutes for time within hour', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
      expect(getRelativeTime(past, now)).toBe('5分钟前');
    });

    it('should return hours for time within day', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
      expect(getRelativeTime(past, now)).toBe('2小时前');
    });

    it('should return days for time within week', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
      expect(getRelativeTime(past, now)).toBe('3天前');
    });

    it('should return formatted date for older times', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
      const result = getRelativeTime(past, now);
      expect(result).toMatch(/\d{4}-\d{2}-\d{2}/);
    });

    it('should throw error for invalid dates', () => {
      expect(() => getRelativeTime('invalid')).toThrow('Invalid date');
      expect(() => getRelativeTime(new Date(), 'invalid')).toThrow(
        'Invalid date'
      );
    });
  });
});
