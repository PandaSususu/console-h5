const throttle = function(fn, delay) {
  let timer = null
  return function() {
    const _self = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(function() {
      fn.apply(_self, args)
    }, delay)
  }
}

export default throttle
