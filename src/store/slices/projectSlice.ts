import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed';
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [
    { id: '1', name: 'Renewable Energy Initiative', description: 'Implementing solar panels across our facilities', status: 'in-progress' },
    { id: '2', name: 'Waste Reduction Program', description: 'Reducing waste production by 30% over the next year', status: 'planned' },
    { id: '3', name: 'Community Outreach', description: 'Engaging with local communities to understand their needs', status: 'completed' },
  ],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProjects, addProject, updateProject, setLoading, setError } = projectSlice.actions;
export default projectSlice.reducer;