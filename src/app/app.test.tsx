import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { App } from './app';

test('renders hello message', () => {
    render(<App />);
    expect(screen.getByText(/Hello React App/i)).toBeInTheDocument();
});
