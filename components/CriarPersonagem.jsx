import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import * as Armazenamento from "./armazenamento";

export default function CriarPersonagem() {
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState(0);

  const [atributos, setAtributos] = useState({
    forca: "0",
    destreza: "0",
    constituicao: "0",
    inteligencia: "0",
    sabedoria: "0",
    carisma: "0",
  });
  const [classes, setClasses] = useState([]);
  const [racas, setRacas] = useState([]);
  const [classe, setClasse] = useState("");
  const [raca, setRaca] = useState("human");

  const handleChangeAtributo = (atributo, novoValor) => {
    setAtributos((atributos) => ({
      ...atributos,
      [atributo]: novoValor.toString(),
    }));
    console.log(atributos);
  };

  const criarAtributos = () => {
    return Object.keys(atributos).map((atributo) => (
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Text style={styles.textAtributo}>
          {atributo.toString().substring(0, 3).toUpperCase() + " "}
        </Text>
        <TextInput
          key={atributo}
          style={styles.numeroAtributo}
          onChangeText={(novoValor) => {
            const valorInput = novoValor;

            const valorMinimo = -20;
            const valorMaximo = 20;

            const numeroIntervaloValido = Math.min(
              Math.max(valorInput, valorMinimo),
              valorMaximo
            );

            if (valorInput == "-" || valorInput == "." || valorInput === "")
              handleChangeAtributo(atributo, valorInput);
            else if (
              isNaN(numeroIntervaloValido) ||
              numeroIntervaloValido !== Math.floor(numeroIntervaloValido)
            )
              handleChangeAtributo(atributo, 0);
            else handleChangeAtributo(atributo, numeroIntervaloValido);
          }}
          onFocus={() => handleChangeAtributo(atributo, "")}
          onBlur={() => {
            if (isNaN(+atributos[atributo]) || atributos[atributo] === "")
              handleChangeAtributo(atributo, "0");
          }}
          value={atributos[atributo]}
          keyboardType="numeric"
        />
      </View>
    ));
  };

  return (
    <ImageBackground
      source={require("../assets/imagens/imagem1.jpg")}
      style={styles.imagem}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.viewPrimaria}>
          <Text style={styles.textSubtitulos}>Quem é você?</Text>
          <View style={styles.viewNome}>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Text>A</Text>
              <TextInput>A</TextInput>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <TextInput>B</TextInput>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <TextInput>C</TextInput>
            </View>
          </View>

          <Text style={styles.textSubtitulos}>Atributos</Text>
          <View style={styles.viewAtributos}>{criarAtributos()}</View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log(atributos)}
          >
            <Text style={styles.textButton}>Criar</Text>
          </TouchableOpacity>
        </View>
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
  viewPrimaria: {
    flex: 1,
    alignItems: "center",
  },
  viewAtributos: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewNome: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ebf4ff",
    borderRadius: 30,
    padding: 10,
    margin: 10,
    width: 200,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
  },

  textButton: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Hanken Grotesk",
    fontWeight: "bold",
    color: "black",
    color: "#12229D",
  },

  textSubtitulos: {
    fontSize: 25,
    fontFamily: "Hanken Grotesk",
    margin: 20,
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: 20,
    color: "white",
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRadius: 14,
    borderColor: "white",
    backgroundColor: "black",
  },

  textAtributo: {
    flex: 0.3,
    fontSize: 35,
    fontFamily: "Kalnia",
    backgroundColor: "black",
    color: "white",
    padding: 20,
    paddingRight: 0,
    width: 150,
    height: 85,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
  },
  numeroAtributo: {
    flex: 0.25,
    width: 75,
    color: "black",
    backgroundColor: "white",
    textAlign: "center",
    height: 100,
    borderWidth: 6,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    fontSize: 50,
    fontFamily: "Hanken Grotesk",
  },
});
