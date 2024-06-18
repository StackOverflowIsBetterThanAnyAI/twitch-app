export const getEnglishLanguageName = (lang: string) => {
    const languages = [
        'de',
        'en',
        'es',
        'fr',
        'it',
        'hu',
        'nl',
        'no',
        'pl',
        'pt',
        'ro',
        'sk',
        'fi',
        'sv',
        'tr',
        'ru',
    ]
    const translations = [
        'German',
        'English',
        'Spanish',
        'French',
        'Italian',
        'Hungarian',
        'Dutch',
        'Norwegian',
        'Polish',
        'Portuguese',
        'Romanian',
        'Slovakian',
        'Finnish',
        'Swedish',
        'Turkish',
        'Russian',
    ]
    return translations[languages.indexOf(lang)]
}
