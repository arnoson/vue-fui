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
      :id="typeId"
      :data-id="typeId"
      v-bind="{ schema, data, dataPath }"
      v-on="schema.events || schema.on"
      v-model="value"
    )
</template>

<script>
import { parseDataPath, getDataPath, setDataPath } from '@/utils'
import { isFunction } from '@/utils'
import fuiMixin from '@/mixins/fuiMixin'

export default {
  mixins: [fuiMixin],

  inject: ['schemaParent'],

  computed: {
    typeId() {
      const { schemaParent, dataPath } = this
      return schemaParent && schemaParent.id
        ? `${schemaParent.id}/${dataPath}`
        : dataPath
    },

    value: {
      get() {
        return getDataPath(this.data, this.parsedDataPath)
      },

      set(value) {
        setDataPath(this.data, this.parsedDataPath, value)
      }
    },

    labelElement() {
      return this.$refs.labelElement
    },

    parsedDataPath() {
      return parseDataPath(this.dataPath)
    },
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
