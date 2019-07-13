import Vue from 'vue'
let windowId = 0

export default Object.assign(Array(), {
  get(id) {
    return this.find(el => el.id === id)
  },

  getIndex(id) {
    return this.findIndex(el => el.id === id)
  },

  open(schema, data) {
    const id = windowId++
    this.push({ id, schema, data })
    return id
  },

  close(id) {
    Vue.delete(this, this.getIndex(id))
  },

  hide(id) {
    const window = this.get(id)
    window.show = false
  },

  focus(id) {
    const index = this.getIndex(id)
    const window = this[index]
    this.splice(index, 1)
    this.push(window)
  },

  isOpen(id) {
    return id !== undefined && !!this.get(id)
  }
})
