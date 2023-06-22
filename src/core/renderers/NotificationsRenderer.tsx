import React from 'react'
import { useNotificationEventHandler } from '../hooks/useNotificationEventHandler'
import { useNotificationsStates } from '../hooks/useNotificationsStates'
import { GestureHandler } from './GestureHandler'
import { AnimationRenderer } from './AnimationRenderer'
import { VariantsRenderer } from './VariantsRenderer'
import { useAnimationAPI } from '../hooks/useAnimationAPI'

type Props = {
  providerID?: string
}

export const NotificationsRenderer = ({ providerID }: Props) => {
  const { config, ...state } = useNotificationsStates()

  const animationAPI = useAnimationAPI(config)

  useNotificationEventHandler({ ...state, ...animationAPI, providerID })

  return (
    <GestureHandler state={state} animationAPI={animationAPI}>
      <AnimationRenderer state={state} animationAPI={animationAPI}>
        <VariantsRenderer config={config} notificationEvent={state.notificationEvent} />
      </AnimationRenderer>
    </GestureHandler>
  )
}
