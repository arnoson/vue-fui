<template lang="pug">
  .fui-windows
    component(
      v-for="window in stackedWindows"
      class="fui-window"
      :key="window.id"
      :is="getWindowComponent(window.schema)"
      :id="window.id"
      v-bind="window"
      @focus="focus(window)"
      :collection="collection"
    )
</template>

<script>
import { isFunction } from '@/utils'
import FuiWindow from '@/components/FuiWindow'
import windowManager from '@/windowManager'

export default {
  props: {
    collection: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      windows: windowManager.windows,
      stackingOrder: windowManager.stackingOrder
    }
  },

  computed: {
    stackedWindows() {
      return this.stackingOrder.map(id => this.windows[id])
    }
  },

  methods: {
    getWindowComponent(schema) {
      const { component, type } = schema

      let result = null

      if (component) {
        result = isFunction(component)
          ? component()
          : component
      } else if (type) {
        const component = this.collection.windows[type]
        if (!component) {
          throw new Error(`No component found for window '${type}'`)
        }
        result = component
      } else {
        result = this.collection.windows?.['window'] || FuiWindow
      }

      return result
    },

    focus(window) {
      windowManager.focus(window.id)
    }
  }
}
</script>

<style lang="scss">
body.dragging {
  user-select: none;
}
</style>
