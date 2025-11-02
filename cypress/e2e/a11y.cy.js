describe('a11y tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.injectAxe()
    })

    it('log all axe-core WCAG 2.2 success criteria', () => {
        cy.window()
            .its('axe')
            .then((axe) => {
                const options = {
                    runOnly: {
                        type: 'tag',
                        values: [
                            'wcag2a',
                            'wcag2aa',
                            'wcag21a',
                            'wcag21aa',
                            'wcag22a',
                            'wcag22aa',
                        ],
                    },
                }

                return axe.run(options).then((results) => {
                    cy.task('log', 'Complete WCAG 2.2 axe-core evaluation:')

                    const categories = [
                        { key: 'violations', label: `❌ failed` },
                        { key: 'passes', label: `✅ passed` },
                        { key: 'incomplete', label: `⚠️  incomplete` },
                        { key: 'inapplicable', label: `⏭️  inapplicable` },
                    ]

                    categories.forEach(({ key, label }) => {
                        const items = results[key] || []
                        cy.task('log', `\n=== ${label} (${items.length}) ===`)

                        items.forEach((rule) => {
                            const wcagRefs =
                                (rule.tags || [])
                                    .filter((tag) => /^wcag/.test(tag))
                                    .join(', ') || 'no WCAG reference'

                            cy.task('log', `→ Rule: ${rule.id}`)
                            cy.task('log', `  Description: ${rule.help}`)
                            cy.task('log', `  Impact: ${rule.impact || 'n/a'}`)
                            cy.task('log', `  WCAG: ${wcagRefs}`)
                            cy.task('log', `  Help: ${rule.helpUrl}`)
                        })
                    })

                    cy.writeFile(
                        'cypress/reports/a11y-report-wcag.json',
                        results
                    )
                })
            })
    })
})
