export const logger = ({ getState, dispatch }) => next => action => {
    const time = Date.now()
    next(action)
    console.log(`Action ${action.type} (${Date.now() - time}ms)`)
}