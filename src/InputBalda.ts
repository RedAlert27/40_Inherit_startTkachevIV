import { Input } from "./Input";

export class InputBalda extends Input {
    override get html(): string {
        return "<input id='inputBalda'></input>"
    }

    get sym(): string {
        const inputElement = document.getElementById('inputBalda') as HTMLInputElement
        return inputElement ? inputElement.value.charAt(0) || '' : ''
    }

    move(): void {
        const inputElement = document.getElementById('inputBalda') as HTMLInputElement
        if (inputElement) {
            inputElement.value = ''
        }
    }
}
