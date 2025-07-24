import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { cyberpunkTheme } from './theme/theme';
import UploadPage from './components/UploadPage/UploadPage';
import ResultsPage from './components/ResultsPage/ResultsPage';
import type { AppState, AnalysisResult } from './types/instagram.types';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentPage: 'upload',
    analysisResult: null,
    loading: false,
    error: null,
  });

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAppState(prev => ({
      ...prev,
      currentPage: 'results',
      analysisResult: result,
      loading: false,
      error: null,
    }));
  };

  const handleBackToUpload = () => {
    setAppState(prev => ({
      ...prev,
      currentPage: 'upload',
      analysisResult: null,
      loading: false,
      error: null,
    }));
  };

  const setLoading = (loading: boolean) => {
    setAppState(prev => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setAppState(prev => ({ ...prev, error }));
  };

  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <CssBaseline />
      {appState.currentPage === 'upload' ? (
        <UploadPage
          onAnalysisComplete={handleAnalysisComplete}
          loading={appState.loading}
          setLoading={setLoading}
          error={appState.error}
          setError={setError}
        />
      ) : (
        <ResultsPage
          analysisResult={appState.analysisResult!}
          onBackToUpload={handleBackToUpload}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
