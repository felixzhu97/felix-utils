import {
  formatDate,
  daysBetween,
  isToday,
  isYesterday,
  addDays,
  getRelativeTime,
} from "../date";

describe("Date utilities", () => {
  describe("formatDate", () => {
    it("should format date with default format", () => {
      const date = new Date("2023-12-25 15:30:45");
      expect(formatDate(date)).toBe("2023-12-25 15:30:45");
    });

    it("should format date with custom format", () => {
      const date = new Date("2023-12-25 15:30:45");
      expect(formatDate(date, "YYYY-MM-DD")).toBe("2023-12-25");
      expect(formatDate(date, "HH:mm:ss")).toBe("15:30:45");
    });

    it("should handle timestamp input", () => {
      const timestamp = new Date("2023-12-25 15:30:45").getTime();
      expect(formatDate(timestamp)).toBe("2023-12-25 15:30:45");
    });

    it("should throw error for invalid date", () => {
      expect(() => formatDate("invalid")).toThrow("Invalid date");
    });
  });

  describe("daysBetween", () => {
    it("should calculate days between two dates", () => {
      const date1 = new Date("2023-12-25");
      const date2 = new Date("2023-12-20");
      expect(daysBetween(date1, date2)).toBe(5);
    });

    it("should return negative for past dates", () => {
      const date1 = new Date("2023-12-20");
      const date2 = new Date("2023-12-25");
      expect(daysBetween(date1, date2)).toBe(-5);
    });
  });

  describe("isToday", () => {
    it("should return true for today", () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it("should return false for other dates", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });

    it("should return false for invalid date", () => {
      expect(isToday("invalid")).toBe(false);
    });
  });

  describe("addDays", () => {
    it("should add days to date", () => {
      const date = new Date("2023-12-25");
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(30);
    });

    it("should subtract days with negative number", () => {
      const date = new Date("2023-12-25");
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(20);
    });
  });

  describe("getRelativeTime", () => {
    it('should return "刚刚" for recent time', () => {
      const now = new Date();
      const recent = new Date(now.getTime() - 30 * 1000); // 30 seconds ago
      expect(getRelativeTime(recent, now)).toBe("刚刚");
    });

    it("should return minutes for time within hour", () => {
      const now = new Date();
      const past = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
      expect(getRelativeTime(past, now)).toBe("5分钟前");
    });

    it("should return hours for time within day", () => {
      const now = new Date();
      const past = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
      expect(getRelativeTime(past, now)).toBe("2小时前");
    });
  });
});
