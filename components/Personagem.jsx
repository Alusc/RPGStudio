import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    Alert,
  } from "react-native";
  import { removerItem, getLista } from "./dados";
  export default function Personagem(props) {
    const handleExcluirItem = () => {
      if (Platform.OS == "web") {
        if (window.confirm("Tem certeza que deseja excluir esse item?")) {
          removerItem(props.id).then(props.onDelete);
        }
      } else {
        Alert.alert(
          "Tem certeza que deseja excluir esse item?",
          `${props.item}`,
          [
            {
              text: "Sim",
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
        <Text style={styles.textItem}>{props.item}</Text>
        <Text style={styles.textItemQuantidade}>
          {props.quantidade == 1 ? "1 unidade" : `${props.quantidade} unidades`}
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={() => {
            handleExcluirItem();
          }}>
            <Text
              style={styles.buttonText}
            >
              X
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => { props.onEdit() }}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      marginTop: 10,
      width: "100%",
    },
    buttonsContainer: {
      flexDirection: "row-reverse",
      borderBottomWidth: 1,
      borderBottomColor: "#CCC",
      paddingBottom: 10,
      marginTop: 10,
    },
    editButton: {
      marginLeft: 10,
      height: 40,
      backgroundColor: "blue",
      borderRadius: 10,
      padding: 10,
      fontSize: 12,
      elevation: 10,
      shadowOpacity: 10,
      shadowColor: "#ccc",
      alignItems: "center",
    },
    deleteButton: {
      marginLeft: 10,
      height: 40,
      width: 40,
      backgroundColor: "red",
      borderRadius: 10,
      padding: 10,
      fontSize: 12,
      elevation: 10,
      shadowOpacity: 10,
      shadowColor: "#ccc",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    textItem: {
      fontSize: 20,
    },
    textItemQuantidade: {
      fontSize: 16,
      color: "grey",
    },
  });
  