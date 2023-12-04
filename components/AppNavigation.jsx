import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Lista from "./Lista";
import RolarDados from "./RolarDados";
import CriarPersonagem from "./CriarPersonagem";
import Icone from "./Icone";
import { View } from "react-native-web";

const Tab = createMaterialTopTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: "below-icon",
          tabBarStyle: {
            backgroundColor: "white",
            borderBottomColor: "#050A30",
            borderBottomWidth: 2,
          },

          tabBarIndicatorStyle: { backgroundColor: "tranparent" },
          tabBarActiveTintColor: "gray",
          tabBarInactiveTintColor: "black",
          headerShown: false,
        }}
        initialRouteName="Lista de Personagens"
      >
        <Tab.Screen
          name="Criar Personagem"
          component={CriarPersonagem}
          options={{
            tabBarIcon: ({ focused, color }) => {
              const iconName = "pena";
              const size = 70;
              let tamanho = focused ? size * 1.1 : size;
              // Retornando a imagem
              return (
                  <Icone nome={iconName} tamanho={tamanho} cor={color} />
              );
            },
            tabBarLabel: "",  
          }}
        />

        <Tab.Screen
          name="Lista de Personagens"
          component={Lista}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? "view-list" : "view-list-outline";
              size = focused ? size * 1.5 : size;
              // Retornando a imagem
              /*return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );*/
            },
          }}
        />

        <Tab.Screen
          name="Rolar Dados"
          component={RolarDados}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? "view-list" : "view-list-outline";
              size = focused ? size * 1.5 : size;
              // Retornando a imagem
              /*return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );*/
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
