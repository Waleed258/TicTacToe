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
let count = 0;
let win= false;
let draw = false;
let winners = [];
let xWon = false;
let oWon = false;

$('.cell').click( function() {
    let id = parseInt($(this).attr("id").split('-')[1]);
    if(win || draw)
    {
        return;
    }
    console.log(id)
    console.log(options[id]);
    if(options[id]==="") {
        if(turn) {
            $(this).text('X');
            options[id] = 'X';
            count++;
            turn=false;
        }
        else {
            $(this).text('O');
            options[id] = 'O';
            count++;
            turn = true;
        }
        
            checkWin();
            checkDraw();
        
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
    draw=false;
    count = 0;
    $('#out-come-box').hide();
    xWon = false;
    oWon = false;
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
                xWon=true;
                result();
                return true;
            }
            else {
                player2Score++;
                $('#player2-score').text(player2Score);
                oWon=true;
                result();
                return true;
            }
        }
    });
}
function checkDraw() {
    if(count===9 && !win) {
        draw=true;
        result();
        return true;
    }
}
function result() {
    if(win || draw)
    {  $('#out-come-box').show();
        if(xWon)
        {
            $('#out-come').text("Player 1 Won!");
        }
        else if(oWon)
        {
            $('#out-come').text("Player 2 Won!");
        }
        else
        {
            $('#out-come').text("Its a Draw");
        }
    }
}