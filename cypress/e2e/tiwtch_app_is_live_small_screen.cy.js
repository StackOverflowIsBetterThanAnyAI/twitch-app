/// <reference types="cypress" />

describe('twitch-app is live for small screen sizes', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.viewport(412, 914)
    })

    it('displays the navigation bar for small screen sizes', () => {
        cy.get('[data-testid="navigation-container"]').should('have.length', 1)

        cy.get('[data-testid="navigation-container"]')
            .children()
            .should('have.length', 1)
    })

    it('displays the whole navigation bar content for small screen sizes', () => {
        cy.get('[data-testid="navigation"]').should('have.length', 1)

        cy.get('[data-testid="navigation"]').children().should('have.length', 3)
    })

    it('displays the homepage button for small screen sizes', () => {
        cy.get('[data-testid="navigation-homepage-anchor"]').should(
            'have.length',
            1
        )

        cy.get('[data-testid="navigation-homepage-anchor"]')
            .invoke('attr', 'href')
            .should('eq', '/')

        cy.get('[data-testid="navigation-homepage-anchor"]')
            .children()
            .should('have.length', 1)

        cy.get('[data-testid="navigation-homepage-anchor"]')
            .children()
            .invoke('attr', 'alt')
            .should('eq', 'Twitch-App Homepage')
    })

    it('displays the search bar for small screen sizes', () => {
        cy.get('[data-testid="navigation-searchbar-toggle"]').should(
            'have.length',
            1
        )

        cy.get('[data-testid="navigation-searchbar-toggle"]')
            .invoke('attr', 'title')
            .should('eq', 'Toggle search bar.')

        cy.get('[data-testid="navigation-searchbar-toggle"]')
            .invoke('attr', 'aria-label')
            .should('eq', 'Search current Livestreams.')

        cy.get('[data-testid="navigation-searchbar-toggle"]')
            .children()
            .should('have.length', 1)

        cy.get('[data-testid="navigation-searchbar-toggle"]')
            .children()
            .children()
            .should('have.length', 1)
    })

    it('displays the login button for small screen sizes', () => {
        cy.get('[data-testid="navigation-login-anchor"]').should(
            'have.length',
            1
        )

        cy.get('[data-testid="navigation-login-anchor"]')
            .invoke('attr', 'href')
            .should(
                'include',
                'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id='
            )

        cy.get('[data-testid="navigation-login-anchor"]')
            .invoke('attr', 'title')
            .should('eq', 'Log in')

        cy.get('[data-testid="navigation-login-anchor"]')
            .children()
            .should('have.length', 1)

        cy.get('[data-testid="navigation-login-anchor"]')
            .children()
            .invoke('attr', 'alt')
            .should('eq', 'Settings')
    })
})
