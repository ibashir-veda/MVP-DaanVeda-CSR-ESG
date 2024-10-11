import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const Compliance: React.FC = () => {
  const complianceItems = [
    { id: 1, name: 'Environmental Regulations', status: 'compliant' },
    { id: 2, name: 'Labor Laws', status: 'partial' },
    { id: 3, name: 'Data Protection', status: 'non-compliant' },
    { id: 4, name: 'Anti-Corruption Policies', status: 'compliant' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="text-green-500" />;
      case 'partial':
        return <AlertTriangle className="text-yellow-500" />;
      case 'non-compliant':
        return <AlertTriangle className="text-red-500" />;
      default:
        return <Shield className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Compliance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complianceItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2" />
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                {getStatusIcon(item.status)}
                <span className="ml-2 capitalize">{item.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Compliance;