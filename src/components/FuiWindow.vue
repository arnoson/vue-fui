<template lang="pug">
  .fui-window(
    @mousedown="onMouseDown"
    :style="style"
    :data-id="id"
    v-outside:mouseup="outsideOptions"
  )
    .fui-title-bar(
      :class="{ dragging }"
      @mousedown="startDrag"
    )
      .fui-title {{ schema.title }}
    FuiForm(
      v-bind="{ schema, data }"
      v-if="expanded"
      :collection="collection"
    )
</template>

<script>
import windows from '@/windows'
import { isNumber } from '@/utils'
import fuiMixin from '@/mixins/fuiMixin'
import dragMixin from '@/mixins/dragMixin'
import FuiForm from './FuiForm'
import outside from '@/directives/outside'

export default {
  mixins: [fuiMixin, dragMixin],

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  components: {
    FuiForm
  },

  directives: {
    outside
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
        ...this.position,
        width: isNumber(width) ? width + 'px' : width,
        height: isNumber(height) ? height + 'px' : height
      }
    },

    outsideOptions() {
      return {
        enabled: this.schema.autoClose && !this.schema.locked,
        callback: this.close
      }
    }
  },

  created() {
    const { expanded } = this.schema
    this.expanded = expanded === undefined || expanded
  },

  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded
    },

    onMouseDown() {
      this.$emit('focus')
    },

    close() {
      windows.close(this.id)
    }
  },
}
</script>

<style lang="scss" scoped>
.fui-window {
  position: absolute;
  border: 1px solid;
  background: white;

  .fui-title-bar {
    user-select: none;
  }
}
</style>
