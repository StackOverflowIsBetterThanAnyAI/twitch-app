export const getFormattedNumber = (num: number) => {
    const format = (
        num: number,
        index: number
    ): { num: number; index: number } => {
        if (num >= 1000 && index < 2) {
            return format(num / 1000, index + 1)
        }
        return { num, index }
    }

    const formattedObject = format(num, 0)

    const formattedNumber = (() => {
        switch (formattedObject.index) {
            case 0:
                return formattedObject.num
            case 1:
                return `${formattedObject.num.toFixed(2)}k`
            case 2:
                return `${formattedObject.num.toFixed(2)}m`
        }
    })()

    return formattedNumber
}
