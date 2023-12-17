import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Lista from "./Lista";
import RolarDados from "./RolarDados";
import CriarPersonagem from "./CriarPersonagem";
import { StatusBar } from "react-native";
//import Icone from "./Icone";

const Tab = createMaterialTopTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: "below-icon",
          tabBarShowLabel: false, 
          tabBarIconStyle: {
            height: 50,
            width: 50,
          },
          //tabBarLabelStyle: 
          tabBarStyle: {
            backgroundColor: "white",
            borderBottomColor: "#050A30",
            borderBottomWidth: 2,
            marginTop: StatusBar.currentHeight,
          },

          tabBarIndicatorStyle: { backgroundColor: "transparent" },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#232423",
        }}
        initialRouteName="Lista de Personagens"
      >
        <Tab.Screen
          name="Criar Personagem"
          component={CriarPersonagem}
          options={{
            tabBarIcon: ({ focused, color }) => {
              const iconName = "feather";
              const size = 50;
              let tamanho = focused ? size * 1.1 : size;
              // Retornando a imagem
              //return <Icone nome={iconName} tamanho={tamanho} cor={color} />;
              return (
                <MaterialCommunityIcons
                  style={{
                    alignSelf: "center",
                    bottom: tamanho / 12,
                  }}
                  name={iconName}
                  size={tamanho}
                  color={color}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="Lista de Personagens"
          component={Lista}
          options={{
            tabBarIcon: ({ focused, color }) => {
              const iconName = "script-text";
              const size = 50;
              let tamanho = focused ? size * 1.1 : size;
              // Retornando a imagem
              return (
                <MaterialCommunityIcons
                  style={{
                    alignSelf: "center",
                    bottom: tamanho * 2 / 25,
                  }}
                  name={iconName}
                  size={tamanho}
                  color={color}
                />
              );
            },
          
          }}
        />

        <Tab.Screen
          name="Rolar Dados"
          component={RolarDados}
          options={{
            tabBarIcon: ({ focused, color }) => {
              const iconName = "dice-5";
              const size = 50;
              let tamanho = focused ? size * 1.1 : size;
              // Retornando a imagem
              return (
                <MaterialCommunityIcons
                  style={{
                    alignSelf: "center",
                    bottom: tamanho * 3 / 50,
                  }}
                  name={iconName}
                  size={tamanho}
                  color={color}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
