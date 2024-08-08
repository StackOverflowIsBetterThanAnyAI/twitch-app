/// <reference types="cypress" />

describe('twitch-app contains navigation bar for large screen sizes', () => {
    beforeEach(() => {
        cy.visit('/')
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
        cy.get('[data-testid="navigation-login-button"]').should(
            'have.length',
            1
        )

        cy.get('[data-testid="navigation-login-button"]')
            .children()
            .should('have.length', 1)

        cy.get('[data-testid="navigation-login-button"]')
            .children()
            .invoke('attr', 'alt')
            .should('eq', 'Log in')

        cy.get('[data-testid="navigation-login-button"]')
            .children()
            .invoke('attr', 'title')
            .should('eq', 'Log in')
    })
})
