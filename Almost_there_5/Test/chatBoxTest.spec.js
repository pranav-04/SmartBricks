describe('Checking login', function() {
    it('Cheking login with valid credentials', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click();
        cy.url().should('include', '/users/login');
        cy.get('#username').type('joey');
        cy.get('#password').type('1');
        cy.contains('submit').click();
        cy.contains('Logout').should('be.visible');
    })

    it('Cheking login with valid credentials', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click();
        cy.url().should('include', '/users/login');
        cy.get('#username').type('chandler');
        cy.get('#password').type('2');
        cy.contains('submit').click();
        cy.contains('Logout').should('be.visible');
    })

    it('Cheking login with invalid credentials', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click();
        cy.url().should('include', '/users/login');
        cy.get('#username').type('joey');
        cy.get('#password').type('2');
        cy.contains('submit').click();
        cy.contains('Logout').should('be.visible');
    })
  })

  describe('Checking logout', function() {
      it('Checking logout without logging in', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Logout').should('not.be.visible');
      })

      it('Checking logout after logging in', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click();
        cy.get('#username').type('joey');
        cy.get('#password').type('1');
        cy.contains('submit').click();
        cy.contains('Logout').click();
        cy.contains('Login').should('be.visible');
      })
  })

  describe('Checking chat-box', function() {

    //try to open chat-box without logging in with url

    it('Opening chat-box', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click();
        cy.url().should('include', '/users/login');
        cy.get('#username').type('joey');
        cy.get('#password').type('1');
        cy.contains('submit').click();
        cy.contains('chandler').click();
        cy.url().should('include','/chats/');
    })

    it('Sending message in text-box', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click();
        cy.url().should('include', '/users/login');
        cy.get('#username').type('joey');
        cy.get('#password').type('1');
        cy.contains('submit').click();
        cy.contains('chandler').click();
        cy.get('#enterMssg').type('asdfghjkl');
        cy.get('#enterMssg').type('{enter}');
        cy.get('#enterMssg').should('have.value','');
        cy.get('#messages').contains('asdfghjkl').should('be.visible');
        cy.get('#messages').contains('asdfghjkl').should('have.css', 'float', 'right');
        cy.get('#messages').contains('asdfghjkl').should('have.css', 'clear', 'both');
        cy.get('#messages').contains('asdfghjkl').should('have.css', 'margin', '0px 10px 5px');
        cy.get('#messages').contains('asdfghjkl').should('have.css', 'border-radius', '9px');
        cy.get('#messages').contains('asdfghjkl').should('have.css', 'font-size', '15px');
        cy.get('#messages').contains('asdfghjkl').should('have.css', 'padding', '0px 10px');
        cy.get('#messages').contains('asdfghjkl').should('have.css', 'background-color', 'rgb(30, 144, 255)');
        cy.get('#messages').contains('asdfghjkl').should('have.css', 'color', 'rgb(255, 255, 255)');
        cy.get('#messages').contains('asdfghjkl').invoke('outerWidth').should('be.lt', 250);
    })

    it('Receiving message in text-box', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click();
        cy.get('#username').type('chandler');
        cy.get('#password').type('2');
        cy.contains('submit').click();
        cy.contains('joey').click();
        cy.get('#enterMssg').type('hi');
        cy.get('#enterMssg').type('{enter}');
        cy.contains('Logout').click();
        cy.contains('Login').click();
        cy.get('#username').type('joey');
        cy.get('#password').type('1');
        cy.contains('submit').click();
        cy.contains('chandler').click();
        cy.get('#messages').contains('hi').should('be.visible');
        cy.get('#messages').contains('hi').should('have.css', 'float', 'left');
        cy.get('#messages').contains('hi').should('have.css', 'clear', 'both');
        cy.get('#messages').contains('hi').should('have.css', 'margin', '0px 10px 5px');
        cy.get('#messages').contains('hi').should('have.css', 'border-radius', '9px');
        cy.get('#messages').contains('hi').should('have.css', 'font-size', '15px');
        cy.get('#messages').contains('hi').should('have.css', 'padding', '0px 10px');
        cy.get('#messages').contains('hi').should('have.css', 'background-color', 'rgb(211, 211, 211)');
        cy.get('#messages').contains('hi').invoke('outerWidth').should('be.lt', 250);
    })

    it('Testing width for long messages', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click();
        cy.url().should('include', '/users/login');
        cy.get('#username').type('joey');
        cy.get('#password').type('1');
        cy.contains('submit').click();
        cy.contains('chandler').click();
        cy.get('#enterMssg').type('I was hoping that we could meet today');
        cy.get('#enterMssg').type('{enter}');
        cy.get('#messages').contains('I was hoping that we could meet today').invoke('outerWidth').should('be.lt', 250);
    })

})

