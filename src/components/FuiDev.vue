<template lang="pug">
  .fui-dev
    .fui-dev-monitor
      .row(
        v-for="(value, name) in data"
      )
        span {{ name }}
        span {{ value }}
    FuiForm(
      :data="data"
      :schema="schema"
      :defaults="defaults"
      :collection="collection"
    )
</template>

<script>
import FuiForm from './FuiForm'
import collection from '@/collections/dense'

const data = {
  text: 'mhh',
  hallo: 'welt'
}

const schema = {
  layout: 'comma-separated',
  components: {
    text: {
      type: 'text',
      label: 'text:'
    },
    hallo: {
      type: 'text',
      label: 'hallo:'
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
      collection
    }
  },

  components: {
    FuiForm
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
