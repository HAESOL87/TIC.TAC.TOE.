$(document).ready(function() {

    var $gameCells = $('.cell');
    var moves = ["", "", "", "", "", "", "", "", ""];
    var count = 0;
    var turn = 'X';
    var playerXWin = 0;
    var playerOWin = 0;
    var tie = 0;
    var gameBoardOnOff = 0;
    var turnComputerOff = 0;
    var lockReset = 0;
    var selectGameMode;

    selectGameMode = gameMode();


    if (selectGameMode == 1) {
        $('body').attr("style", 'background-image: url("./css/circuit.jpg"); font-family: "Orbitron", sans-serif;');
        $('#playerO').html('COMPUTER');
        $("#playerO").append("<div id = scoreO>0</div>");
        displayStatus(turn);
    }

    if (selectGameMode == 2) {
        $('body').attr("style", 'background-image: url("./css/background.jpg"); font-family: "Montserrat", sans-serif;');
        displayStatus(turn);
    }

    $($gameCells).on('click', function() {
        if (selectGameMode == 1) {
            playHuman(this, gameBoardOnOff);
        }
        if (selectGameMode == 2) {
            placeMove(this, gameBoardOnOff);
        }
    });

    $('#newGame').on('click', function() {
        location.reload();
    });

    $('#playAgain').on('click', function() {
        resetBoard(lockReset);
    });

    //Place either "X" or "O" on the game board.
    function placeMove(this2, gameBoardOnOff2) {
        if (gameBoardOnOff2 == 0) {
            if (moves[this2.id] == 'X' || moves[this2.id] == 'O') {
                console.log('Position filled');
            } else {
                console.log('Move was placed');
                console.log(this2.id);

                $(this2).html(turn).attr("style", "color: lightblue; text-align: center; line-height:150px;");

                displayStatus(turn);
                moves[this2.id] = turn;
                count++;
                turn = (turn == 'X') ? 'O' : 'X';
                displayStatus(turn);
                checkWin(moves, count);
                console.log(moves, count);
            }
        } else if (gameBoardOnOff2 == 1) {
            console.log('Gameboard is off');
        }
    }

    //Place either "X" or "O" on the game board.
    function playHuman(this2, gameBoardOnOff2) {
        if (gameBoardOnOff2 == 0) {
            if (moves[this2.id] == 'X' || moves[this2.id] == 'O') {
                console.log('Position filled');
            } else {
                console.log('Human move was placed at ' + this2.id);

                $(this2).html(turn).attr("style", "color: lightblue; text-align: center; line-height:150px;");

                displayStatus(turn);
                moves[this2.id] = turn;
                count++;
                turn = (turn == 'X') ? 'O' : 'X';

                displayStatus(turn);
                checkWin(moves, count);
                console.log(moves, count);

                gameBoardOnOff = 1;
                setTimeout(function() {
                    if (turnComputerOff == 0) {
                        gameBoardOnOff = 0;
                        playComputer();
                    }
                }, 1500);
            }
        } else if (gameBoardOnOff2 == 1) {
            console.log('Gameboard is off');
        }
    }

    //Computer places move
    function playComputer() {
        var randomNum = Math.floor(Math.random() * 9);
        if (count != 9) {
            while (moves[randomNum] == 'X' || moves[randomNum] == 'O') {
                randomNum = Math.floor(Math.random() * 9);
            }
        }
        moves[randomNum] = turn;
        test = '#' + randomNum;

        console.log('Computer move is placed at ' + randomNum);

        $(test).html(turn).attr("style", "color: red; text-align: center; line-height:150px;")
        count++;
        displayStatus(turn);
        turn = (turn == 'X') ? 'O' : 'X';
        displayStatus(turn);
        console.log(moves, count);
        checkWin(moves, count);
    }

    //Check whether player "X" or "O" wins. Also, determine if it is a tie.
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
            playerXWin++;
            turnComputerOff = 1;
            gameBoardOnOff = 1;
            updateScoreboard(1, playerXWin);
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
            playerOWin++;
            updateScoreboard(2, playerOWin);
        } else if (count == 9) {
            displayStatus(5);
            tie++;
            turnComputerOff = 1;
            gameBoardOnOff = 1;
            updateScoreboard(3, tie);

        }
    }

    //Reset board when user wants to play a another game.
    function resetBoard(num) {
        if (num == 1) {
            $($gameCells).removeAttr("style");
            $($gameCells).empty();
            moves = ["", "", "", "", "", "", "", "", ""];
            count = 0;
            turn = 'X';
            gameBoardOnOff = 0;
            turnComputerOff = 0;
            lockReset = 0;
            displayStatus(turn);
        }
    }

    //Update scoreboard
    function updateScoreboard(num, score) {
        if (num == 1) {
            $('#scoreX').html(score);
        } else if (num == 2) {
            $('#scoreO').html(score);
        } else if (num == 3) {
            $('#scoreT').html(score);
        }
    }

    //Player can select mark (either "X" or "O")
    function chooseMark() {
        var mark = prompt('Please choose your side! ("X" or "O")');

        if (mark == 'X') {
            mark = 'X';
            displayStatus(mark);
            return mark;
        } else if (mark == 'O') {
            mark = 'O';
            displayStatus(mark);
            return mark;
        } else {
            console.log('Wrong input! Please enter either "X" or "O". ')
            chooseMark();
        }
    }

    //Display current turn on scoreboard
    function displayStatus(turn2) {
        if (turn2 == 'X') {
            $('#tie').attr("style", "opacity: 0.2;");
            $('#playerO').attr("style", "opacity: 0.2;");
            $('#playerX').attr("style", "opacity: 1;");
        } else if (turn2 == 'O') {
            $('#playerX').attr("style", "opacity: 0.2;");
            $('#tie').attr("style", "opacity: 0.2;");
            $('#playerO').attr("style", "opacity: 1;");
        } else if (turn2 == 3) {
            blink(1);
            $('#playerX').attr("style", "opacity: 1;");
            $('#tie').attr("style", "opacity: 1;");
            $('#playerO').attr("style", "opacity: 1;");
        } else if (turn2 == 4) {
            blink(2);
            $('#playerX').attr("style", "opacity: 1;");
            $('#tie').attr("style", "opacity: 1;");
            $('#playerO').attr("style", "opacity: 1;");
        } else if (turn2 == 5) {
            blink(3);
            $('#playerX').attr("style", "opacity: 1;");
            $('#tie').attr("style", "opacity: 1;");
            $('#playerO').attr("style", "opacity: 1;");
        }
    }

    //Make winner blink to indicate winner
    function blink(num) {
        var winner;
        if (num == 1) {
            winner = $('#playerX');
        } else if (num == 2) {
            winner = $('#playerO');
        } else if (num == 3) {
            winner = $('#tie');
        }

        var blink2 = setInterval(function() {
            if (winner.css('visibility') == 'hidden') {
                winner.css('visibility', 'visible');
            } else {
                winner.css('visibility', 'hidden');
            }
        }, 700);

        setTimeout(function() {
            clearInterval(blink2);
            lockReset = 1;
        }, 4500);
    }


    //Choose game mode (1 player vs 2 player)
    function gameMode() {
        var mode = prompt('Choose Game Mode\n  1. 1 Player\n  2. 2 Player');
       return mode;
    }


})
