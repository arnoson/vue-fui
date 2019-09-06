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
      // The relative position stored in factors from 0-1.
      relativePosition: { x: 0, y: 0 },
      size: { width: 0, height: 0 },
      $_dragDelta: { x: 0, y: 0 },
      $_windowSize: { width: 0, height: 0 },
    }
  },

  computed: {
    // The absolute position stored in px.
    absolutePosition() {
      const { relativePosition, $_windowSize } = this.$data
      return {
        x: relativePosition.x * $_windowSize.width,
        y: relativePosition.y * $_windowSize.height
      }
    },

    positionCss() {
      const { size, $_windowSize } = this.$data

      // Make sure the element is fully inside the viewport.
      const { x, y } = constrainPosition(
        this.absolutePosition,
        size,
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
    this.startDragPoint = {}
    window.addEventListener('resize', this.$_onResize)
    this.$data.$_windowSize = getWindowSize()
    this.updateSize()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.$_onResize)
  },

  methods: {
    /**
     * Update the size. An optional bounds object can be passed, to avoid
     * unnecessary calls of `getBoundingClientRect`.
     * See `$_initDrag` method, where bounds is already available because it is
     * used elsewhere in the method.
     * @param  {DOMRect} bounds
     */
    updateSize(bounds) {
      const { width, height } = bounds || this.$el.getBoundingClientRect()
      this.size = { width, height }
    },

    /**
     * Manually set an absolute position.
     * @param {Object} position
     */
    setAbsolutePosition(position) {
      const { $_windowSize } = this.$data
      this.relativePosition = {
        x: position.x / $_windowSize.width,
        y: position.y / $_windowSize.height
      }
    },

    /**
     * Calculate all necessary data for dragging.
     */
    $_initDrag(point) {
      const bounds = this.$el.getBoundingClientRect()

      this.$data.$_dragDelta = {
        x: point.x - bounds.x,
        y: point.y - bounds.y
      }
      this.updateSize(bounds)

      window.addEventListener('mouseup', this.$_endDrag)
      document.body.classList.add('dragging')
    },

    /**
     * Add the event listeners to detect a drag start. This method should be
     * called in a mousedown event on the drag handle.
     */
    startDrag(event) {
      this.startDragPoint = { x: event.x, y: event.y }
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
        this.$_initDrag(this.startDragPoint)
      }

      const { $_dragDelta, $_windowSize } = this.$data
      this.relativePosition = {
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
