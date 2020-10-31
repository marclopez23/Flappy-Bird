# Flappy-Bird

## Descripción

Flappy Bird es un juego lanzado en el año 2013 creado por Nguyen Hà Đông (Dong Nguyen). En su lanzamiento se convirtió en todo un éxito siendo número uno en las distintas tiendas de Apps. 

Casi un año más tarde de su lanzamiento, su creador elimino el juego de las stores porque estaba creando una adicción muy grande a sus jugadores.

Como curiosidad la gente llego a vender en [Ebay](https://www.europapress.es/portaltic/gadgets/noticia-ebay-cancela-subastas-iphones-flappy-bird-instalado-20140211122008.html) teléfonos con el juego instalado hasta que la plataforma de venta los retiro.

## MVP (DOM - CANVAS)

Este juego consiste en pasar entre las distintas tuberías con nuestro personaje, cuantas más pasemos más puntos tendremos. Pero cuidado porque a medida que pase el tiempo las tuberías se acercaran más rápido.

Si nos chocamos con una tubería perderemos una vida y volveremos a empezar.

El juego termina cuando el jugador se queda sin vidas.

## Data Structure

1. index.html
2. main.js
3. game.js
4. pipes.js
5. player.js
6. style.css

### 1. Index.html

Todo el contenido del HTML

### 2. Main.js

- Inicio del juego
- Añadir los eventListeners
- Control de las distintas pantallas del juego
- Control del movimiento del player
- Parar el juego

### 3. Game.js

- Creación del jugador
- Creación de les pipes
- Limpiar y actualizar el canvas
- Comprobar si hay una colisión
- Comprobar si se tiene que acabar el juego
- Control de la velocidad de les tuberias
- Control del tiempo de la partida

### 4. Pipes.js

- Crear los metodos para:
    - Pintar las tuberias
    - Mover las tuberias
    - Modificar su velocidad de movimiento

### 5. Player.js

- Crear los metodos para:
    - Pintar al pesonaje
    - Mover al personaje
    - Comprobar si se ha chocado
    - Restar las vidas

### 6. Style.css

Todo el contenido de CSS

## Pantallas del juego

### Pantalla de inicio

- Empieza el juego
- Cuando se clique el botón de empezar el juego se pasará a la pantalla de juego

### Pantalla de juego

- El juego estará activo siempre y cuando el usuario tenga vidas. (en el caso del MVP siempre són 1)
- Cuando el usuario se queda sin vidas el juego pasa a la pantalla de Game Over.
- Si el jugador se choca con una tuberia, el jugador vuelve al principio y se le quita una vida.
- Se suman puntos cada vez que se pasa una pipe

### Pantalla de Game Over

- Se muestra la puntuación final
- Se muestra la mejor puntuación
- Se puede volver a empezar
- Cuando el usuario hace clic en restart se vuelve a empezar el juego.

## Tareas

- Crear la repo en Github.
- Crear los archivos y enlazarlos entre ellos.
- Main.js
    - Crear las distintas pantallas
    - Crear la forma de pasar entre pantallas.
    - Crear la forma de iniciar y parar el juego.
- Player.js
    - Crear el player
    - Crear los métodos del player
- Pipes.js
    - Crear las pipes
    - Crear los distintos métodos de las pipes.
- Game.js
    - Pintar el jugador y las tuberias.
    - Mover el jugador y las tuberias,
    - Comprobar las colisiones
    - Limpiar y actualizar el canvas
    - Comprobar si hay una colisión
    - Comprobar si se tiene que acabar el juego
    - Control de la velocidad de les tuberias

## Backlog

- Crear pantalla de puntuaciones
- Añadir bonus
    - Vida extra
    - Ralentizar el movimiento de las pipes
- Añadir sonidos
    - Poder mutearlos
- Dark Mode
- Selección del personaje
- Animar el fondo
- Pasar el CSS a SASS

