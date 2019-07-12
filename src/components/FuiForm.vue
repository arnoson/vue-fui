<template lang="pug">
  .fui-form(
    :class="`collection-${collection.name}`"
    :data-layout="layout"
  )
    FuiTypeContainer(
      v-for="(schema, dataPath) in schema.components"
      :key="dataPath"
      v-bind="{ schema, data, dataPath }"
      :collection="collection"
    )
</template>

<script>
import fuiMixin from '@/mixins/fuiMixin.js'
import FuiTypeContainer from './FuiTypeContainer'

export default {
  mixins: [fuiMixin],

  provide() {
    return {
      schemaParent: this
    }
  },

  components: {
    FuiTypeContainer
  },

  computed: {
    layout() {
      return this.schema.layout || 'table'
    }
  }
}
</script>

<style lang="scss">
.fui-label {
  user-select: none;
}

.fui-form[data-layout='table'] {
  .fui-type-container {
    display: flex;

    .fui-label {
      width: 50%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .fui-type {
      flex-grow: 1;
    }
  }
}

.fui-form[data-layout='columns'] {
  display: flex;
  flex-direction: row;

  .fui-type-container {
    display: flex;
    &:not(:last-child) {
      margin-right: 0.5em;
    }
  }
}

.fui-form[data-layout='rows'] {
  display: flex;
  flex-direction: column;

  .fui-type-container {
    display: flex;
  }
}

.fui-form[data-layout='comma-separated'] {
  display: flex;

  .fui-type-container {
    display: flex;
    &:not(:last-child):after {
      content: ',';
      margin-right: 0.5em;
      margin-left: -0.13em;
    }
  }
}
</style>
