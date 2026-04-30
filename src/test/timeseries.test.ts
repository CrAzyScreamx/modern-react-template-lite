import { describe, it, expect } from 'vitest';
import { generateTimeSeries, parseRange } from '../../server/metrics';

// ── parseRange ────────────────────────────────────────────────────────────────

describe('parseRange', () => {
  it('returns 30 for undefined', () => {
    expect(parseRange(undefined)).toBe(30);
  });

  it('parses a valid range like "30d"', () => {
    expect(parseRange('30d')).toBe(30);
  });

  it('parses "7d"', () => {
    expect(parseRange('7d')).toBe(7);
  });

  it('parses "90d"', () => {
    expect(parseRange('90d')).toBe(90);
  });

  it('caps at 90 for values above the maximum', () => {
    expect(parseRange('200d')).toBe(90);
  });

  it('clamps to 1 for "0d"', () => {
    expect(parseRange('0d')).toBe(1);
  });

  it('returns 30 for a malformed string', () => {
    expect(parseRange('abc')).toBe(30);
  });

  it('returns 30 for a plain number without "d" suffix', () => {
    expect(parseRange('30')).toBe(30);
  });

  it('returns 30 for an empty string', () => {
    expect(parseRange('')).toBe(30);
  });
});

// ── generateTimeSeries ────────────────────────────────────────────────────────

describe('generateTimeSeries', () => {
  it('returns the requested number of data points', () => {
    expect(generateTimeSeries(30)).toHaveLength(30);
    expect(generateTimeSeries(7)).toHaveLength(7);
    expect(generateTimeSeries(90)).toHaveLength(90);
  });

  it('each point has a date string and a non-negative integer value', () => {
    const points = generateTimeSeries(30);
    for (const pt of points) {
      expect(typeof pt.date).toBe('string');
      expect(/^\d{4}-\d{2}-\d{2}$/.test(pt.date)).toBe(true);
      expect(typeof pt.value).toBe('number');
      expect(pt.value).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(pt.value)).toBe(true);
    }
  });

  it('dates are in ascending order', () => {
    const points = generateTimeSeries(30);
    for (let i = 1; i < points.length; i++) {
      expect((points[i]?.date ?? '') >= (points[i - 1]?.date ?? '')).toBe(true);
    }
  });

  it('last date is today', () => {
    const today = new Date().toISOString().slice(0, 10);
    const points = generateTimeSeries(30);
    expect(points.at(-1)?.date).toBe(today);
  });

  it('is deterministic for the same seed', () => {
    const a = generateTimeSeries(30, 42);
    const b = generateTimeSeries(30, 42);
    expect(a).toEqual(b);
  });

  it('produces different results for different seeds', () => {
    const a = generateTimeSeries(30, 42);
    const b = generateTimeSeries(30, 99);
    expect(a).not.toEqual(b);
  });

  it('handles a single day', () => {
    const points = generateTimeSeries(1);
    expect(points).toHaveLength(1);
    const today = new Date().toISOString().slice(0, 10);
    expect(points.at(0)?.date).toBe(today);
  });
});
