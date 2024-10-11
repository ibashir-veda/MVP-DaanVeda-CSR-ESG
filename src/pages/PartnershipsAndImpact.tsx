import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Handshake, BarChart, FileText, CheckCircle, XCircle, Plus, Search, SortAsc, SortDesc } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Partner {
  id: number;
  name: string;
  type: string;
  projects: number;
  totalImpact: string;
}

interface Proposal {
  id: number;
  name: string;
  organization: string;
  fundingRequested: string;
  status: string;
}

interface ImpactMetric {
  id: number;
  name: string;
  value: number;
  unit: string;
}

const PartnershipsAndImpact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'partners' | 'proposals' | 'impact'>('partners');
  const [partners, setPartners] = useState<Partner[]>([
    { id: 1, name: 'Local School District', type: 'Education', projects: 2, totalImpact: 'Improved literacy rates by 15%' },
    { id: 2, name: 'Green Earth NGO', type: 'Environment', projects: 1, totalImpact: 'Planted 10,000 trees, offsetting 500 tons of CO2' },
  ]);
  const [proposals, setProposals] = useState<Proposal[]>([
    { id: 1, name: 'Clean Water Access', organization: 'WaterAid', fundingRequested: '$50,000', status: 'Pending' },
    { id: 2, name: 'Youth Entrepreneurship Program', organization: 'StartUp Youth', fundingRequested: '$75,000', status: 'Under Review' },
  ]);
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>([
    { id: 1, name: 'Trees Planted', value: 10000, unit: 'trees' },
    { id: 2, name: 'CO2 Offset', value: 500, unit: 'tons' },
    { id: 3, name: 'Students Reached', value: 5000, unit: 'students' },
  ]);

  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isAddPartnerDialogOpen, setIsAddPartnerDialogOpen] = useState(false);
  const [newPartner, setNewPartner] = useState<Omit<Partner, 'id'>>({ name: '', type: '', projects: 0, totalImpact: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleAddPartner = () => {
    setPartners([...partners, { ...newPartner, id: partners.length + 1 }]);
    setNewPartner({ name: '', type: '', projects: 0, totalImpact: '' });
    setIsAddPartnerDialogOpen(false);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPartners = React.useMemo(() => {
    let sortablePartners = [...partners];
    if (sortConfig !== null) {
      sortablePartners.sort((a, b) => {
        if (a[sortConfig.key as keyof Partner] < b[sortConfig.key as keyof Partner]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof Partner] > b[sortConfig.key as keyof Partner]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePartners;
  }, [partners, sortConfig]);

  const filteredPartners = sortedPartners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPartners = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Current Partners</span>
          <Button size="sm" onClick={() => setIsAddPartnerDialogOpen(true)}>
            <Plus className="mr-1" size={14} />
            Add Partner
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <Search className="mr-2" size={18} />
          <Input
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                Partner Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('type')}>
                Type {sortConfig?.key === 'type' && (sortConfig.direction === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('projects')}>
                Active Projects {sortConfig?.key === 'projects' && (sortConfig.direction === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
              </TableHead>
              <TableHead>Total Impact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPartners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>{partner.name}</TableCell>
                <TableCell>{partner.type}</TableCell>
                <TableCell>{partner.projects}</TableCell>
                <TableCell>{partner.totalImpact}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => setSelectedPartner(partner)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderProposals = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Funding Proposals</span>
          <Button size="sm">
            <Plus className="mr-1" size={14} />
            New Proposal
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Funding Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell>{proposal.name}</TableCell>
                <TableCell>{proposal.organization}</TableCell>
                <TableCell>{proposal.fundingRequested}</TableCell>
                <TableCell>{proposal.status}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <CheckCircle className="mr-1" size={14} />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm">
                      <XCircle className="mr-1" size={14} />
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderImpact = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Impact Metrics</span>
          <Button size="sm">
            <Plus className="mr-1" size={14} />
            Add Metric
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="mb-6">
          <TableHeader>
            <TableRow>
              <TableHead>Metric Name</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {impactMetrics.map((metric) => (
              <TableRow key={metric.id}>
                <TableCell>{metric.name}</TableCell>
                <TableCell>{metric.value.toLocaleString()}</TableCell>
                <TableCell>{metric.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={impactMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Partnerships & Impact</h1>
      <div className="flex space-x-4 mb-4">
        <Button
          variant={activeTab === 'partners' ? 'default' : 'outline'}
          onClick={() => setActiveTab('partners')}
        >
          <Handshake className="mr-2" size={18} />
          Partners
        </Button>
        <Button
          variant={activeTab === 'proposals' ? 'default' : 'outline'}
          onClick={() => setActiveTab('proposals')}
        >
          <FileText className="mr-2" size={18} />
          Proposals
        </Button>
        <Button
          variant={activeTab === 'impact' ? 'default' : 'outline'}
          onClick={() => setActiveTab('impact')}
        >
          <BarChart className="mr-2" size={18} />
          Impact
        </Button>
      </div>
      {activeTab === 'partners' && renderPartners()}
      {activeTab === 'proposals' && renderProposals()}
      {activeTab === 'impact' && renderImpact()}

      <Dialog open={isAddPartnerDialogOpen} onOpenChange={setIsAddPartnerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Partner</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={newPartner.name}
                onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right">
                Type
              </label>
              <Input
                id="type"
                value={newPartner.type}
                onChange={(e) => setNewPartner({ ...newPartner, type: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="projects" className="text-right">
                Projects
              </label>
              <Input
                id="projects"
                type="number"
                value={newPartner.projects}
                onChange={(e) => setNewPartner({ ...newPartner, projects: parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="totalImpact" className="text-right">
                Total Impact
              </label>
              <Input
                id="totalImpact"
                value={newPartner.totalImpact}
                onChange={(e) => setNewPartner({ ...newPartner, totalImpact: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddPartner}>Add Partner</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPartner?.name} - Partner Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p><strong>Type:</strong> {selectedPartner?.type}</p>
            <p><strong>Active Projects:</strong> {selectedPartner?.projects}</p>
            <p><strong>Total Impact:</strong> {selectedPartner?.totalImpact}</p>
            <h3 className="text-lg font-semibold mt-4">Associated Projects</h3>
            <ul className="list-disc pl-5">
              <li>Project 1</li>
              <li>Project 2</li>
            </ul>
            <h3 className="text-lg font-semibold mt-4">Specific Impact Metrics</h3>
            <ul className="list-disc pl-5">
              <li>Metric 1: Value</li>
              <li>Metric 2: Value</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnershipsAndImpact;