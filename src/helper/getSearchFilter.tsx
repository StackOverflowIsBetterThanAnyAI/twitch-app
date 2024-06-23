import { StreamProps } from '../types/StreamProps'

export const getSearchFilter = (
    searchText: string,
    streamData: StreamProps | undefined
) => {
    const searchTextLowerCase = searchText.toLowerCase()
    if (streamData) {
        return streamData.data.filter(
            (item) =>
                item.user_name.toLowerCase().includes(searchTextLowerCase) ||
                item.game_name.toLowerCase().includes(searchTextLowerCase) ||
                item.title.toLowerCase().includes(searchTextLowerCase) ||
                item.tags.some((tag) =>
                    tag.toLowerCase().includes(searchTextLowerCase)
                )
        )
    }
}
