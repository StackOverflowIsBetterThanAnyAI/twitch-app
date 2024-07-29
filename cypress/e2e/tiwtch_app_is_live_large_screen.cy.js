/// <reference types="cypress" />

describe('twitch-app is live for large screen sizes', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('displays the navigation bar for large screen sizes', () => {
        cy.get('[data-testid="navigation-container"]').should('have.length', 1)

        cy.get('[data-testid="navigation-container"]')
            .children()
            .should('have.length', 1)
    })

    it('displays the whole navigation bar content for large screen sizes', () => {
        cy.get('[data-testid="navigation"]').should('have.length', 1)

        cy.get('[data-testid="navigation"]').children().should('have.length', 3)
    })

    it('displays the homepage button for large screen sizes', () => {
        cy.get('[data-testid="navigation-homepage-anchor"]').should(
            'have.length',
            1
        )

        cy.get('[data-testid="navigation-homepage-anchor"]')
            .invoke('attr', 'href')
            .should('eq', '/')

        cy.get('[data-testid="navigation-homepage-anchor"]')
            .children()
            .should('have.length', 2)

        cy.get('[data-testid="navigation-homepage-anchor"]')
            .children()
            .contains('Twitch-App')
    })

    it('displays the search bar for large screen sizes', () => {
        cy.get('[data-testid="navigation-searchbar-container"]').should(
            'have.length',
            1
        )

        cy.get('[data-testid="navigation-searchbar-container"]')
            .children()
            .should('have.length', 1)

        cy.get('[data-testid="navigation-searchbar-container"]')
            .children()
            .children()
            .should('have.length', 2)

        cy.get('[data-testid="navigation-searchbar-container"]')
            .children()
            .children()
            .invoke('attr', 'placeholder')
            .should('eq', 'Search Livestreams')
    })

    it('displays the login button for large screen sizes', () => {
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
