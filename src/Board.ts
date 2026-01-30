export type BoardParam = {
    row: number,
    col: number
}

export abstract class Board {
    cells: string[]
    static row: number = 0
    static col: number = 0

    constructor(
        str: string[] | string,
        row?: number,
        col?: number,
    ) {
        // Инициализация статических полей при их наличии
        if (row !== undefined && col !== undefined) {
            (this.constructor as any).row = row
            ;(this.constructor as any).col = col
        }

        // Инициализация массива cells
        if (Array.isArray(str)) {
            this.cells = [...str]
        } else {
            this.cells = str.split('')
        }
    }

    abstract clone(): Board

    isFill(): boolean {
        return !this.cells.includes('_') && !this.cells.includes(' ')
    }

    move(index: number, sym: string): boolean {
        if (index < 0 || index >= this.cells.length || 
            (this.cells[index] !== '_' && this.cells[index] !== ' ')) {
            return false
        }
        this.cells[index] = sym
        return true
    }

    status(): string {
        return this.isFill() ? "Игра закончена" : "Идет игра"
    }
}
