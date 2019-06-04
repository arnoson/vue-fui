<template lang="pug">
  .fui-window(
    @mousedown="onMouseDown"
    :style="style"
    :class="{ expanded, 'no-title': !schema.title }"
    v-outside:click="outsideOptions"
  )
    .id {{ $attrs.id }}
    FuiForm(
      v-bind="{ schema, data }"
      v-if="expanded"
      :collection="collection"
    )
</template>

<script>
import Vue from 'vue'
import { isNumber } from '@/utils'
import fuiMixin from '@/mixins/fuiMixin'
import dragMixin from '@/mixins/dragMixin'
import FuiForm from './FuiForm'
import outside from '@/directives/outside'

Vue.directive('outside', outside)

export default {
  mixins: [fuiMixin, dragMixin],

  props: {
    defaults: {
      type: Object,
      default: () => ({})
    }
  },

  components: {
    FuiForm
  },

  provide() {
    return {
      schemaParent: this
    }
  },

  data() {
    return {
      expanded: null
    }
  },

  computed: {
    style() {
      const { width, height } = this.schema
      return {
        ...this.relativePosition,
        width: isNumber(width) ? width + 'px' : width,
        height: isNumber(height) ? height + 'px' : height
      }
    },

    outsideOptions() {
      return {
        enabled: this.schema.autoClose && !this.schema.locked,
        callback: this.onClickOutside
      }
    }
  },

  created() {
    this.expanded = this.schema.expanded
  },

  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded
    },

    onMouseDown(event) {
      this.startDrag(event)
      this.$emit('focus')
    },

    onClickOutside(event) {

    }
  },
}
</script>

<style lang="scss" scoped>
.fui-window {
  position: absolute;
  border: 1px solid;
  background: white;
}
</style>
