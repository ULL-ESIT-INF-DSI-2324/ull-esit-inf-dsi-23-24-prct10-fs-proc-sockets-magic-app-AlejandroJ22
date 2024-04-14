import { Card } from "./card.js";

import fs from "fs";
import chalk from "chalk";
// import { json } from "stream/consumers"; // No se de donde sale esto

/**
 * Interfaz que describe los métodos públicos de la clase CardCollection.
 */
export interface CardCollectionInterface {
  /**
   * Método que añade una nueva carta a la colección.
   * @param newCard La nueva carta que se va a añadir.
   */
  // addCard(newCard: Card): void;

  /**
   * Método que añade una nueva carta a la colección.
   * @param newCard La nueva carta que se va a añadir.
   * @param callback La función de devolución de llamada que se llamará después de agregar la carta.
   */
  addCard(newCard: Card, callback: (err?: Error) => void): void;

  /**
   * Método que actualiza una carta en la colección.
   * @param modifiedCard La carta modificada que se va a actualizar.
   */
  updateCard(modifiedCard: Card): void;

  /**
   * Método que elimina una carta de la colección.
   * @param cardId El ID de la carta que se va a eliminar.
   */
  removeCard(cardId: number): void;

  /**
   * Método que devuelve una cadena con la lista de cartas en la colección.
   * @returns Una cadena con la lista de cartas en la colección.
   */
  listCards(): string;

  /**
   * Método que devuelve información detallada de una carta específica en la colección.
   * @param cardId El ID de la carta de la cual se quiere obtener la información.
   * @returns Una cadena con la información detallada de la carta.
   */
  showCardInfo(cardId: number): string;
}

/**
 * Clase que representa una colección de cartas.
 */
export class CardCollection implements CardCollectionInterface {
  /**
   * El nombre de usuario asociado a la colección.
   */
  public readonly username: string;
  /**
   * La ruta del archivo de la colección.
   */
  private readonly collectionPath: string;
  /**
   * Mapa que contiene las cartas en la colección, donde la clave es el ID de la carta.
   */
  private cards: Map<number, Card>;

  /**
   * Constructor de la clase CardCollection.
   * @param username El nombre de usuario asociado a la colección.
   */
  constructor(username: string) {
    this.username = username;
    this.collectionPath = `./collections/${this.username}.json`;
    this.cards = new Map<number, Card>();

    // Si el archivo de colección no existe, escribirlo
    if (!fs.existsSync(this.collectionPath)) {
      this.writeCards((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(
            `Estado de la colección ` +
              chalk.green(`escrito correctamente`) +
              ` en el archivo ${this.collectionPath}.`,
          );
        }
      });
    }
    this.loadCards();
  }

  /**
   * Método privado que carga las cartas desde el archivo de colección.
   */
  loadCards(): void {
    try {
      const data = fs.readFileSync(this.collectionPath);
      const parsedData = JSON.parse(data.toString());
      for (const cardData of parsedData) {
        const card = new Card(
          cardData.id,
          cardData.name,
          cardData.mana,
          cardData.cardColor,
          cardData.cardType,
          cardData.cardRarity,
          cardData.rules,
          cardData.powerAndResistance,
          cardData.loyalty,
          cardData.value,
        );
        this.cards.set(card.id, card);
      }
    } catch (err) {
      console.log(
        chalk.red(`Error`) +
          `: no se ha conseguido leer el fichero ` +
          chalk.green(`${this.collectionPath}`),
      );
    }
  }

  /**
   * Método que escribe las cartas en el archivo de colección.
   */
  // writeCards(): void {
  //   const cardsData = JSON.stringify([...this.cards.values()], null, 2);
  //   // console.log(JSON.stringify([...this.cards.values()], null, 2));
  //   fs.writeFile(this.collectionPath, cardsData, (err) => {
  //     if (err) {
  //       console.log(
  //         chalk.red(`Error`) +
  //           `: No se pudo escribir en el archivo ${this.collectionPath}.`,
  //       );
  //     } else {
  //       console.log(
  //         `Estado de la colección ` +
  //           chalk.green(`escrito correctamente`) +
  //           ` en el archivo ${this.collectionPath}.`,
  //       );
  //     }
  //   });
  // }

  /**
   * Método que escribe las cartas en el archivo de colección.
   * @param callback La función de devolución de llamada que se llamará después de escribir en el archivo.
   * @note implementar un segundo parametro string que confirme que se ha realizdo la operación con éxito.
   */
  writeCards(callback: (err: string | undefined) => void): void {
    const cardsData = JSON.stringify([...this.cards.values()], null, 2);
    fs.writeFile(this.collectionPath, cardsData, (err) => {
      if (err) {
        callback(`: No se pudo escribir en el archivo ${this.collectionPath}.`);
      } else {
        callback(undefined);
      }
    });
  }

  /**
   * Método que añade una nueva carta a la colección.
   * @param newCard La nueva carta que se va a añadir.
   */
  // addCard(newCard: Card): void {
  //   if (this.cards.has(newCard.id)) {
  //     throw new Error(
  //       chalk.red(`Error`) +
  //         `: Ya existe una carta con el mismo ID en la colección.`,
  //     );
  //   } else {
  //     this.cards.set(newCard.id, newCard);
  //     console.log(
  //       `La carta ha sido ` +
  //         chalk.green(`añadida correctamente`) +
  //         ` a la colección.`,
  //     );
  //   }
  //   this.writeCards();
  // }

  /**
   * Método que añade una nueva carta a la colección.
   * @param newCard La nueva carta que se va a añadir.
   */
  addCard(newCard: Card): void {
    if (this.cards.has(newCard.id)) {
      throw new Error(
        chalk.red(`Error`) +
          `: Ya existe una carta con el mismo ID en la colección.`,
      );
    } else {
      this.cards.set(newCard.id, newCard);
      console.log(
        `La carta ha sido ` +
          chalk.green(`añadida correctamente`) +
          ` a la colección.`,
      );
    }
    this.writeCards((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          `Estado de la colección ` +
            chalk.green(`escrito correctamente`) +
            ` en el archivo ${this.collectionPath}.`,
        );
      }
    });
  }

  /**
   * Método que actualiza una carta en la colección.
   * @param modifiedCard La carta modificada que se va a actualizar.
   */
  updateCard(modifiedCard: Card): void {
    if (this.cards.has(modifiedCard.id)) {
      this.cards.set(modifiedCard.id, modifiedCard);
      console.log(
        `La carta ha sido ` +
          chalk.green(`modificada correctamente`) +
          ` en la colección.`,
      );
    } else {
      console.log(
        chalk.red(`Error`) +
          `: No existe una carta con el ID especificado en la colección.`,
      );
    }
    this.writeCards((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          `Estado de la colección ` +
            chalk.green(`escrito correctamente`) +
            ` en el archivo ${this.collectionPath}.`,
        );
      }
    });
  }

  /**
   * Método que elimina una carta de la colección.
   * @param cardId El ID de la carta que se va a eliminar.
   */
  removeCard(cardId: number): void {
    if (this.cards.has(cardId)) {
      this.cards.delete(cardId);
      console.log(
        `La carta con ID ${cardId} ha sido ` +
          chalk.green(`eliminada correctamente`) +
          ` de la colección.`,
      );
      this.writeCards((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(
            `Estado de la colección ` +
              chalk.green(`escrito correctamente`) +
              ` en el archivo ${this.collectionPath}.`,
          );
        }
      });
    } else {
      console.log(
        chalk.red(`Error`) +
          `: No existe una carta con el ID especificado en la colección.`,
      );
    }
  }

  /**
   * Método que devuelve una cadena con la lista de cartas en la colección.
   * @returns Una cadena con la lista de cartas en la colección.
   */
  listCards(): string {
    let cardList = chalk.green("Cartas en la colección:\n");
    this.cards.forEach((card) => {
      cardList += card.attributes();
    });
    return cardList;
  }

  /**
   * Método que devuelve información detallada de una carta específica en la colección.
   * @param cardId El ID de la carta de la cual se quiere obtener la información.
   * @returns Una cadena con la información detallada de la carta.
   */
  showCardInfo(cardId: number): string {
    const card = this.cards.get(cardId);
    if (card) {
      return chalk.green("Información de la carta:\n") + card.attributes();
    } else {
      return (
        chalk.red(`Error`) +
        `: No existe una carta con el ID especificado en la colección.`
      );
    }
  }
}
