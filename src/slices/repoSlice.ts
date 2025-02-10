import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Repository {
  url: string | undefined;
  description: string | null;
  stargazers_count: number | undefined;
  updated_at: string | null | undefined;
}

interface State {
  repositories: Repository[];
  username: string;
}

const initialState: State = {
  username: '',
  repositories: [],
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    setRepoData: (
      state,
      { payload }: PayloadAction<{ data: Repository[]; searchInput: string }>
    ) => {
      const { data, searchInput } = payload;
      state.repositories = data;
      state.username = searchInput;
    },
    unsetRepoData: (state) => {
      state.repositories = [];
      state.username = '';
    },
    updateRepoData: (state, { payload }) => {
      state.repositories = [...state.repositories, ...payload];
      console.log(state.repositories)
    },
  },
});

export const repositoriesData = (state: RootState) => state.repo;

export const { setRepoData, unsetRepoData, updateRepoData } = repoSlice.actions;
export default repoSlice.reducer;
