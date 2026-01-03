/// <reference types="cypress" />

describe('twitch-app contains footer', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('displays the footer', () => {
        cy.get('[data-testid="footer-container"]').should('have.length', 1)

        cy.get('[data-testid="footer-container"]')
            .children()
            .should('have.length', 1)
    })

    it('contains the correct footer content', () => {
        cy.get('[data-testid="footer-content"]').should('have.length', 1)

        cy.get('[data-testid="footer-content"]')
            .should(
                'contain.text',
                'Copyright © 2026 Michael Münzenhofer. All Rights Reserved.GitHub Repository'
            )
            .should('contain.text', 'GitHub Repository')

        cy.get('[data-testid="footer-content"]')
            .children()
            .should('have.length', 1)
    })

    it('links to the correct GitHub repository', () => {
        cy.get('[data-testid="footer-anchor"]').should('have.length', 1)

        cy.get('[data-testid="footer-anchor"]')
            .invoke('attr', 'href')
            .should(
                'eq',
                'https://github.com/StackOverflowIsBetterThanAnyAI/twitch-app'
            )
    })
})
