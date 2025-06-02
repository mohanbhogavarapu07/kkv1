import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AssessmentData {
  _id: string;
  userId: string;
  assessmentType: string;
  status: string;
  progress: number;
  answers: Array<{
    questionId: number;
    answer: number;
    dimension: string;
  }>;
  results: {
    totalScore: number;
    subscores: Record<string, number>;
    phase?: {
      name: string;
      description: string;
    };
  };
  timeSpent: {
    start: string;
    end: string;
  };
  createdAt: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Analytics = () => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('7d');

  // Fetch assessment data
  const fetchAssessmentData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/assessment');
      const data = await response.json();
      if (response.ok) {
        setAssessmentData(data);
      } else {
        toast.error('Failed to fetch assessment data');
      }
    } catch (error) {
      toast.error('Error fetching assessment data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessmentData();
  }, []);

  // Filter data based on selected assessment type and time range
  const filteredData = assessmentData.filter(data => {
    const isSelectedType = selectedAssessment === 'all' || data.assessmentType === selectedAssessment;
    const isInTimeRange = filterByTimeRange(data.createdAt, timeRange);
    return isSelectedType && isInTimeRange;
  });

  // Calculate statistics
  const calculateStats = () => {
    const totalAssessments = filteredData.length;
    const completedAssessments = filteredData.filter(d => d.status === 'completed').length;
    const averageScore = filteredData.reduce((acc, curr) => acc + (curr.results?.totalScore || 0), 0) / completedAssessments || 0;
    const averageTimeSpent = filteredData.reduce((acc, curr) => {
      const start = new Date(curr.timeSpent.start);
      const end = new Date(curr.timeSpent.end);
      return acc + (end.getTime() - start.getTime()) / 1000 / 60; // Convert to minutes
    }, 0) / completedAssessments || 0;

    return {
      totalAssessments,
      completedAssessments,
      averageScore: Math.round(averageScore),
      averageTimeSpent: Math.round(averageTimeSpent)
    };
  };

  // Prepare data for charts
  const prepareChartData = () => {
    const assessmentTypes = [...new Set(filteredData.map(d => d.assessmentType))];
    const scoresByType = assessmentTypes.map(type => {
      const typeData = filteredData.filter(d => d.assessmentType === type);
      const avgScore = typeData.reduce((acc, curr) => acc + (curr.results?.totalScore || 0), 0) / typeData.length || 0;
      return {
        name: type,
        score: Math.round(avgScore)
      };
    });

    const phaseDistribution = filteredData.reduce((acc, curr) => {
      const phase = curr.results?.phase?.name || 'Unknown';
      acc[phase] = (acc[phase] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const phaseData = Object.entries(phaseDistribution).map(([name, value]) => ({
      name,
      value
    }));

    return {
      scoresByType,
      phaseData
    };
  };

  const stats = calculateStats();
  const chartData = prepareChartData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair mb-8">Assessment Analytics</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Assessment Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assessments</SelectItem>
            <SelectItem value="mental-fitness">Mental Fitness</SelectItem>
            <SelectItem value="entrepreneurial-potential">Entrepreneurial Potential</SelectItem>
            <SelectItem value="emotional-intelligence">Emotional Intelligence</SelectItem>
            <SelectItem value="resilience">Resilience</SelectItem>
            <SelectItem value="burnout-risk">Burnout Risk</SelectItem>
            <SelectItem value="productivity-style">Productivity Style</SelectItem>
            <SelectItem value="leadership">Leadership</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssessments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Completed Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedAssessments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Time Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageTimeSpent} min</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="scores" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scores">Scores by Assessment Type</TabsTrigger>
          <TabsTrigger value="phases">Phase Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="scores">
          <Card>
            <CardHeader>
              <CardTitle>Average Scores by Assessment Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.scoresByType}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phases">
          <Card>
            <CardHeader>
              <CardTitle>Phase Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.phaseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.phaseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Assessments Table */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Assessment Type</th>
                  <th className="text-left py-3 px-4">User ID</th>
                  <th className="text-left py-3 px-4">Score</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 10).map((data) => (
                  <tr key={data._id} className="border-b">
                    <td className="py-3 px-4">{data.assessmentType}</td>
                    <td className="py-3 px-4">{data.userId}</td>
                    <td className="py-3 px-4">{data.results?.totalScore || '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        data.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {data.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(data.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to filter data by time range
const filterByTimeRange = (date: string, range: string): boolean => {
  const assessmentDate = new Date(date);
  const now = new Date();
  
  switch (range) {
    case '7d':
      return assessmentDate >= new Date(now.setDate(now.getDate() - 7));
    case '30d':
      return assessmentDate >= new Date(now.setDate(now.getDate() - 30));
    case '90d':
      return assessmentDate >= new Date(now.setDate(now.getDate() - 90));
    case 'all':
      return true;
    default:
      return true;
  }
};

export default Analytics; 