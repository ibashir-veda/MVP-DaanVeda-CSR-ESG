import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, Clock, CheckCircle } from 'lucide-react';

const Projects: React.FC = () => {
  const { projects } = useSelector((state: RootState) => state.projects);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Folder className="mr-2" />
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <div className="flex items-center text-sm">
                  {project.status === 'in-progress' ? (
                    <Clock className="mr-1 text-yellow-500" />
                  ) : project.status === 'completed' ? (
                    <CheckCircle className="mr-1 text-green-500" />
                  ) : (
                    <Folder className="mr-1 text-blue-500" />
                  )}
                  {project.status}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;