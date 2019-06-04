import { isArray, isString } from './base'

// taken from https://github.com/ditojs/

export function parseDataPath(path) {
  if (isArray(path)) {
    return [...path] // Alway return new arrays (clones).
  } else if (isString(path)) {
    const str = path
      // Convert from JavaScript property access notation to JSON pointers:
      .replace(/\.([^.]*)/g, '/$1')
      // Expand array property access notation ([])
      .replace(/\[['"]?([^'"\]]*)['"]?\]/g, '/$1')
    return /^\//.test(str) ? str.substr(1).split('/') : str.split('/')
  }
}

export function getDataPath(obj, path) {
  for (const part of parseDataPath(path)) {
    obj = obj[part]
  }
  return obj
}

export function setDataPath(obj, path, value) {
  const parts = parseDataPath(path)
  const last = parts.pop()
  const dest = getDataPath(obj, parts)
  dest[last] = value
  return obj
}
