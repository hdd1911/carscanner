export interface AppState {
    searchValue: string;
    searchPlaceholder: string;
    hintsVisible: boolean;
    searchHistory: HistoryItem[];
    selectedModel: SelectedModel | null;
}

export interface SelectedModel {
    id: number;
}

export interface HistoryItem {
    title: string;
}
