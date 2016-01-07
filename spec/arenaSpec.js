// initialize the chai expect function

var moves = ['R','P','S'];
var player1 = new Player();
var player2 = new Player();


describe('new Arena()', function() {

  var arena = new Arena(player1, player2);

  it('sets the player1 and player2 roles', function() {
    expect(arena.player1).to.eql(player1);
    expect(arena.player2).to.eql(player2);
  });

  it('has a default number of totalRounds', function() {
    expect(arena.totalRounds).to.be.greaterThan(1);
  });
});

describe('smashWrapSnip()', function() {
  var arena = new Arena(player1, player2);

  it('returns 0 if both players throw the same move', function() {
    expect(arena.smashWrapSnip({player1: 'R', player2: 'R'})).to.eql("draw");
    expect(arena.smashWrapSnip({player1: 'S', player2: 'S'})).to.eql("draw");
    expect(arena.smashWrapSnip({player1: 'P', player2: 'P'})).to.eql("draw");
  });


  it('returns 1 or 2 indicating the round winner', function() {
    expect(arena.smashWrapSnip({player1: 'R', player2: 'S'})).to.eql(player1.name);
    expect(arena.smashWrapSnip({player1: 'P', player2: 'S'})).to.eql(player2.name);
    expect(arena.smashWrapSnip({player1: 'P', player2: 'R'})).to.eql(player1.name);
    expect(arena.smashWrapSnip({player1: 'S', player2: 'P'})).to.eql(player1.name);
  });
});



describe('arena.callRound()', function() {
  var arena = new Arena(player1, player2);

  it('calls throwMove() on both players', function() {
    var spy1 = sinon.spy(player1, 'throwMove');
    var spy2 = sinon.spy(player2, 'throwMove');

    arena.callRound();

    expect(spy1).to.have.been.calledWith();
    expect(spy2).to.have.been.calledWith();

    player1.throwMove.restore();
    player2.throwMove.restore();
  });

  it('calls smashWrapSnip()', function() {
    var spy = sinon.spy(arena, "smashWrapSnip");
    arena.callRound();
    expect(spy).to.have.been.calledWith();
    arena.smashWrapSnip.restore();

  });

  it('returns the return value of smashWrapSnip', function() {
    var spy = sinon.stub(arena, 'smashWrapSnip', function() { return 2; });

    var result = arena.callRound();
    expect(result).to.eql(2);
    arena.smashWrapSnip.restore();

  });

  it('records both moves as an object in its rounds array', function() {
    var previous_moves = arena.rounds.length;
    arena.callRound();
    expect(arena.rounds.length).to.eql(previous_moves + 1);

    var lastRound = arena.rounds.pop(); 
    expect(lastRound.winner).to.be.a('string');
    expect([player1.name, player2.name, 'draw']).to.include(lastRound.winner);
  });

  it('calls recordOpponentMove() on both players', function() {
    var spy1 = sinon.spy(player1, 'recordOpponentMove');
    var spy2 = sinon.spy(player2, 'recordOpponentMove');

    arena.callRound();
    var last_round = arena.rounds.pop();
    expect(spy1).to.have.been.calledWith(last_round.player2);
    expect(spy2).to.have.been.calledWith(last_round.player1);

    player1.recordOpponentMove.restore();
    player2.recordOpponentMove.restore();
  });

  it('calls its sumScore() method', function() {
    var spy = sinon.spy(arena, 'sumScore');
    arena.callRound();
    expect(spy).to.have.been.calledWith();
    arena.sumScore.restore();
  });

});

describe('arena.sumScore()', function() {
  var arena = new Arena(player1, player2);
  

  // fake gameplay 
  //  4 wins for player1
  // 2 wins for player2 
  arena.rounds = [
    {winner: player1.name, player1: 'S', player2: 'P'},
    {winner: player1.name, player1: 'P', player2: 'R'},
    {winner: player1.name, player1: 'S', player2: 'P'},
    {winner: player1.name, player1: 'S', player2: 'P'},
    {winner: player2.name, player1: 'R', player2: 'P'},
    {winner: player2.name, player1: 'S', player2: 'W'}
  ];

  //stub smashWrapSnip so there are no ties

  it('returns an object with the current winner and scores', function() {
    console.log(arena.sumScore());
    expect(arena.sumScore()).to.equal({winner: player1.name, player1: 4, player2: 2});


    arena.rounds.push({winner: player1.name, player1: 'R', player2: 'S'});

    expect(arena.sumScore()).to.equal({winner: player1.name, player1: 5, player2: 2});
  });

  it('recalculates after each additional round', function() {

    var stub = sinon.stub(arena, 'smashWrapSnip', function() { return player1.name; });

    var currScore = arena.sumScore();

    arena.callRound();

    //note this works because the smashWrapSnip method is stubbed above
    currScore.player1 += 1;
    expect(arena.sumScore()).to.eql(currScore);

    arena.smashWrapSnip.restore();
  });


});

describe('arena.runMatch()', function() {
  var arena = new Arena(player1, player2);
  arena.totalRounds = 30;

  it('calls callRound() totalRounds times', function() {
    var spy = sinon.spy(arena, 'callRound');
    arena.runMatch();
    expect(spy.callCount).to.eql(arena.totalRounds);
    arena.callRound.restore();
  });

  it('saves as many rounds as totalRounds in gameplay', function() {
    arena.runMatch();
    expect(arena.rounds.length).to.eql(arena.totalRounds);
  });

  it('resets the rounds array back to 0', function() {
    arena.runMatch();
    arena.runMatch();
    expect(arena.rounds.length).to.eql(arena.totalRounds);
  });


  it('calls matchOver() when one player cannot possibly comeback', function() {

  });

});


