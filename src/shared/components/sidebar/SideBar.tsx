import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { Box } from '@mui/system';
import React from 'react';
import { useAppThemeContext, useAuthContext, useDrawerContext } from '../../contexts';
import { DarkMode, Logout } from '@mui/icons-material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import avatarImage from './../../../imagens/avatar.png';

interface childProps {
  children: React.ReactNode
}

interface IListItemLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: (() => void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });


  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};


export const SideBar: React.FC<childProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const {toggleTheme, themeName} = useAppThemeContext()
  const { logout } = useAuthContext()


  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">

          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              alt="Alex"
              src={avatarImage}
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItemLink
                  to={drawerOption.path}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box >
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  {themeName === 'light' ? <DarkMode /> : <WbSunnyIcon />}
                </ListItemIcon>
                <ListItemText primary={'Switch Theme'} />
              </ListItemButton>

              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItemButton>
            </List>
          </Box>

        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};