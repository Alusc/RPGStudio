import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";

export default function Select(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.selectedValue);

  const options = props.options || [];

  const handleOptionPress = (item) => {
    setSelectedValue(item);
    setModalVisible(false);
    if (props.onValueChange) {
      props.onValueChange(item.value);
    }
  };

  return (
    <View style={props.style[1]}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={props.style[0]}>
          {selectedValue.label || "d" + selectedValue}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={[props.style[0], styles.optionText]}>
            Escolha um dado
          </Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOptionPress(item)}>
                <Text
                  style={[
                    props.style[0],
                    styles.optionText,
                    styles.optionBorder,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
  },
  modalContainer: {
    flex: 1,
    margin: 15,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    borderRadius: 20,
    borderColor: "#d7e3fa",
    borderWidth: 4,
  },
  optionText: {
    fontSize: 25,
    padding: 15,
    margin: 5,
    color: "white",
  },
  optionBorder: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#d7e3fa",
    backgroundColor: "black",
  },
  cancelText: {
    fontSize: 30,
    fontFamily: "Open Sans",
    padding: 10,
    color: "#5474de",
  },
});
