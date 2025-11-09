import { render, screen } from '@testing-library/react';
import ImpactSection from '../ImpactSection';

describe('ImpactSection', () => {
  it('renders the impact section with the correct text', () => {
    render(<ImpactSection />);
    
    const heading = screen.getByText(/ผลกระทบที่คาดการณ์ \(บรรลุเป้าหมาย\)/i);
    expect(heading).toBeInTheDocument();

    const article1Heading = screen.getByRole('heading', { name: /ทำงานอัตโนมัติ 80%/i });
    expect(article1Heading).toBeInTheDocument();

    const article2Heading = screen.getByRole('heading', { name: /ความแม่นยำ 100%/i });
    expect(article2Heading).toBeInTheDocument();

    const article3Heading = screen.getByRole('heading', { name: /ลดภาระงานและต้นทุน/i });
    expect(article3Heading).toBeInTheDocument();
  });
});
