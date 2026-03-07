
import React from 'react';
import { CardKPI } from '../molecules/CardKPI';
import { kpiData } from '../../data/mockData';
import { Timeline } from './Timeline';

export const DashboardGrid: React.FC = () => {
  return (
    <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {kpiData.map((kpi) => (
                <CardKPI key={kpi.title} {...kpi} />
            ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6">
             <Timeline />
        </div>
    </div>
  );
};
