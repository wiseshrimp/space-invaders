const PLAYER_VELOCITY = 4
const PlayerDirection = {
  Left: 'left',
  Right: 'right',
  None: 'none'
}

class Player {
  constructor(props) {
    this.containerEl = props.containerEl
    this.velocity = PLAYER_VELOCITY

    this.canvas = props.canvas
    this.context = props.context

    this.init()
    this.addControls()
  }

  addControls () {
    document.addEventListener('keydown', this.onKeyDown.bind(this))
    document.addEventListener('keyup', this.onKeyUp.bind(this))
  }

  init () {
    let img = document.getElementById('dog')
    if (img.complete) {
      this.setCanvas(img, true)
    } else {
      img.addEventListener('load', this.setCanvas.bind(this))
    }
  }

  draw() {
    switch (this.direction) {
      case PlayerDirection.None:
        break
      case PlayerDirection.Left:
        if (this.coordsCurrent.x <= this.bounds[0]) {
          this.direction = PlayerDirection.None
        } else {
          this.coordsCurrent.x -= this.velocity
        }
        break
      case PlayerDirection.Right:
        if (this.coordsCurrent.x >= this.bounds[1]) {
          this.direction = PlayerDirection.None
        } else {
          this.coordsCurrent.x += this.velocity
        }
        break
      default: break
    }
    this.context.drawImage(this.img, this.coordsCurrent.x, this.coordsCurrent.y, this.width, this.height)
  }

  onKeyDown(ev) {
    switch (ev.which) {
      case 37: // left
        this.direction = PlayerDirection.Left
        break
      case 39: // right
        this.direction = PlayerDirection.Right
        break
      default: break
    }
  }

  onKeyUp () {
    if (this.direction !== PlayerDirection.None) {
      this.direction = PlayerDirection.None
    }
  }

  setCanvas (img, isComplete) {
    if (isComplete) {
      this.img = img
    } else {
      this.img = img.target
    }
    this.width = this.img.width / 2
    this.height = this.img.height / 2
    this.setPosition()
    this.draw()
  }

  setPosition () {
    let bounds = [0, window.innerWidth - this.width]
    let x = window.innerWidth / 2 - this.width / 2
    let y = window.innerHeight - 2 * this.height
    this.bounds = bounds
    this.coordsCurrent = { x, y }
  }
}
