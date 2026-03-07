// src/App.tsx
import React, { useState } from "react";
import { ThemeProvider, useTheme } from "./components/context/ThemeContext";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { FiHome, FiActivity, FiSettings } from "react-icons/fi";
import { LineChart, Line } from "recharts";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockKPIs = [
  { title: "Active Services", value: 6, variation: "+1", icon: <ArrowUpIcon className="w-6 h-6 text-green-500" /> },
  { title: "Events Processed", value: 12847, variation: "+5%", icon: <ArrowUpIcon className="w-6 h-6 text-blue-500" /> },
  { title: "Failed Events", value: 3, variation: "-1", icon: <ArrowDownIcon className="w-6 h-6 text-red-500" /> },
  { title: "Pending Outbox", value: 14, variation: "+2", icon: <ArrowUpIcon className="w-6 h-6 text-orange-500" /> },
];

const mockChartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4000 },
  { name: "May", value: 6000 },
];

const mockTableData = [
  { Service: "Worker A", Status: "Active", Events: 400 },
  { Service: "Worker B", Status: "Failed", Events: 3 },
  { Service: "Worker C", Status: "Pending", Events: 14 },
];

const mockTimelineEvents = [
  { time: "08:00", title: "Service Worker A started", color: "bg-green-500" },
  { time: "09:15", title: "Worker B failed event", color: "bg-red-500" },
  { time: "10:30", title: "Outbox processed", color: "bg-blue-500" },
];

// ─── COMPONENTES INTERNOS ─────────────────────────────────────────────────────
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      <button className="p-4 text-xl font-bold" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? ">" : "<"}
      </button>
      <nav className="mt-8 flex flex-col gap-2">
        <a className="flex items-center p-3 hover:bg-gray-700 rounded">
          <FiHome size={20} />
          {!collapsed && <span className="ml-2">Dashboard</span>}
        </a>
        <a className="flex items-center p-3 hover:bg-gray-700 rounded">
          <FiActivity size={20} />
          {!collapsed && <span className="ml-2">Events</span>}
        </a>
        <a className="flex items-center p-3 hover:bg-gray-700 rounded">
          <FiSettings size={20} />
          {!collapsed && <span className="ml-2">Settings</span>}
        </a>
      </nav>
    </div>
  );
};

const CardKPI = ({ title, value, variation, icon }: any) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col">
    <div className="flex items-center justify-between">
      <div className="text-gray-500 dark:text-gray-300 text-sm">{title}</div>
      {icon}
    </div>
    <div className="text-2xl font-bold mt-2">{value}</div>
    <div className="text-sm text-gray-400 mt-1">{variation}</div>
    <LineChart width={100} height={40} data={mockChartData}>
      <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} dot={false} />
    </LineChart>
  </div>
);

const GraficoLinha = ({ title, data, color = "#4F46E5" }: any) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
    <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-2">{title}</h3>
    <LineChart width={300} height={100} data={data}>
      <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </div>
);

const TabelaDados = ({ columns, data }: any) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded shadow overflow-x-auto">
    <table className="min-w-full table-auto text-gray-700 dark:text-gray-300">
      <thead>
        <tr>
          {columns.map((col: string) => (
            <th key={col} className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-600">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, idx: number) => (
          <tr key={idx}>
            {columns.map((col: string) => (
              <td key={col} className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Timeline = ({ events }: any) => (
  <div className="relative border-l-2 border-gray-300 dark:border-gray-600 ml-4">
    {events.map((e: any, i: number) => (
      <div key={i} className="mb-8 ml-6 relative group cursor-pointer">
        <span className={`absolute -left-4 w-4 h-4 rounded-full ${e.color} group-hover:scale-125 transition-transform`}></span>
        <time className="text-gray-500 dark:text-gray-400">{e.time}</time>
        <p className="mt-1 text-gray-700 dark:text-gray-300">{e.title}</p>
      </div>
    ))}
  </div>
);

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
const DashboardLayout = () => (
  <div className="p-6 space-y-6">
    {/* KPI Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {mockKPIs.map((kpi) => (
        <CardKPI key={kpi.title} {...kpi} />
      ))}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <GraficoLinha data={mockChartData} title="Eventos Processados" />
      <GraficoLinha data={mockChartData} title="Serviços Ativos" color="#10b981" />
    </div>

    {/* Table */}
    <TabelaDados columns={["Service", "Status", "Events"]} data={mockTableData} />

    {/* Timeline */}
    <Timeline events={mockTimelineEvents} />
  </div>
);

// ─── APP FINAL ────────────────────────────────────────────────────────────────
const App = () => {
  return (
    <ThemeProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
          <DashboardLayout />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;