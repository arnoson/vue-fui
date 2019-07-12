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
import vue from 'vue'
import FuiForm from './FuiForm'
import FuiWindows from './FuiWindows'
import fuiMixin from '@/mixins/fuiMixin'
import state from '@/state'

const Fui = {
  mixins: [fuiMixin],

  components: {
    FuiWindows,
    FuiForm
  },

  data() {
    return {
      windows: state.windows
    }
  }
}

Fui.openWindow = (schema, data) => {
  state.windows.push({ id: state.windowId++, schema, data })
}
Fui.closeWindow = id => {
  vue.$delete(state.windows, state.windows.findIndex(el => el.id === id))
}

export default Fui
</script>
