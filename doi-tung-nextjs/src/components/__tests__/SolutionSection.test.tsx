import { render, screen } from '@testing-library/react';
import SolutionSection from '../SolutionSection';

describe('SolutionSection', () => {
  it('renders the solution section with the correct text and links', () => {
    render(<SolutionSection />);
    
    const heading = screen.getByText(/โซลูชันของเรา: กระบวนการอัตโนมัติ 3 ขั้นตอน/i);
    expect(heading).toBeInTheDocument();

    const article1Heading = screen.getByRole('heading', { name: /การป้อนข้อมูลจากพนักงาน/i });
    expect(article1Heading).toBeInTheDocument();

    const article2Heading = screen.getByRole('heading', { name: /การควบคุมโดยการเงิน/i });
    expect(article2Heading).toBeInTheDocument();

    const article3Heading = screen.getByRole('heading', { name: /สถานะในอนาคต/i });
    expect(article3Heading).toBeInTheDocument();

    const lineChatbotLink = screen.getByRole('link', { name: /Demo: LINE Chatbot/i });
    expect(lineChatbotLink).toBeInTheDocument();
    expect(lineChatbotLink).toHaveAttribute('href', '/line-prototype');

    const aiDashboardLink = screen.getByRole('link', { name: /Demo: AI Dashboard/i });
    expect(aiDashboardLink).toBeInTheDocument();
    expect(aiDashboardLink).toHaveAttribute('href', '/dashboard-prototype');

    const programDashboardLink = screen.getByRole('link', { name: /Demo: Program Dashboard/i });
    expect(programDashboardLink).toBeInTheDocument();
    expect(programDashboardLink).toHaveAttribute('href', '/pcard-program-prototype');

    const reportLink = screen.getByRole('link', { name: /Demo: รายงานสรุป/i });
    expect(reportLink).toBeInTheDocument();
    expect(reportLink).toHaveAttribute('href', '/pcard-report-prototype');

    const promptConsoleLink = screen.getByRole('link', { name: /Admin: Prompt Console/i });
    expect(promptConsoleLink).toBeInTheDocument();
    expect(promptConsoleLink).toHaveAttribute('href', '/prompt-admin');
  });
});
