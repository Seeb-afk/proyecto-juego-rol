class Personaje {

  /**
   * @constructor
   * 
   * @description Valores predeterminados de todos los personajes
   * 
   * @param {string} nombre
   * @param {number} vida
   * @param {number} ataque 
   * @param {number} defensa 
   * @param {number} velocidad
   * @param {string} [estado="Normal"] 
   */
  constructor (nombre, vida, ataque, defensa, velocidad, estado = "Normal") {
    this.nombre = nombre;
    this.vida = vida;
    this.ataque = ataque;
    this.defensa = defensa;
    this.velocidad = velocidad;
    this.velParaTurnos = velocidad;
    this.estado = estado;
  }

  /**
   * @method atacar
   * 
   * @description Ataca con los puños
   * @param {object} objetivo - Define a quien se ataca 
   */
  atacar(objetivo) {

    let fuerzaAtaque = Math.round(Math.random() * this.ataque);
    let defensaObjetivo = Math.round(Math.random() * objetivo.defensa);

    let danio = Math.max(1, fuerzaAtaque - defensaObjetivo);
    objetivo.vida = Math.max(0, objetivo.vida - danio);
    
    console.log(`${this.nombre} atacó con los puños a ${objetivo.nombre}.`);
    console.log(`Realizó ${danio} punto(s) de daño, a ${objetivo.nombre} le quedan ${objetivo.vida} punto(s) de vida.`);
  }

  /**
   * @method saludar
   * 
   * @description Indica su nombre y clase
   */
  saludar() {

    console.log(`Hola, soy ${this.nombre} y mi clase es ${this.constructor.name}`);
  }

  /**
   * @method validarEstado
   * 
   * @description Verifica si esta envenenado
   */
  validarEstado() {

    if (this.estado == "Envenenado" && this.vida > 0) {
      let danioVeneno = 5;
      this.vida = Math.max(0, this.vida - danioVeneno);
      console.log(`${this.nombre} recibe ${danioVeneno} puntos de daño por envenenamiento. Le quedan ${this.vida} punto(s) de vida.`)
    }
  }

  /**
   * @method validarParalisis
   * 
   * @description Verifica si esta paralizado, si lo esta, pierde 1 turno de ataque
   * 
   * @returns Bool
   */
  validarParalisis() {
    if (this.estado === "Paralizado") {
      console.log(`${this.nombre} no puede moverse por la parálisis este turno.`);
      console.log(`${this.nombre} ha vuelto a la normalidad.`);
      this.estado = "Normal";
      return true;
    }
    return false;
  }
}

class Guerrero extends Personaje {

  /**
   * @constructor
   * 
   * @description Tiene un array de armas
   *  
   * @param {Array[{}]} [armas=[{}]] Debe tener nombre y daño
   */
  constructor (nombre, vida, ataque, defensa, velocidad, armas = []) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.armas = armas;
  }

  /**
   * @method ataqueConArma
   * 
   * @description escoge un arma al azar y ataca al objetivo
   * 
   * @param {object} objetivo - Personaje al que se ataca
   */
  ataqueConArma(objetivo) {

    let arma = this.armas[Math.floor(Math.random() * this.armas.length)];

    let fuerzaAtaque = Math.round(Math.random() * this.ataque);
    let defensaObjetivo = Math.round(Math.random() * objetivo.defensa);

    let danio = Math.max(1, (fuerzaAtaque + arma.danio) - defensaObjetivo);
    objetivo.vida = Math.max(0, objetivo.vida - danio);
    
    console.log(`${this.nombre} atacó con ${arma.nombre} a ${objetivo.nombre}.`)
    console.log(`Realizó ${danio} punto(s) de daño, a ${objetivo.nombre} le quedan ${objetivo.vida} punto(s) de vida.`);
  }

  /**
   * @method eleccionAtaque
   * 
   * @description escoge entre los metodos de ataque de la clase en la lista, para atacar a su objetivo
   */
  eleccionAtaque(objetivo) {

    const opciones = [
      () => this.atacar(objetivo),
      () => this.ataqueConArma(objetivo),
      () => this.ataqueConArma(objetivo)
    ]

    let eleccion = Math.floor(Math.random() * opciones.length);
    return opciones[eleccion]();
  }
}

class Mago extends Personaje {

  /**
   * @constructor
   * 
   * @description Tiene mana, hay que verificar si tiene suficiente para lanzar un hechizo
   * 
   * @param {number} mana 
   */
  constructor (nombre, vida, ataque, defensa, velocidad, mana) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.mana = mana;
  }

  /**
   * @method hechizoBolaDeFuego
   * 
   * @description Ataca al objetivo con el hechizo Bola de Fuego
   * 
   * @param {object} objetivo 
   */
  hechizoBolaDeFuego(objetivo) {

    if (this.mana < 3) {
      
      console.log(`${this.nombre} no tiene suficiente maná para usar el hechizo Bola de Fuego, asi que procede a usar los puños.`)
      return this.atacar(objetivo);
    }
    this.mana = Math.max(0, this.mana - 3);

    let fuerzaAtaque = Math.round(Math.random() * this.ataque);
    let defensaObjetivo = Math.round(Math.random() * objetivo.defensa);

    let danio = Math.max(1, (fuerzaAtaque + 10) - defensaObjetivo);
    objetivo.vida = Math.max(0, objetivo.vida - danio);

    console.log(`${this.nombre} atacó con el hechizo Bola de Fuego a ${objetivo.nombre}.`);
    console.log(`Realizó ${danio} punto(s) de daño, a ${objetivo.nombre} le quedan ${objetivo.vida} punto(s) de vida.`);
  }

  /**
   * @method hechizoRayo
   * 
   * @description Ataca al objetivo con el hechizo Rayo, y tambien puede paralizar
   * 
   * @param {object} objetivo 
   */
  hechizoRayo(objetivo) {

    if (this.mana < 5) {
      
      console.log(`${this.nombre} no tiene suficiente maná para usar el hechizo Rayo, asi que procede a usar los puños.`)
      return this.atacar(objetivo);
    }
    this.mana = Math.max(0, this.mana - 5);

    let fuerzaAtaque = Math.round(Math.random() * this.ataque);
    let defensaObjetivo = Math.round(Math.random() * objetivo.defensa);

    let danio = Math.max(1, (fuerzaAtaque + 15) - defensaObjetivo);
    objetivo.vida = Math.max(0, objetivo.vida - danio);

    console.log(`${this.nombre} atacó con el hechizo Rayo a ${objetivo.nombre}.`);
    console.log(`Realizó ${danio} punto(s) de daño, a ${objetivo.nombre} le quedan ${objetivo.vida} punto(s) de vida.`);

    if (Math.random() < 0.2 && objetivo.estado === "Normal") {
      objetivo.estado = "Paralizado";
      console.log(`${objetivo.nombre} ha sido paralizado, no podrá moverse en su siguiente acción.`)
    }
  }

  /**
   * @method eleccionAtaque
   * 
   * @description escoge entre los metodos de ataque de la clase en la lista, para atacar a su objetivo
   */
  eleccionAtaque(objetivo) {

    if (this.mana >= 5) {
      return Math.random() > 0.5 ? this.hechizoRayo(objetivo) : this.hechizoBolaDeFuego(objetivo);
    } else if (this.mana >= 3) {
      return this.hechizoBolaDeFuego(objetivo);
    } else {
      return this.atacar(objetivo);
    }
  }
}

class Arquero extends Personaje {

  /**
   * @constructor
   * 
   * @description Tiene un array de flechas
   * 
   * @param {Array[{}]} [flechas=[{}]] - Debe tener nombre y daño 
   */
  constructor (nombre, vida, ataque, defensa, velocidad, flechas = []) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.flechas = flechas;
  }

  /**
   * @method disparoConFlecha
   * 
   * @description Ataca al objetivo con una flecha, si no le quedan ataca con los puños
   * 
   * @param {object} objetivo 
   */
  disparoConFlecha(objetivo) {

    if (this.flechas.length == 0) {
      console.log(`A ${this.nombre} no le quedan flechas, asi que procede a usar los puños.`)
      return this.atacar(objetivo);
    }
    let indice = Math.floor(Math.random() * this.flechas.length)
    let flecha = this.flechas[indice];

    let fuerzaAtaque = Math.round(Math.random() * this.ataque);
    let defensaObjetivo = Math.round(Math.random() * objetivo.defensa);

    let danio = Math.max(1, (fuerzaAtaque + flecha.danio) - defensaObjetivo);
    objetivo.vida = Math.max(0, objetivo.vida - danio);

    console.log(`${this.nombre} atacó disparando con su arco la ${flecha.nombre} a ${objetivo.nombre}.`);
    console.log(`Realizó ${danio} punto(s) de daño, a ${objetivo.nombre} le quedan ${objetivo.vida} punto(s) de vida.`);
    
    flecha.cantidad--;
    if (flecha.cantidad === 0) {
      this.flechas.splice(indice, 1);
    }
  }

  /**
   * @method eleccionAtaque
   * 
   * @description escoge entre los metodos de ataque de la clase en la lista, para atacar a su objetivo
   */
  eleccionAtaque(objetivo) {

    if (this.flechas.length > 0) {
      return Math.random() < 0.8 ? this.disparoConFlecha(objetivo) : this.atacar(objetivo);
    } else {
      return this.atacar(objetivo);
    }
  }
}

class Clerigo extends Personaje {

  /**
   * @constructor
   * 
   * @description Tiene mana, hay que verificar si tiene suficiente para lanzar un hechizo o curarse
   * 
   * @param {number} mana
   * @var VidaMax - Para tener referencia de su vida maxima, para que no se cure por encima 
   */
  constructor (nombre, vida, ataque, defensa, velocidad, mana) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.mana = mana;
    this.vidaMax = vida;
  }

  /**
   * @method magiaPlegaria
   * 
   * @description Ataca al objetivo con el hechizo Plegaria
   * 
   * @param {object} objetivo 
   */
  magiaPlegaria(objetivo) {

    if (this.mana < 6) {
      
      console.log(`${this.nombre} no tiene suficiente maná para usar el hechizo Plegaria, asi que procede a usar los puños.`)
      return this.atacar(objetivo);
    }
    this.mana = Math.max(0, this.mana - 6);

    let fuerzaAtaque = Math.round(Math.random() * this.ataque);
    let defensaObjetivo = Math.round(Math.random() * objetivo.defensa);

    let danio = Math.max(1, (fuerzaAtaque + 14) - defensaObjetivo);
    objetivo.vida = Math.max(0, objetivo.vida - danio);

    console.log(`${this.nombre} atacó con el hechizo Plegaria a ${objetivo.nombre}.`);
    console.log(`Realizó ${danio} punto(s) de daño, a ${objetivo.nombre} le quedan ${objetivo.vida} punto(s) de vida.`);
  }

  /**
   * @method magiaCurar
   * 
   * @description Se cura a si mismo una cantidad determinada
   * 
   * @param {object} objetivo - En el caso de que no tenga maná, procede a usar atacar(objetivo)
   */
  magiaCurar(objetivo) {

    if (this.mana < 8) {
      console.log(`${this.nombre} no tiene suficiente maná para curarse, asi que procede a usar los puños.`)
      return this.atacar(objetivo);
    }
    this.mana = Math.max(0, this.mana - 8);

    let cantidadCuracion = Math.round(Math.random() * (this.vidaMax / 10)) + 1;
    this.vida = Math.min(this.vidaMax, this.vida + cantidadCuracion);

    console.log(`${this.nombre} ha usado Curación, recupera ${cantidadCuracion} punto(s) de vida`);
    console.log(`${this.nombre} ahora tiene ${this.vida} punto(s) de vida`);
  }

  /**
   * @method eleccionAtaque
   * 
   * @description escoge entre los metodos de ataque de la clase en la lista, para atacar a su objetivo
   */
  eleccionAtaque(objetivo) {

    if ((this.vida <= this.vidaMax * 0.35) && this.mana >= 8) {
      return Math.random() < 0.8 ? this.magiaCurar(objetivo) : this.magiaPlegaria(objetivo);
    } else if (this.mana >= 6) {
      return Math.random() < 0.8 ? this.magiaPlegaria(objetivo) : this.atacar(objetivo);
    } else {
      return this.atacar(objetivo);
    }
  }
}

class Picaro extends Personaje {

  /**
   * @constructor
   * 
   * @description Tiene un array de dagas
   * 
   * @param {Array[{}]} [dagas=[{}]] Debe tener nombre y daño
   */
  constructor (nombre, vida, ataque, defensa, velocidad, dagas = []) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.dagas = dagas;
  }

  /**
   * @function ataqueConDaga
   * 
   * @description Escoge una daga al azar para atacar
   * 
   * @param {object} objetivo 
   */
  ataqueConDaga(objetivo) {

    let daga = this.dagas[Math.floor(Math.random() * this.dagas.length)]

    let fuerzaAtaque = Math.round(Math.random() * this.ataque);
    let defensaObjetivo = Math.round(Math.random() * objetivo.defensa);
    
    let esCritico = false
    let danio = 0

    if (daga.estado == "Critico" && Math.random() < 0.2) {
      esCritico = true
      danio = Math.round(Math.max(1, fuerzaAtaque + daga.danio) * 1.5);
    } else {
      danio = Math.max(1, (fuerzaAtaque + daga.danio) - defensaObjetivo);
    }
    objetivo.vida = Math.max(0, objetivo.vida - danio);

    console.log(`${this.nombre} atacó con ${daga.nombre} a ${objetivo.nombre}.`);
    console.log(`Realizó ${danio} punto(s) de daño, a ${objetivo.nombre} le quedan ${objetivo.vida} punto(s) de vida.`);
    if (esCritico) {
      console.log(`¡Fue un golpe critico!`)
    } 
    
    if (Math.random() < 0.3 && objetivo.estado === "Normal" && daga.estado === "Envenenado") {
      objetivo.estado = "Envenenado";
      console.log(`${objetivo.nombre} ha sido envenenado.`);
    }
  }

  /**
   * @method eleccionAtaque
   * 
   * @description escoge entre los metodos de ataque de la clase en la lista, para atacar a su objetivo
   */
  eleccionAtaque(objetivo) {
    return Math.random() < 0.7 ? this.ataqueConDaga(objetivo) : this.atacar(objetivo);
  }
}

// Guerrero
const Pepe = new Guerrero("Pepe", 130, 14, 10, 10, [
  { nombre: "Hacha de Batalla", danio: 10 },
  { nombre: "Espada Larga", danio: 8 }
]);

const Thomas = new Guerrero("Thomas", 115, 13, 9, 11, [
  { nombre: "Mandoble Pesado", danio: 12 },
  { nombre: "Maza de Guerra", danio: 9 }
]);

// Mago
const Ignis = new Mago("Ignis", 70, 20, 6, 13, 85);

const Valeria = new Mago("Valeria", 85, 18, 7, 12, 90);

// Arquero
const Sylvan = new Arquero("Sylvan", 100, 22, 8, 18, [
  { nombre: "Flecha de Caza", danio: 9, cantidad: 5 },
  { nombre: "Flecha Perforante", danio: 12, cantidad: 4 },
  { nombre: "Flecha explosiva", danio: 15, cantidad: 2 }
]);

// Clérigo
const Eldrin = new Clerigo("Eldrin", 120, 16, 8, 8, 85);

// Pícaro
const Shadow = new Picaro("Shadow", 85, 22, 7, 19, [
  { nombre: "Daga Envenenada", danio: 9, estado: "Envenenado" },
  { nombre: "Estilete Sombra", danio: 8, estado: "Critico" }
]);

// Lista de peleadores
const listaCombatientes = [
  Pepe,
  Thomas,
  Ignis,
  Valeria,
  Sylvan,
  Eldrin,
  Shadow
]

/**
 * @function hello
 * 
 * @description Recibe un array de guerreros, estos dan el saludo diciendo su nombre y clase
 * 
 * @param {Array} combatientes 
 */
function hello(combatientes) {
  for (let peleador of combatientes) {
    peleador.saludar();
  };
}

/* Esto lo hizo mayormente la IA
function play(combatientes) {
  hello(combatientes);

  let contador = 1;
  while (combatientes.length > 1) {
    console.log(`\nRonda ${contador}\n`)
    
    let ordenTurno = combatientes.toSorted((combatienteA, combatienteB) => combatienteB.velocidad - combatienteA.velocidad);
    for (let peleador of ordenTurno) {

      if (peleador.vida <= 0) continue;
      let filtrarVivos = ordenTurno.filter(p => p.vida > 0 && p !== peleador);
      if (filtrarVivos.length == 0) break;

      let posibleObjetivo = filtrarVivos[Math.floor(Math.random() * filtrarVivos.length)]
      
      peleador.eleccionAtaque(posibleObjetivo);
      if (posibleObjetivo.vida == 0) {
        console.log(`El ${posibleObjetivo.constructor.name} ${posibleObjetivo.nombre} ha sido derrotado.`);
      }
      peleador.validarEstado();
    }

    combatientes = combatientes.filter(c => c.vida > 0);
    contador++;
  }
  
  if (combatientes.length == 1) {
    console.log(`\nEl ganador es el ${combatientes[0].constructor.name} ${combatientes[0].nombre}`);
  } else {
    console.log("Todos los combatientes han sido derrotados");
  }
}
*/

/**
 * @function alternative
 * 
 * @description (Mi propia version de como calcular las velocidades) - Funcion para iniciar y ejecutar el juego.
 * 
 * @param {Array} combatientes - lista de objetos
 */
function alternative(combatientes) {
  hello(combatientes);

  let contador = 1
  while (combatientes.length > 1) {
    console.log(`\nRonda ${contador}\n`);
    
    // Modifica el atributo velParaTurnos en base a velocidad
    combatientes.forEach(c => c.velParaTurnos = Math.round(Math.random() * c.velocidad));
    combatientes.sort((combatienteA, combatienteB) => combatienteB.velParaTurnos - combatienteA.velParaTurnos)

    for (let pj of combatientes) {
      if (pj.vida <= 0) continue;
      if (pj.validarParalisis()) continue;

      // Determinar el objetivo
      let listaPosibleObjetivo = combatientes.filter(p => p.vida > 0 && p !== pj);
      if (listaPosibleObjetivo.length == 0) break;
      let atacado = listaPosibleObjetivo[Math.floor(Math.random() * listaPosibleObjetivo.length)];


      //Ejecutar accion y validar envenenamiento
      pj.eleccionAtaque(atacado);
      if (atacado.vida <= 0) {
        console.log(`El ${atacado.constructor.name} ${atacado.nombre} ha sido derrotado.`)
      }
      pj.validarEstado();
      if (pj.vida === 0) {
        console.log(`El ${pj.constructor.name} ${pj.nombre} ha sucumbido al veneno y ha sido derrotado.`);
      }
    }
    
    combatientes = combatientes.filter(c => c.vida > 0);
    contador++;
  }

  if (combatientes.length == 1) {
    console.log(`\nEl ganador es el ${combatientes[0].constructor.name} ${combatientes[0].nombre}.`);
  } else {
    console.log("\nTodos los combatientes han sido derrotados.");
  }
}

alternative(listaCombatientes);