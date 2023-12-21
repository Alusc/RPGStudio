import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { removerItem } from "./armazenamento";
import { useState } from "react";
export default function Personagem(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleExcluirItem = () => {
    if (Platform.OS == "web") {
      if (window.confirm("Está certo de que deseja excluir sua criação??")) {
        removerItem(props.id).then(props.onDelete);
      }
    } else {
      Alert.alert(
        "Está certo de que deseja excluir sua criação?",
        `${props.nome}`,
        [
          {
            text: "Excluir",
            onPress: () => {
              removerItem(props.id).then(props.onDelete);
            },
          },
          {
            text: "Cancelar",
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textItem}>{props.nome}</Text>
      <Text>{props.classe + " level " + props.nivel}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            handleExcluirItem();
          }}
        >
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            props.onEdit();
          }}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.editButton,
            {
              width: 45,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              backgroundColor: "#191873",
            },
          ]}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={{ flex: 1 }}>
              <Text style={styles.optionText}>
                <Text style={{ color: "#a3adbf" }}>Nome: </Text>
                {props.nome}
              </Text>
              <Text style={styles.optionText}>
                <Text style={{ color: "#a3adbf" }}>Classe: </Text>{" "}
                {props.classe}
              </Text>
              <Text style={styles.optionText}>
                <Text style={{ color: "#a3adbf" }}>Raça: </Text> {props.raca}
              </Text>
              <Text style={styles.optionText}>
                <Text style={{ color: "#a3adbf" }}>Nível: </Text> {props.nivel}
              </Text>
              <View
                style={[
                  styles.optionText,
                  { borderColor: "white", borderTopWidth: 0 },
                ]}
              >
                <Text style={styles.atributosText}>Atributos: </Text>
                <View style={{ margin: 5 }}>
                  <Text
                    style={[
                      styles.atributosText,
                      { color: "white", fontSize: 15 },
                    ]}
                  >
                    Força: {props.atributos["forca"]}
                  </Text>
                  <Text
                    style={[
                      styles.atributosText,
                      { color: "white", fontSize: 15 },
                    ]}
                  >
                    Destreza: {props.atributos["destreza"]}
                  </Text>
                  <Text
                    style={[
                      styles.atributosText,
                      { color: "white", fontSize: 15 },
                    ]}
                  >
                    Constituição: {props.atributos["constituicao"]}
                  </Text>
                  <Text
                    style={[
                      styles.atributosText,
                      { color: "white", fontSize: 15 },
                    ]}
                  >
                    Inteligência: {props.atributos["inteligencia"]}
                  </Text>
                  <Text
                    style={[
                      styles.atributosText,
                      { color: "white", fontSize: 15 },
                    ]}
                  >
                    Sabedoria: {props.atributos["sabedoria"]}
                  </Text>
                  <Text
                    style={[
                      styles.atributosText,
                      { color: "white", fontSize: 15 },
                    ]}
                  >
                    Carisma: {props.atributos["carisma"]}
                  </Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Sair</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ebf4ff",
    padding: 10,
    margin: 7,
    width: 200,
    borderRadius: 20,
    borderWidth: 5,
    borderTopWidth: 3,
    borderBottomWidth: 3,
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    borderBottomColor: "#CCC",
    paddingBottom: 5,
    marginTop: 10,
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
  editButton: {
    height: 35,
    backgroundColor: "black",
    padding: 7,
    fontSize: 10,
    alignItems: "center",
  },
  deleteButton: {
    height: 35,
    width: 35,
    backgroundColor: "#6e0d13",
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  atributosText: {
    fontSize: 20,
    color: "#a3adbf",
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
    borderBottomColor: "white",
  },
  cancelText: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Open Sans",
    padding: 0,
    color: "#5474de",
  },
  textItem: {
    fontSize: 20,
  },
});
