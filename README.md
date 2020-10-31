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
