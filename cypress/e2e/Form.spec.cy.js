describe('Form automation script', () => {
  it('Verify successful form submission with valid data', () => {
    cy.visit('https://demoqa.com/automation-practice-form')
    cy.xpath("//h1[normalize-space()='Practice Form']").should('exist')
    cy.fixture('FormData').then((data)=> {
    cy.xpath("//input[@id='firstName']").should('exist').click().type(data.firstName)
    cy.xpath("//input[@id='lastName']").should('exist').click().type(data.lastName)
    cy.xpath("//input[@id='userEmail']").should('exist').click().type(data.email)
    // cy.xpath("(//div[@id='genterWrapper'])//div[@class='col-md-9 col-sm-12']//div[1]").should('exist').click()
    cy.xpath(`//label[normalize-space()='${data.gender}']`).should('exist').click()
    cy.xpath("//input[@id='userNumber']").should('exist').click().type(data.phone)
    cy.xpath("//input[@id='dateOfBirthInput']").should('exist').click().within(() => {
      cy.xpath("//select[@class='react-datepicker__month-select']").select(data.birthMonth)
      cy.xpath("//select[@class='react-datepicker__year-select']").select(data.birthYear)
      cy.xpath(`//div[contains(@class, 'react-datepicker__day--0${data.birthDay}')]`).click()
    })
    cy.xpath("//input[@id='subjectsInput']").should('exist').click()
    data.subjects.forEach((subject) => {
      cy.xpath("//input[@id='subjectsInput']").type(subject).type('{enter}')
    })

    data.hobbies.forEach((hobby) => {
      cy.xpath(`//label[normalize-space()='${hobby}']`).should('exist').click()
    })

    cy.xpath("//input[@id='uploadPicture']").should('exist').upload_file('Images/images.jpg', 'image/jpeg', '//input[@id="uploadPicture"]')
    cy.xpath("//textarea[@id='currentAddress']").should('exist').click().type(data.address)
    cy.xpath("//div[contains(text(),'Select State')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${data.state}')]`).should('exist').click()
    cy.xpath("//div[contains(text(),'Select City')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${data.city}')]`).should('exist').click()
    cy.xpath("//button[@id='submit']").should('exist').click()
    cy.xpath("//div[@class='modal-body']").should('exist')
    cy.xpath("//div[@id='example-modal-sizes-title-lg']").should('contain', 'Thanks for submitting the form')
    cy.xpath("(//tbody)[1]").should('contain', `${data.firstName} ${data.lastName}`)
  })

  })

  it('Verify errors when mandatory fields are empty', () => {
    cy.visit('https://demoqa.com/automation-practice-form')
    cy.xpath("//h1[normalize-space()='Practice Form']").should('exist')
    cy.xpath("//button[@id='submit']").should('exist').click()
    cy.xpath("//div[@class='modal-body']").should('not.exist')
    cy.xpath("//input[@id='firstName']").should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.xpath("//input[@id='lastName']").should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.xpath("//input[@id='userEmail']").should('exist')
    cy.xpath("//label[normalize-space()='Male']").should('exist').should('have.css', 'color', 'rgb(220, 53, 69)')
    cy.xpath("//input[@id='userNumber']").should('exist').should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.xpath("//input[@id='dateOfBirthInput']").should('exist')
    cy.xpath("//input[@id='subjectsInput']").should('exist')
    cy.xpath("//label[text()='Music']").should('exist')
    cy.xpath("//input[@id='uploadPicture']").should('exist')
    cy.xpath("//textarea[@id='currentAddress']").should('exist')
    cy.xpath("//div[contains(text(),'Select State')]").should('exist')
    cy.xpath("//div[contains(text(),'Select City')]").should('exist')
    
  })

  it('Verify invalid email format handling', () => {
    cy.visit('https://demoqa.com/automation-practice-form')
    cy.xpath("//h1[normalize-space()='Practice Form']").should('exist')
    cy.fixture('FormData').then((data)=> {
    cy.xpath("//input[@id='firstName']").should('exist').click().type(data.firstName)
    cy.xpath("//input[@id='lastName']").should('exist').click().type(data.lastName)
    cy.xpath("//input[@id='userEmail']").should('exist').click().type(data.InvalidEmail).blur()
    cy.xpath(`//label[normalize-space()='${data.gender}']`).should('exist').click()
    cy.xpath("//input[@id='userNumber']").should('exist').click().type(data.phone)
    cy.xpath("//input[@id='dateOfBirthInput']").should('exist').click().within(() => {
      cy.xpath("//select[@class='react-datepicker__month-select']").select(data.birthMonth)
      cy.xpath("//select[@class='react-datepicker__year-select']").select(data.birthYear)
      cy.xpath(`//div[contains(@class, 'react-datepicker__day--0${data.birthDay}')]`).click()
    })
    cy.xpath("//input[@id='subjectsInput']").should('exist').click()
    data.subjects.forEach((subject) => {
      cy.xpath("//input[@id='subjectsInput']").type(subject).type('{enter}')
    })

    data.hobbies.forEach((hobby) => {
      cy.xpath(`//label[normalize-space()='${hobby}']`).should('exist').click()
    })

    cy.xpath("//input[@id='uploadPicture']").should('exist').upload_file('Images/images.jpg', 'image/jpeg', '//input[@id="uploadPicture"]')
    cy.xpath("//textarea[@id='currentAddress']").should('exist').click().type(data.address)
    cy.xpath("//div[contains(text(),'Select State')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${data.state}')]`).should('exist').click()
    cy.xpath("//div[contains(text(),'Select City')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${data.city}')]`).should('exist').click()
    cy.xpath("//button[@id='submit']").should('exist').click()
    cy.xpath("//div[@class='modal-body']").should('not.exist')
    cy.xpath("//input[@id='userEmail']").should('have.css', 'border-color', 'rgb(220, 53, 69)')
   
  })

  })

  it('Validate mobile field validation with less than 10 digits', () => {
    cy.visit('https://demoqa.com/automation-practice-form')
    cy.xpath("//h1[normalize-space()='Practice Form']").should('exist')
    cy.fixture('FormData').then((data)=> {
    cy.xpath("//input[@id='firstName']").should('exist').click().type(data.firstName)
    cy.xpath("//input[@id='lastName']").should('exist').click().type(data.lastName)
    cy.xpath("//input[@id='userEmail']").should('exist').click().type(data.email)
    cy.xpath(`//label[normalize-space()='${data.gender}']`).should('exist').click()
    cy.xpath("//input[@id='userNumber']").should('exist').click().type(data.InvalidPhone).blur()
    cy.xpath("//input[@id='dateOfBirthInput']").should('exist').click().within(() => {
      cy.xpath("//select[@class='react-datepicker__month-select']").select(data.birthMonth)
      cy.xpath("//select[@class='react-datepicker__year-select']").select(data.birthYear)
      cy.xpath(`//div[contains(@class, 'react-datepicker__day--0${data.birthDay}')]`).click()
    })
    cy.xpath("//input[@id='subjectsInput']").should('exist').click()
    data.subjects.forEach((subject) => {
      cy.xpath("//input[@id='subjectsInput']").type(subject).type('{enter}')
    })

    data.hobbies.forEach((hobby) => {
      cy.xpath(`//label[normalize-space()='${hobby}']`).should('exist').click()
    })

    cy.xpath("//input[@id='uploadPicture']").should('exist').upload_file('Images/images.jpg', 'image/jpeg', '//input[@id="uploadPicture"]')
    cy.xpath("//textarea[@id='currentAddress']").should('exist').click().type(data.address)
    cy.xpath("//div[contains(text(),'Select State')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${data.state}')]`).should('exist').click()
    cy.xpath("//div[contains(text(),'Select City')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${data.city}')]`).should('exist').click()
    cy.xpath("//button[@id='submit']").should('exist').click()
    cy.xpath("//div[@class='modal-body']").should('not.exist')
    cy.xpath("//input[@id='userNumber']").should('have.css', 'border-color', 'rgb(220, 53, 69)')
   
  })


  })

  it('Validate mobile field validation with non-numeric', () => {
    cy.visit('https://demoqa.com/automation-practice-form')
    cy.xpath("//h1[normalize-space()='Practice Form']").should('exist')
    cy.fixture('FormData').then((data)=> {
    cy.xpath("//input[@id='firstName']").should('exist').click().type(data.firstName)
    cy.xpath("//input[@id='lastName']").should('exist').click().type(data.lastName)
    cy.xpath("//input[@id='userEmail']").should('exist').click().type(data.email)
    cy.xpath(`//label[normalize-space()='${data.gender}']`).should('exist').click()
    cy.xpath("//input[@id='userNumber']").should('exist').click().type(data.NonNumericPhone).blur()
    cy.xpath("//input[@id='dateOfBirthInput']").should('exist').click().within(() => {
      cy.xpath("//select[@class='react-datepicker__month-select']").select(data.birthMonth)
      cy.xpath("//select[@class='react-datepicker__year-select']").select(data.birthYear)
      cy.xpath(`//div[contains(@class, 'react-datepicker__day--0${data.birthDay}')]`).click()
    })
    cy.xpath("//input[@id='subjectsInput']").should('exist').click()
    data.subjects.forEach((subject) => {
      cy.xpath("//input[@id='subjectsInput']").type(subject).type('{enter}')
    })

    data.hobbies.forEach((hobby) => {
      cy.xpath(`//label[normalize-space()='${hobby}']`).should('exist').click()
    })

    cy.xpath("//input[@id='uploadPicture']").should('exist').upload_file('Images/images.jpg', 'image/jpeg', '//input[@id="uploadPicture"]')
    cy.xpath("//textarea[@id='currentAddress']").should('exist').click().type(data.address)
    cy.xpath("//div[contains(text(),'Select State')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${data.state}')]`).should('exist').click()
    cy.xpath("//div[contains(text(),'Select City')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${data.city}')]`).should('exist').click()
    cy.xpath("//button[@id='submit']").should('exist').click()
    cy.xpath("//div[@class='modal-body']").should('not.exist')
    cy.xpath("//input[@id='userNumber']").should('have.css', 'border-color', 'rgb(220, 53, 69)')
   
  })

  })

  it('Validate mobile field validation with special character', () => {
      cy.visit('https://demoqa.com/automation-practice-form')
      cy.xpath("//h1[normalize-space()='Practice Form']").should('exist')
      cy.fixture('FormData').then((data)=> {
      cy.xpath("//input[@id='firstName']").should('exist').click().type(data.firstName)
      cy.xpath("//input[@id='lastName']").should('exist').click().type(data.lastName)
      cy.xpath("//input[@id='userEmail']").should('exist').click().type(data.email)
      cy.xpath(`//label[normalize-space()='${data.gender}']`).should('exist').click()
      cy.xpath("//input[@id='userNumber']").should('exist').click().type(data.SpecialCharPhone).blur()
      cy.xpath("//input[@id='dateOfBirthInput']").should('exist').click().within(() => {
      cy.xpath("//select[@class='react-datepicker__month-select']").select(data.birthMonth)
      cy.xpath("//select[@class='react-datepicker__year-select']").select(data.birthYear)
      cy.xpath(`//div[contains(@class, 'react-datepicker__day--0${data.birthDay}')]`).click()
    })
    cy.xpath("//input[@id='subjectsInput']").should('exist').click()
    data.subjects.forEach((subject) => {
      cy.xpath("//input[@id='subjectsInput']").type(subject).type('{enter}')
    })

    data.hobbies.forEach((hobby) => {
      cy.xpath(`//label[normalize-space()='${hobby}']`).should('exist').click()
    })

    cy.xpath("//input[@id='uploadPicture']").should('exist').upload_file('Images/images.jpg', 'image/jpeg', '//input[@id="uploadPicture"]')
    cy.xpath("//textarea[@id='currentAddress']").should('exist').click().type(data.address)
    cy.xpath("//div[contains(text(),'Select State')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${data.state}')]`).should('exist').click()
    cy.xpath("//div[contains(text(),'Select City')]").should('exist').click()
    cy.xpath(`//div[contains(text(),'${data.city}')]`).should('exist').click()
    cy.xpath("//button[@id='submit']").should('exist').click()
    cy.xpath("//div[@class='modal-body']").should('not.exist')
    cy.xpath("//input[@id='userNumber']").should('have.css', 'border-color', 'rgb(220, 53, 69)')
   
  })

  })
  
})