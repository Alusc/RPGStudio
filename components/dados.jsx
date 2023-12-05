import AsyncStorage from "@react-native-async-storage/async-storage";

export async function salvarItem(itemLista) {
  try {
    const lista = await getLista();

    const alterar = lista.findIndex((item) => item.id === itemLista.id);

    if (alterar !== -1) lista.splice(alterar, 1, itemLista);
    else lista.push(itemLista);

    const jsonValue = JSON.stringify(lista);
    await AsyncStorage.setItem("lista", jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export async function getLista() {
  try {
    const dados = await AsyncStorage.getItem("lista");
    return dados ? JSON.parse(dados) : [];
  } catch (e) {
    console.log(e);
  }
}

export async function removerItem(itemId) {
  try {
    const lista = await getLista();
    const novaLista = lista.filter((item) => item.id !== itemId);
    const jsonValue = JSON.stringify(novaLista);
    await AsyncStorage.setItem("lista", jsonValue);
  } catch (e) {
    console.log(e);
  }
}
