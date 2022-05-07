import { Address } from '@graphprotocol/graph-ts'

import { Game, Player, Session } from '../../generated/schema'



export function getOrCreateGame(id: Address): Game {
  let game = Game.load(id.toHexString())
  if (game === null) {
    game = new Game(id.toHexString())
  }
  return game
}

export function getOrCreatePlayer(id: Address): Player {
  let player = Player.load(id.toHexString())
  if (player === null) {
    player = new Player(id.toHexString())
  }
  return player
}

export function getOrCreateSession(
  gameAddress: Address, 
  playerAddress: Address
): Session {
  let id = `${gameAddress.toHexString()}-${playerAddress.toHexString()}`
  let session = Session.load(id)

  if (session === null) {
    session = new Session(id)
  }
  return session
}