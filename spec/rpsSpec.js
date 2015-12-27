// Player Specs!
//

var expect = chai.expect;
var moves = ['R','P','S'];
var player1 = new Player();

describe('player.throwMove()', function() {

  it('should return only the strings "R", "P" or "S"', function() {
    expect(moves).to.include(player1.throwMove());
    expect(moves).to.include(player1.throwMove());
    expect(moves).to.include(player1.throwMove());
  });
});


describe('player.recordOpponentMove()', function() {
  it('should take the opponents move as its argument', function() {
    player1.recordOpponentMove('R');
  });

  it('returns true if passed a valid move (R,P,S)', function() {
    expect(player1.recordOpponentMove('S')).to.equal(true);
  });

  it('returns false if passed an invalid move (X,Y,3,argh)', function() {
    expect(player1.recordOpponentMove(34)).to.eql(false);
  });
});



