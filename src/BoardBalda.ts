import { Board, BoardParam } from "./Board";

export class BoardBalda extends Board {
    constructor(
        str: string[] | string = "балда",
        init: boolean = true
    ) {
        // Если длина str == 5, дополняем пробелами до 25 символов
        let cellsStr: string
        
        if (Array.isArray(str)) {
            cellsStr = str.join('')
        } else {
            cellsStr = str
        }

        if (cellsStr.length === 5) {
            cellsStr = "          " + cellsStr + "          "
        }

        // Инициализация статических полей при необходимости
        if (init) {
            ;(BoardBalda as any).row = BoardBaldaParam.row
            ;(BoardBalda as any).col = BoardBaldaParam.col
        }

        super(cellsStr)
    }

    clone(init: boolean = false): Board {
        const board = new BoardBalda([...this.cells], init)
        if (init) {
            ;(BoardBalda as any).row = BoardBaldaParam.row
            ;(BoardBalda as any).col = BoardBaldaParam.col
        }
        return board
    }
}

export const BoardBaldaParam: BoardParam = {
    row: 5,
    col: 5
}
