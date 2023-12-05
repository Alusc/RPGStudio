import { StyleSheet, ImageBackground, View} from "react-native";

import * as Armazenamento from "./armazenamento"


export default function CriarPersonagem() {
  return (
    <ImageBackground
      source={require("../assets/imagens/imagem1.jpg")}
      style={styles.imagem}
    >
      <View>


      </View>

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
