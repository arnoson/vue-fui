<template lang="pug">
  .fui-dev
    .fui-dev-monitor
      .row(
        v-for="(value, name) in data"
      )
        span {{ name }}
        span {{ value }}
    Fui(
      ref="fui"
      :collection="collection"
      :data="data"
      :schema="schema"
      :defaults="defaults"
    )
</template>

<script>
import { Fui } from '@'
import collection from '@/collections/keep-it-real'
import windowManager from '@/windowManager'

const data = {
  hallo: 'welt',
  wirklich: true,
  color: '#ffffff'
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
      defaults,
      collection,
      schema: {
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
              click: () => {
                windowManager.open({
                  schema: {
                    title: 'fuuu'
                  }
                })
              }
            }
          }
        }
      }
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
