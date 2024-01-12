import { Box, Button, Divider, InputAdornment, Paper, TextField, useTheme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Add } from "@mui/icons-material";
import { Environment } from "../../environment";


interface IToolbarprops {
  textSearch?: string,
  showInputSearch?: boolean,
  onChangeText?: (newText: string) => void,
  textNewButton?: string,
  showNewButton?: boolean,
  onClickButton?: () => void
}


export const ToolbarList: React.FC<IToolbarprops> = ({textSearch: textSearch = '', showInputSearch: showInputSearch = false, onChangeText, showNewButton = true, onClickButton, textNewButton = 'New'}) => {

  const theme = useTheme()

  return (

    <Box component={Paper} height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display='flex' gap={1} alignItems='center'>

      { showInputSearch &&
       (<TextField 
          size="small" 
          
          placeholder={Environment.INPUT_SEARCH} 
          value={textSearch} 
          onChange={(e) => 
          onChangeText?.(e.target.value)}
          InputProps={{
            startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
           
            ),
          }} 
      />)} 
      <Box flex={1} display='flex' justifyContent='end'>
        
      { showNewButton && (<Button variant="contained" color="primary" disableElevation startIcon={<Add />} onClick={onClickButton}>{textNewButton}</Button>)}

      </Box>
    </Box>

  );
}