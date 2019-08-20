<template lang="pug">
  button.type-button(
    v-on="options.on"
  ) {{ options.caption }}
</template>

<script>
import { FuiType } from '@'

export default {
  extends: FuiType
}
</script>
