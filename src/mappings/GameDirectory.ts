import { GameCreated } from '../../generated/GameDirectory/GameDirectory'
import { Game as GameTemplate } from '../../generated/templates'

import { getOrCreateGame, getOrCreatePlayer } from '../utils/entities'

export function handleGameCreated(event: GameCreated): void {
  let gameAddress = event.params.game
  let hostAddress = event.params.host
  
  let game = getOrCreateGame(gameAddress)
  game.host = getOrCreatePlayer(hostAddress).id
  game.save()

  GameTemplate.create(gameAddress)
}