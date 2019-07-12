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
  }
}
