let windowId = 0

export default {
  props: {
    schema: {
      type: Object,
      default: () => ({})
    },

    data: {
      type: [Object, Array],
      default: () => ({})
    },

    dataPath: null,

    collection: {
      type: Object,
      default: () => ({})
    },

    defaults: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    openWindow(schema, data) {
      this.windows.push({ id: windowId++, schema, data })
    },

    closeWindow(id) {
      const { windows } = this
      this.$delete(windows, windows.findIndex(el => el.id === id))
    },
  }
}
