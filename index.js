const runTransition = () => {
  const CANVAS_WIDTH = 1024
  const CANVAS_HEIGHT = 576
  const HAND_IMAGE_WIDTH = 707
  const HAND_IMAGE_BEFORE_GRABBING_HEIGHT = 270
  const HAND_ENTER_START_ANGLE = -30
  const HAND_ENTER_END_ANGLE = 0
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
    handSpriteImage.xpos = CANVAS_WIDTH
    handSpriteImage.ypos = CANVAS_HEIGHT
    // handSpriteImage.xpos = CANVAS_WIDTH - HAND_IMAGE_WIDTH
    // handSpriteImage.ypos = HAND_FIRST_POSITION_Y

    // calculating hand enter angle
    handSpriteImage.rotation = getRadianDegree(HAND_ENTER_START_ANGLE)

    handSpriteImage.onload = () => {
      const tl = new TimelineLite()
      tl.to(handSpriteImage, 0.5, {xpos: CANVAS_WIDTH - HAND_IMAGE_WIDTH, ypos: HAND_FIRST_POSITION_Y, rotation: getRadianDegree(HAND_ENTER_END_ANGLE)})
        // .to(handSpriteImage, 0.1, {opacity: 0})
      TweenLite.ticker.addEventListener("tick", () => animate(ctx, handSpriteImage))
    }
  }

  const animate = (ctx, handSpriteImage) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.save()

    ctx.translate(CANVAS_WIDTH, CANVAS_HEIGHT / 2)
    ctx.rotate(handSpriteImage.rotation)
    ctx.translate(-CANVAS_WIDTH, -(CANVAS_HEIGHT / 2))

    ctx.drawImage(
      handSpriteImage,
      0,
      0,
      HAND_IMAGE_WIDTH,
      HAND_IMAGE_BEFORE_GRABBING_HEIGHT,
      handSpriteImage.xpos,
      handSpriteImage.ypos,
      HAND_IMAGE_WIDTH,
      HAND_IMAGE_BEFORE_GRABBING_HEIGHT
    )

    ctx.restore()
  }

  const getRadianDegree = (degree) => {
    return degree * Math.PI / 180
  }

  initTransition()
}

runTransition()
