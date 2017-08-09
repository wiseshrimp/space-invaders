const SALMON_VELOCITY = 4

class Salmon {
  constructor(props) {
    this.init()

    this.idx = props.idx
    this.canvas = props.canvas
    this.context = props.context
    this.isActive = false
    this.velocity = SALMON_VELOCITY
    this.setParentActivity = props.setActivity
  }

  init () {
    let img = document.getElementById('salmon')
    if (img.complete) {
      this.setImage(img, true)
    } else {
      img.addEventListener('load', this.setImage.bind(this))
    }
  }

  draw() {
    if (this.coordsCurrent.y >= window.outerHeight) {
      this.setActivity(false)
    } else {
      this.coordsCurrent.y += this.velocity
      this.context.drawImage(this.img, this.coordsCurrent.x, this.coordsCurrent.y, this.width, this.height)
    }
  }

  setActivity (isActive) {
    this.isActive = isActive
    this.setParentActivity(isActive)
  }

  setCoordinates (coords) {
    this.coords = coords
    this.coordsCurrent = coords
  }

  setImage (img, isReady) {
    if (isReady) {
      this.img = img
    } else {
      this.img = img.target
    }
    this.width = this.img.width / 40
    this.height = this.img.height / 40
  }
}
