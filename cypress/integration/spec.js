describe('Number', () => {
  it('Works.', () => {
    cy.visit('/leva-minimal')
    cy.findByLabelText(/number/).should('exist')

    cy.findByLabelText(/number/)
      .clear()
      .type(123)
      .blur()
    // expect 123 to be the value
    cy.findByLabelText(/number/).should('have.value', 123)
    // expect previous value when empty string is used
    cy.findByLabelText(/number/)
      .focus()
      .clear()
      .blur()
  })

  it("Doesn't accept non-numbers.", () => {
    cy.visit('/leva-minimal')

    // expect previous value when typing invalid characters
    cy.findByLabelText(/number/)
      .clear()
      .type('ABC')
      .blur()
    cy.findByLabelText(/number/).should('have.value', 10)
  })
})

describe('MinMax', () => {
  it('Works.', () => {
    cy.visit('/leva-minimal')
    cy.findByLabelText(/minmax/).should('exist')

    cy.findByLabelText(/number/)
      .clear()
      .type(13)
      .blur()
    cy.findByLabelText(/number/).should('have.value', 13)
    // expect previous value when empty string is used
    cy.findByLabelText(/number/)
      .focus()
      .clear()
      .blur()
  })

  it("Doesn't go over.", () => {
    cy.visit('/leva-minimal')

    // since value is over max, it should reset to max
    cy.findByLabelText(/minmax/)
      .clear()
      .type(123)
      .blur()
    cy.findByLabelText(/minmax/).should('have.value', 30.5)
  })

  it("Doesn't go under.", () => {
    cy.visit('/leva-minimal')

    // since value is under min, it should reset to initial
    cy.findByLabelText(/minmax/)
      .clear()
      .type(1)
      .blur()
    cy.findByLabelText(/minmax/).should('have.value', 5.5)
  })
})
