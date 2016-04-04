$(document).ready(function() {

    var $gameCells = $('.cell');
    var moves = ["", "", "", "", "", "", "", "", ""];
    var count = 0;
    var turn = chooseMark();
    var playerOneWin = 0;
    var playerTwoWin = 0;
    var tie = 0;


    $($gameCells).on('click', function() {
        placeMove(this);
    });

    $('#newGame').on('click', function() {
        resetBoard();
    });

    //Place either "X" or "O" on the game board.
    function placeMove(this2) {
        console.log('Move was placed');
        console.log(this2.id);

        // var $square = $('#gameboard #0');

        $(this2).html(turn).attr("style", "color: red; text-align: center; line-height:100px;")

        moves[this2.id] = turn;
        count++;
        turn = (turn == 'X') ? 'O' : 'X';


        // if (count % 2 == 0){
        //   turn = 'X';
        // } else {
        //   turn = 'O';
        // }
        playerWho(turn);
        checkWin(moves, count);
        // (count % 2 == 0) ? moves[this.id] = "X": moves[this.id] = "O"
        //moves[this.id] = this.id;
        console.log(moves, count);
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
            window.alert('X wins!');
            playerOneWin++;
            disableBoard();
            updateScoreboard(1, playerOneWin);
        } else if ((move[0] == 'O' && move[1] == 'O' && move[2] == 'O') ||
            (move[3] == 'O' && move[4] == 'O' && move[5] == 'O') ||
            (move[6] == 'O' && move[7] == 'O' && move[8] == 'O') ||
            (move[0] == 'O' && move[3] == 'O' && move[6] == 'O') ||
            (move[1] == 'O' && move[4] == 'O' && move[7] == 'O') ||
            (move[2] == 'O' && move[5] == 'O' && move[8] == 'O') ||
            (move[0] == 'O' && move[4] == 'O' && move[8] == 'O') ||
            (move[2] == 'O' && move[4] == 'O' && move[6] == 'O')) {
            window.alert("O wins!");
            disableBoard();
            playerTwoWin++;
            updateScoreboard(2, playerTwoWin);
        } else if (count == 9) {
            window.alert("It's a tie!");
            tie++;
            disableBoard();
            updateScoreboard(3, tie);
        }
    }

    //Disable board after game is over.
    function disableBoard() {
        console.log('Is disableBoard function called?');
        playerWho('R');
       // $($gameCells).off("click");
        // $($gameCells).addClass('disabled');
      $($gameCells).on('click', function () { /* do something */ });

    }

    //Reset board when user wants to play a new game.
    function resetBoard() {
        // console.log('reset board is active');
        // $($gameCells).bind('click');
        // moves = ["", "", "", "", "", "", "", "", ""];
        // count = 0;
        // $('.cell').removeAttr("style");
        // $('.cell').empty();
        // chooseMark();
        location.reload();
    }

    function updateScoreboard(num, score) {
      if (num == 1) {
        $('#player1').html('Player 1 : ' + score);
      } else if (num == 2) {
        $('#player2').html('Player 2 : ' + score);
      } else if (num == 3) {
        $('#tie').html('Tie : ' + score);
      }

    }

    //Player can select mark (either "X" or "O")
    function chooseMark() {
        var mark = prompt('Please choose your side! ("X" or "O")');

        if (mark == 'X') {
            mark = 'X';
            playerWho(mark);
            return mark;
        } else if (mark == 'O') {
            mark = 'O';
            playerWho(mark);
            return mark;
        } else {
            console.log('Wrong input! Please enter either "X" or "O". ')
            chooseMark();
        }
    }

    //Display current turn on screen
    function playerWho(turn2) {
      console.log('Is playerWho function called?');
      if(turn2 == 'X') {
        $('#gameInfo').html('"X" turn');
      }
      else if(turn2 == 'O') {
        $('#gameInfo').html('"O" turn');
      }
      else {
        $('#gameInfo').html('Default');
      }
    }

    //Choose game mode (PvP vs PvC)
    function gameMode() {
      var mode = prompt('Please choose your game mode! (PvP or PvC)');
    }

    //




});







// (count % 2 == 0) ? moves[this.id] = "X": moves[this.id] = "O"
// moves[this.id] = (count % 2 ==0) ? 'X':'O'
