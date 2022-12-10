const dadop1 = require("../../../../assets/img/dadoP1.png");
const dadop2 = require("../../../../assets/img/dadoP2.png");
const dadop3 = require("../../../../assets/img/dadoP3.png");
const dadop4 = require("../../../../assets/img/dadoP4.png");
const dadop5 = require("../../../../assets/img/dadoP5.png");
const dadop6 = require("../../../../assets/img/dadoP6.png");

const dadov1 = require("../../../../assets/img/dadoV1.png");
const dadov2 = require("../../../../assets/img/dadoV2.png");
const dadov3 = require("../../../../assets/img/dadoV3.png");
const dadov4 = require("../../../../assets/img/dadoV4.png");
const dadov5 = require("../../../../assets/img/dadoV5.png");
const dadov6 = require("../../../../assets/img/dadoV6.png");

export const optionsLab = [
  {
    label: "Cancelar Aposta",
    onPress: () => cancel({ id: item.id }),
  },
  {
    label: "R$ 2,00",
    onPress: () =>
      selecionar({
        id: item.id,
        valor: 2,
        cor: item.cor,
        mult: item.mult,
        key: item.key,
      }),
  },
  {
    label: "R$ 5,00",
    onPress: () =>
      selecionar({
        id: item.id,
        valor: 5,
        cor: item.cor,
        mult: item.mult,
        key: item.key,
      }),
  },
  {
    label: "R$ 10,00",
    onPress: () =>
      selecionar({
        id: item.id,
        valor: 10,
        cor: item.cor,
        mult: item.mult,
        key: item.key,
      }),
  },
];

export const dados = [
  {
    key: 1,
    id: "dadop1",
    imagem: dadop1,
    imagem2: "http://morenacaipira.com/dadoP1.png",
    color: "#0c0c0e",
    mult: 2,
    nome: "Dado Branco 1, ",
  },

  {
    key: 2,
    id: "dadop2",
    imagem: dadop2,
    imagem2: "http://morenacaipira.com/dadoP2.png",
    color: "#0c0c0e",
    mult: 2,
    nome: "Dado Branco 2, ",
  },

  {
    key: 3,
    id: "dadop3",
    imagem: dadop3,
    imagem2: "http://morenacaipira.com/dadoP3.png",

    color: "#0c0c0e",
    mult: 2,
    nome: "Dado Branco 3, ",
  },

  {
    key: 4,
    id: "dadop4",
    imagem: dadop4,
    imagem2: "http://morenacaipira.com/dadoP4.png",

    color: "#0c0c0e",
    mult: 2,
    nome: "Dado Branco 4, ",
  },

  {
    key: 5,
    id: "dadop5",
    imagem: dadop5,
    imagem2: "http://morenacaipira.com/dadoP5.png",

    color: "#0c0c0e",
    mult: 2,
    nome: "Dado Branco 5, ",
  },

  {
    key: 6,
    id: "dadop6",
    imagem: dadop6,
    imagem2: "http://morenacaipira.com/dadoP6.png",

    color: "#0c0c0e",
    mult: 2,
    nome: "Dado Branco 6, ",
  },

  {
    key: 7,
    id: "dadov1",
    imagem: dadov1,
    imagem2: "http://morenacaipira.com/dadoV1.png",

    color: "#0c0c0e",
    mult: 4,
    nome: "Dado Vermelho 1, ",
  },

  {
    key: 8,
    id: "dadov2",
    imagem: dadov2,
    color: "#0c0c0e",
    mult: 4,
    nome: "Dado Vermelho 2, ",
    imagem2: "http://morenacaipira.com/dadoV2.png",
  },

  {
    key: 9,
    id: "dadov3",
    imagem: dadov3,
    color: "#0c0c0e",
    mult: 4,
    nome: "Dado Vermelho 3, ",
    imagem2: "http://morenacaipira.com/dadoV3.png",
  },

  {
    key: 10,
    id: "dadov4",
    imagem: dadov4,
    imagem2: "http://morenacaipira.com/dadoV4.png",

    color: "#0c0c0e",
    mult: 4,
    nome: "Dado Vermelho 4, ",
  },

  {
    key: 11,
    id: "dadov5",
    imagem: dadov5,
    imagem2: "http://morenacaipira.com/dadoV5.png",

    color: "#0c0c0e",
    mult: 4,
    nome: "Dado Vermelho 5, ",
  },

  {
    key: 12,
    id: "dadov6",
    imagem: dadov6,
    imagem2: "http://morenacaipira.com/dadoV6.png",

    color: "#0c0c0e",
    mult: 4,
    nome: "Dado Vermelho 6, ",
  },
];

function geraStringAleatoria(tamanho) {
  let stringAleatoria = "";

  var caracteres = "abcdefghijklmnopqrstuvwx";
  for (var i = 0; i < 3; i++) {
    stringAleatoria += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return stringAleatoria;
}

export const jogadores = [
  {
    id: geraStringAleatoria(2),
    nome: "Juliana",
    av: "sg",

    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
  },
  {
    id: geraStringAleatoria(2),
    nome: "Carlos",
    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    av: "sj",
  },
  {
    id: geraStringAleatoria(2),
    nome: "Paulo",
    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    av: "sdjg",
  },
  {
    id: geraStringAleatoria(2),
    nome: "Lucas",
    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    av: "sfjg",
  },
  {
    id: geraStringAleatoria(2),
    nome: "Marcos",
    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    av: "sjrg",
  },
  {
    id: geraStringAleatoria(2),
    nome: "Francisco",
    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    av: "sqjg",
  },
  {
    id: geraStringAleatoria(2),
    nome: "Luís",
    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    av: "smjg",
  },
  {
    id: geraStringAleatoria(2),
    nome: "Gabriel",
    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    av: "sljg",
  },
  {
    id: geraStringAleatoria(2),
    nome: "Rafael",
    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    av: "sjig",
  },
  {
    id: geraStringAleatoria(2),
    nome: "Ana",
    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    av: "sjg",
  },
  {
    id: geraStringAleatoria(2),
    nome: "Francisca",
    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    av: "sjg",
  },
  {
    id: geraStringAleatoria(2),
    nome: "Adriana",
    img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    av: "sjg",
  },
];
