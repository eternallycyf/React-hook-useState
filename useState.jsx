const myReact = (() => {
  const states = []
  const stateSetters = [];
  let stateIndex = 0

  // let _state;
  // function useState(initialState) {
  //   _state = _state === undefined ? initialState : _state;
  //   const _setState = (newState) => {
  //     if (typeof newState === 'function') {
  //       _state = newState(_state)
  //     } else {
  //       _state = newState
  //     }

  //     render()
  //   }
  //   return [_state, _setState]
  // }

  function createState(initialState, stateIndex) {
    return states[stateIndex] !== undefined ? states[stateIndex] : initialState;
  }

  function createStateSetter(stateIndex) {
    return function (newState) {
      if (typeof newState === 'function') {
        states[stateIndex] = newState(states[stateIndex])
      } else {
        states[stateIndex] = newState
      }
      render()
    }
  }

  function useState(initialState) {
    states[stateIndex] = createState(initialState, stateIndex)

    if (!stateSetters[stateIndex]) {
      stateSetters.push(createStateSetter(stateIndex))
    }

    const _state = states[stateIndex]
    const _setState = stateSetters[stateIndex]

    stateIndex++;

    return [_state, _setState]
  }


  function render() {
    stateIndex = 0;
    ReactDOM.render(
      <App />,
      document.querySelector('#app')
    )
  }

  return {
    useState
  }
})();

const { useState } = myReact;
// const { useState } = React;

const App = () => {

  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false)

  return (
    <div>
      <h1>{count}</h1>
      <h1>{flag ? 'open' : 'close'}</h1>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <button onClick={() => setCount(count => count - 1)}>sub</button>
      <button onClick={() => setFlag(flag => flag = !flag)}>{flag ? '关闭' : '打开'}</button>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
