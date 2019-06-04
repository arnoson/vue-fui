<template lang="pug">
  .type-checkbox(
    v-html="icon"
    @click="toggleValue"
  )
</template>

<script>
import { FuiType } from '@'

export default {
  extends: FuiType,

  mounted() {
    const { labelElement } = this
    if (labelElement) {
      labelElement.style.cursor = 'pointer'
      labelElement.addEventListener('click', () => this.toggleValue())
    }
  },

  computed: {
    icon() {
      return this.value ? '&#10004;' : '&#10008;'
    }
  },

  methods: {
    toggleValue() {
      this.value = !this.value
    }
  }
}
</script>

<style>
.type-checkbox {
  cursor: pointer;
  width: 0.8em;
}
</style>
