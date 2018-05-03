const runTransition = () => {
  const CANVAS_WIDTH = 1024
  const CANVAS_HEIGHT = 576
  const HAND_IMAGE_WIDTH = 707
  const HAND_IMAGE_BEFORE_GRABBING_HEIGHT = 270
  const HAND_FIRST_POSITION_Y = 100

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

  handSpriteImage.onload = () => {
    TweenMax.to(handSpriteImage, 0.7, {xpos: CANVAS_WIDTH - HAND_IMAGE_WIDTH, ypos: HAND_FIRST_POSITION_Y})
    TweenLite.ticker.addEventListener("tick", animate)
  }

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

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
  }
}

runTransition()
