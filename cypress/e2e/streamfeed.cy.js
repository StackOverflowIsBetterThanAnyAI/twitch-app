/// <reference types="cypress" />

describe('twitch-app contains valid streamfeed', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('shows default heading', () => {
        cy.get('[data-testid="streamfeed-heading-1"]').should('have.length', 1)

        cy.get('[data-testid="streamfeed-heading-1"]')
            .children()
            .should('have.length', 2)

        cy.get('[data-testid="streamfeed-heading-2"]').should('have.length', 1)

        cy.get('[data-testid="streamfeed-heading-2"]')
            .children()
            .should('have.length', 3)
    })

    it('contains correct default heading content', () => {
        cy.get('[data-testid="streamfeed-heading-1"]')
            .children()
            .eq(0)
            .contains('Current')

        cy.get('[data-testid="streamfeed-heading-1"]')
            .children()
            .eq(1)
            .contains('Top Livestream')

        cy.get('[data-testid="streamfeed-heading-2"]')
            .children()
            .eq(0)
            .contains('German Livestreams')

        cy.get('[data-testid="streamfeed-heading-2"]')
            .children()
            .eq(1)
            .contains('you might like')
    })

    it('displays current livestreams', () => {
        cy.get('[data-testid="streamfeed-container"]').should('have.length', 1)

        cy.get('[data-testid="streamfeed-container"]')
            .children()
            .should('exist')
    })

    it('displays the first livestream article', () => {
        cy.get('[data-testid="streamfeed-article-0"]').should('have.length', 1)

        cy.get('[data-testid="streamfeed-article-0"]')
            .children()
            .should('have.length', 3)

        cy.get('[data-testid="streamfeed-profilepicture-0').should(
            'have.length',
            1
        )

        cy.get('[data-testid="streamfeed-channel-0').should('have.length', 1)

        cy.get('[data-testid="streamfeed-title-0').should('have.length', 1)

        cy.get('[data-testid="streamfeed-game-0').should('have.length', 1)

        cy.get('[data-testid="streamfeed-tags-0').should('exist')
    })
})
