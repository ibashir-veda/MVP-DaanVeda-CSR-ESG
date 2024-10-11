import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Droplet, Wind, Zap, Recycle } from 'lucide-react';

const RealTimeMetrics: React.FC = () => {
  const metrics = [
    { id: 1, name: 'Energy Consumption', value: '1,234 kWh', trend: 'down', icon: Zap },
    { id: 2, name: 'Water Usage', value: '5,678 Gallons', trend: 'up', icon: Droplet },
    { id: 3, name: 'Carbon Emissions', value: '10.5 Tons', trend: 'down', icon: Wind },
    { id: 4, name: 'Waste Recycled', value: '789 kg', trend: 'up', icon: Recycle },
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="text-red-500" />
    ) : (
      <TrendingDown className="text-green-500" />
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Real-Time Metrics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <metric.icon className="mr-2" />
                {metric.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{metric.value}</div>
              <div className="flex items-center">
                {getTrendIcon(metric.trend)}
                <span className="ml-1 capitalize">{metric.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RealTimeMetrics;