import { formatWCAGTag } from '../support/formatWCAGTag'
import { isGoodStatusCode } from '../support/isGoodStatusCode'

describe('accessibility tests', () => {
    const pages = ['/', '/admin']

    pages.forEach((page) => {
        it(`WCAG 2.2 accessibility evaluation of ${
            page === '/' ? 'Homepage' : page
        }`, () => {
            cy.request({
                url: page,
                failOnStatusCode: false,
            }).then((response) => {
                const statusCode = response.status
                if (!isGoodStatusCode(statusCode, page)) {
                    return
                }

                cy.visit(page)
                cy.injectAxe()

                const safeName = page.replace(/^\//, '').toLowerCase()
                const reportPath = `cypress/reports/a11y-report-wcag-${
                    safeName === '' ? 'homepage' : safeName
                }.json`

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
                            cy.task(
                                'log',
                                `\n=== WCAG 2.2 accessibility evaluation of ${
                                    page === '/' ? 'Homepage' : page
                                } ===`
                            )

                            const categories = [
                                { key: 'violations', label: `❌ failed` },
                                { key: 'passes', label: `✅ passed` },
                                { key: 'incomplete', label: `⚠️  incomplete` },
                                {
                                    key: 'inapplicable',
                                    label: `⏭️  inapplicable`,
                                },
                            ]

                            categories.forEach(({ key, label }) => {
                                const items = results[key] || []
                                cy.task(
                                    'log',
                                    `\n===== ${label} (${items.length}) =====`
                                )

                                items.forEach((rule) => {
                                    const wcagRefs =
                                        (rule.tags || [])
                                            .filter((tag) => /^wcag/i.test(tag))
                                            .map((tag) => formatWCAGTag(tag))
                                            .join(', ') || 'no WCAG reference'

                                    cy.task('log', `→ Rule: ${rule.id}`)
                                    cy.task(
                                        'log',
                                        `  Description: ${rule.help}`
                                    )
                                    cy.task(
                                        'log',
                                        `  Impact: ${rule.impact || 'n/a'}`
                                    )
                                    cy.task('log', `  WCAG: ${wcagRefs}`)
                                    cy.task('log', `  Help: ${rule.helpUrl}`)
                                })
                            })

                            cy.writeFile(reportPath, results)
                        })
                    })
            })
        })
    })
})
