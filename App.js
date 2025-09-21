import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TelaInicial from './screens/TelaInicial';
import TelaDeDetalhes from './screens/TelaDeDetalhes';
import TelaFavoritos from './screens/TelaFavoritos';

const Tab = createBottomTabNavigator(); 
const Stack = createStackNavigator();  
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favoritos') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Início" component={TelaInicial} />
      <Tab.Screen name="Favoritos" component={TelaFavoritos} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#007BFF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="NewsApp" 
          component={HomeTabs} 
          options={{ title: 'Últimas Notícias' }}
        />
        <Stack.Screen
          name="TelaDeDetalhes"
          component={TelaDeDetalhes}
          options={{ title: 'Detalhes da Notícia' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
