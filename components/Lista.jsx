import { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { getLista } from "./armazenamento";
import Personagem from "./Personagem";

export default function Lista(props) {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    getLista().then(setLista);
  }, [props]);

  const atualizarLista = () => getLista().then(setLista);

  const editarPersonagem = (personagem) => props.navigation.navigate('Criar Personagem', personagem)

  

  console.log(lista)

  return (
    <ImageBackground
      source={require("../assets/imagens/imagem2.jpg")}
      style={styles.imagem}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        {lista.length == 0 ? <Text style={[styles.textSubtitulos]}>Nada aqui</Text> : <Text style={styles.textSubtitulos}>Suas criações</Text>}
          <View contentContainerStyle={styles.itemsContainer}>
            {lista.map((personagem) => (
              <Personagem
                key={personagem.id}
                id={personagem.id}
                nome={personagem.nome}
                raca={personagem.raca}
                nivel={personagem.nivel}
                classe={personagem.classe}
                atributos={personagem.atributos}
                onDelete={atualizarLista}
                onEdit={() => editarPersonagem(personagem)}
              />
            ))}
          </View>
         
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
});
