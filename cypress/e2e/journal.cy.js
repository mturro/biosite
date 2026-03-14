const mockPosts = {
  data: {
    posts: [
      {
        id: 'post-1',
        body: 'This is my first journal entry. It has some content to read.',
        created: '2024-01-15T10:00:00Z',
      },
      {
        id: 'post-2',
        body: 'This is my second journal entry with more thoughts.',
        created: '2024-02-20T14:30:00Z',
      },
    ],
  },
}

describe('Journal Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://write.as/api/collections/mturro/posts', mockPosts).as('getPosts')
    cy.visit('/journal')
    cy.wait('@getPosts')
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

  it('does not show a fetch error', () => {
    cy.get('.text-red-600').should('not.exist')
  })

  describe('when the API fails', () => {
    it('displays an error message', () => {
      cy.intercept('GET', 'https://write.as/api/collections/mturro/posts', {
        statusCode: 500,
      }).as('getPostsError')
      cy.visit('/journal')
      cy.wait('@getPostsError')
      cy.get('.text-red-600').should('be.visible')
    })
  })
})
