describe('Checking login', function() {
    
    it('Cheking login with valid credentials', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click({force: true});
        cy.url().should('include', '/users/login');
        cy.get('input[Name=username]').type('joey');
        cy.get('#password').type('1');    
        cy.get('body > div.img > div > div > form > input').should('be.visible').click();
        cy.wait(1000);
        cy.contains('Missing credentials').should('not.exist');
        cy.contains('Wrong password').should('not.exist');
        cy.contains('Missing credentials').should('not.exist');
    })
    
    it('Cheking login with valid credentials', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click({force: true});
        cy.url().should('include', '/users/login');
        cy.get('input[Name=username]').type('chandler');
        cy.get('#password').type('2');
        cy.get('body > div.img > div > div > form > input').should('be.visible').click();
        cy.wait(1000);
        cy.contains('Missing credentials').should('not.exist');
        cy.contains('Wrong password').should('not.exist');
        cy.contains('Missing credentials').should('not.exist');
    })

    it('Cheking login with invalid credentials', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click({force: true})
        cy.url().should('include', '/users/login');
        cy.get('input[Name=username]').type('joey');
        cy.get('#password').type('2');  
        cy.get('body > div.img > div > div > form > input').should('be.visible').click();
        cy.wait(1000);
        cy.get('body > div.img > div > div > form').contains('Wrong password');
    })
  })
  
  describe('Checking logout', function() {
      it('Checking logout without logging in', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Logout').should('not.be.visible');
      })

      it('Checking logout after logging in', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click({force: true});
        cy.get('input[Name=username]').type('joey');
        cy.get('#password').type('1');
        cy.get('body > div.img > div > div > form > input').should('be.visible').click();
        cy.contains('Logout').click({force: true});
        cy.get('body > div.img > div > div > form').contains('You are logged out');
      })
  })

  describe('Checking Property showing page', function() {

    it('Checking for valid credential for displaying', function() {
      cy.visit('http://localhost:5000');
      cy.get('body > div:nth-child(2) > div.header > form > div > input.search-field.business').type('Surat');
      cy.get('body > div:nth-child(2) > div.header > form > div > button').should('be.visible').click();
      cy.get('#price > div > div > div > div.col-md-8 > div > ul > li:nth-child(1) > p.ff').contains('Name');
    })

    it('Checking for valid credential for displaying', function() {
        cy.visit('http://localhost:5000');
        cy.get('body > div:nth-child(2) > div.header > form > div > input.search-field.business').type('Ahmedabad');
        cy.get('body > div:nth-child(2) > div.header > form > div > button').should('be.visible').click();
        cy.contains('Name');
      })
    
     it('Checking for invalid credential for displaying', function() {
        cy.visit('http://localhost:5000');
        cy.get('body > div:nth-child(2) > div.header > form > div > input.search-field.business').type('popp');
        cy.get('body > div:nth-child(2) > div.header > form > div > button').should('be.visible').click();
        cy.get('#price').contains('Name').should('not.exist');
      })

      it('Checking for invalid credential for displaying', function() {
        cy.visit('http://localhost:5000');
        cy.get('body > div:nth-child(2) > div.header > form > div > input.search-field.business').type('091203');
        cy.get('body > div:nth-child(2) > div.header > form > div > button').should('be.visible').click();
        cy.get('#price').contains('Name').should('not.exist');
      })

      it('Checking for valid credential for filtering(BHK)', function() {
        cy.visit('http://localhost:5000');
        cy.get('body > div:nth-child(2) > div.header > form > div > input.search-field.business').type('a');
        cy.get('body > div:nth-child(2) > div.header > form > div > button').should('be.visible').click();
        cy.contains('BHK').click({force:true});
        cy.get('#BHK > div > a.dropdown-item.a4').click();
        cy.wait(1000);
        cy.get('#price > div > div:nth-child(1) > div > div.col-md-8 > div > ul > li:nth-child(3) > h3:nth-child(4)').contains('4');
      })

      it('Checking for valid credential for filtering(BHK)', function() {
        cy.visit('http://localhost:5000');
        cy.get('body > div:nth-child(2) > div.header > form > div > input.search-field.business').type('a');
        cy.get('body > div:nth-child(2) > div.header > form > div > button').should('be.visible').click();
        cy.contains('BHK').click({force:true});
        cy.get('#BHK > div > a.dropdown-item.a5').click();
        cy.wait(1000);
        cy.get('#price > div > div:nth-child(1) > div > div.col-md-8 > div > ul > li:nth-child(3) > h3:nth-child(4)').contains('5');
      })

      it('Checking for invalid credential for filtering(BHK)', function() {
        cy.visit('http://localhost:5000');
        cy.get('body > div:nth-child(2) > div.header > form > div > input.search-field.business').type('a');
        cy.get('body > div:nth-child(2) > div.header > form > div > button').should('be.visible').click();
        cy.contains('BHK').click({force:true});
        cy.get('#BHK > div > a.dropdown-item.a3').click();
        cy.wait(1000);
        cy.get('#price').contains('Name').should('not.exist');
      })

      it('Checking for valid credential for filtering(Budget)', function() {
        cy.visit('http://localhost:5000');
        cy.get('body > div:nth-child(2) > div.header > form > div > input.search-field.business').type('a');
        cy.get('body > div:nth-child(2) > div.header > form > div > button').should('be.visible').click();
        cy.contains('Budget').click();
        cy.get('#MAX > div > a.dropdown-item.a70').click();
      })

      it('Checking for valid credential for filtering(Budget)', function() {
        cy.visit('http://localhost:5000');
        cy.get('body > div:nth-child(2) > div.header > form > div > input.search-field.business').type('a');
        cy.get('body > div:nth-child(2) > div.header > form > div > button').should('be.visible').click();
        cy.contains('Budget').click();
        cy.get('#MAX > div > a.dropdown-item.a400').click();
      })

      it('Checking for valid credential for filtering(Budget)', function() {
        cy.visit('http://localhost:5000');
        cy.get('body > div:nth-child(2) > div.header > form > div > input.search-field.business').type('a');
        cy.get('body > div:nth-child(2) > div.header > form > div > button').should('be.visible').click();
        cy.contains('Budget').click();
        cy.get('#MAX > div > a.dropdown-item.a5').click();
        cy.wait(1000);
        cy.get('#price').contains('Name').should('not.exist');
      })
      
      it('Checking for valid credential for filtering(Budget)', function() {
        cy.visit('http://localhost:5000');
        cy.get('body > div:nth-child(2) > div.header > form > div > input.search-field.business').type('a');
        cy.get('body > div:nth-child(2) > div.header > form > div > button').should('be.visible').click();
        cy.contains('Budget').click();
        cy.get('#MAX > div > a.dropdown-item.a10').click();
        cy.wait(1000);
        cy.get('#price > div').each(($div,i,$divs) => {
          expect($divs).to.contain('Price')
        })
      })
      

      
})

describe('Checking chat-box', function() {

    //try to open chat-box without logging in with url

    it('Opening chat-box', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click({force: true});
        cy.url().should('include', '/users/login');
        cy.get('input[Name=username]').type('joey');
        cy.get('#password').type('1');
        cy.get('body > div.img > div > div > form > input').should('be.visible').click();
        cy.get('#mainListDiv > ul > div > button').trigger('mousemove').click();
        cy.wait(500);  
        cy.get('#mainListDiv > ul > div > div > a:nth-child(1)').contains('My Chat').click({force: true});
        cy.url().should('include','/chats/');
        cy.get('body > div.img2 > div > ul').should('be.visible').click();
        //cy.contains('chandler').click({force: true});
    })

    it('Sending message in text-box', function() {
        cy.visit('http://localhost:5000');
        cy.contains('Login').click({force: true});
        cy.url().should('include', '/users/login');
        cy.get('input[Name=username]').type('joey');
        cy.get('#password').type('1');
        cy.contains('submit').click({force: true});
        cy.contains('chandler').click({force: true});
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
        cy.contains('Login').click({force: true});
        cy.get('input[Name=username]').type('chandler');
        cy.get('#password').type('2');
        cy.contains('submit').click({force: true});
        cy.contains('joey').click({force: true});
        cy.get('#enterMssg').type('hi');
        cy.get('#enterMssg').type('{enter}');
        cy.contains('Logout').click({force: true});
        cy.contains('Login').click({force: true});
        cy.get('input[Name=username]').type('joey');
        cy.get('#password').type('1');
        cy.contains('submit').click({force: true});
        cy.contains('chandler').click({force: true});
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
        cy.contains('Login').click({force: true});
        cy.url().should('include', '/users/login');
        cy.get('input[Name=username]').type('joey');
        cy.get('#password').type('1');
        cy.contains('submit').click({force: true});
        cy.contains('chandler').click({force: true});
        cy.get('#enterMssg').type('I was hoping that we could meet today');
        cy.get('#enterMssg').type('{enter}');
        cy.get('#messages').contains('I was hoping that we could meet today').invoke('outerWidth').should('be.lt', 250);
    })
})

