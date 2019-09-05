import Vue from 'vue'

let windowIndex = 0

const state = Vue.observable({
  windows: {},
  stackingOrder: []
})

export default {
  windows: state.windows,
  stackingOrder: state.stackingOrder,

  open(options) {
    const id = options.id || `window@${windowIndex++}`
    if (!this.isOpen(id)) {
      Vue.set(state.windows, id, { ...options, id })
      this.stackingOrder.push(id)
    }

    return id
  },

  isOpen(id) {
    return state.windows[id]
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



// import Vue from 'vue'
// let windowIndex = 0

// export default new Vue({
//   methods: {
//     open() {
//       Vue.set(windows, windowIndex++, {
//         id: 'arsch'
//       })
//       console.log(windows)
//     }
//   }
// })

// // export default new Vue({
// //   data() {
// //     return {
// //       windows: {},
// //       stackingOrder: []
// //     }
// //   },

// //   methods: {
// //     open(options) {
// //       const id = options.id || `window@${windowIndex++}`
// //       if (!this.isOpen(id)) {
// //         this.$set(this.windows, id, { ...options, id })
// //         this.stackingOrder.push(id)
// //       }

// //       return id
// //     },

// //     isOpen(id) {
// //       return this.windows[id]
// //     },

// //     close(id) {
// //       this.$delete(this.windows, id)
// //       this.stackingOrder = this.stackingOrder.filter(el => el !== id)
// //     },

// //     focus(id) {
// //       this.stackingOrder = this.stackingOrder.filter(el => el !== id)
// //       this.stackingOrder.push(id)
// //     },

// //     hide(id) {
// //       const window = this.windows[id]
// //       if (window) {
// //         window.show = false
// //       }
// //     }
// //   }
// // })
