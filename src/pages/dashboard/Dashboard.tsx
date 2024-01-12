import { Box, Card, CardContent, Divider, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import {  ToolbarList } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { CityService } from "../../shared/services/api/cities/CityServices";
import { PeopleService } from "../../shared/services/api/people/PeopleServices";



export const Dashboard = () => {
  
  const [isLoadingCity, setIsLoadingCity] = useState(true)
  const [totalCountCity, setTotalCountCity] = useState(0)
  const [isLoadingPeople, setIsLoadingPeople] = useState(true)
  const [totalCountPeople, setTotalCountPeople] = useState(0)

  useEffect(() => {

    setIsLoadingCity(true)
    setIsLoadingPeople(true)

   
      CityService.getAll(1)
      .then((result) => {
        setIsLoadingCity(false)
        
        if (result instanceof Error) {
          alert(result.message)
          return
        } else {
          console.log(result)
          setTotalCountCity(result.totalCount)
        }
      })

      PeopleService.getAll(1)
      .then((result) => {
        setIsLoadingPeople(false)
        
        if (result instanceof Error) {
          alert(result.message)
          return
        } else {
          console.log(result)
          setTotalCountPeople(result.totalCount)
        }
      })
  
    
  }, [])
  
  return (
    <LayoutBase title="Home Page" toolbar={<ToolbarList showNewButton={false}/>}>

      <Box width='100' display='flex'>
        <Grid container margin={2}>
          <Grid container item spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant="h5">
                    Total City
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center'>

                    {(!isLoadingCity &&
                       <Typography variant='h1' >
                        {totalCountCity}
                       </Typography>
                    )}
                    {isLoadingCity && 
                      <Typography  variant='h4'>
                        Loading...
                      </Typography>}
                  </Box>
                </CardContent>
              </Card>

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                <Typography variant="h5" >
                    Total People
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center'>

                    {(!isLoadingPeople &&
                       <Typography variant='h1' >
                        {totalCountPeople}
                       </Typography>
                    )}
                    {isLoadingPeople && 
                      <Typography  variant='h4'>
                        Loading...
                      </Typography>}
                  </Box>
                </CardContent>
              </Card>

            </Grid>
          </Grid>

        </Grid>
          
      </Box>
    </LayoutBase>
  );
}