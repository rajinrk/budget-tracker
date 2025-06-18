import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, Typography } from '@mui/material';
import { BudgetSettings, CategoriesSettings } from '../../components';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);

    setActiveTab(newValue);
  };

  return (
    <Box className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 py-10 px-4">
      <Paper
        elevation={3}
        sx={{
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ px: 3, pt: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            Settings
          </Typography>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: 1,
            }}
          >
            <Tab label="Categories" sx={{ fontWeight: '600', textTransform: 'none' }} />
            <Tab label="Budgets" sx={{ fontWeight: '600', textTransform: 'none' }} />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <CategoriesSettings />}
          {activeTab === 1 && <BudgetSettings />}
        </Box>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
