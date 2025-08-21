import { useEffect } from 'react'
import { getEnglishLanguageName } from '../helper/getEnglishLanguageName'

export const useDocumentTitle = (language: string, seoSearchText: string) => {
    useEffect(() => {
        document.title = `Twitch-App | ${getEnglishLanguageName(
            language
        )} Livestreams${seoSearchText ? ` | ${seoSearchText}` : ''}`
    }, [language, seoSearchText])
}
