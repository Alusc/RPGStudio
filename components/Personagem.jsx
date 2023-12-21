
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  Modal,
  FlatList,
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
      <Text>{props.classe + " nível " + props.nivel}</Text>

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
          <Text style={styles.optionText}>
            Nome: {props.nome}
          </Text>
          <Text style={styles.optionText}>
            Classe: {props.classe}
          </Text>
          <Text style={styles.optionText}>
            Raça: {props.raca}
          </Text>
          <Text style={styles.optionText}>
            Nível: {props.nivel}
          </Text>
          <Text style={styles.optionText}>
            Atributos: {Object.keys(props.atributos).map(chave => props.atributos[chave])}
          </Text>
          

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>Sair</Text>
          </TouchableOpacity>
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
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    borderRadius: 20,
    borderColor: "#d7e3fa",
    borderWidth: 4,
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
  optionText: {
    fontSize: 20,
    padding: 2,
    margin: 5,
    fontFamily: "Open Sans",
    color: "white",
  },
  cancelText: {
    fontSize: 30,
    fontFamily: "Open Sans",
    padding: 10,
    color: "#5474de",
  },
  textItem: {
    fontSize: 20,
  },
});
