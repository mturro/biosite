describe('Journal Page', () => {
  beforeEach(() => {
    cy.visit('/journal')
  })

  it('renders the header subtitle', () => {
    cy.get('h1').should('contain.text', 'every once in a while')
  })

  it('shows the hamburger navigation', () => {
    cy.get('nav button').should('be.visible')
  })

  it('renders at least one journal post', () => {
    cy.get('article').should('have.length.greaterThan', 0)
  })

  it('each post has a visible date', () => {
    cy.get('article').each(($article) => {
      cy.wrap($article).find('.text-gray-600').should('be.visible')
    })
  })

  it('each post body has line-clamp-3 class', () => {
    cy.get('article').each(($article) => {
      cy.wrap($article).find('.line-clamp-3').should('exist')
    })
  })

  it('posts are sorted newest first', () => {
    const dates = []
    cy.get('article .text-gray-600').each(($el) => {
      dates.push(new Date($el.text()))
    }).then(() => {
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i - 1].getTime()).to.be.at.least(dates[i].getTime())
      }
    })
  })
})
