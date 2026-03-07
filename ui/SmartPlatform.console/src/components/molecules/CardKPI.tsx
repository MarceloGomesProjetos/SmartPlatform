
import React from 'react';
import { cva } from 'class-variance-authority';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { GraphInline } from './GraphInline';

interface CardKPIProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  chartData: { name: string; value: number }[];
}

const changeIcon = (changeType: 'increase' | 'decrease') => {
  const className = "mr-1 h-4 w-4";
  return changeType === 'increase' ? <ArrowUp className={`${className} text-green-500`} /> : <ArrowDown className={`${className} text-red-500`} />;
};

const changeColor = cva('text-sm font-medium', {
    variants: {
      changeType: {
        increase: 'text-green-500 dark:text-green-400',
        decrease: 'text-red-500 dark:text-red-400',
      },
    },
  });

export const CardKPI: React.FC<CardKPIProps> = ({ title, value, change, changeType, chartData }) => {
  const chartColors = changeType === 'increase' 
    ? { stroke: '#22c55e', fill: '#22c55e'} // green-500
    : { stroke: '#ef4444', fill: '#ef4444'}; // red-500

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm dark:bg-slate-900/70 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
        <div className={`flex items-center ${changeColor({ changeType })}`}>
          {changeIcon(changeType)}
          <span>{change}</span>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
        <div className="w-2/5">
            <GraphInline data={chartData} strokeColor={chartColors.stroke} fillColor={chartColors.fill} />
        </div>
      </div>
    </div>
  );
};
