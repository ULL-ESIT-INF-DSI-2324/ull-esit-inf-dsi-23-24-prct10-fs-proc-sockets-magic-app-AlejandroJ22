[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7bX30zK4)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-AlejandroJ22/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-AlejandroJ22/actions/workflows/coveralls.yml)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-AlejandroJ22/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-AlejandroJ22/actions/workflows/node.js.yml)

[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-AlejandroJ22/actions/workflows/build.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-AlejandroJ22/actions/workflows/build.yml)

# Informe práctica 10 - Aplicación cliente-servidor para coleccionistas de cartas Magic.

![Imagen Cliente-Servidor](images/client-server.png)

## Alejandro Javier Aguiar Pérez
> [alu0101487168@ull.edu.es](mailto:alu0101487168@ull.edu.es)

## Índice
1. [Resumen](#resumen)
2. [Chalk](#chalk)
3. [Yargs](#yargs)
4. [EventEmitter](#eventemitter)
5. [NET](#net)
6. [Servidor](#servidor)
7. [Cliente](#cliente)
8. [Magic App](#magic-app)
    - [Clase Card](#clase-card)
    - [Clase CardCollection](#clase-cardcollection)
9. [Problemas](#problemas)
10. [Ejercicio PE](#ejercicio-pe)
11. [Referencias](#referencias)

## Resumen

En esta práctica, se implementa un servidor y un cliente para una aplicación de colección de cartas Magic usando sockets proporcionados por el módulo net de Node.js. Los usuarios interactúan con el cliente a través de la línea de comandos, mientras que el servidor gestiona las operaciones solicitadas por los clientes y almacena la información de las cartas en archivos JSON en el sistema de archivos.

Los requisitos de la aplicación son los siguientes:

- Permitir múltiples usuarios interactuar simultáneamente con el servidor.
- Implementar operaciones como añadir, modificar, eliminar, listar y mostrar información de cartas en la colección de un usuario.
- Almacenar la información de las cartas en archivos JSON en el sistema de archivos del servidor.
- Utilizar paquetes como yargs y chalk para el manejo de la línea de comandos y el formato de salida.
- Emplear el patrón petición-respuesta para la comunicación entre cliente y servidor, utilizando objetos JSON como medio de intercambio de información.
- Realizar pruebas unitarias para verificar el correcto funcionamiento del código y garantizar la robustez ante entradas no válidas.
- Documentar el código utilizando TypeDoc y seguir una metodología de desarrollo dirigido por pruebas (TDD/BDD).
- Incluir flujos de trabajo de GitHub Actions para realizar pruebas en diferentes entornos, enviar datos de cobertura a Coveralls y realizar análisis de calidad y seguridad del código en Sonar Cloud.
- Respetar los principios SOLID de diseño orientado a objetos.

> **[Volver al índice](#índice)**

## Chalk

El paquete *chalk* es una herramienta utilizada en Node.js para dar formato y colorear texto en la consola. Permite resaltar mensajes de salida, hacerlos más legibles y mejorar la apariencia general de las impresiones por consola. Es especialmente útil para diferenciar mensajes informativos de mensajes de error, o para destacar cierta información importante.

Un ejemplo de como usar *chalk* puede ser el siguiente:

```ts
import chalk from "chalk";

// Colorear texto
console.log(chalk.blue("Este texto es azul"));
console.log(chalk.red("Este texto es rojo"));
console.log(chalk.green("Este texto es verde"));

// Combinar estilos
console.log(chalk.blue.bold("Este texto es azul y negrita"));
console.log(chalk.red.underline("Este texto es rojo y subrayado"));

// Cambiar el color de fondo
console.log(chalk.bgYellow.black("Texto con fondo amarillo"));

// Combinar múltiples estilos
console.log(chalk.red.bold.bgWhite.underline("Texto rojo, negrita, subrayado y con fondo blanco"));
```

Aunque en este proyecto he decidido no ahondar demasiado en el uso de chalk ya que no creo que es lo que pretende para esta práctica, así que solo coloree de diferentes maneras los mensajes informativos como se requería.

> **[Volver al índice](#índice)**

## Yargs

El paquete *yargs* es una herramienta en Node.js que facilita la creación de interfaces de línea de comandos (CLI) de manera sencilla y flexible. Permite definir comandos, opciones y argumentos para tus aplicaciones de línea de comandos de una manera intuitiva y fácil de usar. *yargs* simplifica la tarea de analizar y procesar los argumentos pasados por línea de comandos en la aplicación.

Un ejemplo de como usar yargs puede ser el siguiente, extraído directamente desde su página web:

```ts
// For ESM imports
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv)
  })
  .demandCommand(1)
  .parse()
```

Tampoco decidí ahondar demasiado en su uso, tan solo lo necesario.

> **[Volver al índice](#índice)**

## EventEmitter

EventEmitter es una clase en Node.js que facilita la implementación de la comunicación entre diferentes partes de un programa de manera eficiente y desacoplada. Permite la emisión y escucha de eventos, donde un evento es simplemente una acción o ocurrencia en la aplicación. Los oyentes son funciones que se ejecutan cuando ocurre un evento específico.

La clase EventEmitter se utiliza para gestionar eventos y manejar la comunicación asíncrona en Node.js. Al heredar de la clase EventEmitter del módulo events, cualquier clase que extienda EventEmitter tendrá la capacidad de emitir y escuchar eventos.

> **[Volver al índice](#índice)**

## NET

El módulo net es una parte esencial de Node.js que proporciona una API para la creación de servidores y clientes TCP (Protocolo de Control de Transmisión). TCP es un protocolo de red ampliamente utilizado que garantiza una conexión confiable y bidireccional entre dos dispositivos en una red.

El módulo net permite la creación de servidores TCP que pueden escuchar conexiones entrantes en un puerto específico y manejar esas conexiones. También permite la creación de clientes TCP que pueden establecer conexiones salientes con servidores TCP en un puerto y una dirección IP específicos.

La API proporcionada por el módulo net es asíncrona y basada en eventos, lo que significa que utiliza la clase EventEmitter para emitir eventos relacionados con la conexión y proporciona métodos para registrar oyentes para estos eventos.

> **[Volver al índice](#índice)**

## Servidor

Respecto a la creación del servidor los puntos más interesantes sobre las decisiones de diseño son:

- Comunicación con los clientes

**Creación del servidor TCP**: La aplicación utiliza el módulo net de Node.js para crear un servidor TCP que escucha en el puerto 60300. Esto permite que los clientes se conecten al servidor y envíen mensajes para realizar operaciones en la colección de cartas.

**Manejo de eventos de conexión**: Se utilizan eventos como "data", "close" y "error" para manejar la comunicación entre el servidor y los clientes. Por ejemplo, cuando un cliente envía datos al servidor, se activa el evento "data", lo que desencadena la ejecución para procesar los mensajes recibidos.

- Manipulación de la colección de cartas

**Creación de la colección de cartas**: Cada vez que se recibe un mensaje de un cliente, se crea una nueva instancia de la clase CardCollection, que representa la colección de cartas asociada al usuario especificado en el mensaje.

**Selección de la acción**: El servidor analiza el mensaje recibido para determinar la acción solicitada por el cliente. Las acciones pueden ser "add" (añadir una carta), "update" (actualizar una carta), "read" (leer información de una carta), "list" (listar todas las cartas) o "remove" (eliminar una carta).

**Manipulación de las cartas**: Dependiendo de la acción especificada en el mensaje, el servidor interactúa con la colección de cartas llamando a los métodos correspondientes, como *addCard*, *updateCard*, *showCardInfo*, *listCards* o *removeCard*. Estos métodos se encargan de realizar las operaciones necesarias en la colección de cartas y devolver un mensaje de estado al cliente.

- Otras decisiones de diseño son:

**Serialización de datos**: Antes de enviar los mensajes de respuesta al cliente, el servidor serializa los datos en formato JSON para facilitar la comunicación entre el servidor y los clientes.

**Gestión de errores**: Se implementa una lógica para manejar errores durante la ejecución de las operaciones en la colección de cartas. Si ocurre algún error, se envía un mensaje de error al cliente junto con una descripción del problema.

> **[Volver al índice](#índice)**

## Cliente

En cuanto a la implementación del cliente:

- Comunicación con el servidor

**Conexión al servidor**: El cliente utiliza net.connect() para establecer una conexión TCP con el servidor que escucha en el puerto 60300.

**Envío de mensajes al servidor**: Cuando el cliente ejecuta un comando desde la línea de comandos, como "add", "update", "read", "list" o "remove", se crea un mensaje JSON que contiene la acción y los datos necesarios. Este mensaje se envía al servidor utilizando client.write().

**Recepción de respuestas del servidor**: El cliente escucha los datos que envía el servidor y los concatena en una variable wholeData. Luego, cuando la conexión con el servidor se cierra ('end'), se intenta analizar el JSON completo y se muestra el mensaje correspondiente en la consola.

- Interacción del usuario a través de la línea de comandos

**Uso de Yargs para definir comandos**: El cliente utiliza el paquete yargs para definir los comandos que puede ejecutar el usuario desde la línea de comandos. Cada comando tiene opciones específicas que el usuario puede proporcionar, como el nombre de usuario, el ID de la carta, el nombre de la carta, etc.

**Creación de mensajes JSON dinámicamente**: Cuando el usuario ejecuta un comando, como "add" o "update", se crea un mensaje JSON que incluye la acción especificada y los datos proporcionados por el usuario. Esto permite una comunicación estructurada entre el cliente y el servidor.

**Validación de opciones de línea de comandos**: Se utilizan las opciones proporcionadas por el usuario para crear una nueva carta o realizar otras operaciones en la colección de cartas. Antes de enviar el mensaje al servidor, se valida que las opciones proporcionadas sean válidas según las reglas definidas en las opciones de Yargs.

> **[Volver al índice](#índice)**

## Magic App

El proyecto de la Magic App experimentó varios cambios en su implementación para mejorar la eficiencia y la estructura del código. Uno de los cambios significativos se centró en el uso del patrón de devolución de llamada (*"callback pattern"*) en la clase *CardCollection*, lo que a priori debería mejorar la gestión de las operaciones relacionadas con la colección de cartas.

> **[Volver al índice](#índice)**

### Clase Card

La clase *Card* representa una carta del juego Magic: The Gathering y tiene las siguientes opciones de diseño:

Esta clase no ha sufrido ningún cambio.

- **Constructor**: La clase tiene propiedades públicas que representan las características de una carta, como su ID, nombre, coste de mana, color, tipo, rareza, reglas, poder y resistencia (solo para *CRIATURAS*), lealtad (solo para *PLANESWALKERS*) y valor. Estas propiedades se inicializan en el constructor y son accesibles desde fuera de la clase. También cuenta con la **validación de atributos específicos** como lo son el poder y la resistencia para las *CRIATURAS*, o la lealtad para los *PLANESWALKERS*

```ts
/**
 * Constructor de la clase Card.
 * @param id El ID de la carta.
 * @param name El nombre de la carta.
 * @param mana El coste de mana de la carta.
 * @param cardColor El color de la carta.
 * @param cardType El tipo de la carta.
 * @param cardRarity La rareza de la carta.
 * @param rules Las reglas de la carta.
 * @param powerAndResistance El poder y resistencia de la carta (solo para criaturas).
 * @param loyalty La lealtad de la carta (solo para planeswalkers).
 * @param value El valor de la carta.
 */
constructor(
public id: number,
public name: string,
public mana: number,
public cardColor: CardColor,
public cardType: CardType,
public cardRarity: CardRarity,
public rules: string,
public powerAndResistance: [number, number] | null,
public loyalty: number | null,
public value: number,
) {
  this.id = id;
  this.name = name;
  this.mana = mana;
  this.cardColor = cardColor;
  this.cardType = cardType;
  this.cardRarity = cardRarity;
  if (this.cardType === CardType.CREATURE) {
    if (powerAndResistance === null) {
      throw new Error(
        "Una carta del tipo CRIATURA debe de tener asociada un atributo de fuerza/resistencia.",
      );
    }
    this.powerAndResistance = powerAndResistance;
  } else if (this.cardType === CardType.PLANESWALKER) {
    if (loyalty === null) {
      throw new Error(
        "Una carta del tipo PLANESWALKER debe de tener asociada un atributo de lealtad.",
      );
    }
    this.loyalty = loyalty;
  }
  this.value = value;
}
```

- **Método de representación de atributos**: la clase proporciona un método *attributes()* que devuelve una cadena con todas las características de la carta formateadas. Este método utiliza el paquete *chalk* para resaltar el color del texto en función del color de la carta.

```ts
/**
 * Método que devuelve una representación en cadena de las características de la carta.
 * @returns Una cadena que contiene las características de la carta.
 */
attributes(): string {
  let attributes = "Card Attributes:\n";
  attributes += `ID: ${this.id}\n`;
  attributes += `Name: ${this.name}\n`;
  attributes += `Mana: ${this.mana}\n`;
  attributes += `Color: `;
  switch (this.cardColor) {
    case CardColor.WHITE:
      attributes += chalk.white(this.cardColor) + "\n";
      break;
    case CardColor.BLUE:
      attributes += chalk.blue(this.cardColor) + "\n";
      break;
    case CardColor.BLACK:
      attributes += chalk.black(this.cardColor) + "\n";
      break;
    case CardColor.RED:
      attributes += chalk.red(this.cardColor) + "\n";
      break;
    case CardColor.GREEN:
      attributes += chalk.green(this.cardColor) + "\n";
      break;
    case CardColor.COLORLESS:
      attributes += chalk.gray(this.cardColor) + "\n";
      break;
    case CardColor.MULTICOLORED:
      attributes += chalk.yellow(this.cardColor) + "\n";
      break;
    default:
      attributes += this.cardColor + "\n";
  }
  attributes += `Type: ${this.cardType}\n`;
  attributes += `Rarity: ${this.cardRarity}\n`;
  attributes += `Rules: ${this.rules}\n`;
  if (this.powerAndResistance !== null)
    attributes += `Power: ${this.powerAndResistance[0]}, Resistance: ${this.powerAndResistance[1]}\n`;
  if (this.loyalty !== null) attributes += `Loyalty: ${this.loyalty}\n`;
  attributes += `Value: ${this.value}\n`;
  return attributes;
}
```

> **[Volver al índice](#índice)**

### Clase CardCollection

Esta clase representa una colección de cartas en el juego de Magic: The Gathering. 

Se optó por usar un mapa de cartas basado en su ID. Lo que permite un acceso más eficiente a las cartas y simplifica la lógica de algunos métodos, como la actualización y eliminación de cartas. En esta práctica para poder mantener el mensaje informativo sobre el estado de cada acción se ha implementado el **patron callback**.

Ejemplo de Uso del **Callback Pattern**
Uno de los cambios más significativos se introdujo en los métodos de interacción con la colección, como addCard(), updateCard(), removeCard(), listCards() y showCardInfo(). Estos métodos ahora aceptan callbacks como argumentos, lo que permite ejecutar acciones específicas después de completar una operación en la colección de cartas. Aunque este cambio ha dado problemas con la **serialización** y **deserialización** de objetos JSON, estos problemas lo comentaremos posteriormente.

```ts
/**
 * Añade una nueva carta a la colección.
 * @param newCard La nueva carta que se va a añadir.
 * @param callback Función de devolución de llamada que maneja el resultado de la operación.
 */
addCard(
  newCard: Card,
  callback: (successMessage: string, errorMessage: string | null) => void,
): void {
  if (this.cards.has(newCard.id)) {
    callback(
      "",
      chalk.red(`Error`) +
      `: Ya existe una carta con el mismo ID en la colección.`,
    );
  } else {
    this.cards.set(newCard.id, newCard);
    this.writeCards((message) => {
      if (message) {
        callback(
          `La carta ha sido ` +
          chalk.green(`añadida correctamente`) +
          ` a la colección.`,
          "",
        );
      } else {
        callback("", message);
      }
    });
  }
}
```

- **Interfaz pública**: La clase implementa una interfaz *CardCollectionInterface* que describe los métodos públicos que puede utilizar un usuario para interactuar con la colección de cartas. Estos métodos incluyen *addCard()*, *updateCard()*, *removeCard()*, *listCards()* y *showCardInfo()* que devuelven callbacks.

```ts
/**
 * Interfaz que describe los métodos públicos de la clase CardCollection.
 */
export interface CardCollectionInterface {
  /**
   * Añade una nueva carta a la colección.
   * @param newCard La nueva carta que se va a añadir.
   * @param callback Función de devolución de llamada que maneja el resultado de la operación.
   */
  addCard(
    newCard: Card,
    callback: (successMessage: string, errorMessage: string | null) => void,
  ): void;

  /**
   * Actualiza una carta en la colección.
   * @param modifiedCard La carta modificada que se va a actualizar.
   * @param callback Función de devolución de llamada que maneja el resultado de la operación.
   */
  updateCard(
    modifiedCard: Card,
    callback: (successMessage: string, errorMessage: string | null) => void,
  ): void;

  /**
   * Elimina una carta de la colección.
   * @param cardId El ID de la carta que se va a eliminar.
   * @param callback Función de devolución de llamada que maneja el resultado de la operación.
   */
  removeCard(
    cardId: number,
    callback: (successMessage: string, errorMessage: string | null) => void,
  ): void;

  /**
   * Devuelve una cadena con la lista de cartas en la colección.
   * @param callback Función de devolución de llamada que maneja el resultado de la operación.
   */
  listCards(
    callback: (cardList: string, errorMessage: string | null) => void,
  ): void;

  /**
   * Devuelve información detallada de una carta específica en la colección.
   * @param cardId El ID de la carta de la cual se quiere obtener la información.
   * @param callback Función de devolución de llamada que maneja el resultado de la operación.
   */
  showCardInfo(
    cardId: number,
    callback: (cardInfo: string, errorMessage: string | null) => void,
  ): void;
}
```

- **Constructor**: El constructor de *CardCollection* toma el nombre de usuario asociado a la colección y crea un mapa para almacenar las cartas. También inicializa la ruta del archivo de la colección y carga las cartas desde el archivo si existe.

```ts
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
 * @param callback Función de devolución de llamada que maneja el resultado de la operación.
 */
constructor(username: string, callback: (message: string | null) => void) {
  this.username = username;
  this.collectionPath = `./collections/${this.username}.json`;
  this.cards = new Map<number, Card>();

  if (!fs.existsSync(this.collectionPath)) {
    this.writeCards(callback);
  } else {
    this.loadCards(callback);
  }
}
```

- **Métodos de carga y escritura**: La clase tiene dos métodos *loadCards()* y *writeCards()* para cargar las cartas desde el archivo y escribir las cartas en el archivo, respectivamente. Estos métodos utilizan la **API asíncrona de Node.js** para trabajar con el sistema de archivos no como la anterior vez que se requería el uso de la API síncrona.

- **Métodos de interacción con la colección**: Los métodos *addCard()*, *updateCard()*, *removeCard()*, *listCards()* y *showCardInfo()* permiten al usuario **agregar**, **actualizar**, **eliminar**, **listar** y **ver** información detallada de las cartas en la colección. Si la función modifica algo de la colección se hace una llamada a *writeCards()* para guardar el estado de la colección en el .JSON.

> **[Volver al índice](#índice)**

## Problemas

La conexión con el servidor se ejecuta con normalidad, la ejecución del server no para cuando recibe los mensajes desde el cliente, pero por algún motivo es incapaz de escribir el fichero alojado en el repositorio collection, a pesar de que si que es capaz de crearlo si este no esta creado. Cuando se recibe el mensaje desde el servidor hasta el cliente, se obtiene un mensaje de error que creo que tiene que ver con la serialización del JSON. Ejemplo de ejecución del programa:

- Cliente:

```bash
[~/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-AlejandroJ22(main)]$node dist/src/client-server-magic/client.js add --user "ale" --id 1 --name "Black Lotus" --mana 0 --color "colorless" --type "Artifact" --rarity "mythic" --rules "T: Sacrifice Black Lotus: Add three mana of any one color to your mana pool." --value 20000
Conectado al servidor
Enviando mensaje al servidor.
Error parsing JSON: SyntaxError: Unexpected non-whitespace character after JSON at position 88 (line 1 column 89)
    at JSON.parse (<anonymous>)
    at Socket.<anonymous> (file:///home/usuario/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-AlejandroJ22/dist/src/client-server-magic/client.js:257:30)
    at Socket.emit (node:events:531:35)
    at endReadableNT (node:internal/streams/readable:1696:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)
Conexión cerrada
```

- Server:

```bash
[~/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-AlejandroJ22(main)]$node dist/src/client-server-magic/server.js
Esperando clientes.
Cliente conectado.
Mensaje recibido.
{
  user: 'ale',
  action: 'add',
  card: {
    id: 1,
    name: 'Black Lotus',
    mana: 0,
    cardColor: 'colorless',
    cardType: 'Artifact',
    cardRarity: 'mythic',
    rules: 'T: Sacrifice Black Lotus: Add three mana of any one color to your mana pool.',
    powerAndResistance: null,
    loyalty: null,
    value: 20000
  }
}
Un cliente se ha desconectado
```

> **[Volver al índice](#índice)**

## Ejercicio PE

El ejercicio consistía en aplicar el **patrón callback** a alguno de los métodos de la práctica 9, en mi caso elegí aplicar *callback pattern* al método add pero como mi método add utiliza un método auxiliar para escribir la modificación en el JSON pues tuve que aplicar el patrón callback en los dos. Que consigo aplicando este patrón, pues obtener una mejor manera de controlar el flujo de mi programa y poder envíar mejores mensajes de estados sobre lo que ha pasado con mi programa en ciertos puntos de la ejecución. El error que cometí y que me mostraron en la correción fue el de no usar una estructura (exito, error) que transferirle al callback, en su lugar solo usaba un mensaje lo que limitaba mi programa.

> **[Volver al índice](#índice)**

## Referencias

[Chalk](https://www.npmjs.com/package/chalk)
[Yargs](https://www.npmjs.com/package/yargs)
[Events](https://nodejs.org/docs/latest/api/events.html)
[fs](https://nodejs.org/docs/latest/api/fs.html)
[net](https://nodejs.org/docs/latest/api/net.html)