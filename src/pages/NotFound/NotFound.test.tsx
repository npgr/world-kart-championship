import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from './NotFound';

describe('Not Found Page', () => {
  test('it should renders not found', () => {
    render(<NotFound />);
    const NotFoundMessage = screen.getByText(/Not Found page/i);

    expect(NotFoundMessage).toBeInTheDocument();
  });
});
