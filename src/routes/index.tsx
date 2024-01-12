import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Home, LocationCity, People} from '@mui/icons-material';
import { PeopleList, Dashboard, PeopleDetail, CityList, CityDetail } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: <Home />,
        path: '/pagina-inicial',
        label: 'Home Page',
      },
      { 
        icon: <LocationCity />,
        path: '/cities',
        label: 'Cities',
      },
      {
        icon: <People />,
        path: '/people',
        label: 'People',
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/people" element={<PeopleList />} />
      <Route path="/people/detail/:id" element={<PeopleDetail />} />

      
      <Route path="/cities" element={<CityList/>} />
      <Route path="/cities/detail/:id" element={<CityDetail />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};