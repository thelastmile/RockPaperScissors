function Player() {

  this.name = "Hans" + Math.round(Math.random() * 100);

  this.moves = ['R','P','S'];

  this.throwMove = function() {
    //picks a random move
    var move = Math.round((Math.random() * 100) % 3);
    
    if (move == 0) {
      move += 1;
    }
    return this.moves[move-1];
  };

  this.recordOpponentMove = function(opponents_move) {
    if(this.moves.indexOf(opponents_move) > 0) {
      this.gameplay.push(opponents_move);
      return true;
    } else {
      return false;
    }
  }

  this.gameplay = [];

}

function PlayerHans() {
  return new Player();
};
