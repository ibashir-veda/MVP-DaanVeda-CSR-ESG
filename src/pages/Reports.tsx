import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, CheckCircle } from 'lucide-react';

const Reports: React.FC = () => {
  const { reports } = useSelector((state: RootState) => state.reports);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Reports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reports.length > 0 ? (
          reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2" />
                  {report.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">Type: {report.type}</p>
                <div className="flex items-center text-sm">
                  {report.status === 'draft' ? (
                    <Clock className="mr-1 text-yellow-500" />
                  ) : report.status === 'approved' ? (
                    <CheckCircle className="mr-1 text-green-500" />
                  ) : (
                    <FileText className="mr-1 text-blue-500" />
                  )}
                  {report.status}
                </div>
                <p className="text-sm mt-2">Submitted: {report.submissionDate}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No reports available.</p>
        )}
      </div>
    </div>
  );
};

export default Reports;