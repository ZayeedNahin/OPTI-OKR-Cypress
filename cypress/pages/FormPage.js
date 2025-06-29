class FormPage {
  visitForm() {
    cy.visit('https://demoqa.com/automation-practice-form')
    cy.xpath("//h1[normalize-space()='Practice Form']").should('exist')
  }

  enterFirstName(name) {
    cy.xpath("//input[@id='firstName']").should('exist').click().type(name)
  }

  FirstNameError(){
    cy.xpath("//input[@id='firstName']").should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)')
  }

  LastNameError(){
    cy.xpath("//input[@id='lastName']").should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)')
  }

  EmailError(){
    cy.xpath("//input[@id='userEmail']").should('have.css', 'border-color', 'rgb(220, 53, 69)')
  }



  enterLastName(name) {
    cy.xpath("//input[@id='lastName']").should('exist').click().type(name)
  }

  enterEmail(email) {
    cy.xpath("//input[@id='userEmail']").should('exist').click().type(email)
  }

  selectGender(gender) {
    cy.xpath(`//label[normalize-space()='${gender}']`).should('exist').click()
  }

  enterPhoneNumber(phone) {
    cy.xpath("//input[@id='userNumber']").should('exist').click().type(phone)
  }

  selectDateOfBirth(day, month, year) {
    cy.xpath("//input[@id='dateOfBirthInput']").should('exist').click()
    cy.xpath("//select[@class='react-datepicker__month-select']").select(month)
    cy.xpath("//select[@class='react-datepicker__year-select']").select(year)
    cy.xpath(`//div[contains(@class, 'react-datepicker__day--0${day}')]`).click()
  }

  enterSubjects(subjects) {
    cy.xpath("//input[@id='subjectsInput']").should('exist').click()
    subjects.forEach((subject) => {
      cy.xpath("//input[@id='subjectsInput']").type(subject).type('{enter}')
    })
  }

  selectHobbies(hobbies) {
    hobbies.forEach((hobby) => {
      cy.xpath(`//label[normalize-space()='${hobby}']`).should('exist').click()
    })
  }

  uploadPicture() {
    cy.xpath("//input[@id='uploadPicture']")
      .should('exist')
      .upload_file('Images/images.jpg', 'image/jpeg', '//input[@id="uploadPicture"]')
  }

  enterAddress(address) {
    cy.xpath("//textarea[@id='currentAddress']").should('exist').click().type(address)
  }

  selectState(state) {
    cy.xpath("//div[contains(text(),'Select State')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${state}')]`).should('exist').click()
  }

  selectCity(city) {
    cy.xpath("//div[contains(text(),'Select City')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${city}')]`).should('exist').click()
  }

  submitForm() {
    cy.xpath("//button[@id='submit']").should('exist').click()
  }

  modalExists() {
    cy.xpath("//div[@class='modal-body']").should('exist')
  }

  modalDoesNotExists() {
    cy.xpath("//div[@class='modal-body']").should('not.exist')
  }

  verifySubmissionModal(firstName, lastName) {
    cy.xpath("//div[@class='modal-body']").should('exist')
    cy.xpath("//div[@id='example-modal-sizes-title-lg']")
      .should('contain', 'Thanks for submitting the form')
    cy.xpath("(//tbody)[1]").should('contain', `${firstName} ${lastName}`)
  }
}

export default new FormPage()
