"use strict"

function Snake() {
    var divX = 50;
    var divY = 50;
    this.snakeLength = 5;
    var snakeBody = 2;
    this.snakeElements = [];
    this.foodElements = [];
    this.autoMoveIntevalId = null;
    this.generateFoodIntevalId = null;
    this.direction = 'down';
    this.snakeSpeed = 500;
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
    }, this.snakeSpeed);

    this.generateFoodIntevalId = setInterval(function () {
        var leftFoodPos = Math.floor(Math.random() * 98);
        var topFoodPos = Math.floor(Math.random() * 98);
        // @TODO it must be even

        var forbiddenPos = false;

        // check if food can be here
        self.snakeElements.forEach(function (snakeElement, index) {
            console.log('Check if food willnot be in sake');
            if (
                leftFoodPos === parseInt(snakeElement.style.left.replace('%', ''))
                &&
                topFoodPos === parseInt(snakeElement.style.top.replace('%', ''))
            ){
                forbiddenPos = true;
            }
        });

        // @TODO
        // check if food new pos isnt in food old position
        /// some code here

        if(forbiddenPos){
            return; // no food will be placed if poiton is forbidde
            // @TODO it shoud random new postion again here
        }

        var div = document.createElement('div');
        self.foodElements.push(div);
        div.className = 'food';
        var board = document.querySelector('.board');
        div.style.top = topFoodPos + "%";
        div.style.left = leftFoodPos + "%";
        board.appendChild(div);

        console.log(self.foodElements);

    }, this.snakeSpeed * 3);
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
        if (this.checkIfIsInsideBoard(firstElementX + 2, firstElementY)) {
            this.dead();
            return;
        }
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
        if (this.checkIfIsInsideBoard(firstElementX + 2, firstElementY)) {
            this.dead();
            return;
        }
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
        if (this.checkIfIsInsideBoard(firstElementX + 2, firstElementY)) {
            this.dead();
            return;
        }
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
        if (this.checkIfIsInsideBoard(firstElementX + 2, firstElementY)) {
            this.dead();
            return;
        }
        tail.style.left = firstElementX + '%';
        tail.style.top = firstElementY + 2 + "%";
        this.snakeElements.pop();
        this.snakeElements.unshift(tail);
    }
};

Snake.prototype.checkIfIsInsideBoard = function (leftPos, topPos) {
    if (leftPos >= 100
        ||
        leftPos < 4
        ||
        topPos <= 0
        ||
        topPos >= 98
    ) {
        return true;
    }
    return false;
};

Snake.prototype.dead = function (leftPos, topPos) {
    clearInterval(this.autoMoveIntevalId);
    console.log('DEAD');
};
