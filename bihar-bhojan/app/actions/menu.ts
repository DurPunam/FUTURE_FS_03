/**
 * Server Actions for menu management
 * Requirements: 4.6, 6.2
 */

'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { MenuItemsArraySchema } from '@/lib/validation';
import type { Result, MenuItem } from '@/lib/types';

// Path to menu.json file
const MENU_FILE_PATH = path.join(process.cwd(), 'data', 'menu.json');

/**
 * Get all menu items
 * Requirement 4.6: Load menu data from JSON file
 * 
 * Reads menu items from menu.json file
 */
export async function getMenuItems(): Promise<Result<MenuItem[]>> {
  try {
    // Read menu.json file
    const fileContent = await fs.readFile(MENU_FILE_PATH, 'utf-8');
    
    // Parse JSON
    const menuData = JSON.parse(fileContent);
    
    // Validate structure - expect { menuItems: [...] }
    if (!menuData || !Array.isArray(menuData.menuItems)) {
      return {
        success: false,
        error: 'Invalid menu data structure',
      };
    }

    // Return menu items
    return {
      success: true,
      data: menuData.menuItems as MenuItem[],
    };
  } catch (error: unknown) {
    console.error('Error reading menu items:', error);
    
    // Check if file not found
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return {
        success: false,
        error: 'Menu file not found',
      };
    }

    // Check if JSON parse error
    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: 'Invalid JSON format in menu file',
      };
    }

    return {
      success: false,
      error: 'Failed to load menu items. Please try again.',
    };
  }
}

/**
 * Update menu items (admin only)
 * Requirements: 6.2, 6.4
 * 
 * Validates and writes menu items to menu.json file
 */
export async function updateMenuItems(
  items: unknown,
  adminAuth?: string
): Promise<Result<void>> {
  try {
    // Verify admin authentication
    // TODO: Implement proper admin authentication when auth is implemented (task 4.7)
    if (!adminAuth) {
      return {
        success: false,
        error: 'Authentication required',
      };
    }

    // Validate input with Zod
    const validationResult = MenuItemsArraySchema.safeParse(items);
    
    if (!validationResult.success) {
      // Return first validation error
      const firstError = validationResult.error.issues[0];
      return {
        success: false,
        error: `Validation error: ${firstError.path.join('.')} - ${firstError.message}`,
      };
    }

    const validItems = validationResult.data;

    // Check for duplicate IDs
    const ids = validItems.map(item => item.id);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      return {
        success: false,
        error: 'Duplicate menu item IDs found',
      };
    }

    // Prepare menu data structure
    const menuData = {
      menuItems: validItems,
    };

    // Write to menu.json file with pretty formatting
    await fs.writeFile(
      MENU_FILE_PATH,
      JSON.stringify(menuData, null, 2),
      'utf-8'
    );

    return {
      success: true,
      data: undefined,
    };
  } catch (error: unknown) {
    console.error('Error updating menu items:', error);
    
    // Check if permission error
    if (error && typeof error === 'object' && 'code' in error && error.code === 'EACCES') {
      return {
        success: false,
        error: 'Permission denied to write menu file',
      };
    }

    return {
      success: false,
      error: 'Failed to update menu items. Please try again.',
    };
  }
}
