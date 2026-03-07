
import React from 'react';
import { DashboardLayout } from '../components/templates/DashboardLayout';
import { DashboardGrid } from '../components/organisms/DashboardGrid';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <DashboardGrid />
    </DashboardLayout>
  );
};

export default Dashboard;
