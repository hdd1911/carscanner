import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    searchValue: string;
    searchHistory: HistoryItem[];
    selectedModel: SelectedModel | null;
}

interface SelectedModel {
    id: number;
}

interface HistoryItem {
    title: string;
}

const initialState: AppState = {
    searchValue: '',
    searchHistory: [],
    selectedModel: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<AppState['searchValue']>) {
            state.searchValue = action.payload;
        },
        addHistoryItem(state, action: PayloadAction<HistoryItem>) {
            const history = state.searchHistory;
            const newItem = action.payload;
            const index = history.findIndex(historyItem => historyItem.title === newItem.title);

            if (index !== -1) {
                history.splice(index, 1);
                history.unshift(newItem);
            } else {
                history.unshift(newItem);

                if (history.length > 5) {
                    history.pop();
                }
            }
        },
        removeHistoryItem(state, action: PayloadAction<HistoryItem>) {
            state.searchHistory = state.searchHistory.filter(
                historyItem => historyItem.title !== action.payload.title,
            );
        },
        setSelectedModel(state, action: PayloadAction<SelectedModel>) {
            if (state.selectedModel?.id !== action.payload.id) {
                state.selectedModel = action.payload;
            }
        },
    },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
