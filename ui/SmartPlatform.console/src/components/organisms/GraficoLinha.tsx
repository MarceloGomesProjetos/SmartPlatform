import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GraficoLinhaProps {
  data: { name: string; value: number }[];
  color?: string;
  title?: string;
}

const GraficoLinha: React.FC<GraficoLinhaProps> = ({ data, color = "#3b82f6", title }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoLinha;