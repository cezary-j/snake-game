"use strict"

function Snake() {
    var divX = 50;
    var divY = 50;
    this.snakeLength = 5;
    var snakeBody = 2;
    this.snakeElements = [];
    this.autoMoveIntevalId = null;
    this.direction = 'up';
}

Snake.prototype.autoMove = function () {
    // this.autoMoveIntevalId = setInterval(function(){
    //     moveRight();
    // }, 1000);
}

Snake.prototype.begin = function () {
    var self = this;
    
    for (var i = 0; i < this.snakeLength; i++) {
        var div = document.createElement('div');
        this.snakeElements.push(div);
        div.className = 'snake';
        var board = document.querySelector('.board');
        board.appendChild(div);
        div.style.top = 50 + "%";
        div.style.left = 50 - [i] * 2 + "%"
    }

    document.addEventListener('keydown', function (event) {
        if (event.code === "ArrowRight") {
            self.direction = 'right';
        } else if (event.code === "ArrowLeft") {
            self.direction = 'left';
        } else if (event.code === "ArrowUp") {
            self.direction = 'up';
        } else if (event.code === "ArrowDown") {
            self.direction = 'down';
        }
    });

    this.autoMoveIntevalId = setInterval(function () {
        console.log(self.direction);
        if (self.direction === 'right') {
            self.moveRight();
        }
        if (self.direction === 'left') {
            self.moveLeft();
        }
        if (self.direction === 'up') {
            self.moveUp();
        }
        if (self.direction === 'down') {
            self.moveDown();
        }
    }, 500);
};

Snake.prototype.tail = function () {
    return this.snakeElements[this.snakeElements.length - 1];
};

Snake.prototype.moveRight = function () {
    var left = this.snakeElements[1].style.left;
    var tail = this.tail();

    var firstElementX = parseInt(this.snakeElements[0].style.left.replace('%', ''));
    var firstElementY = parseInt(this.snakeElements[0].style.top.replace('%', ''));
    if (firstElementX + 2 != left.split('%')[0]) {
        tail.style.left = firstElementX + 2 + "%";
        tail.style.top = firstElementY + "%";
        this.snakeElements.pop();
        this.snakeElements.unshift(tail);
    }
};

Snake.prototype.moveLeft = function () {
    var left = this.snakeElements[1].style.left;
    var tail = this.tail();

    var firstElementX = parseInt(this.snakeElements[0].style.left.replace('%', ''));
    var firstElementY = parseInt(this.snakeElements[0].style.top.replace('%', ''));
    if (firstElementX - 2 != left.split('%')[0]) {
        tail.style.left = firstElementX - 2 + "%";
        tail.style.top = firstElementY + "%";
        this.snakeElements.pop();
        this.snakeElements.unshift(tail);
    }
};
Snake.prototype.moveUp = function () {
    var top = this.snakeElements[1].style.top;
    var tail = this.tail();

    var firstElementX = parseInt(this.snakeElements[0].style.left.replace('%', ''));
    var firstElementY = parseInt(this.snakeElements[0].style.top.replace('%', ''));
    if (firstElementY - 2 != top.split('%')[0]) {
        tail.style.left = firstElementX + '%';
        tail.style.top = firstElementY - 2 + "%";
        this.snakeElements.pop();
        this.snakeElements.unshift(tail);
    }

};
Snake.prototype.moveDown = function () {
    var top = this.snakeElements[1].style.top;
    var tail = this.tail();

    var firstElementX = parseInt(this.snakeElements[0].style.left.replace('%', ''));
    var firstElementY = parseInt(this.snakeElements[0].style.top.replace('%', ''));
    if (firstElementY + 2 != top.split('%')[0]) {
        tail.style.left = firstElementX + '%';
        tail.style.top = firstElementY + 2 + "%";
        this.snakeElements.pop();
        this.snakeElements.unshift(tail);
    }
};