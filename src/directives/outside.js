function isObject(a) {
    return (!!a) && (a.constructor === Object)
}

export default {
  bind(el, binding) {
    const { arg, value } = binding
    const eventType = arg || 'click'
    const options = {
      enabled: true,
      ...(isObject(value) ? value : { callback: value })
    }

    el.event = event => {
      if (!(el === event.target || el.contains(event.target))) {
        options.callback?.(event)
      }
    }

    if (options.enabled) {
      document.addEventListener(eventType, el.event)
    }
  },

  update(el, binding) {
    const { arg, value, oldValue } = binding
    const eventType = arg || 'click'

    // Add or remove the eventListener if the enabled property changed.
    if (isObject(value)) {
      const { enabled } = value
      if (enabled !== oldValue.enabled) {
        if (enabled) {
          document.addEventListener(eventType, el.event)
        } else {
          document.removeEventListener(eventType, el.event)
        }
      }
    }
  },

  unbind(el, binding) {
    const eventType = binding.arg || 'click'
    document.removeEventListener(eventType, el.event)
  },
}
