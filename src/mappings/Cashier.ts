import { BigInt } from '@graphprotocol/graph-ts'
import { Game } from '../../generated/schema'
import { Transfer } from '../../generated/Cashier/Cashier'

import { BIGINT_ZERO } from '../utils/constants'
import { getOrCreateSession } from '../utils/entities'

const ONE = BigInt.fromI32(1)

export function handleTransfer(event: Transfer): void {
  let from = event.params.from
  let to = event.params.to
  let amount = event.params.amount

  let toGame = Game.load(to.toHexString());
  let fromGame = Game.load(from.toHexString());

  // chips transfered from player to game
  if (toGame) {

    // session
    let session = getOrCreateSession(to, from)
    let isNewPlayer = session.credits === BIGINT_ZERO
    session.credits = session.credits.plus(amount)
    session.save()

    // game
    toGame.totalCredits = toGame.totalCredits.plus(amount)
    if (isNewPlayer) {
      toGame.playerCount = toGame.playerCount.plus(ONE)
    }
    toGame.save()

  // chips transfered from game to player
  } else if (fromGame) {

    // session
    let session = getOrCreateSession(from, to)
    session.credits = session.credits.minus(amount)
    session.save()

    // game
    let isPlayerLeaving = session.credits === BIGINT_ZERO
    fromGame.totalCredits = fromGame.totalCredits.minus(amount)
    if (isPlayerLeaving) {
      fromGame.playerCount = fromGame.playerCount.minus(ONE)
    }
    fromGame.save()

  }

}