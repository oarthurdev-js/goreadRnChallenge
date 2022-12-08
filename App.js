import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/pages/repos';
import WebViewRepo from './src/pages/repositories';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WebViewRepo"
          component={WebViewRepo}
          options={({route}) => ({
            title: route.params.paramKey,
            headerTitleAlign: 'left',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
