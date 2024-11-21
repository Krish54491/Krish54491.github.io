export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `The amount of fun is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
export function MyButton(element){
  const fun = () => {
    if(element.innerHTML == `Waa`){
      element.innerHTML = `Hoo`
    } else {
      element.innerHTML = `Waa`
    }
  }

  element.addEventListener('click', () => fun())
}