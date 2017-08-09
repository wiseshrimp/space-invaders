const ATTACK_INTERVAL = 40000
const Direction = { Left: 'left', Right: 'right' }

class SushiCat {
  constructor (props) {
    this.idx = props.idx
    this.canvas = props.canvas
    this.context = props.context
    this.isActive = false

    this.init()
    this.setDirection()
  }

  init () {
    let idx
    if (this.idx < 10) {
      idx = 1
    } else if (this.idx < 20) {
      idx = 2
    }
    let img = document.getElementById(`cat-${idx}`)
    if (img.complete) {
      this.setCanvas(img, true)
    } else {
      img.addEventListener('load', this.setCanvas.bind(this))
    }
    this.salmon = new Salmon({
      idx: this.idx,
      canvas: this.canvas,
      context: this.context,
      setActivity: this.setActivity.bind(this)
    })
    this.planAttack()
  }

  draw() {
    let distance = Math.random() * this.boundDistance * Math.random() * 0.08
    switch (this.direction) {
      case Direction.Left:
        if (this.coordsCurrent.x <= this.bounds[0]) { // Too far left, switch direction
          this.direction = Direction.Right
          this.coordsCurrent.x += distance
        } else {
          this.coordsCurrent.x -= distance
        }
        break
      case Direction.Right:
        if (this.coordsCurrent.x >= this.bounds[1]) {
          this.direction = Direction.Left
          this.coordsCurrent.x -= distance
        } else {
          this.coordsCurrent.x += distance
        }
        break
      default: break
    }
    this.context.drawImage(this.img, this.coordsCurrent.x, this.coordsCurrent.y, this.width, this.height)
  }

  fireAttack () {
    this.salmon.setActivity(true)
    this.salmon.setCoordinates({
      x: this.coordsCurrent.x,
      y: this.coordsCurrent.y + this.height / 2
    })
    this.planAttack()
  }

  planAttack() {
    let timeToAttack = Math.random() * ATTACK_INTERVAL
    setTimeout(this.fireAttack.bind(this), timeToAttack)
  }

  setActivity (isActive) {
    this.isActive = isActive
  }

  setCanvas (img, isComplete) {
    if (isComplete) {
      this.img = img
    } else {
      this.img = img.target
    }
    this.setPosition()
    this.draw()
  }

  setDirection () {
    if (Math.random() >= 0.5) {
      this.direction = Direction.Left
    } else {
      this.direction = Direction.Right
    }
  }

  setPosition () {
    let bound = this.img.width / 16
    let x, y
    if (this.idx < 10) {
      x = (this.idx + 1) * window.innerWidth * 0.09 - bound
      y = window.innerHeight * 0.10
    } else if (this.idx < 20) {
      x = (this.idx - 9) * window.innerWidth * 0.09 - bound
      y = window.innerHeight * 0.25
    }
    this.height = this.img.height / 6
    this.width = this.img.width / 6
    this.coordsCurrent = { x, y }
    this.boundDistance = bound
    this.bounds = [x - bound, x + bound]
  }
}
