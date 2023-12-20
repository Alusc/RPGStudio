import { StyleSheet, ImageBackground, ScrollView, Text } from "react-native";

export default function Lista() {
  return (
    <ImageBackground
      source={require("../assets/imagens/imagem2.jpg")}
      style={styles.imagem}
    >
      <ScrollView style={{ flex: 1 }}>
        <Text>Sus</Text>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imagem: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
  },
});
