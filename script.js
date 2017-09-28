"use strict"

var snake = new Snake();
snake.begin();
document.addEventListener('keydown', function (event) {
    if (event.code === "ArrowRight") {
        snake.moveRight();
    } else if (event.code === "ArrowLeft") {
        snake.moveLeft();
    } else if (event.code === "ArrowUp") {
        snake.moveUp();
    } else if (event.code === "ArrowDown") {
        snake.moveDown();
    }
});

