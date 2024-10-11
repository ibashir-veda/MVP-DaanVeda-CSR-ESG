import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, AlertTriangle, Save } from 'lucide-react';
import { addReport, fetchReports, saveProgress } from "../store/slices/reportSlice";
import { RootState, AppDispatch } from '../store';

const frameworks = [
  "Global Reporting Initiative (GRI)",
  "Sustainability Accounting Standards Board (SASB)",
  "Task Force on Climate-related Financial Disclosures (TCFD)",
  "United Nations Global Compact (UNGC)",
  "International Integrated Reporting Council (IIRC)",
  "Business Responsibility and Sustainability Reporting (BRSR)",
  "Companies Act 2013",
  "Securities and Exchange Board of India (SEBI) Listing Obligations and Disclosure Requirements (LODR) Regulations",
  "Securities and Exchange Commission (SEC) Climate Change Disclosure Rule (Proposed)",
  "State-level regulations (e.g., California's Transparency in Supply Chains Act)",
  "Corporate Sustainability Reporting Directive (CSRD)",
  "Non-Financial Reporting Directive (NFRD)",
  "EU Taxonomy",
  "Sustainable Finance Disclosure Regulation (SFDR)",
  "Carbon Disclosure Project (CDP)",
  "Dow Jones Sustainability Index (DJSI)"
];

const kpiCategories = {
  COMMUNITY: {
    description: "Covers the company's commitment and effectiveness within the local, national and global community in which it does business.",
    subcategories: {
      "Community Dev & Philanthropy": "Covers the relationship between a company and the communities within which it is embedded.",
      "Human Rights & Supply Chain": "Measures a company's commitment to respecting fundamental human rights conventions.",
      "Product": "Covers the responsibility of a company for the development, design, and management of its products and services."
    }
  },
  EMPLOYEES: {
    description: "Includes policies, programs, and performance in diversity, labor relations, compensation, benefits, and employee training, health and safety.",
    subcategories: {
      "Compensation & Benefits": "Covers a company's capacity to increase its workforce loyalty and productivity through rewarding, fair, and equal compensation and financial benefits.",
      "Diversity & Labor Rights": "Covers workplace policies and practices covering fair and non-discriminatory treatment of employees.",
      "Training, Safety & Health": "Measures a company's effectiveness in providing a healthy and safe workplace."
    }
  },
  ENVIRONMENT: {
    description: "Covers a company's interactions with the environment at large, including use of natural resources, and impact on the Earth's ecosystems.",
    subcategories: {
      "Energy & Climate Change": "Measures a company's effectiveness in addressing climate change through appropriate policies and strategies.",
      "Environment Policy & Reporting": "Includes a company's policies and intention to reduce the environmental impact.",
      "Resource Management": "Covers how efficiently resources are used in manufacturing and delivering products and services."
    }
  },
  GOVERNANCE: {
    description: "Covers disclosure of policies and procedures, board independence and diversity, executive compensation, and attention to stakeholder concerns.",
    subcategories: {
      "Board": "Covers a company's effectiveness in following best practices in corporate governance principles related to board membership.",
      "Leadership Ethics": "Measures how a company manages its relationships with its various stakeholders.",
      "Transparency & Reporting": "Rates factors including whether corporate policies and practices are aligned with sustainability goals."
    }
  }
};

const ReportingWizard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    frameworks: [] as string[],
    description: '',
    kpis: {} as Record<string, Record<string, Record<string, { value: string, unit: string }>>>,
    analysis: '',
    version: 1,
  });

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFrameworkChange = (framework: string) => {
    setFormData(prev => ({
      ...prev,
      frameworks: prev.frameworks.includes(framework)
        ? prev.frameworks.filter(f => f !== framework)
        : [...prev.frameworks, framework]
    }));
  };

  const handleKPIChange = (category: string, subcategory: string, kpi: string, value: string, unit: string) => {
    setFormData(prev => ({
      ...prev,
      kpis: {
        ...prev.kpis,
        [category]: {
          ...prev.kpis[category],
          [subcategory]: {
            ...prev.kpis[category]?.[subcategory],
            [kpi]: { value, unit }
          }
        }
      }
    }));
  };

  const handleSubmit = () => {
    dispatch(addReport(formData));
  };

  const handleSaveProgress = () => {
    dispatch(saveProgress(formData));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Report Details</h2>
            <Input
              name="title"
              placeholder="Report Title"
              value={formData.title}
              onChange={handleInputChange}
              className="mb-4"
            />
            <Select onValueChange={(value) => handleSelectChange('type', value)} value={formData.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSR">CSR Report</SelectItem>
                <SelectItem value="ESG">ESG Report</SelectItem>
                <SelectItem value="Integrated">Integrated Report</SelectItem>
              </SelectContent>
            </Select>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Frameworks</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {frameworks.map((framework) => (
                <div key={framework} className="flex items-center">
                  <Checkbox
                    id={framework}
                    checked={formData.frameworks.includes(framework)}
                    onCheckedChange={() => handleFrameworkChange(framework)}
                  />
                  <label htmlFor={framework} className="ml-2 text-sm">{framework}</label>
                </div>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">KPIs</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {Object.entries(kpiCategories).map(([category, { description, subcategories }]) => (
                <div key={category} className="border p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">{category}</h3>
                  <p className="text-sm text-gray-600 mb-2">{description}</p>
                  {Object.entries(subcategories).map(([subcategory, subcategoryDescription]) => (
                    <div key={subcategory} className="mt-2">
                      <h4 className="text-md font-medium">{subcategory}</h4>
                      <p className="text-sm text-gray-600 mb-2">{subcategoryDescription}</p>
                      <Input
                        placeholder={`Enter ${subcategory} KPI`}
                        onChange={(e) => handleKPIChange(category, subcategory, 'value', e.target.value, '')}
                        className="mb-2"
                      />
                      <Input
                        placeholder="Unit of measurement"
                        onChange={(e) => handleKPIChange(category, subcategory, 'unit', '', e.target.value)}
                        className="mb-2"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Analysis</h2>
            <Textarea
              name="analysis"
              placeholder="Enter your analysis"
              value={formData.analysis}
              onChange={handleInputChange}
              className="mb-4"
              rows={10}
            />
          </>
        );
      case 5:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Review</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              <p><strong>Title:</strong> {formData.title}</p>
              <p><strong>Type:</strong> {formData.type}</p>
              <p><strong>Frameworks:</strong> {formData.frameworks.join(', ')}</p>
              <p><strong>Analysis:</strong> {formData.analysis}</p>
              <h3 className="text-lg font-semibold mt-4">KPIs:</h3>
              {Object.entries(formData.kpis).map(([category, subcategories]) => (
                <div key={category} className="mt-2">
                  <h4 className="text-md font-medium">{category}</h4>
                  {Object.entries(subcategories).map(([subcategory, kpis]) => (
                    <div key={subcategory} className="ml-4">
                      <h5 className="text-sm font-medium">{subcategory}</h5>
                      {Object.entries(kpis).map(([kpi, { value, unit }]) => (
                        <p key={kpi} className="text-sm">
                          {kpi}: {value} {unit}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Reporting Wizard (Version {formData.version})</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(step / 5) * 100} className="mb-4" />
          {renderStep()}
          <div className="flex justify-between mt-6">
            <Button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              variant="outline"
            >
              <ChevronLeft className="mr-2" size={16} />
              Previous
            </Button>
            {step < 5 ? (
              <Button onClick={() => setStep(Math.min(5, step + 1))}>
                Next
                <ChevronRight className="ml-2" size={16} />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Submit Report</Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Button variant="outline" className="mt-4" onClick={handleSaveProgress}>
        <Save className="mr-2" size={16} />
        Save Progress
      </Button>
    </div>
  );
};

export default ReportingWizard;