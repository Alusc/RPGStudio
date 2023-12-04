import { Image } from "react-native";

export default function Icone({nome, tamanho, cor}) {

    /*console.log("Nome do ícone:", nome);
    console.log("Tamanho do ícone:", tamanho);
    console.log("Cor do ícone:", cor);*/

  return (
    <Image
      source={require(`../assets/icones/${nome}.png`)}
      style={{ width: tamanho, height: tamanho, alignSelf: "center", bottom: tamanho * 3 / 14  }}
      tintColor={cor}
    ></Image>
  );
}
