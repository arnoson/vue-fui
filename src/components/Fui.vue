<template lang="pug">
  .fui
    Component(
      v-if="collection.component"
      :is="collection.component"
    )
    FuiWindows(
      ref="windows"
      :collection="collection"
    )
    FuiForm(
      :data="data"
      :schema="schema"
      :defaults="defaults"
      :collection="collection"
    )
</template>

<script>
import FuiForm from './FuiForm'
import FuiWindows from './FuiWindows'
import fuiMixin from '@/mixins/fuiMixin'

let fuiIndex = 0

export default {
  mixins: [fuiMixin],

  provide() {
    return {
      schemaParent: this
    }
  },

  components: {
    FuiWindows,
    FuiForm
  },

  data() {
    return {
      id: `fui@${fuiIndex++}`
    }
  }
}
</script>
