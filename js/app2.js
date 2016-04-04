$(document).ready(function() {

    var $gameCells = $('.cell');
    var moves = ["", "", "", "", "", "", "", "", ""];
    var count = 0;
    var turn = 'X';
    var playerOneWin = 0;
    var playerTwoWin = 0;
    var tie = 0;
    var gameBoardOnOff = 0;

    $($gameCells).on('click', function() {
        console.log('This is suppose to be ' + this);
        placeMove(this, gameBoardOnOff);
    });

    $('#newGame').on('click', function() {
        location.reload();
    });

    $('#playAgain').on('click', function() {
        resetBoard();
    });

    //Place either "X" or "O" on the game board.
    function placeMove(this2, gameBoardOnOff) {
        if (gameBoardOnOff == 0) {
            console.log('Move was placed');
            console.log(this2.id);

            $(this2).html(turn).attr("style", "color: red; text-align: center; line-height:100px;")

            moves[this2.id] = turn;
            count++;
            turn = (turn == 'X') ? 'O' : 'X';

            displayStatus(turn);
            checkWin(moves, count);
            console.log(moves, count);
        } else if (gameBoardOnOff == 1) {
            console.log('Gameboard is off');
        }
    }

    //Check whether player "X" or "O" wins.
    function checkWin(move, count) {
        if ((move[0] == 'X' && move[1] == 'X' && move[2] == 'X') ||
            (move[3] == 'X' && move[4] == 'X' && move[5] == 'X') ||
            (move[6] == 'X' && move[7] == 'X' && move[8] == 'X') ||
            (move[0] == 'X' && move[3] == 'X' && move[6] == 'X') ||
            (move[1] == 'X' && move[4] == 'X' && move[7] == 'X') ||
            (move[2] == 'X' && move[5] == 'X' && move[8] == 'X') ||
            (move[0] == 'X' && move[4] == 'X' && move[8] == 'X') ||
            (move[2] == 'X' && move[4] == 'X' && move[6] == 'X')) {
            displayStatus(3);
            playerOneWin++;
            gameBoardOnOff = 1;
            updateScoreboard(1, playerOneWin);
        } else if ((move[0] == 'O' && move[1] == 'O' && move[2] == 'O') ||
            (move[3] == 'O' && move[4] == 'O' && move[5] == 'O') ||
            (move[6] == 'O' && move[7] == 'O' && move[8] == 'O') ||
            (move[0] == 'O' && move[3] == 'O' && move[6] == 'O') ||
            (move[1] == 'O' && move[4] == 'O' && move[7] == 'O') ||
            (move[2] == 'O' && move[5] == 'O' && move[8] == 'O') ||
            (move[0] == 'O' && move[4] == 'O' && move[8] == 'O') ||
            (move[2] == 'O' && move[4] == 'O' && move[6] == 'O')) {
            displayStatus(4);
            gameBoardOnOff = 1;
            playerTwoWin++;
            updateScoreboard(2, playerTwoWin);
        } else if (count == 9) {
            displayStatus(5);
            tie++;
            gameBoardOnOff = 1;
            updateScoreboard(3, tie);
        }
    }

    //Disable board after game is over.
    // function disableBoard() {
    //     console.log('Is disableBoard function called?');
    //     gameBoardOnOff = 1;
    // }

    //Reset board when user wants to play a another game.
    function resetBoard(num) {
        $($gameCells).removeAttr("style");
        $($gameCells).empty();
        moves = ["", "", "", "", "", "", "", "", ""];
        count = 0;
        turn = 'X';
        gameBoardOnOff = 0;
        displayStatus(6);
        console.log('Reset board is active: ' + turn);
        // placeMove(this, gameBoardOnOff);
    }

    //Update scoreboard
    function updateScoreboard(num, score) {
        if (num == 1) {
            $('#playerX').html('Player X : ' + score);
        } else if (num == 2) {
            $('#playerO').html('Player O : ' + score);
        } else if (num == 3) {
            $('#tie').html('Tie : ' + score);
        }
    }

    //Player can select mark (either "X" or "O")
    // function chooseMark() {
    //     var mark = prompt('Please choose your side! ("X" or "O")');

    //     if (mark == 'X') {
    //         mark = 'X';
    //         displayStatus(mark);
    //         return mark;
    //     } else if (mark == 'O') {
    //         mark = 'O';
    //         displayStatus(mark);
    //         return mark;
    //     } else {
    //         console.log('Wrong input! Please enter either "X" or "O". ')
    //         chooseMark();
    //     }
    // }

    //Display current turn on screen
    function displayStatus(turn2) {
        console.log('Is displayStatus function called?');
        if (turn2 == 'X') {
            $('#gameInfo').html('"X" turn');
        } else if (turn2 == 'O') {
            $('#gameInfo').html('"O" turn');
        } else if (turn2 == 3) {
            $('#gameInfo').html('"X" Wins!');
        } else if (turn2 == 4) {
            $('#gameInfo').html('"O" Wins!');
        } else if (turn2 == 5) {
            $('#gameInfo').html("It's a Tie");
        } else {
            $('#gameInfo').html("Let's Play! X turn.");
        }
    }

    //Choose game mode (PvP vs PvC)
    function gameMode() {
        var mode = prompt('Please choose your game mode! (PvP or PvC)');
    }


})







// (count % 2 == 0) ? moves[this.id] = "X": moves[this.id] = "O"
// moves[this.id] = (count % 2 ==0) ? 'X':'O'
