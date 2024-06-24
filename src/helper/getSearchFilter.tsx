import { StreamProps } from '../types/StreamProps'

export const getSearchFilter = (
    searchText: string,
    streamData: StreamProps | undefined
) => {
    const searchTextLowerCase = searchText.toLowerCase().replaceAll(' ', '')
    if (streamData) {
        return streamData.data.filter(
            (item) =>
                item.user_name
                    .toLowerCase()
                    .replaceAll(' ', '')
                    .includes(searchTextLowerCase) ||
                item.game_name
                    .toLowerCase()
                    .replaceAll(' ', '')
                    .includes(searchTextLowerCase) ||
                item.title
                    .toLowerCase()
                    .replaceAll(' ', '')
                    .includes(searchTextLowerCase) ||
                item.tags.some((tag) =>
                    tag
                        .toLowerCase()
                        .replaceAll(' ', '')
                        .includes(searchTextLowerCase)
                )
        )
    }
}
