<template lang="pug">
  input.type-text(
    :value="value"
    @input="$emit('input', $event.target.value)"
    v-on="events"
  )
</template>

<script>
import { FuiType } from '@'

export default {
  extends: FuiType
}
</script>
