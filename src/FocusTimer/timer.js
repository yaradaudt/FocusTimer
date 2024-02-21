import state from './state.js'
import * as el from './elements.js'
import { reset } from './actions.js'
import { kitchenTimer } from './sounds.js'

export function countdown() {

    clearTimeout(state.countdownId)

    if(!state.isRunning) {
        return
    }

    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)

    seconds--

    if(seconds < 0) {
        seconds = 59

        minutes--
    }

    if(minutes < 0) {
        reset()
        kitchenTimer.play()
        return
    }

    updateDisplay(minutes, seconds)

    state.countdownId = setTimeout(() => countdown(), 1000) /* função callback - a função countdown foi chamada novamente. Recursão */
// aqui, cada vez que aperta no play, ele descresce, então acaba empilhando os segundos e tirando a passagem correta do tempo. Esse é o acúmulo de timeout
// dessa forma, é preciso atualizar o estado dele, ou seja, incluir o countdown no state.js
// por isso, o uso do state.countdown = setTimeout e zerar o timeout na função countdown
}

export function updateDisplay(minutes, seconds) {
minutes = minutes ?? state.minutes /*nullish coalesing operator*/ 
seconds = seconds ?? state.seconds

el.minutes.textContent = String(minutes).padStart(2, "0")
el.seconds.textContent = String(seconds).padStart(2, "0")

}