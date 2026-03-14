describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('renders the header subtitle', () => {
    cy.get('h1').should('contain.text', 'tedious')
  })

  it('shows the hamburger navigation', () => {
    cy.get('nav button').should('be.visible')
  })

  it('renders markdown content with headings', () => {
    cy.get('h3').should('have.length.greaterThan', 0)
  })

  it('contains known bio headings', () => {
    cy.get('h3').contains('Who is @mturro?').should('exist')
    cy.get('h3').contains('A preface, an update:').should('exist')
  })

  it('footer has rel="me" link to shakedown.social', () => {
    cy.get('footer a[href*="shakedown.social"]').should('have.attr', 'rel', 'me')
  })
})
