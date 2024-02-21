import { controls } from "./elements.js"
import * as actions from "./actions.js"
import * as el from "./elements.js"
import { updateDisplay } from "./timer.js"
import state from "./state.js"


export function registerControls() {
    controls.addEventListener('click', (event)=> {
        /*console.log(event.target.dataset.action)*/
        const action = event.target.dataset.action
        if(typeof actions[action] != "function") {
            return
        }

        actions[action]()
    })
}

export function setMinutes() {
    el.minutes.addEventListener('focus', () => {
        el.minutes.textContent = ""
    })

    el.minutes.onkeypress = (event) => /\d/.test(event.key)  // esse \d funciona no teste para verificar se o caracter digitado é um número, se não for, a afirmação é falsa 

    el.minutes.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent
        time = time > 60 ? 60 : time

        state.minutes = time
        state.seconds = 0 

        updateDisplay()
        el.minutes.removeAttribute('contenteditable')

    })

}