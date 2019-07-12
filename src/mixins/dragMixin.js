function constrainPosition(position, size, constraint) {
  if (position.x < 0) {
    position.x = 0
  } else if (position.x + size.width > constraint.width) {
    position.x = constraint.width - size.width
  }

  if (position.y < 0) {
    position.y = 0
  } else if (position.y + size.height > constraint.height) {
    position.y = constraint.height - size.height
  }

  return position
}

function getWindowSize() {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  }
}

export default {
  data() {
    return {
      dragging: false,
      // The relative position of the element stored in factors from 0-1.
      $_relativePosition: { x: 0, y: 0 },
      $_dragDelta: { x: 0, y: 0 },
      $_windowSize: { width: 0, height: 0 },
      $_size: { width: 0, height: 0 }
    }
  },

  computed: {
    $_absolutePosition() {
      const { $_relativePosition, $_windowSize } = this.$data
      return {
        x: $_relativePosition.x * $_windowSize.width,
        y: $_relativePosition.y * $_windowSize.height
      }
    },

    position() {
      const { $_size, $_windowSize } = this.$data

      // Make sure the element is fully inside the viewport.
      const { x, y } = constrainPosition(
        this.$_absolutePosition,
        $_size,
        $_windowSize
      )

      // Convert absolute px values to percentages.
      return {
        top: y / $_windowSize.height * 100 + '%',
        left: x / $_windowSize.width * 100 + '%'
      }
    }
  },

  mounted() {
    window.addEventListener('resize', this.$_onResize)
    this.$data.$_windowSize = getWindowSize()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.$_onResize)
  },

  methods: {
    /**
     * Calculate all necessary data for dragging.
     */
    $_initDrag(event) {
      const bounds = this.$el.getBoundingClientRect()

      this.$data.$_dragDelta = {
        x: event.x - bounds.x,
        y: event.y - bounds.y
      }

      this.$data.$_size = {
        width: bounds.width,
        height: bounds.height
      }

      window.addEventListener('mouseup', this.$_endDrag)
      document.body.classList.add('dragging')
    },

    /**
     * Add the event listeners to detect a drag start. This method should be
     * called in a mousedown event on the drag handler.
     */
    startDrag() {
      window.addEventListener('mousemove', this.$_drag)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', this.$_drag, { once: true })
      })
    },

    /**
     * Update the relative position and initialse the drag if necessary.
     */
    $_drag(event) {
      if (!this.dragging) {
        this.dragging = true
        this.$_initDrag(event)
      }

      const { $_dragDelta, $_windowSize } = this.$data
      this.$data.$_relativePosition = {
        x: (event.x - $_dragDelta.x) / $_windowSize.width,
        y: (event.y - $_dragDelta.y) / $_windowSize.height
      }
    },

    /**
     * Clean up after a drag.
     */
    $_endDrag() {
      this.dragging = false
      window.removeEventListener('mouseup', this.$_endDrag)
      document.body.classList.remove('dragging')
    },

    $_onResize() {
      this.$data.$_windowSize = getWindowSize()
    }
  }
}
