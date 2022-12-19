import { useContext } from 'react'
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme, Box } from "native-base";


import { useAuth } from '@hooks/useAuth';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { Loading } from '@components/Loading';

export function Routes() {

    const { colors } = useTheme()

    const { user, isLoadingUserStorageData } = useAuth();

    console.log(user)

    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    if(isLoadingUserStorageData) {
      return <Loading />
    }

    return (
       <Box flex={1} bg="gray.700"
       >
           <NavigationContainer>
             {user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>


       </Box>
  );
}