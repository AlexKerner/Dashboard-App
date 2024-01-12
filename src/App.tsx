import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { Login, SideBar } from './shared/components';
import { AppRoutes } from './routes';
import { AuthProvider } from './shared/contexts';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login> 
          <DrawerProvider>
            <BrowserRouter>

              <SideBar>
                <AppRoutes />
              </SideBar>

            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};