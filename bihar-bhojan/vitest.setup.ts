import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import React from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        const Component = React.forwardRef((props: any, ref: any) => {
          const { children, ...rest } = props;
          return React.createElement(prop as string, { ...rest, ref }, children);
        });
        Component.displayName = `motion.${String(prop)}`;
        return Component;
      },
    }
  ),
}));

// Cleanup after each test
afterEach(() => {
  cleanup();
});
