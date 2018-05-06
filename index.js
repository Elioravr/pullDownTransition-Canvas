const runTransition = () => {
  const CANVAS_WIDTH = 1024
  const CANVAS_HEIGHT = 576
  const HAND_IMAGE_WIDTH = 707
  const HAND_IMAGE_BEFORE_GRABBING_HEIGHT = 270
  const HAND_IMAGE_AFTER_GRABBING_HEIGHT = 400
  const HAND_ENTER_START_ANGLE = -30
  const HAND_ENTER_END_ANGLE = 0
  const ROPE_ENTER_START_ANGLE = 20
  const ROPE_ENTER_REPLACEMENT_ANGLE = 70
  const ROPE_ENTER_END_ANGLE = 90
  const ROPE_IMAGE_WIDTH = 1800
  const ROPE_BEFORE_FALLING_HEIGHT = 200
  const ROPE_AFTER_FALLING_HEIGHT = 100
  const ROPE_AFTER_GRABBING_SOURCE_X = 120
  const HAND_AFTER_GRABBING_SOURCE_X = 40
  const HAND_AFTER_GRABBING_SOURCE_Y = HAND_IMAGE_BEFORE_GRABBING_HEIGHT
  const HAND_COVERING_PART_SOURCE_X = 0
  const HAND_COVERING_PART_SOURCE_Y = HAND_AFTER_GRABBING_SOURCE_Y
  const HAND_AFTER_GRABBING_Y_OFFSET_FROM_GRABBING_HAND = 50
  const HAND_COVERING_PART_WIDTH = HAND_AFTER_GRABBING_Y_OFFSET_FROM_GRABBING_HAND
  const HAND_FIRST_POSITION_Y = 100
  const BEFORE_PULLING_DOWN_OFFSET = 50
  const HAND_CATCHING_ROPE_OFFSET_X = 52
  const HAND_CATCHING_ROPE_OFFSET_Y = 58
  const HAND_COVERING_PART_CATCHING_ROPE_OFFSET_Y = 80

  const initTransition = () => {
    const canvas = document.getElementById('canvas')
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    const ctx = canvas.getContext('2d')

    // Setting the image of hand before grabbing
    const handSpriteImage = new Image()
    handSpriteImage.src = './images/hand-sprite.png'

    const ropeSpriteImage = new Image()
    ropeSpriteImage.src = './images/rope-sprite.png'

    const ropeBeforeFalling = {
      xpos: CANVAS_WIDTH / 2 - BEFORE_PULLING_DOWN_OFFSET,
      ypos: 0,
      rotation: getRadianDegree(ROPE_ENTER_START_ANGLE),
      opacity: 1
    }

    const ropeAfterFalling = {
      xpos: CANVAS_WIDTH / 2 - BEFORE_PULLING_DOWN_OFFSET,
      ypos: -HAND_COVERING_PART_WIDTH / 2,
      rotation: getRadianDegree(ROPE_ENTER_REPLACEMENT_ANGLE),
      opacity: 0
    }

    const handBeforeGrabbing = {
      xpos: CANVAS_WIDTH,
      ypos: CANVAS_HEIGHT,
      rotation: getRadianDegree(HAND_ENTER_START_ANGLE),
      opacity: 1
    }

    const handAfterGrabbing = {
      xpos: CANVAS_WIDTH - HAND_IMAGE_WIDTH + HAND_AFTER_GRABBING_SOURCE_X + HAND_CATCHING_ROPE_OFFSET_X,
      ypos: HAND_FIRST_POSITION_Y + HAND_AFTER_GRABBING_Y_OFFSET_FROM_GRABBING_HAND + HAND_CATCHING_ROPE_OFFSET_Y,
      opacity: 0
    }

    const handCoveringPart = {
      xpos: CANVAS_WIDTH / 2 - HAND_COVERING_PART_WIDTH / 2,
      ypos: CANVAS_HEIGHT / 2 - HAND_COVERING_PART_CATCHING_ROPE_OFFSET_Y,
      opacity: 0
    }

    ropeSpriteImage.onload = () => {
      handSpriteImage.onload = () => {
        // Initialize enter animations
        const ropeBeforeFallingEnterAnimation = new TweenLite.to(ropeBeforeFalling, 0.5, {
          rotation: getRadianDegree(ROPE_ENTER_REPLACEMENT_ANGLE),
          ease: Power2.easeIn
        })

        const ropeBeforeFallingDisappearingAnimation = new TweenLite.to(ropeBeforeFalling, 0.0001, {opacity: 0})
        const ropeAfterFallingAppearingAnimation = new TweenLite.to(ropeAfterFalling, 0.0001, {opacity: 1})

        const ropeAfterFallingEnterAnimation = new TweenLite.to(ropeAfterFalling, 0.2, {
          rotation: getRadianDegree(ROPE_ENTER_END_ANGLE),
          ease: Power2.easeOut
        })

        const handBeforeGrabbingEnterAnimation = new TweenLite.to(handBeforeGrabbing, 0.7, {
          xpos: CANVAS_WIDTH - HAND_IMAGE_WIDTH + HAND_CATCHING_ROPE_OFFSET_X,
          ypos: HAND_FIRST_POSITION_Y + HAND_CATCHING_ROPE_OFFSET_Y,
          rotation: getRadianDegree(HAND_ENTER_END_ANGLE)
        })

        const handBeforeGrabbingDisappearingAnimation = new TweenLite.to(handBeforeGrabbing, 0.0001, {opacity: 0})
        const handAfterGrabbingAppearingAnimation = new TweenLite.to(handAfterGrabbing, 0.0001, {opacity: 1})
        const handCoveringPartAppearingAnimation = new TweenLite.to(handCoveringPart, 0.0001, {opacity: 1})

        // Initialize exit animations
        const handAfterGrabbingBeforeExitAnimation = new TweenLite.to(handAfterGrabbing, 0.3, {ypos: handAfterGrabbing.ypos - BEFORE_PULLING_DOWN_OFFSET})
        const handCoveringPartBeforeExitAnimation = new TweenLite.to(handCoveringPart, 0.3, {ypos: handCoveringPart.ypos - BEFORE_PULLING_DOWN_OFFSET})
        // We should remember that the rope is 90deg rotated,
        // so in order to pull it down we need to manipulate it's x instead of it's y
        const ropeAfterFallingBeforeExitAnimation = new TweenLite.to(ropeAfterFalling, 0.3, {xpos: ropeAfterFalling.xpos - BEFORE_PULLING_DOWN_OFFSET})

        const handAfterGrabbingExitAnimation = new TweenLite.to(handAfterGrabbing, 0.7, {ypos: handAfterGrabbing.ypos + CANVAS_HEIGHT + BEFORE_PULLING_DOWN_OFFSET})
        const handCoveringPartExitAnimation = new TweenLite.to(handCoveringPart, 0.7, {ypos: handCoveringPart.ypos + CANVAS_HEIGHT + BEFORE_PULLING_DOWN_OFFSET})
        const ropeAfterFallingExitAnimation = new TweenLite.to(ropeAfterFalling, 0.7, {xpos: ropeAfterFalling.xpos + CANVAS_HEIGHT + BEFORE_PULLING_DOWN_OFFSET})


        // Initialize Timelines
        const ropeEnterTimeline = new TimelineLite()

        ropeEnterTimeline
          .add(ropeBeforeFallingEnterAnimation)
          .add(ropeBeforeFallingDisappearingAnimation)
          .add(ropeAfterFallingAppearingAnimation)
          .add(ropeAfterFallingEnterAnimation)

        const handEnterTimeline = new TimelineLite()

        handEnterTimeline
          .add(handBeforeGrabbingEnterAnimation)
          .add(handBeforeGrabbingDisappearingAnimation)
          .add(handAfterGrabbingAppearingAnimation)
          .add(handCoveringPartAppearingAnimation)

        const pullingDownTimeline = new TimelineLite()

        pullingDownTimeline
          .add([
            handAfterGrabbingBeforeExitAnimation,
            handCoveringPartBeforeExitAnimation,
            ropeAfterFallingBeforeExitAnimation
          ])
          .add([
            handAfterGrabbingExitAnimation,
            handCoveringPartExitAnimation,
            ropeAfterFallingExitAnimation
          ])

        const mainTimeline = new TimelineLite()
        mainTimeline
          .add([ropeEnterTimeline, handEnterTimeline])
          .add(pullingDownTimeline)

        TweenLite.ticker.addEventListener('tick', animate)

        canvas.addEventListener('click', () => {
          if (mainTimeline.reversed()) {
              mainTimeline.play()
          } else {
              mainTimeline.reverse()
          }
        })
      }
    }


    const animate = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      ctx.save()

      // Draw the hand before grabbing
      ctx.translate(CANVAS_WIDTH, CANVAS_HEIGHT / 2)
      ctx.rotate(handBeforeGrabbing.rotation)
      ctx.translate(-CANVAS_WIDTH, -(CANVAS_HEIGHT / 2))
      ctx.globalAlpha = handBeforeGrabbing.opacity

      ctx.drawImage(
        handSpriteImage,
        0,
        0,
        HAND_IMAGE_WIDTH,
        HAND_IMAGE_BEFORE_GRABBING_HEIGHT,
        handBeforeGrabbing.xpos,
        handBeforeGrabbing.ypos,
        HAND_IMAGE_WIDTH,
        HAND_IMAGE_BEFORE_GRABBING_HEIGHT
      )

      ctx.restore()
      ctx.save()

      // Draw the hand after grabbing
      ctx.globalAlpha = handAfterGrabbing.opacity

      ctx.drawImage(
        handSpriteImage,
        HAND_AFTER_GRABBING_SOURCE_X,
        HAND_AFTER_GRABBING_SOURCE_Y,
        HAND_IMAGE_WIDTH,
        HAND_IMAGE_AFTER_GRABBING_HEIGHT,
        handAfterGrabbing.xpos,
        handAfterGrabbing.ypos,
        HAND_IMAGE_WIDTH,
        HAND_IMAGE_AFTER_GRABBING_HEIGHT
      )

      ctx.restore()
      ctx.save()

      // Draw the before falling rope
      ctx.translate(CANVAS_WIDTH / 2, 0)
      ctx.scale(-1,1)
      ctx.rotate(ropeBeforeFalling.rotation)
      ctx.translate(-(CANVAS_WIDTH / 2), 0)
      ctx.globalAlpha = ropeBeforeFalling.opacity

      ctx.drawImage(
        ropeSpriteImage,
        0,
        ROPE_AFTER_GRABBING_SOURCE_X,
        ROPE_IMAGE_WIDTH,
        ROPE_BEFORE_FALLING_HEIGHT,
        ropeBeforeFalling.xpos,
        ropeBeforeFalling.ypos,
        ROPE_IMAGE_WIDTH / 3.2,
        ROPE_BEFORE_FALLING_HEIGHT / 3.2
      )

      ctx.restore()
      ctx.save()

      // Draw the after falling rope
      ctx.translate(CANVAS_WIDTH / 2, 0)
      ctx.scale(-1,1)
      ctx.rotate(ropeAfterFalling.rotation)
      ctx.translate(-(CANVAS_WIDTH / 2), 0)
      ctx.globalAlpha = ropeAfterFalling.opacity

      ctx.drawImage(
        ropeSpriteImage,
        0,
        0,
        ROPE_IMAGE_WIDTH,
        ROPE_AFTER_FALLING_HEIGHT,
        ropeAfterFalling.xpos,
        ropeAfterFalling.ypos,
        ROPE_IMAGE_WIDTH / 3.2,
        ROPE_AFTER_FALLING_HEIGHT / 3.2
      )

      ctx.restore()
      ctx.save()

      // Draw the hand covering part
      ctx.globalAlpha = handCoveringPart.opacity

      ctx.drawImage(
        handSpriteImage,
        HAND_COVERING_PART_SOURCE_X,
        HAND_COVERING_PART_SOURCE_Y,
        HAND_COVERING_PART_WIDTH,
        HAND_IMAGE_AFTER_GRABBING_HEIGHT,
        handCoveringPart.xpos,
        handCoveringPart.ypos,
        HAND_COVERING_PART_WIDTH,
        HAND_IMAGE_AFTER_GRABBING_HEIGHT
      )

      ctx.restore()
      ctx.save()
    }
  }

  const getRadianDegree = (degree) => {
    return degree * Math.PI / 180
  }

  initTransition()
}

runTransition()
