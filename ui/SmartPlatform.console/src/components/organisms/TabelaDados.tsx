import React from "react";

interface TabelaDadosProps {
  columns: string[];
  data: Record<string, any>[];
}

const TabelaDados: React.FC<TabelaDadosProps> = ({ columns, data }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 text-sm text-gray-700">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaDados;