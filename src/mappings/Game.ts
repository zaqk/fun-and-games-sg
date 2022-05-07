import { AdminUpdated } from '../../generated/templates/Game/Game'

import { getOrCreateSession } from '../utils/entities'

export function handleAdminUpdated(event: AdminUpdated): void {
  let gameAddress = event.address
  let updatedAddress = event.params.admin
  let isAdded = event.params.isAdded

  let session = getOrCreateSession(gameAddress, updatedAddress)
  session.isAdmin = isAdded
  session.save()
}