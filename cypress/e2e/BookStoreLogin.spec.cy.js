describe('Form automation script', () => {
  it('Verify successful form submission with valid data', () => {
    cy.visit('https://demoqa.com/automation-practice-form')
    cy.xpath("//h1[normalize-space()='Login']").should('exist')
  })
  
})