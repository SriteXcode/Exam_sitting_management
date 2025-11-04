
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SubjectIcon from '@mui/icons-material/Subject';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EventIcon from '@mui/icons-material/Event';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Students', icon: <PeopleIcon />, path: '/students' },
    { text: 'Subjects', icon: <SubjectIcon />, path: '/subjects' },
    { text: 'Departments', icon: <AccountBalanceIcon />, path: '/departments' },
    { text: 'Exam Halls', icon: <MeetingRoomIcon />, path: '/halls' },
    { text: 'Invigilators', icon: <SupervisorAccountIcon />, path: '/invigilators' },
    { text: 'Exam Schedule', icon: <EventIcon />, path: '/schedules' },
    { text: 'Seating Plan', icon: <EventSeatIcon />, path: '/seating' },
    { text: 'Import Data', icon: <CloudUploadIcon />, path: '/import' },
    { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem button="true" component={Link} to={item.path} key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
