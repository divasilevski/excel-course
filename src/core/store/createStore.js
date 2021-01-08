export function createStore(rootReducer, initState = {}) {
  const startAction = { type: '__INIT__' }
  let state = rootReducer({ ...initState }, startAction)
  let listeners = []

  return {
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn)
        },
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach((listener) => listener(state))
    },
    getState() {
      return JSON.parse(JSON.stringify(state))
    },
  }
}
