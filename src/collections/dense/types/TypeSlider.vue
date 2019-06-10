<template lang="pug">
  .type-slider(
    :class="options.direction"
  )
    .type-slider-range
    .type-slider-handle(
      ref="handle"
      :style="handlePosition"
      @mousedown="startSlide"
    )
</template>

<script>
import { FuiType } from '@'

export default {
  extends: FuiType,

  data() {
    return {
      defaultOptions: {
        direction: 'vertical',
        range: { min: 0, max: 1 }
      },
      handleSize: { width: 0, height: 0},
      sliderBounds: { width: 0, height: 0, top: 0, left: 0 }
    }
  },

  computed: {
    factor() {
      return this.valueToFactor(this.value, this.options.range)
    },

    isVertical() {
      return this.options.direction === 'vertical'
    },

    handlePosition() {
      const { width, height } = this.handleSize
      return this.isVertical
        ? { left: `calc(${this.factor} * (100% - ${width}px))` }
        : { top: `calc(${this.factor} * (100% - ${height}px))` }
    }
  },

  beforeDestroy() {
    // Make sure listeners allways get removed.
    this.removeListeners()
  },

  methods: {
    mapValue(value, rangeIn, rangeOut) {
      return (
        (value - rangeIn.min) * (rangeOut.max - rangeOut.min) /
        (rangeIn.max - rangeIn.min) + rangeOut.min
      )
    },

    valueToFactor(value, range) {
      return this.mapValue(value, range, { min: 0, max: 1 })
    },

    factorToValue(value, range) {
      return this.mapValue(value, { min: 0, max: 1 }, range)
    },

    constrainFactor(factor) {
      if (factor < 0) {
        factor = 0
      }
      if (factor > 1) {
        factor = 1
      }
      return factor
    },

    addListeners() {
      window.addEventListener('mousemove', this.slide)
      window.addEventListener('mouseup', this.endSlide)
    },

    removeListeners() {
      window.removeEventListener('mousemove', this.slide)
      window.removeEventListener('mouseup', this.endSlide)
    },

    startSlide() {
      let bounds = this.$el.getBoundingClientRect()
      this.sliderBounds = {
        width: bounds.width,
        height: bounds.height,
        top: bounds.top,
        left: bounds.left
      }

      bounds = this.$refs.handle.getBoundingClientRect()
      this.handleSize = { width: bounds.width, height: bounds.height }

      this.addListeners()
    },

    slide(event) {
      event.preventDefault()

      const { top, left, width, height } = this.sliderBounds
      const { pageX, pageY } = event
      const x = pageX - left
      const y = pageY - top

      const factor = this.constrainFactor(
        this.isVertical
          ? x / width
          : y / height
      )

      this.value = this.factorToValue(factor, this.options.range)
    },

    endSlide(event) {
      this.slide(event)
      this.removeListeners()
    }
  }
}
</script>

<style lang="scss">
.type-slider {
  position: relative;
  width: 100%;
  height: 1em;
  min-width: 5em;

  &-range {
    position: absolute;
    width: 100%;
    height: 1px;
    top: 50%;
    transform: translateY(-50%);
    background: black;
  }

  &-handle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    width: 11px;
    height: 11px;
    background: black;
  }
}
</style>
