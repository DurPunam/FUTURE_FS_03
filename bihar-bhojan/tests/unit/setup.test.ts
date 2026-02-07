import { describe, it, expect } from 'vitest';

describe('Setup Test', () => {
  it('should run tests successfully', () => {
    expect(true).toBe(true);
  });

  it('should have access to fast-check', async () => {
    const fc = await import('fast-check');
    expect(fc).toBeDefined();
  });
});
