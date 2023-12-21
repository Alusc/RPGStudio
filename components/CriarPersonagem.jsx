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

export default function CriarPersonagem({ navigation }) {
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState("1");

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
  const [raca, setRaca] = useState("");
  const [id, setId] = useState(new Date().getTime());

  const handleChangeAtributo = (atributo, novoValor) => {
    setAtributos((atributos) => ({
      ...atributos,
      [atributo]: novoValor.toString(),
    }));
  };

  const handleCriarPersonagem = () => {
    const personagem = {
      id: id,
      nome: nome,
      classe: classe,
      raca: raca,
      atributos: atributos,
      nivel: nivel,
    };

    Armazenamento.salvarItem(personagem).then(() => {
      console.log(personagem);
      setNome("");
      setId(new Date().getTime());
      setNivel("1");
      setClasse("");
      setRaca("");
      setAtributos({
        forca: "0",
        destreza: "0",
        constituicao: "0",
        inteligencia: "0",
        sabedoria: "0",
        carisma: "0",
      });
      navigation.navigate("Lista", personagem);
    });
  };

  const criarAtributos = () => {
    return Object.keys(atributos).map((atributo) => (
      <View key={atributo} style={{ flexDirection: "row", margin: 10 }}>
        <Text style={styles.textAtributo}>
          {atributo.toString().substring(0, 3).toUpperCase() + " "}
        </Text>
        <TextInput
          style={styles.numeroAtributo}
          onChangeText={(novoValor) => {
            const valorInput = novoValor;

            const valorMinimo = -5;
            const valorMaximo = 50;

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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.viewCaracteristicas}>
              <Text style={styles.textCaracteristica}>Nome: </Text>
              <TextInput
                style={styles.textInputCaracteristica}
                value={nome}
                onChangeText={setNome}
              ></TextInput>
            </View>
            <View style={styles.viewCaracteristicas}>
              <Text style={styles.textCaracteristica}>Classe: </Text>
              <TextInput
                style={styles.textInputCaracteristica}
                value={classe}
                onChangeText={setClasse}
              ></TextInput>
            </View>
            <View style={styles.viewCaracteristicas}>
              <Text style={styles.textCaracteristica}>Raça: </Text>
              <TextInput
                style={styles.textInputCaracteristica}
                value={raca}
                onChangeText={setRaca}
              ></TextInput>
            </View>
            <View style={[styles.viewCaracteristicas, { width: 125 }]}>
              <Text style={[styles.textCaracteristica, { flex: 3 }]}>
                Nível:{" "}
              </Text>
              <TextInput
                value={nivel}
                onChangeText={(text) => {
                  if (text === "") setNivel("");
                  else if (isNaN(+text) || text < 1) setNivel("1");
                  else if (text > 20) setNivel("20");
                  else setNivel(text);
                }}
                onBlur={() => {
                  if (nivel === "") setNivel("1");
                }}
                onFocus={() => {
                  setNivel("");
                }}
                style={[
                  styles.textInputCaracteristica,
                  { textAlign: "center", fontFamily: "Open Sans" },
                ]}
                keyboardType="numeric"
              ></TextInput>
            </View>
          </View>

          <Text style={styles.textSubtitulos}>Atributos</Text>
          <View style={styles.viewAtributos}>{criarAtributos()}</View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCriarPersonagem()}
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
  viewCaracteristicas: {
    flexDirection: "row",
    alignItems: "center",
    margin: 9,
    marginHorizontal: 0,
    backgroundColor: "#ebf4ff",
    padding: 8,
    borderRadius: 10,
    borderWidth: 4,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: 225,
  },
  textCaracteristica: {
    fontFamily: "Open Sans",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  textInputCaracteristica: {
    flex: 2.1,
    fontSize: 18,
    fontFamily: "Hanken Grotesk",
    padding: 0,
    borderBottomWidth: 1,
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
    margin: 16,
    marginTop: 30,
    padding: 10,
    paddingHorizontal: 25,
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
    backgroundColor: "#ebf4ff",
    textAlign: "center",
    height: 100,
    borderWidth: 6,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    fontSize: 50,
    fontFamily: "Hanken Grotesk",
  },
});
