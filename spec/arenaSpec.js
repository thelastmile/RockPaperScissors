// initialize the chai expect function

var moves = ['R','P','S'];
var player1 = new Player();
var player2 = new Player();


describe('new Arena()', function() {

  var arena = new Arena(player1, player2);

  it('sets the p1 and p2 roles', function() {
    expect(arena.p1).to.eql(player1);
    expect(arena.p2).to.eql(player2);
  });

  it('has a default number of totalRounds', function() {
    expect(arena.totalRounds).to.be.greaterThan(1);
  });
});

describe('smashWrapSnip()', function() {
  var arena = new Arena(player1, player2);

  it('returns 0 if both players throw the same move', function() {
    expect(arena.smashWrapSnip({p1: 'R', p2: 'R'})).to.eql(0);
  });


  it('returns 1 or 2 indicating the round winner', function() {
    expect(arena.smashWrapSnip({p1: 'R', p2: 'S'})).to.eql(1);
    expect(arena.smashWrapSnip({p1: 'P', p2: 'S'})).to.eql(2);
    expect(arena.smashWrapSnip({p1: 'P', p2: 'R'})).to.eql(1);
    expect(arena.smashWrapSnip({p1: 'S', p2: 'P'})).to.eql(1);
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
  //  4 wins for p1
  // 2 wins for p2 
  arena.rounds = [
    {w: 1, p1: 'S', p2: 'P'},
    {w: 1, p1: 'P', p2: 'R'},
    {w: 1, p1: 'S', p2: 'P'},
    {w: 1, p1: 'S', p2: 'P'},
    {w: 2, p1: 'R', p2: 'P'},
    {w: 2, p1: 'S', p2: 'W'}
  ];

  //stub smashWrapSnip so there are no ties

  it('returns p1 wins minus p2 wins. p2 is winning if result is negative', function() {
    expect(arena.sumScore()).to.eql(2);
    expect(arena.p1WinsMinusP2Wins).to.eql(2);
  });

  it('recalculates after each additional round', function() {

    var stub = sinon.stub(arena, 'smashWrapSnip', function() { return 1; });
    var currScore = arena.sumScore();
    arena.callRound();
    //note this works because the smashWrapSnip method is stubbed above
    expect(arena.sumScore()).to.eql(currScore + 1);
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
  });

  it('calls matchOver() when one player cannot possibly comeback', function() {

  });


  it('potentially calls as many rounds as specified by arena.totalRounds', function() {

  });

});


