class Game {
  constructor(props) {
    this.containerEl = props.containerEl
    this.activeSalmons = []
    this.hasLost = false
    this.sushiCatCount = props.sushiCatCount = 20 // Number of sushi cats
    this.sushiCats = []

    this.setCanvas()
    this.setImageSmoothing(false)
    this.init()
  }

  addSushiCats () {
    for (var i = 0; i < this.sushiCatCount; i++) {
      let sushiCat = new SushiCat({
        idx: i,
        containerEl: this.containerEl,
        canvas: this.canvas,
        context: this.context
      })
      this.sushiCats.push(sushiCat)
    }
  }

  check (salmon) {
    let playerBoundsX = [this.player.coordsCurrent.x, this.player.coordsCurrent.x + this.player.width]
    if (salmon.coordsCurrent.y > this.player.coordsCurrent.x && salmon.coordsCurrent.x < playerBoundsX[1] && salmon.coordsCurrent.x > playerBoundsX[0]) {
      this.hasLost = true
    }
  }

  setImageSmoothing (value) {
    this.context.imageSmoothingEnabled = value
    this.context.mozImageSmoothingEnabled = value
    this.context.oImageSmoothingEnabled = value
    this.context.webkitImageSmoothingEnabled = value
    this.context.msImageSmoothingEnabled = value
  }

  init () {
    window.addEventListener('resize', this.onResize.bind(this))
    window.requestAnimationFrame(this.draw.bind(this))

    this.player = new Player({
      containerEl: this.containerEl,
      context: this.context,
      canvas: this.canvas
    })
    this.addSushiCats()
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (!this.hasLost) {
      this.player.draw()

      for (var i = 0; i < this.sushiCats.length; i++) {
        if (this.sushiCats[i].isActive) {
          this.check(this.sushiCats[i].salmon)
          this.sushiCats[i].salmon.draw()
        }
        this.sushiCats[i].draw()
      }
    } else {
      document.getElementById('lost').style.visibility = 'visible'
    }
    window.requestAnimationFrame(this.draw.bind(this))
  }

  onResize () {
    this.context.canvas.height = window.innerHeight
    this.context.canvas.width = window.innerWidth
  }

  setCanvas () {
    let canvas = document.createElement('canvas')
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.context.globalCompositeOperation = 'destination-in'
    this.canvas.id = 'background'
    this.containerEl.appendChild(this.canvas)

    this.canvas.height = window.innerHeight
    this.canvas.width = window.innerWidth
  }
}
