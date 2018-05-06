const runTransition = () => {
  const CANVAS_WIDTH = 1024
  const CANVAS_HEIGHT = 576
  const HAND_IMAGE_WIDTH = 707
  const HAND_IMAGE_BEFORE_GRABBING_HEIGHT = 270
  const HAND_IMAGE_AFTER_GRABBING_HEIGHT = 400
  const HAND_ENTER_START_ANGLE = -30
  const HAND_ENTER_END_ANGLE = 0
  const HAND_AFTER_GRABBING_SOURCE_X = 40
  const HAND_AFTER_GRABBING_SOURCE_Y = HAND_IMAGE_BEFORE_GRABBING_HEIGHT
  const HAND_AFTER_GRABBING_Y_OFFSET_FROM_GRABBING_HAND = 50
  const HAND_FIRST_POSITION_Y = 100

  const initTransition = () => {
    const canvas = document.getElementById("canvas")
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    canvas.onclick = runTransition

    const ctx = canvas.getContext("2d")

    // Setting the image of hand before grabbing
    const handSpriteImage = new Image()
    handSpriteImage.src = "./images/hand-sprite.png"

    const handBeforeGrabbing = {
      xpos: CANVAS_WIDTH,
      ypos: CANVAS_HEIGHT,
      rotation: getRadianDegree(HAND_ENTER_START_ANGLE),
      opacity: 1
    }

    const handAfterGrabbing = {
      xpos: CANVAS_WIDTH - HAND_IMAGE_WIDTH + HAND_AFTER_GRABBING_SOURCE_X,
      ypos: HAND_FIRST_POSITION_Y + HAND_AFTER_GRABBING_Y_OFFSET_FROM_GRABBING_HAND,
      opacity: 0
    }

    handSpriteImage.onload = () => {
      const tl = new TimelineLite()
      tl.to(handBeforeGrabbing, 0.7, {xpos: CANVAS_WIDTH - HAND_IMAGE_WIDTH, ypos: HAND_FIRST_POSITION_Y, rotation: getRadianDegree(HAND_ENTER_END_ANGLE)})
        .to(handBeforeGrabbing, 0, {opacity: 0})
        .to(handAfterGrabbing, 0, {opacity: 1})
      TweenLite.ticker.addEventListener("tick", () => animate(ctx, handSpriteImage, handBeforeGrabbing, handAfterGrabbing))
    }
  }

  const animate = (ctx, handSpriteImage, handBeforeGrabbing, handAfterGrabbing) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.save()

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
  }

  const getRadianDegree = (degree) => {
    return degree * Math.PI / 180
  }

  initTransition()
}

runTransition()
