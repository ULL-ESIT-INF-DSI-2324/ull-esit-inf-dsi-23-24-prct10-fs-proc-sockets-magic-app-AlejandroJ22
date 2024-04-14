import "mocha";
import { expect } from "chai";
import { Card, CardColor, CardType, CardRarity } from "../src/pe/card.js";
import { CardCollection } from "../src/pe/cardCollection.js";

describe("CardCollection Tests", () => {
  const collection = new CardCollection("testUser");

  // describe("Add Card", () => {
  //   it("should write file correctly", (done) => {
  //     collection.writeCards((err) => {
      
  //     if (err != undefined) {
  //       expect(collection.listCards()).to.include("Test Card");
  //       done();
  //     }
  //     }) 
  //   })
  // });

  describe("Add Card", () => {
    it("should add a new card to the collection", () => {
      const newCard = new Card(
        1,
        "Test Card",
        2,
        CardColor.WHITE,
        CardType.CREATURE,
        CardRarity.COMMON,
        "Test rules",
        [2, 2],
        null,
        5,
      );
      collection.addCard(newCard);
      expect(collection.listCards()).to.include("Test Card");
    });
  });

  describe("Update Card", () => {
    it("should update an existing card in the collection", () => {
      const updatedCard = new Card(
        1,
        "Updated Test Card",
        3,
        CardColor.BLUE,
        CardType.PLANESWALKER,
        CardRarity.UNCOMMON,
        "Updated rules",
        null,
        4,
        6,
      );
      collection.updateCard(updatedCard);
      expect(collection.showCardInfo(1)).to.include("Updated Test Card");
    });
  });

  describe("Show Card Info", () => {
    it("should show information of a specific card in the collection", () => {
      const cardInfo = collection.showCardInfo(1);
      expect(cardInfo).to.include("Updated Test Card");
    });

    it("should indicate if the specified card does not exist in the collection", () => {
      const cardInfo = collection.showCardInfo(0);
      expect(cardInfo).to.include(
        "No existe una carta con el ID especificado en la colección",
      );
    });
  });

  describe("Remove Card", () => {
    it("should remove a card from the collection", () => {
      collection.removeCard(1);
      expect(collection.listCards()).to.not.include("Updated Test Card");
    });
  });

  describe("List Cards", () => {
    it("should list all cards in the collection", () => {
      const newCard1 = new Card(
        1,
        "Test Card 1",
        2,
        CardColor.WHITE,
        CardType.CREATURE,
        CardRarity.COMMON,
        "Test rules 1",
        [2, 2],
        null,
        5,
      );
      const newCard2 = new Card(
        2,
        "Test Card 2",
        3,
        CardColor.BLACK,
        CardType.SORCERY,
        CardRarity.RARE,
        "Test rules 2",
        null,
        null,
        6,
      );
      collection.addCard(newCard1);
      collection.addCard(newCard2);
      const cardsList = collection.listCards();
      expect(cardsList).to.include("Test Card 1");
      expect(cardsList).to.include("Test Card 2");
      collection.removeCard(1);
      collection.removeCard(2);
    });
  });
});
