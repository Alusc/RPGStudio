import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import * as Armazenamento from "./armazenamento";

export default function CriarPersonagem({ navigation, route }) {
  const [metodo, setMetodo] = route.params
    ? useState("editar")
    : useState("criar");

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
  const [classe, setClasse] = useState("");
  const [raca, setRaca] = useState("");
  const [id, setId] = useState(new Date().getTime());

  useEffect(() => {
    if (route.params) {
      setMetodo("editar");
      setNome(route.params["nome"]);
      setNivel(route.params["nivel"]);
      setAtributos(route.params["atributos"]);
      setClasse(route.params["classe"]);
      setRaca(route.params["raca"]);
      setId(route.params["id"]);
    }
  }, [route.params]);

  const [classes, setClasses] = useState([]);
  const [modalClasseVisible, setModalClasseVisible] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/classes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const names = data.results.map((dndClass) => dndClass.name);
        setClasses(names);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const [racas, setRacas] = useState([]);
  const [modalRacaVisible, setModalRacaVisible] = useState(false);

  useEffect(() => {
    const fetchRacas = async () => {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/races");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const names = data.results.map((dndClass) => dndClass.name);
        setRacas(names);
      } catch (error) {
        console.error("Error fetching races:", error);
      }
    };

    fetchRacas();
  }, []);

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
      setNome("");
      setId(new Date().getTime());
      setNivel("1");
      setClasse("");
      setRaca("");
      setMetodo("criar");
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
          {metodo == "editar" ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.textSubtitulos}>Edição de personagem</Text>
              <TouchableOpacity
                onPress={() => {
                  setMetodo("criar");
                  setNome("");
                  setId(new Date().getTime());
                  setNivel("1");
                  setClasse("");
                  setRaca("");
                  setMetodo("criar");
                  setAtributos({
                    forca: "0",
                    destreza: "0",
                    constituicao: "0",
                    inteligencia: "0",
                    sabedoria: "0",
                    carisma: "0",
                  });
                  navigation.navigate("Lista", []);
                }}
                style={[styles.button, { backgroundColor: "#c8d3e0" }]}
              >
                <Text style={[styles.textButton, { fontSize: 20 }]}>
                  Cancelar edição
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.textSubtitulos}>Quem é você?</Text>
          )}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.viewCaracteristicas}>
              <Text style={styles.textCaracteristica}>Nome: </Text>
              <TextInput
                style={styles.textInputCaracteristica}
                value={nome}
                onChangeText={setNome}
              ></TextInput>
            </View>
            <View
              style={styles.viewCaracteristicas}
              onFocus={() => setModalClasseVisible(true)}
            >
              <Text style={styles.textCaracteristica}>Classe: </Text>
              <TouchableOpacity></TouchableOpacity>
              <TextInput
                style={styles.textInputCaracteristica}
                value={classe}
                onChangeText={setClasse}
              ></TextInput>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalClasseVisible}
              onRequestClose={() => setModalClasseVisible(false)}
            >
              <View style={styles.modalContainer}>
                <Text style={styles.tituloText}>Defina sua Classe</Text>
                <FlatList
                  data={classes}
                  keyExtractor={(index) => index.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setClasse(item);
                          setModalClasseVisible(false);
                        }}
                      >
                        <Text style={styles.optionText}>{item}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                <TouchableOpacity onPress={() => setModalClasseVisible(false)}>
                  <Text style={styles.cancelText}>Sair</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <View style={styles.viewCaracteristicas} 
              onFocus={() => setModalRacaVisible(true)}>
              <Text style={styles.textCaracteristica}>Raça: </Text>
              <TextInput
                style={styles.textInputCaracteristica}
                value={raca}
                onChangeText={setRaca}
              ></TextInput>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalRacaVisible}
              onRequestClose={() => setModalRacaVisible(false)}
            >
              <View style={styles.modalContainer}>
                <Text style={styles.tituloText}>Defina sua Raça</Text>
                <FlatList
                  data={racas}
                  keyExtractor={(index) => index.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setRaca(item);
                          setModalRacaVisible(false);
                        }}
                      >
                        <Text style={styles.optionText}>{item}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                <TouchableOpacity onPress={() => setModalRacaVisible(false)}>
                  <Text style={styles.cancelText}>Sair</Text>
                </TouchableOpacity>
              </View>
            </Modal>
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
            <Text style={styles.textButton}>
              {metodo == "criar" ? "Criar" : "Editar"}
            </Text>
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
  
  cancelText: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Open Sans",
    padding: 0,
    color: "#5474de",
  },
  tituloText: {
    fontSize: 25,
    padding: 15,
    margin: 5,
    color: "white",
  },
  optionText: {
    fontSize: 20,
    padding: 5,
    margin: 0,
    fontFamily: "Hanken Grotesk",
    color: "white",
    borderWidth: 1,
    width: 200,
    backgroundColor: "black",
    borderColor: "white",
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
  modalContainer: {
    flex: 1,
    margin: 15,
    marginVertical: 120,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    borderRadius: 20,
    borderColor: "#d7e3fa",
    borderWidth: 4,
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
