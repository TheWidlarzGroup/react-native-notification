import { mergeStylesFunctions } from 'src/core/hooks/useAnimationAPI'
import { AnimationBuilder, FadeIn, MoveDownAnimation, MoveUpAnimation, RotateZIn } from 'src/core/utils/generateAnimationConfig'

describe('props merger tests', function () {
  it('should make an instance from class', () => {
    const MoveDown = new AnimationBuilder(MoveDownAnimation)

    expect(MoveDown).toMatchObject(MoveDownAnimation)
  })

  it('should merge styles properly with add method', () => {
    const MoveDown = new AnimationBuilder(MoveDownAnimation)
    const MoveDownFadeIn = FadeIn.add(MoveDown).transitionInStylesQueue
    const styles = mergeStylesFunctions(MoveDownFadeIn, { value: 1 })

    expect(styles).toMatchObject({
      opacity: 1,
      transform: [{ translateY: 0 }, { translateX: 0 }, {translateX: 0}, {translateY: 0}],
    })
  })
  it('should merge styles properly with add method outstyles', () => {
    const MoveUp = new AnimationBuilder(MoveUpAnimation)
    const MoveUpRotateZIn = RotateZIn.add(MoveUp).transitionOutStylesQueue
    const styles = mergeStylesFunctions(MoveUpRotateZIn, { value: 1 })

    expect(styles).toMatchObject({
      opacity: 1,
      transform: [{ translateY: 0 }, { translateX: 0 },{translateY:0}],
    })
  })
})
