<template lang="pug">
  .fui-windows
    component(
      v-for="window in windows"
      :key="window.id"
      :is="getWindowComponent(window)"
      v-bind="window"
      @focus="focus(window)"
      :collection="collection"
      :windows="windows"
    )
</template>

<script>
import windows from '@/windows'
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
    getWindowComponent(window) {
      const { component, type } = schema

      if (component) {
        return isFunction(component)
          ? component()
          : component
      } else if (type) {
        const component = this.collection.windows[type]
        if (!component) {
          throw new Error(`No component found for window '${type}'`)
        }
        return component
      } else {
        return FuiWindow
      }
    },

    focus(window) {
      windows.focus(window.id)
    }
  }
}
</script>

<style lang="scss">
body.dragging {
  user-select: none;
}
</style>
