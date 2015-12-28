function Player() {
  this.moves = ['R','P','S'];

  this.throwMove = function() {
    return 'R';
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
