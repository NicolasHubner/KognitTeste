import { NavigationContainer } from '@react-navigation/native';
import * as Screens from '@/screens';
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Route } from './routes';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={Route.LoggedOut.SPLASH}
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: '#eeeeee',
                    },
                }}>
                <Stack.Screen name={Route.LoggedOut.SPLASH} component={Screens.SplashScreen} />

                <Stack.Screen name={Route.LoggedOut.SIGNIN} component={Screens.SignIn} />

                {/* Grupo para representar páginas autenticadas */}
                <Stack.Group>
                    <Stack.Screen name={Route.LoggedIn.HOME} component={Screens.Home} />

                    <Stack.Screen
                        name={Route.LoggedIn.NOTIFICATION}
                        component={Screens.Notification}
                        options={{
                            headerShown: true,
                            headerTitle: 'Notificações',
                            headerTitleStyle: {
                                fontSize: 20,
                            },
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: '#eeeeee',
                            },
                        }}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
