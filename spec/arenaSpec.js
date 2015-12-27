var expect = chai.expect;
var moves = ['R','P','S'];
var player1 = new Player();


describe('arena.addPlayer()', function() {
  var arena = new Arena();
  it('should add a player to its array of players', function() {
    arena.addPlayer(player1);
    expect(arena.players).to.include(player1);
  });
});


