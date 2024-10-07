import FetchIcon from '@mui/icons-material/CloudDownload';
import UsageIcon from '@mui/icons-material/Code';
import HomeIcon from '@mui/icons-material/Home';

import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

interface IListItemLinkProps {
  icon?: React.ReactElement<any>;
  primary: string;
  to: string;
}

function ListItemLink(props: IListItemLinkProps) {
  const { icon, primary, to } = props;

  return (
    <ListItemButton component={RouterLink} to={to}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : <div />}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}

export const SideMenu: React.FC = () => {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemLink to='/' primary='Home' icon={<HomeIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemLink to='/usage' primary='Usage' icon={<UsageIcon />} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemLink to='/deals' primary='Deals' icon={<FetchIcon />} />
        </ListItem>
      </List>
    </Drawer>
  );
};
