export default {
  data() {
    return {
      dragging: false,
      position: { x: 0, y: 0 },
      dragDelta: { x: 0, y: 0 },
      windowSize: { width: 0, height: 0 },
      size: { width: 0, height: 0 }
    }
  },

  computed: {
    relativePosition() {
      const { position, windowSize } = this
      return {
        top: position.y / windowSize.height * 100 + '%',
        left: position.x / windowSize.width * 100 + '%',
      }
    }
  },

  methods: {
    initDrag(event) {
      const bounds = this.$el.getBoundingClientRect()
      this.position = {
        x: bounds.x,
        y: bounds.y
      }
      this.delta = {
        x: event.x - bounds.x,
        y: event.y - bounds.y
      }
      this.size = {
        width: bounds.width,
        height: bounds.height
      }
      const { documentElement } = document
      this.windowSize = {
        width: documentElement.clientWidth,
        height: documentElement.clientHeight
      }
      window.addEventListener('mouseup', this.endDrag)
      document.body.classList.add('dragging')
    },

    startDrag() {
      window.addEventListener('mousemove', this.drag)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', this.drag, { once: true })
      })
    },

    drag(event) {
      if (!this.dragging) {
        this.dragging = true
        this.initDrag(event)
      }

      const { delta } = this
      this.position = this.constrainPosition({
        x: event.x - delta.x,
        y: event.y - delta.y
      })
    },

    endDrag() {
      window.removeEventListener('mouseup', this.endDrag)
      document.body.classList.remove('dragging')
      this.dragging = false
    },

    constrainPosition(position) {
      const { size, windowSize } = this
      if (position.x < 0) {
        position.x = 0
      } else if (position.x + size.width > windowSize.width) {
        position.x = windowSize.width - size.width
      }

      if (position.y < 0) {
        position.y = 0
      } else if (position.y + size.height > windowSize.height) {
        position.y = windowSize.height - size.height
      }

      return position
    }
  }
}
