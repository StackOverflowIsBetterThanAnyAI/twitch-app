export const formatWCAGTag = (tag) => {
    tag = tag.toUpperCase()

    const matchVersion = tag.match(/^(wcag)(\d+)([a]+)$/i)
    const matchSuccessCriterion = tag.match(/^(wcag)(\d+)$/i)

    if (!matchVersion && !matchSuccessCriterion) {
        return tag
    }

    if (matchVersion) {
        const [_tag, prefix, versionDigits, level] = matchVersion

        let version = ''
        if (versionDigits.length === 1) {
            version = `${versionDigits}.0`
        } else {
            version = versionDigits.slice(0, -1) + '.' + versionDigits.slice(-1)
        }

        return `${prefix} ${version} ${level}`
    } else {
        const [_tag, prefix, successCriterion] = matchSuccessCriterion

        let criterion = ''
        for (let i = 0; i < successCriterion.length; i++) {
            criterion += successCriterion.charAt(i)
            if (i < 2) {
                criterion += '.'
            }
        }

        return `${prefix} ${criterion}`
    }
}
