import { Registed } from '../../generated/Account/Account'
import { getOrCreatePlayer } from '../utils/entities'

export function handleRegistration(event: Registed): void {
  let name = event.params.name
  let userAddress = event.params.user

  let player = getOrCreatePlayer(userAddress)
  player.name = name.toHexString()
  player.save()
}
