/// <reference types="cypress" />

describe('Testes Front End - BressanK2', () => {
  
  const padronEmail = `user_${Date.now()}@k2partnering.com`
  const randomPadronPassword = Math.random().toString(36).slice(-6)
  const adminnEmail = `user_${Date.now()}@k3partnering.com`
  const randomPAdminassword = Math.random().toString(36).slice(-6)
  const randomName = `User_${Math.random().toString(36).substring(2, 8)}`

  beforeEach(() => {
   
    cy.visit('https://front.serverest.dev/login')
  })



  it('Cenário 1 - Deve cadastrar usuário com email aleatório', () => {
    cy.get('[data-testid="cadastrar"]').click()
    cy.get('input[name="nome"]').type(randomName)
    cy.get('input[name="email"]').type(padronEmail)
    cy.get('input[name="password"]').type(randomPadronPassword)
    cy.get('button[type="submit"]').click()
    cy.contains('Serverest').should('be.visible')
  })

  it('Cenário 2 - Deve fazer login com o mesmo email', () => {
    cy.get('input[name="email"]').type(padronEmail)
    cy.get('input[name="password"]').type(randomPadronPassword)
    cy.get('button[type="submit"]').click()
    cy.contains('Serverest').should('be.visible')
  })


  it('Cenário 3 - Deve cadastrar usuário admin com email aleatório', () => {
    cy.get('[data-testid="cadastrar"]').click()
    cy.get('input[name="nome"]').type('Bressan')
    cy.get('input[name="email"]').type(adminnEmail)
    cy.get('input[name="password"]').type(randomPAdminassword)
    cy.get('input[type="checkbox"]').check()
    cy.get('button[type="submit"]').click()
    cy.contains('Bem Vindo').should('be.visible')
  })


  it('Cenário 4 - Lista usuario cadastrado', () => {
    cy.get('input[name="email"]').type(adminnEmail)
    cy.get('input[name="password"]').type(randomPAdminassword)
    cy.get('button[type="submit"]').click()
    cy.get('[data-testid="listarUsuarios"]').click
   // Faz scroll até o elemento que contém o email
 
 
   cy.intercept('GET', '/usuarios').as('getUsuarios')
   cy.get('[data-testid="listarUsuarios"]').click()
   cy.wait('@getUsuarios')
   cy.contains(padronEmail).scrollIntoView().should('be.visible')
   
  })



})

