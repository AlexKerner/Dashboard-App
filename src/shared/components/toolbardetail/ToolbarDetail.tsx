import { Add, ArrowBack, Delete, Save } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";


interface IToolbarDetailprops {
  textNewButton?: string,

  showNewButton?: boolean,
  showBackButton?: boolean,
  showSaveButton?: boolean,
  showDeleteButton?: boolean,
  showSaveBackButton?: boolean,

  showBackButtonLoad?: boolean,
  showSaveButtonLoad?: boolean,
  showDeleteButtonLoad?: boolean,
  showSaveBackButtonLoad?: boolean,
  showNewButtonLoad?: boolean

  onClickSave?: () => void
  onClickSaveBack?: () => void
  onClickDelete?: () => void
  onClickNew?: () => void
  onClickBack?: () => void

  

  onClickSaveLoad?: () => void
  onClickSaveBackLoad?: () => void
  onClickDeleteLoad?: () => void
  onClickNewLoad?: () => void
  onClickBackLoad?: () => void
}


export const ToolbarDetail: React.FC<IToolbarDetailprops> = (
  {
    onClickBack,
    onClickDelete,
    onClickNew,
    onClickSave, 
    onClickSaveBack,

    showBackButton = true, 
    showDeleteButton = true, 
    showNewButton = true, 
    showSaveBackButton = false, 
    showSaveButton = true, 
    textNewButton = 'New',

    showBackButtonLoad = false,
    showDeleteButtonLoad = false, 
    showSaveBackButtonLoad = false,
    showSaveButtonLoad = false,
    showNewButtonLoad = false

  }) => {

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))  
  

  return (
    <Box component={Paper} height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display='flex' gap={1} alignItems='center'>

     { (showSaveButton && !showSaveButtonLoad) && 
      (<Button variant="contained" color="primary" disableElevation startIcon={<Save />} onClick={onClickSave}> <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' > 
        Save
      </Typography> </Button>)
     }

     { showSaveButtonLoad &&
      (<Skeleton width={105} height={62}/>)
     }

     { (showSaveBackButton && !showSaveBackButtonLoad && !smDown && !mdDown) && 
      (<Button variant="outlined" color="primary" disableElevation startIcon={<Save />} onClick={onClickSaveBack}> <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' >
         Save and Back
      </Typography> </Button>)
     }
     
     { (showSaveBackButtonLoad  && !smDown && !mdDown) &&
      (<Skeleton width={120} height={62}/>)
     }

     { (showDeleteButton && !showDeleteButtonLoad) && 
      (<Button variant="outlined" color="primary" disableElevation startIcon={<Delete />} onClick={onClickDelete}> <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' > 
        Delete 
      </Typography> </Button>)
     }

     { showDeleteButtonLoad &&
      (<Skeleton width={92} height={62}/>)
     }

     { (showNewButton && !showNewButtonLoad && !smDown) && 
      (<Button variant="outlined" color="primary" disableElevation startIcon={<Add />} onClick={onClickNew}> <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' > 
        New 
      </Typography> </Button>)
     }

     {(showNewButtonLoad && !smDown) &&
      (<Skeleton width={92} height={62}/>)
     }

     {(showBackButton && (showDeleteButton || showNewButton || showSaveBackButton || showSaveButton)) &&
      (<Divider variant="middle" orientation="vertical"/>)
     }

     { (showBackButton && !showBackButtonLoad) && 
      (<Button variant="outlined" color="primary" disableElevation startIcon={<ArrowBack />} onClick={onClickBack}> <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' > 
        Back 
      </Typography> </Button>)
     }

     { showBackButtonLoad &&
      (<Skeleton width={92} height={62}/>)
     }

    </Box>
  );
}