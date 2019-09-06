import Vue from 'vue'

let windowIndex = 0

const state = Vue.observable({
  windows: {},
  stackingOrder: []
})

export default {
  windows: state.windows,
  stackingOrder: state.stackingOrder,

  get(id) {
    return this.windows[id]
  },

  open(options) {
    const id = options.id || `window@${windowIndex++}`
    if (!this.isOpen(id)) {
      Vue.set(state.windows, id, { ...options, id })
      this.stackingOrder.push(id)
    }

    return id
  },

  setProperty(id, key, value) {
    const window = this.get(id)
    Vue.set(this.windows, id, { ...window, [key]: value })
  },

  isOpen(id) {
    return state.windows[id]
  },

  isChildOf(childId, parentId) {
    let isChild = false

    let window = this.get(childId)
    if (window.parent !== undefined) {
      while (window) {
        window = this.get(window.parent)
        if (!window) {
          break
        } else if (window.id === parentId) {
          isChild = true
        }
      }
    }

    return isChild
  },

  close(id) {
    const { windows, stackingOrder } = state
    Vue.delete(windows, id)
    stackingOrder.splice(stackingOrder.indexOf(id), 1)
  },

  focus(id) {
    const { stackingOrder } = state
    stackingOrder.splice(stackingOrder.indexOf(id), 1)
    stackingOrder.push(id)
  },

  hide(id) {
    const window = state.windows[id]
    if (window) {
      window.show = false
    }
  }
}
