const dbStructure = require('./db.structure');
const randomStringGenerator = require('randomstring');


class Database {
  constructor() {
    this.games = [];
    this.players = [];
  }

  getGame(gameId) {
    for(let game of this.games) {
      if(game.id ==gameId) {
        return Promise.resolve(game);
      }
    }

    return Promise.reject('Game not found');
  }

  getPlayer(playerId) {
    for(let player of this.players) {
      if(player.id ==playerId) {
        return Promise.resolve(player);
      }
    }

    return Promise.reject('Player not found');
  }

  get _id() {
    return randomStringGenerator.generate({length: 10, capitalization: 'lowercase'});
  }

  createGame() {
    let newProperties = {
      id: '12345',//this._id, // TODO
      status: 'waiting'
    };
    let newGame = Object.assign({}, dbStructure.game, newProperties);
    // TODO remove this, as it will always create a single game
    if(this.games.length) return Promise.resolve(this.games[0]);
    this.games.push(newGame);
    return Promise.resolve(newGame);
  }

  createPlayer(name) {
    let newProperties = {
      id: this._id,
      status: 'waiting',
      name
    };

    let newPlayer = Object.assign({}, dbStructure.gamplayere, newProperties);

    this.players.push(newPlayer);

    return Promise.resolve(newPlayer);
  }

  updateGame(game) {
    for(let i=0; i<this.games.length; ++i) {
      if(this.games[i].id == game.id) {
        this.games[i] = game;
        return Promise.resolve(game);
      }
    }

    return Promise.reject('Game not found');
  }

  updatePlayerById(playerId, updates) {
    for(let player of this.players) {
      if(player.id === playerId) {
        Object.assign(player, updates);
        return Promise.resolve(player);
      }
    }
    
    return Promise.reject('Player not found');
  }

  updateGameById(gameId, updates) {
    for(let game of this.games) {
      if(game.id === gameId) {
        Object.assign(game, updates);
        return Promise.resolve(game);
      }
    }

    return Promise.reject('Game not found');
  }
};

module.exports = new Database();