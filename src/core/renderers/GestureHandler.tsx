import React, { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import type { AnimationAPI } from '../hooks/useAnimationAPI'
import type { NotificationState } from '../hooks/useNotificationsStates'
import Animated from 'react-native-reanimated'
import { styles } from '../utils/styles'
import { Constants } from '../config'

type Props = {
  children: ReactNode
  state: Pick<
    NotificationState,
    | 'longPressHandlerRef'
    | 'panHandlerRef'
    | 'setNotificationHeight'
    | 'notificationOffset'
    | 'isPortrait'
    | 'notificationWidth'
  >
  animationAPI: Pick<AnimationAPI, 'dragGestureHandler' | 'handleDragStateChange' | 'dragStyles'>
  notificationTopPosition?: number
}

export const GestureHandler = ({
  children,
  state,
  animationAPI,
  notificationTopPosition,
}: Props) => {
  const { width } = useWindowDimensions()

  const getDefaultWidth = () => width - Constants.notificationSideMargin * 2

  const notificationWidthFromState = state?.notificationWidth
  const hasNotificationWidth = !!notificationWidthFromState

  const isWidthWithinBounds = hasNotificationWidth && notificationWidthFromState <= width

  const getMaxWidth = (): number => {
    if (hasNotificationWidth && notificationWidthFromState > width) {
      return getDefaultWidth()
    }
    return hasNotificationWidth ? notificationWidthFromState : Constants.maxNotificationWidth
  }

  let notificationWidth: number
  if (state.isPortrait) {
    notificationWidth = isWidthWithinBounds ? notificationWidthFromState : getDefaultWidth()
  } else {
    notificationWidth = getMaxWidth()
  }

  const top =
    notificationTopPosition || notificationTopPosition === 0
      ? notificationTopPosition
      : state.notificationOffset.top

  const left = state.notificationOffset.left

  const right = state.notificationOffset.right

  return (
    <PanGestureHandler
      ref={state.panHandlerRef}
      simultaneousHandlers={state.longPressHandlerRef}
      onGestureEvent={animationAPI.dragGestureHandler}
      onHandlerStateChange={animationAPI.handleDragStateChange}>
      <Animated.View
        onLayout={(e) => state.setNotificationHeight(e.nativeEvent.layout.height)}
        style={[
          animationAPI.dragStyles,
          styles.container,
          Constants.isAndroid ? styles.containerAndroid : styles.containerIos,
          {
            top,
            left,
            right,
            width: notificationWidth,
          },
        ]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  )
}
