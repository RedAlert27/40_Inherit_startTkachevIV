import { BoardParam } from "./Board"
import { GameVC } from "./GameVC"
import { Input } from "./Input"
import { State } from "./State"

export class Game {
    steps: State[]
    current: number
    boardParam: BoardParam
    input: Input

    constructor(
        steps: State[] | State,
        input: Input,
        boardParam: BoardParam,
        current: number = 0
    ) {
        if (Array.isArray(steps)) {
            this.steps = steps.map(state => state.clone())
        } else {
            this.steps = [steps.clone()]
        }
        this.current = Math.min(current, this.steps.length - 1)
        this.boardParam = boardParam
        this.input = input
    }

    get state(): State {
        return this.steps[this.current].clone()
    }

    clone(): Game {
        return new Game(this.steps, this.input, this.boardParam, this.current)
    }

    move(index: number): boolean {
        const currentState = this.steps[this.current]
        const boardCopy = currentState.board.clone()
        
        const sym = this.input.sym || currentState.sym
        
        if (!boardCopy.move(index, sym)) {
            return false
        }
        
        if (this.current < this.steps.length - 1) {
            this.steps = this.steps.slice(0, this.current + 1)
        }
        
        const nextSym = currentState.sym
        const nextState = new State(boardCopy, nextSym)
        this.steps.push(nextState)
        this.current = this.steps.length - 1
        
        this.input.move()
        
        GameVC.draw()
        return true
    }

    toStep(step: number): boolean {
        if (step < 0 || step >= this.steps.length) {
            return false
        }
        this.current = step
        GameVC.draw()
        return true
    }
}
