import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders the header with the correct text', () => {
    render(<Header />);
    const heading = screen.getByText(/Petty Cash Automation Project Hub/i);
    expect(heading).toBeInTheDocument();
  });
});
