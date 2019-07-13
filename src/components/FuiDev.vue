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
import { Fui, windows } from '@'
import collection from '@/collections/keep-it-real'

const data = {
  hallo: 'welt',
  wirklich: true,
  color: '#ffffff'
}

const schema = {
  layout: 'comma-separated',
  components: {
    hallo: {
      label: 'hallo',
      type: 'text'
    },
    test: {
      type: 'button',
      caption: 'open',
      on: {
        click() {
          windows.open({
            title: 'ahaaa',
            autoClose: 'true'
          })
        }
      }
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
  components: {
    Fui
  },

  data() {
    return {
      data,
      schema,
      defaults,
      collection
    }
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
