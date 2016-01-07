function Arena(player1, player2) {

  this.totalRounds = 51;
  this.player1 = player1;
  this.player2 = player2;
  this.rounds = [];
  this.moves = ['R','P','S'];


  this.callRound = function() {
    var p1Move = player1.throwMove();
    var p2Move = player2.throwMove();

    player1.recordOpponentMove(p2Move);
    player2.recordOpponentMove(p1Move);
      
    var winner = this.smashWrapSnip({player1: p1Move, player2: p2Move});

    this.rounds.push({winner: winner, player1: p1Move, player2: p2Move});

    this.sumScore();

    return winner;

  };



  this.sumScore = function() {
      var player1Wins = 0;
      var player2Wins = 0;

    this.rounds.forEach(function(r) {
      switch(r.winner) {
        case player1.name:
          player1Wins++;
          break;
        case player2.name:
          player2Wins++;
          break;
      }
    });
    
    var winner = player1Wins > player2Wins ? player1.name : player2.name;

    return { winner: winner, player1: player1Wins, player2: player2Wins };

  };

  this.runMatch = function() {
    this.rounds = [];
    for(var i = 1; i < this.totalRounds; i++) {
      this.callRound();
    }
  };

  this.smashWrapSnip = function(round) {
    if(round.player1 == round.player2) {
      return "draw";
    }

    switch (round.player1) {
      case 'R':
        if(round.player2 == 'S') {
          return player1.name;
        } else if(round.player2 == 'P') {
          return player2.name;
        }
        break;

      case 'P':
        if(round.player2 == 'S') {
          return player2.name;
        } else if(round.player2 == 'R') {
          return player1.name;
        }
        break;

      case 'S':
        if(round.player2 == 'P') {
          return player1.name;
        } else if(round.player2 == 'R') {
          return player2.name;
        }
        break;
    }
  };
};
