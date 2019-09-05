<script>
import fuiMixin from '@/mixins/fuiMixin'

export default {
  mixins: [fuiMixin],

  props: {
    value: null,
    id: null
  },

  data() {
    return {
      focused: false
    }
  },

  inject: ['schemaParent'],

  computed: {
    valueProxy: {
      get() {
        return this.value
      },

      set(value) {
        this.$emit('input', value)
      },
    },

    type() {
      return this.schema.type
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
