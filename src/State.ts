import { Board } from "./Board"

export class State {
    board: Board
    sym: string

    constructor(
        board: Board,
        sym: string
    ) {
        this.board = board.clone()
        this.sym = sym
    }

    clone(): State {
        return new State(this.board.clone(), this.sym)
    }
}
