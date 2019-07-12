<template lang="pug">
  input.type-text(
    v-model="value"
    v-on="events"
  )
</template>

<script>
import { FuiType } from '@'

export default {
  extends: FuiType
}
</script>
