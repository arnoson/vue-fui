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
    )
</template>

<script>
import FuiForm from './FuiForm'
import FuiWindows from './FuiWindows'
import fuiMixin from '@/mixins/fuiMixin'
import windows from '@/windows'

export default {
  mixins: [fuiMixin],

  components: {
    FuiWindows,
    FuiForm
  },

  data() {
    return {
      windows
    }
  }
}
</script>
