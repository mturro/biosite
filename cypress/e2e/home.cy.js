describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has the correct page title', () => {
    cy.title().should('eq', '(mturro:dotcom)')
  })

  it('renders the h1 with site name', () => {
    cy.get('h1').should('contain.text', '(mturro:dotcom)')
  })

  it('does not show the hamburger navigation', () => {
    cy.get('nav').should('not.exist')
  })

  it('has internal links to about and journal', () => {
    cy.get('a[href="/about"]').should('exist')
    cy.get('a[href="/journal"]').should('exist')
  })

  it('has external links with correct hrefs', () => {
    cy.get('a[href="https://github.com/mturro"]').should('exist')
    cy.get('a[href="https://shakedown.social/@mturro"]').should('exist')
    cy.get('a[href="https://bsky.app/profile/mturro.com"]').should('exist')
    cy.get('a[href="https://linkedin.com/in/mturro"]').should('exist')
  })

  it('mastodon and bluesky links have rel="me"', () => {
    cy.get('a[href="https://shakedown.social/@mturro"]').should('have.attr', 'rel', 'me')
    cy.get('a[href="https://bsky.app/profile/mturro.com"]').should('have.attr', 'rel', 'me')
  })

  it('renders the GitHub calendar', () => {
    cy.get('.calendar-wrapper').should('be.visible')
  })

  it('clicking "bio (approximately)" navigates to /about', () => {
    cy.get('a[href="/about"]').click()
    cy.url().should('include', '/about')
  })

  it('clicking "journal" navigates to /journal', () => {
    cy.get('a[href="/journal"]').click()
    cy.url().should('include', '/journal')
  })
})
