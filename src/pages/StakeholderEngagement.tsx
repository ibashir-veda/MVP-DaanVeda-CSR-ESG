import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, Phone, Calendar } from 'lucide-react';

const StakeholderEngagement: React.FC = () => {
  const stakeholders = [
    { id: 1, name: 'Local Community', type: 'Community', lastEngaged: '2023-12-15', nextEngagement: '2024-03-15' },
    { id: 2, name: 'Investors Group', type: 'Investors', lastEngaged: '2024-01-10', nextEngagement: '2024-04-10' },
    { id: 3, name: 'Environmental NGO', type: 'NGO', lastEngaged: '2023-11-20', nextEngagement: '2024-02-20' },
    { id: 4, name: 'Employee Union', type: 'Internal', lastEngaged: '2024-02-01', nextEngagement: '2024-05-01' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Stakeholder Engagement</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stakeholders.map((stakeholder) => (
          <Card key={stakeholder.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" />
                {stakeholder.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">Type: {stakeholder.type}</p>
              <div className="flex items-center text-sm mb-1">
                <Calendar className="mr-1" />
                Last Engaged: {stakeholder.lastEngaged}
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="mr-1" />
                Next Engagement: {stakeholder.nextEngagement}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StakeholderEngagement;