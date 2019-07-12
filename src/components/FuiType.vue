<script>
import { parseDataPath, getDataPath, setDataPath } from '@/utils'
import fuiMixin from '@/mixins/fuiMixin'

export default {
  mixins: [fuiMixin],

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

    value: {
      get() {
        return getDataPath(this.data, this.parsedDataPath)
      },

      set(value) {
        setDataPath(this.data, this.parsedDataPath, value)
      }
    },

    parsedDataPath() {
      return parseDataPath(this.dataPath)
    },

    events() {
      return this.schema.events
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
