<template lang="pug">
  button.type-button(
    v-on="events"
  ) {{ options.caption }}
</template>

<script>
import { FuiType } from '@'

export default {
  extends: FuiType
}
</script>
