/**
 * Integration tests for menu server actions with actual file system
 * Requirements: 4.6, 6.2
 * 
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest';
import { getMenuItems } from '@/app/actions/menu';

describe('Menu Server Actions Integration', () => {
  describe('getMenuItems', () => {
    it('should successfully read menu items from actual menu.json file', async () => {
      // Act
      const result = await getMenuItems();

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data.length).toBeGreaterThan(0);
        
        // Verify structure of first item
        const firstItem = result.data[0];
        expect(firstItem).toHaveProperty('id');
        expect(firstItem).toHaveProperty('name');
        expect(firstItem).toHaveProperty('nameHi');
        expect(firstItem).toHaveProperty('description');
        expect(firstItem).toHaveProperty('descriptionHi');
        expect(firstItem).toHaveProperty('price');
        expect(firstItem).toHaveProperty('category');
        expect(firstItem).toHaveProperty('image');
        expect(firstItem).toHaveProperty('isVeg');
        expect(firstItem).toHaveProperty('isAvailable');
        expect(firstItem).toHaveProperty('featured');
        
        // Verify data types
        expect(typeof firstItem.id).toBe('string');
        expect(typeof firstItem.name).toBe('string');
        expect(typeof firstItem.price).toBe('number');
        expect(typeof firstItem.isVeg).toBe('boolean');
      }
    });

    it('should load all menu categories', async () => {
      // Act
      const result = await getMenuItems();

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        const categories = new Set(result.data.map(item => item.category));
        
        // Verify we have items from different categories
        expect(categories.size).toBeGreaterThan(1);
        
        // Check for expected categories
        const expectedCategories = ['thali', 'ghar-ka-khana', 'street-delights', 'mithai', 'sattu-specials'];
        const hasExpectedCategories = expectedCategories.some(cat => categories.has(cat));
        expect(hasExpectedCategories).toBe(true);
      }
    });

    it('should load featured items', async () => {
      // Act
      const result = await getMenuItems();

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        const featuredItems = result.data.filter(item => item.featured);
        expect(featuredItems.length).toBeGreaterThan(0);
      }
    });

    it('should load both vegetarian and non-vegetarian items', async () => {
      // Act
      const result = await getMenuItems();

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        const vegItems = result.data.filter(item => item.isVeg);
        const nonVegItems = result.data.filter(item => !item.isVeg);
        
        expect(vegItems.length).toBeGreaterThan(0);
        expect(nonVegItems.length).toBeGreaterThan(0);
      }
    });

    it('should load items with various spice levels', async () => {
      // Act
      const result = await getMenuItems();

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        const itemsWithSpice = result.data.filter(item => item.spiceLevel);
        expect(itemsWithSpice.length).toBeGreaterThan(0);
        
        // Check for different spice levels
        const spiceLevels = new Set(itemsWithSpice.map(item => item.spiceLevel));
        expect(spiceLevels.size).toBeGreaterThan(0);
      }
    });
  });
});
