<template lang="pug">
  .fui-dev
    .fui-dev-monitor
      .row(
        v-for="(value, name) in data"
      )
        span {{ name }}
        span {{ value }}
    Fui(
      :collection="collection"
      :data="data"
      :schema="schema"
      :defaults="defaults"
    )
</template>

<script>
import { Fui, FuiForm, FuiWindows } from '@'
import collection from '@/collections/dense'

const data = {
  hallo: 'welt',
  wirklich: true,
  color: '#ffffff'
}

const schema = {
  layout: 'comma-separated',
  components: {
    hallo: {
      type: 'text',
      label: 'hallo:'
    },
    wirklich: {
      type: 'checkbox',
      label: 'wirklich?'
    },
    color: {
      type: 'color',
      label: 'background'
    }
  }
}

const defaults = {
  types: {
    text: {
      quotes: true
    }
  }
}

export default {
  data() {
    return {
      data,
      schema,
      defaults,
      collection,
      windows: []
    }
  },

  components: {
    Fui,
    FuiForm,
    FuiWindows
  }
}
</script>

<style lang="scss">
.fui-dev {
  &-monitor {
    display: table;
    .row {
      display: table-row;
    }
    .row > * {
      display: table-cell;
      padding: 0.1em;
    }
  }
}
</style>
