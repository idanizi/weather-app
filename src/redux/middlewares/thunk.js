export const thunk = ({ getState, dispatch }) =>
    next =>
        action => typeof action === 'function' ?
            action(dispatch, getState) :
            next(action);
