import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { Card, CardColor, CardType, CardRarity } from "./card.js";
import { CardCollection } from "./cardCollection.js";

yargs(hideBin(process.argv))
  .command(
    "add",
    "Añadir una nueva carta a la colección",
    {
      user: {
        describe: "Nombre de usuario",
        demandOption: true,
        type: "string",
      },
      id: {
        describe: "ID de la carta",
        demandOption: true,
        type: "number",
      },
      name: {
        describe: "Nombre de la carta",
        demandOption: true,
        type: "string",
      },
      mana: {
        describe: "Coste de maná de la carta",
        demandOption: true,
        type: "number",
      },
      color: {
        describe: "Color de la carta",
        demandOption: true,
        choices: Object.values(CardColor),
        type: "string",
      },
      type: {
        describe: "Tipo de la carta",
        demandOption: true,
        choices: Object.values(CardType),
        type: "string",
      },
      rarity: {
        describe: "Rareza de la carta",
        demandOption: true,
        choices: Object.values(CardRarity),
        type: "string",
      },
      rules: {
        describe: "Reglas de la carta",
        demandOption: true,
        type: "string",
      },
      power: {
        describe: "Poder de la carta (solo para criaturas)",
        type: "number",
      },
      resistance: {
        describe: "Resistencia de la carta (solo para criaturas)",
        type: "number",
      },
      loyalty: {
        describe: "Lealtad de la carta (solo para planeswalkers)",
        type: "number",
      },
      value: {
        describe: "Valor de la carta",
        demandOption: true,
        type: "number",
      },
    },
    (argv) => {
      const collection = new CardCollection(argv.user);
      let powerAndResistance: [number, number] | null = null;
      let loyalty: number | null = null;

      if (
        argv.type === CardType.CREATURE &&
        typeof argv.power === "number" &&
        typeof argv.resistance === "number"
      ) {
        powerAndResistance = [argv.power, argv.resistance];
      }

      if (
        argv.type === CardType.PLANESWALKER &&
        typeof argv.loyalty === "number"
      ) {
        loyalty = argv.loyalty;
      }

      const newCard = new Card(
        argv.id,
        argv.name,
        argv.mana,
        argv.color as CardColor,
        argv.type as CardType,
        argv.rarity as CardRarity,
        argv.rules,
        powerAndResistance,
        loyalty,
        argv.value,
      );
      collection.addCard(newCard);
    },
  )
  .command(
    "update",
    "Actualizar una carta existente en la colección",
    {
      user: {
        describe: "Nombre de usuario",
        demandOption: true,
        type: "string",
      },
      id: {
        describe: "ID de la carta",
        demandOption: true,
        type: "number",
      },
      name: {
        describe: "Nombre de la carta",
        demandOption: true,
        type: "string",
      },
      mana: {
        describe: "Coste de maná de la carta",
        demandOption: true,
        type: "number",
      },
      color: {
        describe: "Color de la carta",
        demandOption: true,
        choices: Object.values(CardColor),
        type: "string",
      },
      type: {
        describe: "Tipo de la carta",
        demandOption: true,
        choices: Object.values(CardType),
        type: "string",
      },
      rarity: {
        describe: "Rareza de la carta",
        demandOption: true,
        choices: Object.values(CardRarity),
        type: "string",
      },
      rules: {
        describe: "Reglas de la carta",
        demandOption: true,
        type: "string",
      },
      power: {
        describe: "Poder de la carta (solo para criaturas)",
        type: "number",
      },
      resistance: {
        describe: "Resistencia de la carta (solo para criaturas)",
        type: "number",
      },
      loyalty: {
        describe: "Lealtad de la carta (solo para planeswalkers)",
        type: "number",
      },
      value: {
        describe: "Valor de la carta",
        demandOption: true,
        type: "number",
      },
    },
    (argv) => {
      const collection = new CardCollection(argv.user);
      let powerAndResistance: [number, number] | null = null;
      let loyalty: number | null = null;

      if (
        argv.type === CardType.CREATURE &&
        typeof argv.power === "number" &&
        typeof argv.resistance === "number"
      ) {
        powerAndResistance = [argv.power, argv.resistance];
      }

      if (
        argv.type === CardType.PLANESWALKER &&
        typeof argv.loyalty === "number"
      ) {
        loyalty = argv.loyalty;
      }

      const newCard = new Card(
        argv.id,
        argv.name,
        argv.mana,
        argv.color as CardColor,
        argv.type as CardType,
        argv.rarity as CardRarity,
        argv.rules,
        powerAndResistance,
        loyalty,
        argv.value,
      );
      collection.updateCard(newCard);
    },
  )
  .command(
    "read",
    "Mostrar la información de una carta de la colección",
    {
      user: {
        describe: "Nombre de usuario",
        demandOption: true,
        type: "string",
      },
      id: {
        describe: "ID de la carta",
        demandOption: true,
        type: "number",
      },
    },
    (argv) => {
      const collection = new CardCollection(argv.user);
      console.log(collection.showCardInfo(argv.id));
    },
  )
  .command(
    "list",
    "Mostrar todas las cartas de la colección",
    {
      user: {
        describe: "Nombre de usuario",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => {
      const collection = new CardCollection(argv.user);
      console.log(collection.listCards());
    },
  )
  .command(
    "remove",
    "Eliminar una carta de la colección",
    {
      user: {
        describe: "Nombre de usuario",
        demandOption: true,
        type: "string",
      },
      id: {
        describe: "ID de la carta",
        demandOption: true,
        type: "number",
      },
    },
    (argv) => {
      const collection = new CardCollection(argv.user);
      collection.removeCard(argv.id);
    },
  )
  .demandCommand(1, "Usa algún comando.")
  .help().argv;