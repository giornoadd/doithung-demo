'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: ['Auto-Approved (≥95%)', 'Medium Confidence (85-94%)', 'Needs Review (<85%)'],
  datasets: [{
    data: [18, 0, 2],
    backgroundColor: [
      'rgba(16, 185, 129, 0.8)',
      'rgba(251, 191, 36, 0.8)',
      'rgba(244, 63, 94, 0.8)'
    ],
    borderColor: [
      'rgba(16, 185, 129, 1)',
      'rgba(251, 191, 36, 1)',
      'rgba(244, 63, 94, 1)'
    ],
    borderWidth: 2
  }]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        font: {
          size: 13
        }
      }
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const label = context.label || '';
          const value = context.parsed || 0;
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value} vouchers (${percentage}%)`;
        }
      }
    }
  }
};

export default function PipelineOverview() {
  return (
    <section className="bg-white card-shadow rounded-3xl border border-slate-100 p-6 space-y-4">
      <header>
        <h2 className="text-lg font-semibold text-slate-900">AI Processing Pipeline Overview</h2>
        <p className="text-sm text-slate-600">Real-time confidence distribution across all vouchers</p>
      </header>
      <div className="relative h-64">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </section>
  );
}
