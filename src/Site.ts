import { BoardBalda, BoardBaldaParam } from "./BoardBalda"
import { BoardTic, BoardTicParam } from "./BoardTic"
import { Game } from "./Game"
import { GameVC } from "./GameVC"
import { InputBalda } from "./InputBalda"
import { InputTic } from "./InputTic"
import { State } from "./State"

type Saving = {
    key: string
    game: Game
}

const gamesTypes: Record<string, () => Game> = {
    "Крестики-нолики": () => {
        return new Game(
            new State(new BoardTic(), "X"),
            new InputTic(),
            BoardTicParam
        )
    },
    "Балда": () => {
        return new Game(
            new State(new BoardBalda(), ""),
            new InputBalda(), 
            BoardBaldaParam
        )
    },
}

const gameSelect = <HTMLSelectElement>document.getElementById("gameSelect")
const saveGameButton = <HTMLButtonElement>document.getElementById("saveGameButton")
const loadGameButton = <HTMLButtonElement>document.getElementById("loadGameButton")
const boardChoose = <HTMLSelectElement>document.getElementById("boardChoose")
const boardChooseButton = <HTMLButtonElement>document.getElementById("boardChooseButton")

export class Site {
    game: Game
    games: Saving[] = []

    constructor(
        gameType: string = "Крестики-нолики"
    ) {
        this.game = gamesTypes[gameType]()
        this.fillGames()
        
        saveGameButton.onclick = () => {
            this.save()
        }
        
        loadGameButton.onclick = () => {
            const ops = gameSelect.options
            let index = -1
            for (let i = 0; i < ops.length; i++) {
                if (ops[i].selected) {
                    index = i
                    break
                }
            }
            if (index >= 0) {
                this.load(index)
            }
        }

        const ops = boardChoose.options
        for (let game in gamesTypes) {
            ops.add(new Option(game, game))
        }

        boardChooseButton.onclick = () => {
            let choosed = ""
            for (let i = 0; i < ops.length; i++) {
                if (ops[i].selected) {
                    choosed = ops[i].value
                    break
                }
            }
            const gameCreator = gamesTypes[choosed]
            if (gameCreator != null) {
                this.game = gameCreator()
                GameVC.load(this.game)
            }
        }

        GameVC.load(this.game)
    }

    private fillGames() {
        const ops = gameSelect.options
        for (let i = ops.length - 1; i >= 0; i--) {
            ops.remove(i)
        }
        for (let i = 0; i < this.games.length; i++) {
            const key = this.games[i].key
            const elem = new Option(key, String(i))
            ops.add(elem)
        }
    }

    save() {
        const key = new Date().toLocaleString()
        this.games.push({
            key: key,
            game: this.game.clone()
        })
        this.fillGames()
        console.log(`Игра сохранена под ключом: "${key}"`)
    }

    load(index: number): boolean {
        if (index < 0 || index >= this.games.length) {
            console.log(`Игра с индексом ${index} не найдена.`)
            return false
        }
        const savedGame = this.games[index].game.clone()
        this.game = savedGame
        GameVC.load(this.game)
        console.log(`Игра "${this.games[index].key}" загружена.`)
        return true
    }

    keys(): string[] {
        return this.games.map((saving, index) => `${index}: ${saving.key}`)
    }
}
