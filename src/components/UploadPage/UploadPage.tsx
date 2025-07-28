import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { CloudUpload, Analytics } from '@mui/icons-material';
import { parseInstagramZip } from '../../utils/zipParser';
import { analyzeInstagramData } from '../../utils/dataAnalyzer';
import type { AnalysisResult } from '../../types/instagram.types';
import './UploadPage.scss';

interface UploadPageProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const UploadPage: React.FC<UploadPageProps> = ({
  onAnalysisComplete,
  loading,
  setLoading,
  error,
  setError,
}) => {
  const handleFileUpload = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.zip')) {
      setError('Please upload a ZIP file containing your Instagram data.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Parse the zip file
      const parsedData = await parseInstagramZip(file);
      
      // Analyze the data
      const analysisResult = analyzeInstagramData(parsedData.followers, parsedData.following);
      
      // Complete the analysis
      onAnalysisComplete(analysisResult);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [onAnalysisComplete, setLoading, setError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      'application/zip': ['.zip'],
    },
    multiple: false,
    disabled: loading,
  });

  return (
    <div className="upload-page">
      <Box className="upload-container">
        <div className="header">
          <Analytics className="header-icon" />
          <Typography variant="h1" className="title">
            Instalytics
          </Typography>
          <Typography variant="h3" className="subtitle">
            Discover who doesn't follow you back
          </Typography>
        </div>

        <Card className="upload-card">
          <CardContent>
            {error && (
              <Alert severity="error" className="error-alert">
                {error}
              </Alert>
            )}

            <div
              {...getRootProps()}
              className={`dropzone ${isDragActive ? 'drag-active' : ''} ${loading ? 'disabled' : ''}`}
            >
              <input {...getInputProps()} />
              
              {loading ? (
                <div className="loading-state">
                  <CircularProgress size={60} />
                  <Typography variant="h4" className="loading-text">
                    Analyzing your data...
                  </Typography>
                  <Typography variant="body2" className="loading-subtext">
                    This may take a few moments
                  </Typography>
                </div>
              ) : (
                <div className="upload-content">
                  <CloudUpload className="upload-icon" />
                  <Typography variant="h4" className="upload-title">
                    {isDragActive ? 'Drop your Instagram data here' : 'Upload Instagram Data'}
                  </Typography>
                  <Typography variant="body1" className="upload-description">
                    Drag and drop your Instagram data ZIP file here, or click to browse
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    className="upload-button"
                    disabled={loading}
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>

            <div className="instructions">
              <Typography variant="h4" className="instructions-title">
                How to get your Instagram data:
              </Typography>
              <ol className="instructions-list">
                <li>Go to Instagram Settings → Accounts Center → Your information and permissions → Download your information</li>
                <li>Request a download of your data in JSON format</li>
                <li>Wait for Instagram to prepare your data (usually takes a few hours)</li>
                <li>Download the ZIP file and upload it here</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default UploadPage;
