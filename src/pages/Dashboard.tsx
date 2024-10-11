import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { BarChart, PieChart, TrendingUp, Users, Folder, FileText, ArrowUp, ArrowDown, Zap, Globe, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const Dashboard: React.FC = () => {
  const { projects } = useSelector((state: RootState) => state.projects);
  const { reports } = useSelector((state: RootState) => state.reports);

  const projectData = [
    { name: 'In Progress', value: 5 },
    { name: 'Completed', value: 8 },
    { name: 'Planned', value: 3 },
  ];

  const impactData = [
    { name: 'Jan', value: 1000 },
    { name: 'Feb', value: 1500 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2500 },
    { name: 'May', value: 3000 },
    { name: 'Jun', value: 3500 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <DashboardCard
          title="Total Projects"
          value={projects.length}
          icon={<Folder className="text-blue-500" size={24} />}
          trend={<TrendIndicator value={5} />}
        />
        <DashboardCard
          title="Reports Submitted"
          value={reports.filter(r => r.status === 'submitted').length}
          icon={<FileText className="text-green-500" size={24} />}
          trend={<TrendIndicator value={2} />}
        />
        <DashboardCard
          title="Compliance Score"
          value="92%"
          icon={<Award className="text-yellow-500" size={24} />}
          trend={<TrendIndicator value={-1} />}
        />
        <DashboardCard
          title="Carbon Footprint"
          value="-15%"
          icon={<Globe className="text-purple-500" size={24} />}
          trend={<TrendIndicator value={-15} />}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectData.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                  </div>
                  <Progress value={(item.value / 16) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Impact Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {impactData.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                  </div>
                  <Progress value={(item.value / 3500) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Initiatives</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span>Renewable Energy Transition</span>
                <Progress value={75} className="w-1/2" />
              </li>
              <li className="flex items-center justify-between">
                <span>Diversity & Inclusion Program</span>
                <Progress value={60} className="w-1/2" />
              </li>
              <li className="flex items-center justify-between">
                <span>Sustainable Supply Chain</span>
                <Progress value={40} className="w-1/2" />
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Zap className="mr-2 text-yellow-500" size={18} />
                <span>New sustainability report submitted</span>
              </li>
              <li className="flex items-center">
                <Users className="mr-2 text-blue-500" size={18} />
                <span>Community outreach event planned</span>
              </li>
              <li className="flex items-center">
                <TrendingUp className="mr-2 text-green-500" size={18} />
                <span>ESG score improved by 5%</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, trend }) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4 sm:p-6">
        <div>
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-700">{title}</CardTitle>
          <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{value}</p>
        </div>
        <div className="flex flex-col items-end">
          {icon}
          {trend}
        </div>
      </CardContent>
    </Card>
  );
};

interface TrendIndicatorProps {
  value: number;
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({ value }) => {
  const isPositive = value >= 0;
  const color = isPositive ? 'text-green-500' : 'text-red-500';
  const Icon = isPositive ? ArrowUp : ArrowDown;

  return (
    <div className={`flex items-center ${color} text-sm mt-1`}>
      <Icon size={14} className="mr-1" />
      <span>{Math.abs(value)}%</span>
    </div>
  );
};

export default Dashboard;