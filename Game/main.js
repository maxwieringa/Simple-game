//Variabelen die worden gebruikt
  var buffer, context, controller, rectangle, loop, size, map, drawmap;
buffer = document.createElement("canvas").getContext("2d");
//Het canvas wordt geselecteerd en de hoogte en breedte wordt veranderd
context = document.querySelector("canvas").getContext("2d");

buffer.canvas.height = 300;
buffer.canvas.width = 700;
context.canvas.height = 300;
context.canvas.width = 700;

//Het vierkant wat gebruikt word om te bewegen
rectangle = {

  height: 32,
  jumping: true,
  width: 32,
  x: 335, // center of the canvas
  x_velocity: 0,
  y: 0,
  y_velocity: 0

};

//Het controller object wordt gebruikt om te kijken welke knoppen ingedrukt worden
controller = {

  left: false,
  right: false,
  up: false,
  keyListener: function(event) {

    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {

      case 37: // left key
        controller.left = key_state;
        break;
      case 38: // up key
        controller.up = key_state;
        break;
      case 39: // right key
        controller.right = key_state;
        break;

    }

  }

};

//Deze loop loopt elke keer dat de browser de pagina opnieuw tekent (elke frame dus)
loop = function() {

  if (controller.up && rectangle.jumping == false) {

    rectangle.y_velocity -= 25;
    rectangle.jumping = true;

  }

  if (controller.left) {

    rectangle.x_velocity -= 0.5;

  }

  if (controller.right) {

    rectangle.x_velocity += 0.5;

  }

  rectangle.y_velocity += 1.5; // gravity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9; // friction
  rectangle.y_velocity *= 0.9; // friction

  // Wanneer het vierkant onder de lijn komt
  if (rectangle.y > 265 - 16 - 32) {

    rectangle.jumping = false;
    rectangle.y = 265 - 16 - 32;
    rectangle.y_velocity = 0;

  }

  // Als het vierkant links van het scherm gaat
  if (rectangle.x < -32) {

    rectangle.x = 732;

  } else if (rectangle.x > 732) { //Als het vierkant rechts van het scherm gaat

    rectangle.x = -32;

  }
  //achtergrond
  context.fillStyle = "#202020";
  context.fillRect(0, 0, 700, 300); // x, y, width, height
//Vierkant
  context.fillStyle = "#ff0000"
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height); //Het rode vierkant
  context.fill();
  //Lijn waar vierkant op staat
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 250);
  context.lineTo(700, 250);
  context.stroke();

  //Zegt dat de browser de loop functie moet uitvoeren elke frame
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
