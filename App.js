import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // 1. Importar
import { Ionicons } from '@expo/vector-icons';

// Importa todas as nossas telas
import TelaInicial from './screens/TelaInicial';
import TelaDeDetalhes from './screens/TelaDeDetalhes';
import TelaFavoritos from './screens/TelaFavoritos'; // 2. Importar a nova tela

const Tab = createBottomTabNavigator(); // Cria o navegador de abas
const Stack = createStackNavigator(); // O navegador de pilha continua existindo

// 3. Criamos um componente para a navegação principal (abas)
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
        headerShown: false, // Vamos deixar o cabeçalho ser gerenciado pelo Stack Navigator
      })}
    >
      <Tab.Screen name="Início" component={TelaInicial} />
      <Tab.Screen name="Favoritos" component={TelaFavoritos} />
    </Tab.Navigator>
  );
}

// 4. O App agora usa um Stack Navigator que contém as abas e a tela de detalhes
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
        {/* A primeira tela do Stack agora é o nosso conjunto de abas */}
        <Stack.Screen 
          name="NewsApp" 
          component={HomeTabs} 
          options={{ title: 'Últimas Notícias' }} // Título padrão
        />
        {/* A tela de detalhes continua aqui, fora das abas */}
        <Stack.Screen
          name="TelaDeDetalhes"
          component={TelaDeDetalhes}
          options={{ title: 'Detalhes da Notícia' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
