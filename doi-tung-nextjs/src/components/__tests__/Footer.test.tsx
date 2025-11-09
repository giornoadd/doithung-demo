import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the footer with the correct text', () => {
    render(<Footer />);
    const text1 = screen.getByText(/โครงการริเริ่มโดยทีมการเงินและนักวิเคราะห์ธุรกิจดอยตุง | Design Sprint 2025/i);
    const text2 = screen.getByText(/ติดต่อ: finance-innovation@doitung.org/i);
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });
});
