import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const RiskAssessment: React.FC = () => {
  const risks = [
    { id: 1, name: 'Climate Change Impact', level: 'High', trend: 'increasing' },
    { id: 2, name: 'Supply Chain Disruption', level: 'Medium', trend: 'stable' },
    { id: 3, name: 'Regulatory Changes', level: 'High', trend: 'increasing' },
    { id: 4, name: 'Cybersecurity Threats', level: 'Medium', trend: 'decreasing' },
  ];

  const getRiskIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="text-red-500" />;
      case 'medium':
        return <AlertTriangle className="text-yellow-500" />;
      case 'low':
        return <AlertTriangle className="text-green-500" />;
      default:
        return <AlertTriangle className="text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="text-green-500" />;
      default:
        return <span className="text-yellow-500">→</span>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Risk Assessment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {risks.map((risk) => (
          <Card key={risk.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {getRiskIcon(risk.level)}
                <span className="ml-2">{risk.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">Risk Level: {risk.level}</p>
              <div className="flex items-center">
                <span className="mr-2">Trend:</span>
                {getTrendIcon(risk.trend)}
                <span className="ml-1 capitalize">{risk.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RiskAssessment;