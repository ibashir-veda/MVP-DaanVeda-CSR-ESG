import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface KPI {
  name: string;
  value: string;
  unit: string;
  methodology: string;
}

interface Report {
  id: string;
  title: string;
  type: 'CSR' | 'ESG';
  frameworks: string[];
  description: string;
  kpis: Record<string, Record<string, Record<string, KPI>>>;
  analysis: string;
  status: 'draft' | 'submitted' | 'approved';
  submissionDate: string;
  version: number;
  documents: Record<string, File>;
}

interface ReportState {
  reports: Report[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  reports: [],
  loading: false,
  error: null,
};

export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async () => {
    // Simulated API call
    const response = await new Promise<Report[]>((resolve) => 
      setTimeout(() => resolve([
        {
          id: '1',
          title: 'Annual Sustainability Report 2023',
          type: 'CSR',
          frameworks: ['GRI', 'SASB'],
          description: 'Our annual report on sustainability initiatives and progress.',
          kpis: {
            'Environment': {
              'Energy & Climate Change': {
                'GHG Emissions': {
                  name: 'GHG Emissions',
                  value: '1000000',
                  unit: 'metric tons CO2e',
                  methodology: 'GHG Protocol'
                },
                'Energy Consumption': {
                  name: 'Energy Consumption',
                  value: '500000',
                  unit: 'MWh',
                  methodology: 'GRI 302'
                }
              }
            }
          },
          analysis: 'We have made significant progress in reducing our environmental impact...',
          status: 'submitted',
          submissionDate: '2024-01-15',
          version: 1,
          documents: {}
        }
      ]), 1000)
    );
    return response;
  }
);

export const addReport = createAsyncThunk(
  'reports/addReport',
  async (report: Omit<Report, 'id'>) => {
    // Simulated API call
    const response = await new Promise<Report>((resolve) =>
      setTimeout(() => resolve({ ...report, id: Date.now().toString() }), 1000)
    );
    return response;
  }
);

export const updateReport = createAsyncThunk(
  'reports/updateReport',
  async (report: Report) => {
    // Simulated API call
    const response = await new Promise<Report>((resolve) =>
      setTimeout(() => resolve(report), 1000)
    );
    return response;
  }
);

export const saveProgress = createAsyncThunk(
  'reports/saveProgress',
  async (report: Partial<Report>) => {
    // Simulated API call
    const response = await new Promise<Partial<Report>>((resolve) =>
      setTimeout(() => resolve(report), 1000)
    );
    return response;
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch reports';
      })
      .addCase(addReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReport.fulfilled, (state, action: PayloadAction<Report>) => {
        state.loading = false;
        state.reports.push(action.payload);
      })
      .addCase(addReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add report';
      })
      .addCase(updateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReport.fulfilled, (state, action: PayloadAction<Report>) => {
        state.loading = false;
        const index = state.reports.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reports[index] = action.payload;
        }
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update report';
      })
      .addCase(saveProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProgress.fulfilled, (state, action: PayloadAction<Partial<Report>>) => {
        state.loading = false;
        // Here you would typically update the specific report in the state
        // For simplicity, we're just logging the saved progress
        console.log('Progress saved:', action.payload);
      })
      .addCase(saveProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to save progress';
      });
  },
});

export default reportSlice.reducer;