<template lang="pug">
  .fui-window(
    @mousedown="onMouseDown"
    :style="style"
    v-outside:mousedown="outsideOptions"
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
import windowManager from '@/windowManager'
import { isNumber } from '@/utils'
import fuiMixin from '@/mixins/fuiMixin'
import dragMixin from '@/mixins/dragMixin'
import FuiForm from './FuiForm'
import outside from '@/directives/outside'

export default {
  mixins: [fuiMixin, dragMixin],

  props: {
    id: {
      type: String
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
      schemaParent: this,
      windowId: this.id
    }
  },

  data() {
    return {
      expanded: null,
      locked: false
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
        enabled: this.schema.autoClose && !this.locked,
        callback: this.onMouseDownOutside
      }
    }
  },

  created() {
    const { expanded, locked } = this.schema
    this.expanded = expanded === undefined || expanded
    this.locked = locked
  },

  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded
    },

    onMouseDown() {
      this.$emit('focus')
    },

    onMouseDownOutside() {
      this.close()
    },

    close() {
      windowManager.close(this.id)
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
