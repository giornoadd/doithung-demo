import { render, screen } from '@testing-library/react';
import ProblemSection from '../ProblemSection';

describe('ProblemSection', () => {
  it('renders the problem section with the correct text', () => {
    render(<ProblemSection />);
    
    const heading = screen.getByText(/ความท้าทายที่เราพบ: กระบวนการด้วยมือ/i);
    expect(heading).toBeInTheDocument();

    const article1Heading = screen.getByRole('heading', { name: /ภาระงานสูง/i });
    expect(article1Heading).toBeInTheDocument();

    const article2Heading = screen.getByRole('heading', { name: /ความเสี่ยงจากข้อผิดพลาด/i });
    expect(article2Heading).toBeInTheDocument();

    const article3Heading = screen.getByRole('heading', { name: /ช่องว่างความไว้วางใจ/i });
    expect(article3Heading).toBeInTheDocument();
  });
});
