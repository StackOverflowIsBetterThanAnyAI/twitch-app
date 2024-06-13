import { LANGUAGES } from '../constants'

export const getLanguageIndex = (language: string) => {
    return LANGUAGES.findIndex((langObj) =>
        Object.values(langObj).includes(language)
    )
}
