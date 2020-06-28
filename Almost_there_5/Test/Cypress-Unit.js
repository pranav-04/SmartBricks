describe('Checking Homepage',function(){
    beforeEach(()=>{
        cy.visit('http://localhost:5000');
    })
    it('Accessing Homepage',function(){
        cy.url().should('include','/');
    })
    it('Checking Buy Button',function(){
        cy.get('div.container1').contains('Buy').click();
        cy.url().should('include', '/');
    })
    it('Checking Sell Button',function(){
        cy.get('div.container1').contains('Sell').click();
        cy.url().should('include', '/users/login');
    })
    it('Checking Filter Button',function(){
        cy.get('div.container1').contains('Filter').click();
        cy.url().should('include', '/');
    })
    it('Checking Statistic Button',function(){
        cy.get('div.container1').contains('Statistic').click();
        cy.url().should('include', '/');
    })
    it('Checking Login Button',function(){
        cy.get('div.container1').contains('Login').click();
        cy.url().should('include', '/users/login');
    })
    it('Checking SignUp Button',function(){
        cy.get('div.container1').contains('SignUp').click();
        cy.url().should('include', '/users/register');
    })
    it('Checking Location Input',function(){
        cy.get('input.business').invoke('attr','placeholder').should('contain', 'Location');
    })
    it('Checking Maximum Price Input',function(){
        cy.get('input.location').invoke('attr','placeholder').should('contain', 'Maximum Price');
    })
    it('Checking Submit Button',function(){
        cy.get('button.search-btn').contains('Search').click();
        cy.url().should('include','/search');
    })
    it('Checking AboutUs',function(){
        cy.get('h2.myH2').contains('About us');
    })
    it('Checking Footer',function(){
        cy.get('div.col-sm-12').children('h6').contains('About SmartBricks');
    })
})
describe('Checking Search Page',function(){
    beforeEach(()=>{
        cy.visit('http://localhost:5000');
        cy.get('button.search-btn').contains('Search').click();
    })
    it('Checking BHK options',function(){
        cy.get('li#BHK.nav-item.dropdown').click();
        cy.get('li#BHK.nav-item.dropdown').children('.show').contains('NONE');
        cy.get('li#BHK.nav-item.dropdown').children('.show').contains('1 BHK');
        cy.get('li#BHK.nav-item.dropdown').children('.show').contains('2 BHK');
        cy.get('li#BHK.nav-item.dropdown').children('.show').contains('3 BHK');
        cy.get('li#BHK.nav-item.dropdown').children('.show').contains('4 BHK');
        cy.get('li#BHK.nav-item.dropdown').children('.show').contains('5 BHK');
        cy.get('li#BHK.nav-item.dropdown').children('.show').contains('> 5 BHK');
    })
    it('Checking Budget options',function(){
        cy.get('li#MAX.nav-item.dropdown').click();
        cy.get('li#MAX.nav-item.dropdown').children('.show').contains(' NONE');
        cy.get('li#MAX.nav-item.dropdown').children('.show').contains(' 5 Lac');
        cy.get('li#MAX.nav-item.dropdown').children('.show').contains(' 10 Lac');
        cy.get('li#MAX.nav-item.dropdown').children('.show').contains(' 40 Lac');
        cy.get('li#MAX.nav-item.dropdown').children('.show').contains(' 70 Lac');
        cy.get('li#MAX.nav-item.dropdown').children('.show').contains(' 1 Cr');
        cy.get('li#MAX.nav-item.dropdown').children('.show').contains(' 2 Cr');
        cy.get('li#MAX.nav-item.dropdown').children('.show').contains(' 4 Cr');
        cy.get('li#MAX.nav-item.dropdown').children('.show').contains(' 5 Cr');
        cy.get('li#MAX.nav-item.dropdown').children('.show').contains(' > 5 Cr');
    })
    it('Checking BHK options',function(){
        cy.get('li#SORT.nav-item.dropdown').click();
        cy.get('li#SORT.nav-item.dropdown').children('.show').contains(' Price - Low to High');
        cy.get('li#SORT.nav-item.dropdown').children('.show').contains(' Price - High to Low');
        cy.get('li#SORT.nav-item.dropdown').children('.show').contains(' Most Recent ');
        cy.get('li#SORT.nav-item.dropdown').children('.show').contains(' sqft - Low to High');
        cy.get('li#SORT.nav-item.dropdown').children('.show').contains(' sqft - High to Low');
    })
    it('Checking Area options',function(){
        cy.get('li#AREA.nav-item.dropdown').click();
        cy.get('li#AREA.nav-item.dropdown').children('.show').contains('NONE');
        cy.get('li#AREA.nav-item.dropdown').children('.show').contains('0 - 1000');
        cy.get('li#AREA.nav-item.dropdown').children('.show').contains('1000 - 2000');
        cy.get('li#AREA.nav-item.dropdown').children('.show').contains('2000 - 3000');
        cy.get('li#AREA.nav-item.dropdown').children('.show').contains('3000 - 4000');
        cy.get('li#AREA.nav-item.dropdown').children('.show').contains('> 4000');
    })
    it('Checking Footer',function(){
        cy.get('div.col-sm-12').children('h6').contains('About SmartBricks');
    })
})