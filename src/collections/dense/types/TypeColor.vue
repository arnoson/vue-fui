<template lang="pug">
  .type-color(
    v-on="events"
    @mousedown="openColorPicker"
  ) color
</template>

<script>
import { FuiType } from '@'

export default {
  extends: FuiType,

  methods: {
    openColorPicker() {
      this.openWindow({
        layout: 'rows',
        expanded: true,
        components: {
          test: {
            type: 'text',
            label: 'fuuu'
          }
        }
      }, { test: 'ahjaaa' })
    }
  }
}
</script>
