/**
 * Unit tests for menu server actions
 * Requirements: 4.6, 6.2, 6.4
 * 
 * @vitest-environment node
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { MenuItem } from '@/lib/types';

// Mock fs module before importing the actions
const mockReadFile = vi.fn();
const mockWriteFile = vi.fn();

vi.mock('fs', () => ({
  promises: {
    readFile: mockReadFile,
    writeFile: mockWriteFile,
  },
}));

// Import after mocking
const { getMenuItems, updateMenuItems } = await import('@/app/actions/menu');

describe('Menu Server Actions', () => {
  const mockMenuItems: MenuItem[] = [
    {
      id: 'test-1',
      name: 'Test Dish',
      nameHi: 'टेस्ट डिश',
      description: 'A test dish',
      descriptionHi: 'एक टेस्ट डिश',
      price: 100,
      category: 'thali',
      image: '/images/dishes/test.jpg',
      isVeg: true,
      spiceLevel: 'medium',
      isAvailable: true,
      featured: false,
    },
    {
      id: 'test-2',
      name: 'Another Test',
      nameHi: 'दूसरा टेस्ट',
      description: 'Another test dish',
      descriptionHi: 'एक और टेस्ट डिश',
      price: 150,
      category: 'ghar-ka-khana',
      image: '/images/dishes/test2.jpg',
      isVeg: false,
      spiceLevel: 'hot',
      isAvailable: true,
      featured: true,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getMenuItems', () => {
    it('should successfully read and return menu items', async () => {
      // Arrange
      const mockFileContent = JSON.stringify({ menuItems: mockMenuItems });
      mockReadFile.mockResolvedValue(mockFileContent);

      // Act
      const result = await getMenuItems();

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockMenuItems);
        expect(result.data).toHaveLength(2);
      }
      expect(mockReadFile).toHaveBeenCalledWith(
        expect.stringContaining('menu.json'),
        'utf-8'
      );
    });

    it('should handle file not found error', async () => {
      // Arrange
      const error = new Error('File not found') as NodeJS.ErrnoException;
      error.code = 'ENOENT';
      mockReadFile.mockRejectedValue(error);

      // Act
      const result = await getMenuItems();

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Menu file not found');
      }
    });

    it('should handle invalid JSON format', async () => {
      // Arrange
      mockReadFile.mockResolvedValue('invalid json {');

      // Act
      const result = await getMenuItems();

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Invalid JSON format in menu file');
      }
    });

    it('should handle invalid menu data structure', async () => {
      // Arrange
      const mockFileContent = JSON.stringify({ items: mockMenuItems }); // Wrong key
      mockReadFile.mockResolvedValue(mockFileContent);

      // Act
      const result = await getMenuItems();

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Invalid menu data structure');
      }
    });

    it('should handle empty menu items array', async () => {
      // Arrange
      const mockFileContent = JSON.stringify({ menuItems: [] });
      mockReadFile.mockResolvedValue(mockFileContent);

      // Act
      const result = await getMenuItems();

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual([]);
      }
    });
  });

  describe('updateMenuItems', () => {
    it('should require admin authentication', async () => {
      // Act
      const result = await updateMenuItems(mockMenuItems);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Authentication required');
      }
      expect(mockWriteFile).not.toHaveBeenCalled();
    });

    it('should successfully update menu items with valid data', async () => {
      // Arrange
      mockWriteFile.mockResolvedValue(undefined);

      // Act
      const result = await updateMenuItems(mockMenuItems, 'admin-token');

      // Assert
      expect(result.success).toBe(true);
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('menu.json'),
        expect.stringContaining('"menuItems"'),
        'utf-8'
      );
    });

    it('should validate menu item structure', async () => {
      // Arrange
      const invalidItems = [
        {
          id: 'test-1',
          name: 'Test',
          // Missing required fields
        },
      ];

      // Act
      const result = await updateMenuItems(invalidItems, 'admin-token');

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
      expect(mockWriteFile).not.toHaveBeenCalled();
    });

    it('should reject negative prices', async () => {
      // Arrange
      const invalidItems = [
        {
          ...mockMenuItems[0],
          price: -100,
        },
      ];

      // Act
      const result = await updateMenuItems(invalidItems, 'admin-token');

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
        expect(result.error).toContain('positive');
      }
    });

    it('should reject invalid category', async () => {
      // Arrange
      const invalidItems = [
        {
          ...mockMenuItems[0],
          category: 'invalid-category',
        },
      ];

      // Act
      const result = await updateMenuItems(invalidItems, 'admin-token');

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });

    it('should reject invalid spice level', async () => {
      // Arrange
      const invalidItems = [
        {
          ...mockMenuItems[0],
          spiceLevel: 'super-hot',
        },
      ];

      // Act
      const result = await updateMenuItems(invalidItems, 'admin-token');

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });

    it('should reject duplicate menu item IDs', async () => {
      // Arrange
      const duplicateItems = [
        mockMenuItems[0],
        { ...mockMenuItems[1], id: 'test-1' }, // Duplicate ID
      ];

      // Act
      const result = await updateMenuItems(duplicateItems, 'admin-token');

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Duplicate menu item IDs found');
      }
    });

    it('should reject empty menu items array', async () => {
      // Act
      const result = await updateMenuItems([], 'admin-token');

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });

    it('should handle file write permission error', async () => {
      // Arrange
      const error = new Error('Permission denied') as NodeJS.ErrnoException;
      error.code = 'EACCES';
      mockWriteFile.mockRejectedValue(error);

      // Act
      const result = await updateMenuItems(mockMenuItems, 'admin-token');

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Permission denied to write menu file');
      }
    });

    it('should format JSON with proper indentation', async () => {
      // Arrange
      mockWriteFile.mockResolvedValue(undefined);

      // Act
      await updateMenuItems(mockMenuItems, 'admin-token');

      // Assert
      const writeCall = mockWriteFile.mock.calls[0];
      const writtenContent = writeCall[1] as string;
      
      // Check that JSON is formatted with 2-space indentation
      expect(writtenContent).toContain('\n  ');
      expect(writtenContent).toContain('"menuItems"');
    });

    it('should accept menu items without spice level', async () => {
      // Arrange
      const itemsWithoutSpice = [
        {
          ...mockMenuItems[0],
          spiceLevel: undefined,
        },
      ];
      mockWriteFile.mockResolvedValue(undefined);

      // Act
      const result = await updateMenuItems(itemsWithoutSpice, 'admin-token');

      // Assert
      expect(result.success).toBe(true);
    });

    it('should validate image path format', async () => {
      // Arrange
      const invalidItems = [
        {
          ...mockMenuItems[0],
          image: 'invalid-path.jpg', // Missing /images/dishes/ prefix
        },
      ];

      // Act
      const result = await updateMenuItems(invalidItems, 'admin-token');

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
        expect(result.error).toContain('image');
      }
    });

    it('should accept all valid menu categories', async () => {
      // Arrange
      const categories = ['thali', 'ghar-ka-khana', 'street-delights', 'mithai', 'sattu-specials'];
      const items = categories.map((category, index) => ({
        ...mockMenuItems[0],
        id: `test-${index}`,
        category: category as MenuItem['category'],
      }));
      mockWriteFile.mockResolvedValue(undefined);

      // Act
      const result = await updateMenuItems(items, 'admin-token');

      // Assert
      expect(result.success).toBe(true);
    });

    it('should accept all valid spice levels', async () => {
      // Arrange
      const spiceLevels: Array<'mild' | 'medium' | 'hot'> = ['mild', 'medium', 'hot'];
      const items = spiceLevels.map((spiceLevel, index) => ({
        ...mockMenuItems[0],
        id: `test-${index}`,
        spiceLevel,
      }));
      mockWriteFile.mockResolvedValue(undefined);

      // Act
      const result = await updateMenuItems(items, 'admin-token');

      // Assert
      expect(result.success).toBe(true);
    });
  });
});
