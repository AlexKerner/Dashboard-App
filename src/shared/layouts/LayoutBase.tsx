import React, { ReactNode } from 'react';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseProps {
  title: string;
  children: React.ReactNode;
  toolbar: ReactNode | undefined
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({ children, title, toolbar }) => {

  const {toggleDrawerOpen} = useDrawerContext()
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>

      <Box padding={1} display='flex'  alignItems='center' gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}>
         { smDown && 
            <IconButton onClick={toggleDrawerOpen}>
              <MenuIcon/> 
            </IconButton>
          }
        

        <Typography variant={smDown ? 'h4' : mdDown ? 'h4' : 'h3'} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
          {title}
        </Typography>
        
      </Box>

      {toolbar && 
        (<Box>
          {toolbar}
        </Box>)
      }
      
      <Box flex={1} overflow='auto'>
        {children}
      </Box>
      
    </Box>
  );
}
