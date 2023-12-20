describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
    cy.contains('username')
    cy.contains('password')
  })

  it('user can log in', function() {
    cy.get('#username').type('gaston')
      cy.get('#password').type('gaston118')
      cy.contains('login').click()
      cy.contains('gaston118 logged-in')
  })

  it('login fails with wrong password', function() {
      cy.get('#username').type('gaston')
      cy.get('#password').type('gaston')
      cy.contains('login').click()
      cy.contains('wrong credential')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('gaston')
      cy.get('#password').type('gaston118')
      cy.contains('login').click()
      cy.contains('gaston118 logged-in')
    })

    it('a new note can be created', function() {
      cy.contains('new_blog').click()
      cy.contains('Create new blog')
  
      cy.get('#title').type('gaston')
      cy.get('#author').type('gaston118')
      cy.get('#likes').type(100)
  
      cy.contains('add').click()
    })

    it("like a blog", function(){
      cy.contains("mepego un palo")
      cy.contains("View").click()
      cy.contains("like").click()
    })

    it("user can delete a blog they created", function(){
      cy.contains("probando5").should('be.visible');
    
      cy.contains("probando5").parent().find("button:contains('View')").click();
    
      cy.contains("Delete").click();
    
    })
  })

})
