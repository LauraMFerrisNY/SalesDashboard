import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import RestaurantMenuSharpIcon from '@mui/icons-material/RestaurantMenuSharp';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { useState, useEffect } from 'react';
import MyDashBoardView from './MyDashboardView';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'menu',
    title: 'Menu',
    icon: <MenuBookSharpIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function PageContent({ pathname }) {
  const [currentMenu, setCurrentMenu] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState(false);

  useEffect(()=>{
    if (pathname === '/menu') {
      setCurrentMenu(true);
      setCurrentDashboard(false);
    } else if (pathname === '/dashboard') {
      setCurrentMenu(false);
      setCurrentDashboard(true);
    }
  },[pathname])

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {currentMenu && <div>
        <p>Chicken Parm - $24</p>
        <p>Shrimp Scampi - $22</p>
        <p>Baked Rigatoni - $18</p>
        </div>}

      {currentDashboard && <div>
        <MyDashBoardView />
      </div>}
    </Box>
  );
}

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};


function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <RestaurantMenuSharpIcon fontSize="large" color="primary" />
      <Typography variant="h6">Laura's Meals</Typography>
    </Stack>
  );
}

function DashboardLayoutSlots() {

  const router = useDemoRouter('/dashboard');

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
        }}
      >
        <PageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutSlots;