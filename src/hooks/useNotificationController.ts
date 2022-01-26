import { useCallback } from 'react'
import NotificationEmitterApi from '../services/NotificationEmitterApi'
import type { ModifiedEmitParam } from '../types'
import { useVariantsRendererContext } from '../core/VariantsRenderer'

export const useNotificationController = () => {
  const context = useVariantsRendererContext()

  const modify = useCallback(
    // Would be cool to have some type inference here in future
    <T>(id: string, { params }: Partial<Omit<ModifiedEmitParam<T>, 'id'>>) =>
      NotificationEmitterApi.modify({ id: id ?? context?.id ?? '', params }),
    [context?.id]
  )
  const remove = useCallback(
    (id?: string) => NotificationEmitterApi.remove(id ?? context?.id ?? ''),
    [context?.id]
  )

  return { remove, modify }
}
