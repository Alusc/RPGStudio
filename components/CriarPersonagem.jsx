import { StyleSheet, ImageBackground } from "react-native";

export default function CriarPersonagem() {
  return (
    <ImageBackground
      source={require("../assets/imagens/imagem1.jpg")}
      style={styles.imagem}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
    imagem: {
      flex: 1,
      resizeMode: "stretch",
      justifyContent: "center",
    },
  });
