
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

interface GraphInlineProps {
  data: { name: string; value: number }[];
  strokeColor: string;
  fillColor: string;
}

export const GraphInline: React.FC<GraphInlineProps> = ({ data, strokeColor, fillColor }) => {
  const domain = [Math.min(...data.map(d => d.value)) * 0.95, Math.max(...data.map(d => d.value)) * 1.05];

  return (
    <ResponsiveContainer width="100%" height={60}>
      <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`colorUv-${strokeColor}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={fillColor} stopOpacity={0.4} />
            <stop offset="95%" stopColor={fillColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis hide={true} domain={domain} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          fillOpacity={1}
          strokeWidth={2}
          fill={`url(#colorUv-${strokeColor})`}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
