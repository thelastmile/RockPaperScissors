function Arena(p1, p2) {

  this.totalRounds = 50;
  this.p1 = p1;
  this.p2 = p2;
  this.rounds = [];
  this.moves = ['R','P','S'];
  this.p1WinsMinusP2Wins = 0;


  this.callRound = function() {
    var s1 = p1.throwMove();
    var s2 = p2.throwMove();
    var winner = this.smashWrapSnip({p1: s1, p2: s2});

    this.rounds.push({w: winner, p1: s1, p2: s2});

    this.sumScore();

    return winner;

  };

  this.sumScore = function() {
      var p1Wins = 0;
      var p2Wins = 0;

    this.rounds.forEach(function(r) {
      switch(r.w) {
        case 1:
          p1Wins++
          break;
        case 2:
          p2Wins++
          break;
      }
    });

    this.p1WinsMinusP2Wins = p1Wins - p2Wins;
    return p1Wins - p2Wins;

  };

  this.runMatch = function() {

  };

  this.smashWrapSnip = function(round) {
    if(round.p1 == round.p2) {
      return 0;
    }

    switch (round.p1) {
      case 'R':
        if(round.p2 == 'S') {
          return 1
        } else if(round.p2 == 'P') {
          return 2
        }
        break;

      case 'P':
        if(round.p2 == 'S') {
          return 2;
        } else if(round.p2 == 'R') {
          return 1;
        }
        break;

      case 'S':
        if(round.p2 == 'P') {
          return 1;
        } else if(round.p2 == 'R') {
          return 2;
        }
        break;
    }
  };
};
