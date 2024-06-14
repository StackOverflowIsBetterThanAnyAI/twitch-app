import { FC, useContext } from 'react'
import { LANGUAGES } from '../../../constants'
import { getLanguageNameByCode } from '../../../helper/getLanguageNameByCode'
import ButtonIcon from '../ButtonIcon'
import Icon from '../Icon'
import ButtonApply from './ButtonApply'
import { ContextLanguage } from '../../../App'

type FilterLanguagePopupProps = {
    currentIndex: number
    disabledIndex: number
    handleButtonApplyClick: () => void
    handleClickBackFromLanguage: () => void
    handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    handleSelectKeyDown: (e: React.KeyboardEvent<HTMLSelectElement>) => void
    popupLanguageRef: React.MutableRefObject<HTMLDivElement | null>
    selectLanguageRef: React.MutableRefObject<HTMLSelectElement | null>
}

const FilterLanguagePopup: FC<FilterLanguagePopupProps> = ({
    currentIndex,
    disabledIndex,
    handleButtonApplyClick,
    handleClickBackFromLanguage,
    handleSelectChange,
    handleSelectKeyDown,
    popupLanguageRef,
    selectLanguageRef,
}) => {
    const contextLanguage = useContext(ContextLanguage)
    if (!contextLanguage) {
        throw new Error(
            'ContextLanguage must be used within a ContextLanguage.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [language, setLanguage] = contextLanguage

    return (
        <div
            className="flex flex-col gap-2 h-[30dvh] min-w-44 w-[20vw] max-w-80"
            ref={popupLanguageRef}
        >
            <div className="flex flex-row border-b pb-2 items-center justify-between">
                <ButtonIcon
                    type="Back"
                    ariaLabel="Back to Settings."
                    onClick={handleClickBackFromLanguage}
                    place="left"
                />
                <h2 className="text-base lg:text-lg">Language</h2>
                <Icon
                    type="Country"
                    code={language.replace('en', 'gb').replace('sv', 'se')}
                    language={getLanguageNameByCode(language)}
                />
            </div>
            <select
                size={LANGUAGES.length}
                className="bg-zinc-700 focus-visible:outline focus-visible:outline-1 focus-visible:outline-zinc-50 rounded-md"
                defaultValue={getLanguageNameByCode(language)}
                onKeyDown={handleSelectKeyDown}
                onDoubleClick={handleButtonApplyClick}
                onChange={handleSelectChange}
                autoFocus
                ref={selectLanguageRef}
            >
                {LANGUAGES.map((lang) => {
                    const [name, code] = Object.entries(lang)[0]
                    return (
                        <option
                            key={code}
                            className={`px-2 py-1 rounded-md ${
                                code === language
                                    ? 'bg-zinc-600 text-zinc-400'
                                    : 'hover:bg-zinc-800 hover:text-slate-300'
                            }`}
                            value={code}
                            disabled={code === language}
                        >
                            {name}
                        </option>
                    )
                })}
            </select>
            <ButtonApply
                handleClick={handleButtonApplyClick}
                disabled={currentIndex === disabledIndex}
            >
                Apply
            </ButtonApply>
        </div>
    )
}

export default FilterLanguagePopup
