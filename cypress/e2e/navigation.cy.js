describe('Hamburger Navigation', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('hamburger button is visible', () => {
    cy.get('nav button').should('be.visible')
  })

  it('menu is closed by default', () => {
    cy.get('nav a').should('not.exist')
  })

  it('clicking the button opens the menu', () => {
    cy.get('nav button').click()
    cy.get('nav a').should('be.visible')
  })

  it('menu contains home, journal, and about links', () => {
    cy.get('nav button').click()
    cy.get('nav a[href="/"]').should('contain.text', 'home')
    cy.get('nav a[href="/journal"]').should('contain.text', 'journal')
    cy.get('nav a[href="/about"]').should('contain.text', 'about')
  })

  it('clicking the button again closes the menu', () => {
    cy.get('nav button').click()
    cy.get('nav a').should('be.visible')
    cy.get('nav button').click()
    cy.get('nav a').should('not.exist')
  })

  it('clicking "home" navigates to /', () => {
    cy.get('nav button').click()
    cy.get('nav a[href="/"]').click()
    cy.url().should('eq', Cypress.config('baseUrl'))
  })

  it('clicking "journal" navigates to /journal', () => {
    cy.get('nav button').click()
    cy.get('nav a[href="/journal"]').click()
    cy.url().should('include', '/journal')
  })

  it('clicking "about" navigates to /about', () => {
    cy.get('nav button').click()
    cy.get('nav a[href="/about"]').click()
    cy.url().should('include', '/about')
  })
})
