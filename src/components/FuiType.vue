<script>
import fuiMixin from '@/mixins/fuiMixin'

export default {
  mixins: [fuiMixin],

  props: ['value'],

  data() {
    return {
      focused: false
    }
  },

  inject: ['schemaParent'],

  computed: {
    type() {
      return this.schema.type
    },

    events() {
      // Allow 'on' as a shorter alias for 'events'.
      return this.schema.events || this.schema.on
    },

    labelElement() {
      return this.$parent.$refs.labelElement
    },

    parentDefaultOptions() {
      return this.schemaParent.$props?.defaults?.types?.[this.type] || {}
    },

    options() {
      return Object.assign(
        {},
        this.defaultOptions,
        this.parentDefaultOptions,
        this.schema
      )
    }
  }
}
</script>
