
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart2,
  Bell,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const sidebarNavItems = [
  { href: '#', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '#', icon: Users, label: 'Members' },
  { href: '#', icon: BarChart2, label: 'Analytics' },
  { href: '#', icon: Settings, label: 'Settings' },
];

export const kpiData = [
  {
    title: 'Active Users',
    value: '1,250',
    change: '+15.2%',
    changeType: 'increase' as const,
    chartData: [
      { name: 'Jan', value: 300 },
      { name: 'Feb', value: 450 },
      { name: 'Mar', value: 600 },
      { name: 'Apr', value: 800 },
      { name: 'May', value: 750 },
      { name: 'Jun', value: 1250 },
    ],
  },
  {
    title: 'New Sign-ups',
    value: '320',
    change: '+5.7%',
    changeType: 'increase' as const,
    chartData: [
      { name: 'Jan', value: 100 },
      { name: 'Feb', value: 120 },
      { name: 'Mar', value: 180 },
      { name: 'Apr', value: 250 },
      { name: 'May', value: 280 },
      { name: 'Jun', value: 320 },
    ],
  },
  {
    title: 'Conversion Rate',
    value: '2.5%',
    change: '-0.5%',
    changeType: 'decrease' as const,
    chartData: [
        { name: 'Jan', value: 3.2 },
        { name: 'Feb', value: 3.0 },
        { name: 'Mar', value: 2.8 },
        { name: 'Apr', value: 2.9 },
        { name: 'May', value: 2.6 },
        { name: 'Jun', value: 2.5 },
    ],
  },
  {
    title: 'Avg. Session',
    value: '12m 45s',
    change: '+2.1%',
    changeType: 'increase' as const,
    chartData: [
        { name: 'Jan', value: 10 },
        { name: 'Feb', value: 11 },
        { name: 'Mar', value: 10.5 },
        { name: 'Apr', value: 12 },
        { name: 'May', value: 12.2 },
        { name: 'Jun', value: 12.75 },
    ],
  },
];

export const timelineEvents = [
  {
    id: 1,
    title: 'New user registered',
    time: '10:45 AM',
    description: 'User "alex@email.com" completed the sign-up process.',
    icon: Users,
    iconBgColor: 'bg-sky-500',
  },
  {
    id: 2,
    title: 'System update successful',
    time: '8:30 AM',
    description: 'The production server was updated to version 2.1.4.',
    icon: CheckCircle,
    iconBgColor: 'bg-green-500',
  },
  {
    id: 3,
    title: 'High CPU usage warning',
    time: 'Yesterday',
    description: 'The worker instance "worker-prod-us-east-1a" reported CPU usage above 90%.',
    icon: AlertCircle,
    iconBgColor: 'bg-yellow-500',
  },
    {
    id: 4,
    title: 'Database backup scheduled',
    time: 'Yesterday',
    description: 'A full backup for the main database is scheduled for 11:00 PM.',
    icon: Clock,
    iconBgColor: 'bg-gray-500',
  },
  {
    id: 5,
    title: 'New notification sent',
    time: '2 days ago',
    description: 'A "New Features" notification was sent to all active users.',
    icon: Bell,
    iconBgColor: 'bg-indigo-500',
  },
];

export type KpiData = typeof kpiData;
export type TimelineEvents = typeof timelineEvents;
