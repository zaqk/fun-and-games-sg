import { Address } from '@graphprotocol/graph-ts'

import { Game } from '../../generated/schema'

import { Approval, Cashier, Transfer } from '../../generated/Cashier/Cashier'
import { ZERO_ADDRESS } from '../utils/constants'

import { getOrCreateGame, getOrCreatePlayer, getOrCreateSession } from '../utils/entities'

export function handleTransfer(event: Transfer): void {
  let from = event.params.from
  let to = event.params.to
  let amount = event.params.amount

  if (from === Address.zero()) { // mint

    let player = getOrCreatePlayer(to) 
    player.totalCredit = player.totalCredit.plus(amount)
    player.save()

  } else if (to === Address.zero()) { // burn

    let player = getOrCreatePlayer(from)
    player.totalCredit = player.totalCredit.minus(amount)
    player.save()

  }

}

export function handleApproval(event: Approval) {
  let owner = event.params.owner
  let spender = event.params.spender
  let amount = event.params.amount

  let game = Game.load(spender.toHexString())

  if (game === null) return; // not an approval we want to track

  game.totalApprovals = game.totalApprovals.plus(amount)
  game.save()

  let player = getOrCreatePlayer(owner)
  player.totalApprovals = player.totalApprovals.plus(amount)
  player.save()

  let session = getOrCreateSession(Address.fromHexString(game.id), owner)
  session.approved = session.approved.plus(amount)
  session.save()

}