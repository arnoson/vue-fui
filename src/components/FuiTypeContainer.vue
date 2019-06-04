<template lang="pug">
  .fui-type-container
    .fui-label(
      v-if="schema.label"
      ref="labelElement"
    ) {{ schema.label }}
    component.fui-type(
      :class="`collection-${collection.name}`"
      :is="getTypeComponent(schema)"
      :key="dataPath"
      v-bind="{ schema, data, dataPath }"
    )
</template>

<script>
import { isFunction } from '@/utils'
import fuiMixin from '@/mixins/fuiMixin'

export default {
  mixins: [fuiMixin],

  computed: {
    labelElement() {
      return this.$refs.labelElement
    }
  },

  methods: {
    getTypeComponent(schema) {
      const { component, type } = schema

      if (component) {
        return isFunction(component)
          ? component()
          : component
      } else if (type) {
        const component = this.collection.types[type]
        if (!component) {
          console.warn(`No component found for type '${type}'`)
        }
        return component
      }
    }
  }
}
</script>
