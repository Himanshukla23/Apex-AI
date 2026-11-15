import React from 'react';
import { KpiCard } from './KpiCard';
import { KpiMetric } from '../../types/dashboard';

interface KpiGridProps {
  metrics: KpiMetric[];
}

export const KpiGrid: React.FC<KpiGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {metrics.map((metric) => (
        <KpiCard key={metric.name} metric={metric} />
      ))}
    </div>
  );
};
