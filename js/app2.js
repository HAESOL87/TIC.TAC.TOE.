$(document).ready(function() {

    var $gameCells = $('.cell');
    var moves = ["", "", "", "", "", "", "", "", ""];
    var count = 0;

    var turn = chooseTurn();
    //var moves = Array(9).join(".").split(".");
    //console.log($gameCells);





    $($gameCells).on('click', function() {

        console.log(this.id);

        $(this).html(turn).attr("style", "color: red; text-align: center; line-height:100px;")

        moves[this.id] = turn;
        count++;
        turn = (turn == 'X') ? 'O' : 'X';
        placeMove();
        checkWin(moves);
        console.log(moves, count);
    });

    $('#newGame').on('click', function() {
        resetBoard();




    function placeMove() {
        console.log('Move was placed');
        // var mark = document.createElement('div');
        // console.log(square);

        // var newDiv = $("<div id = 'x'>'X'</div>");
        // square.append(newDiv);
    }

    //Check whether player "X" or "O" wins
    function checkWin(move) {
        if ((move[0] == 'X' && move[1] == 'X' && move[2] == 'X') ||
            (move[3] == 'X' && move[4] == 'X' && move[5] == 'X') ||
            (move[6] == 'X' && move[7] == 'X' && move[8] == 'X') ||
            (move[0] == 'X' && move[3] == 'X' && move[6] == 'X') ||
            (move[1] == 'X' && move[4] == 'X' && move[7] == 'X') ||
            (move[2] == 'X' && move[5] == 'X' && move[8] == 'X') ||
            (move[0] == 'X' && move[4] == 'X' && move[8] == 'X') ||
            (move[2] == 'X' && move[4] == 'X' && move[6] == 'X')) {
            window.alert('X wins!');
            disableBoard();
        }
        if ((move[0] == 'O' && move[1] == 'O' && move[2] == 'O') ||
            (move[3] == 'O' && move[4] == 'O' && move[5] == 'O') ||
            (move[6] == 'O' && move[7] == 'O' && move[8] == 'O') ||
            (move[0] == 'O' && move[3] == 'O' && move[6] == 'O') ||
            (move[1] == 'O' && move[4] == 'O' && move[7] == 'O') ||
            (move[2] == 'O' && move[5] == 'O' && move[8] == 'O') ||
            (move[0] == 'O' && move[4] == 'O' && move[8] == 'O') ||
            (move[2] == 'O' && move[4] == 'O' && move[6] == 'O')) {
            window.alert("O wins!");
            disableBoard();

        }
    }

    function disableBoard() {
        console.log('Is disableBoard function called?')
        $($gameCells).off("click");
    }

    function resetBoard() {
        // console.log('reset board is active');
        // // $($gameCells).on('click');
        // moves = ["", "", "", "", "", "", "", "", ""];
        // count = 0;
        // $('.cell').removeAttr("style");
        // $('.cell').empty();
        // chooseTurn();
        location.reload();
    }

    function chooseTurn() {
        var mark = prompt('Please choose your side! ("X" or "O")');

        if (mark == 'X') {
            mark = 'X';
            return mark;
        } else if (mark == 'O') {
            mark = 'O';
            return mark;
        } else {
            console.log('Wrong input! Please enter either "X" or "O". ')
            chooseTurn();
        }


    }









    // (count % 2 == 0) ? moves[this.id] = "X": moves[this.id] = "O"
    // moves[this.id] = (count % 2 ==0) ? 'X':'O'


});
