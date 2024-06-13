import { LANGUAGES } from '../constants'

export const getLanguageNameByCode = (code: string): string | undefined => {
    const language = LANGUAGES.find((lang) =>
        Object.values(lang).includes(code)
    )
    return language ? Object.keys(language)[0] : undefined
}
