export const isGoodStatusCode = (statusCode, page) => {
    if (statusCode >= 400) {
        cy.task(
            'log',
            '\n===================================================================================='
        )
        cy.task(
            'log',
            `⚠️  Skipping Accessibility Check: ${page} failed to load (Status: ${statusCode}).`
        )
        cy.task(
            'log',
            '===================================================================================='
        )
        return false
    }
    return true
}
