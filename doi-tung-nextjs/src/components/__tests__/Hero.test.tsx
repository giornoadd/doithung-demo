import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero', () => {
  it('renders the hero section with the correct text and links', () => {
    render(<Hero />);
    
    const heading = screen.getByText(/ปฏิรูปเงินสดย่อย: จากงานด้วยมือสู่ระบบอัตโนมัติด้วย AI/i);
    expect(heading).toBeInTheDocument();

    const solutionLink = screen.getByRole('link', { name: /สำรวจโซลูชัน/i });
    expect(solutionLink).toBeInTheDocument();
    expect(solutionLink).toHaveAttribute('href', '#solution');

    const impactLink = screen.getByRole('link', { name: /ดูผลลัพธ์/i });
    expect(impactLink).toBeInTheDocument();
    expect(impactLink).toHaveAttribute('href', '#impact');

    const promptConsoleLink = screen.getByRole('link', { name: /Prompt Console/i });
    expect(promptConsoleLink).toBeInTheDocument();
    expect(promptConsoleLink).toHaveAttribute('href', '/prompt-admin');
  });
});
