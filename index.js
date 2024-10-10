const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];
let options = new Array(9).fill(""); 
let player1Score = 0;
let player2Score = 0;
let turn = true;
let win = false;
let winners = [];

$('.cell').click( function() {
    let id = parseInt($(this).attr("id").split('-')[1]);
    if(win)
    {
        return;
    }
    console.log(id)
    console.log(options[id]);
    if(options[id]==="") {
        if(turn) {
            $(this).text('X');
            options[id] = 'X';
            turn=false;
        }
        else {
            $(this).text('O');
            options[id] = 'O';
            turn = true;
        }
        checkWin();
    }
});
$('.restart-btn').click( () => {
    $('.cell').text("");
    options = new Array(9).fill("");
    winners.forEach(i => {
        $(`#cell-${i}`).removeClass('winner');
    });
    winners = [];
    win=false;
});
function checkWin() {
    winningCombinations.forEach(array => {
        if (options[array[0]] === options[array[1]] && options[array[1]] === options[array[2]] && options[array[0]] !== "")
        {   console.log(array[0]);
           
            win = true;
            console.log("won");
            array.forEach(i => {
                winners.push(i);
                $(`#cell-${i}`).addClass('winner');

            });
            console.log(winners);
            if(options[array[0]] === 'X') {
                player1Score++;
                $('#player1-score').text(player1Score);
            }
            else {
                player2Score++;
                $('#player2-score').text(player2Score);
            }
        }
    });
}