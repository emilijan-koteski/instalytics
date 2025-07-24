import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Chip,
} from '@mui/material';
import { ArrowBack, OpenInNew, Analytics, PersonRemove } from '@mui/icons-material';
import type { AnalysisResult } from '../../types/instagram.types';
import './ResultsPage.scss';

interface ResultsPageProps {
  analysisResult: AnalysisResult;
  onBackToUpload: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  analysisResult,
  onBackToUpload,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const { nonFollowers, totalNonFollowers, totalFollowing, totalFollowers } = analysisResult;

  return (
    <div className="results-page">
      <Box className="results-container">
        <div className="header">
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={onBackToUpload}
            className="back-button"
          >
            Upload New File
          </Button>
          
          <div className="title-section">
            <Analytics className="header-icon" />
            <Typography variant="h2" className="title">
              Analysis Results
            </Typography>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <Card className="stat-card non-followers-card">
            <CardContent>
              <PersonRemove className="stat-icon" />
              <Typography variant="h3" className="stat-number">
                {totalNonFollowers}
              </Typography>
              <Typography variant="body2" className="stat-label">
                Don't Follow Back
              </Typography>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h4" className="stat-number">
                {totalFollowing}
              </Typography>
              <Typography variant="body2" className="stat-label">
                Following
              </Typography>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h4" className="stat-number">
                {totalFollowers}
              </Typography>
              <Typography variant="body2" className="stat-label">
                Followers
              </Typography>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h4" className="stat-number">
                {totalFollowing > 0 ? Math.round((totalFollowers / totalFollowing) * 100) : 0}%
              </Typography>
              <Typography variant="body2" className="stat-label">
                Follow Ratio
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Results Table */}
        <Card className="results-card">
          <CardContent>
            <div className="table-header">
              <Typography variant="h3" className="table-title">
                Users Who Don't Follow You Back
              </Typography>
              <Chip 
                label={`${totalNonFollowers} users`}
                className="count-chip"
                icon={<PersonRemove />}
              />
            </div>

            {totalNonFollowers === 0 ? (
              <div className="no-results">
                <Typography variant="h4" className="no-results-title">
                  🎉 Great news!
                </Typography>
                <Typography variant="body1" className="no-results-text">
                  Everyone you follow also follows you back!
                </Typography>
              </div>
            ) : (
              <TableContainer component={Paper} className="table-container">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>You Followed</TableCell>
                      <TableCell align="center">Profile</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {nonFollowers.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body1" className="username">
                            @{user.username}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" className="date">
                            {formatDate(user.followedDate)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            href={user.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-link"
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              endIcon={<OpenInNew />}
                              className="profile-button"
                            >
                              Visit
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ResultsPage;