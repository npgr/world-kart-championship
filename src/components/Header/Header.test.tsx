import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithIntl as render } from '../../utils/test-utils';
import Header from './Header';

describe('Header component', () => {
  beforeEach(() => {
    render(<Header />);
  });

  test('should display title', () => {
    const title = screen.getByText('World Kart Championship');
    expect(title).toBeInTheDocument();
  });
});
