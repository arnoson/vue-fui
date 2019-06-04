<template lang="pug">
  .fui
    FuiWindows(
      :windows="windows"
      :collection="collection"
    )
    FuiForm(
      :data="data"
      :schema="schema"
      :defaults="defaults"
      :collection="collection"
      :windows="windows"
    )
</template>

<script>
import FuiForm from './FuiForm'
import FuiWindows from './FuiWindows'
import fuiMixin from '@/mixins/fuiMixin'

export default {
  mixins: [fuiMixin],

  components: {
    FuiWindows,
    FuiForm
  },

  data() {
    return {
      windows: []
    }
  }
}
</script>
