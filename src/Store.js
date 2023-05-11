function createStore(reducer) {
  /**
   * Store memiliki 4 hal
   * 1. State
   * 2. Mendapatkan state
   * 3. Men-subscribe perubahan state
   * 4. Memperbarui state
   */

  let state;
  // subscriptions -> menampung seluruh listener proses subscription
  let listeners = [];

  const getState = () => state;

  // proses subscribe untuk memasukkan listener ke dalam arrray listeners
  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      // proses un-subscribe
      listeners = listeners.filter((listenerItem) => listenerItem !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  // the store
  return {
    getState,
    subscribe,
    dispatch,
  };
}

export { createStore };
