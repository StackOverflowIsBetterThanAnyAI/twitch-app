export const getRandomChars = () => {
    let randomState = ''
    for (let i = 0; i < 16; i++) {
        let char = Math.round(Math.random() * 2)
        switch (char) {
            case 0:
                randomState += String.fromCharCode(Math.random() * 10 + 48)
                break
            case 1:
                randomState += String.fromCharCode(Math.random() * 26 + 65)
                break
            case 2:
                randomState += String.fromCharCode(Math.random() * 26 + 97)
                break
        }
    }
    return randomState
}
