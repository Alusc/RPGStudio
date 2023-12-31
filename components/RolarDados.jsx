import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
} from "react-native";

import Select from "./Select";

export default function RolarDados() {
  const [dado, setDado] = useState("6");
  const [modificador, setModificador] = useState("0");

  const numeroAleatorio = (min, max) =>
    Math.round(Math.random() * (max - min) + min);

  const [resultado, setResultado] = useState(numeroAleatorio(1, 6));

  //const { height, width } = useWindowDimensions();

  //console.log(height, width);



  const rolarDado = (dado) => {
    const numeroDado = +dado;
    return numeroAleatorio(1, numeroDado);
  };

  return (
    <ImageBackground
      source={require("../assets/imagens/imagem3.jpg")}
      style={styles.imagem}
    >
      <View style={styles.viewPrimaria}>
        <View style={styles.viewTopo}>
          <Select
            style={[styles.text, styles.picker]}
            selectedValue={dado}
            onValueChange={(value) => setDado(value)}
            options={[
              { label: "d4", value: 4 },
              { label: "d6", value: 6 },
              { label: "d8", value: 8 },
              { label: "d10", value: 10 },
              { label: "d12", value: 12 },
              { label: "d20", value: 20 },
            ]}
          />

          <TextInput
            style={[styles.text, styles.modificador]}
            onChangeText={(text) => {
              const valorInput = text;

              const valorMinimo = -999;
              const valorMaximo = 999;

              const numeroIntervaloValido = Math.min(
                Math.max(valorInput, valorMinimo),
                valorMaximo
              );

              if (valorInput == "-" || valorInput == "." || valorInput === "")
                setModificador(valorInput);
              else if (isNaN(numeroIntervaloValido)) setModificador("0");
              else setModificador(Math.floor(numeroIntervaloValido).toString());
            }}
            onFocus={() => {
              setModificador("");
            }}
            onBlur={() => {
              if (isNaN(+modificador) || modificador === "")
                setModificador("0");
            }}
            value={modificador}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.viewCentral}>
          <View style={styles.dado}>
            <Text style={styles.textDado}>{resultado}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setResultado(rolarDado(dado))}
            activeOpacity={0.5}
          >
            <Text style={[styles.text, styles.textButton]}>Rolar</Text>
          </TouchableOpacity>

          <Text style={[styles.text, styles.total]}>
            Total{" "}
            <Text style={styles.textTotal}>
              {resultado + (isNaN(+modificador) ? 0 : +modificador)}
            </Text>
          </Text>
        </View>
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

  viewPrimaria: {
    flex: 1,
    padding: 25,
  },
  viewCentral: {
    alignItems: "center",
    justifyContent: "center",
  },
  viewTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    color: "#12229D",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Hanken Grotesk",
    color: "black",
    fontWeight: "bold",
  },
  total: {
    margin: 15,
    color: "white",
    fontFamily: "Open Sans",
  },
  textTotal: {
    fontSize: 50,
  },
  picker: {
    padding: 10,
    width: 100,
    height: 70,
    borderRadius: 30,
    borderColor: "#120203",
    backgroundColor: "#ebf4ff",
    borderWidth: 4,
  },

  modificador: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderColor: "#120203",
    borderWidth: 4,
    backgroundColor: "#ebf4ff",
  },
  dado: {
    width: 125,
    height: 125,
    margin: 95,
    borderRadius: 18,
    //backgroundColor: "white",
    backgroundColor: "#0c0c12",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    shadowColor: "black",
    shadowRadius: 15,
    shadowOffset: { width: 12, height: 6 },
    shadowOpacity: 0.9,
    elevation: 30,
  },

  textDado: {
    color: "white",
    textAlign: "center",
    fontSize: 55,
    fontFamily: "Open Sans",
  },
});
