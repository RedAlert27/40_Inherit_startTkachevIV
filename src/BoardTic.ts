import { Board, BoardParam } from "./Board";

export class BoardTic extends Board {
    constructor(
        str: string[] | string = "_________",
        init: boolean = true        
    ) {
        // Если длина str != 9, используем строку по умолчанию
        let cellsStr: string
        if (Array.isArray(str)) {
            cellsStr = str.join('')
        } else {
            cellsStr = str
        }
        
        if (cellsStr.length !== 9) {
            cellsStr = "_________"
        }

        // Инициализация статических полей при необходимости
        if (init) {
            ;(BoardTic as any).row = BoardTicParam.row
            ;(BoardTic as any).col = BoardTicParam.col
        }

        super(cellsStr)
    }

    clone(init: boolean = false): Board {
        const board = new BoardTic([...this.cells], init)
        if (init) {
            ;(BoardTic as any).row = BoardTicParam.row
            ;(BoardTic as any).col = BoardTicParam.col
        }
        return board
    }

    private getLineChar(line: number[]): string[] {
        return [this.cells[line[0]], this.cells[line[1]], this.cells[line[2]]];
    }

    private static winPos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    checkWin(): string {
        for (const line of BoardTic.winPos) {
            const [a, b, c] = this.getLineChar(line);
            if (a !== '_' && a !== ' ' && a === b && b === c) {
                return a;
            }
        }
        return "_";
    }

    override status(): string {
        const winner = this.checkWin();
        if (winner !== "_") {
            return `Победил: ${winner}`;
        }
        if (this.isFill()) {
            return "Ничья!";
        }
        return super.status();
    }
}

export const BoardTicParam: BoardParam = {
    row: 3,
    col: 3
}
