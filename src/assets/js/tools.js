export default {
  isEmpty(item) {
    if (typeof item === 'object') {
      return Object.keys(item).length === 0 && item.constructor === Object
    }
  }
}
