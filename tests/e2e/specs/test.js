// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h3', 'Breakfast')
  })
})

describe('add item', () => {
  it('adding item', () => {
    cy.visit('/') // 1.

    cy.get('input.food-input') // 2.
      .type('eggs') // 3.

    
    cy.get('ul li:first') // 6.
      .click() // 7.

    cy.get('h4.net-cals') // 9.
      .should('not.have.value', '0')
  })
})
