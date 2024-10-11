import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Eye } from 'lucide-react';

const DocumentManagement: React.FC = () => {
  const documents = [
    { id: 1, name: 'Annual Sustainability Report 2023', type: 'Report', date: '2024-01-15' },
    { id: 2, name: 'Environmental Policy', type: 'Policy', date: '2023-11-30' },
    { id: 3, name: 'Stakeholder Engagement Plan', type: 'Plan', date: '2023-12-10' },
    { id: 4, name: 'Carbon Footprint Analysis', type: 'Analysis', date: '2024-02-01' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Document Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" />
                {doc.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">Type: {doc.type}</p>
              <p className="text-sm text-gray-600 mb-4">Date: {doc.date}</p>
              <div className="flex space-x-2">
                <button className="flex items-center text-blue-500 hover:text-blue-700">
                  <Eye className="mr-1" size={16} />
                  View
                </button>
                <button className="flex items-center text-green-500 hover:text-green-700">
                  <Download className="mr-1" size={16} />
                  Download
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentManagement;