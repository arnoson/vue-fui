<template lang="pug">
  .fui-windows
    component(
      v-for="window in windows"
      :key="window.id"
      :is="getWindowComponent(window.schema)"
      v-bind="window"
      @focus="bringToFront(window)"
      :collection="collection"
      :windows="windows"
    )
</template>

<script>
import { isFunction } from '@/utils'
import FuiWindow from '@/components/FuiWindow'

export default {
  props: {
    windows: {
      type: Array,
      required: true
    },

    collection: {
      type: Object,
      required: true
    }
  },

  methods: {
    getWindowComponent(schema) {
      const { component, type } = schema

      if (component) {
        return isFunction(component)
          ? component()
          : component
      } else if (type) {
        const component = this.collection.windows[type]
        if (!component) {
          console.warn(`No component found for window '${type}'`)
        }
        return component
      } else {
        return FuiWindow
      }
    },

    bringToFront(window) {
      const { windows } = this
      windows.splice(windows.indexOf(window), 1)
      windows.push(window)
    }
  }
}
</script>

<style lang="scss">
body.dragging {
  user-select: none;
}
</style>
