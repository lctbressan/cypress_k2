/// <reference types="cypress" />

describe('Regressiovo E2E - Bressan K2', () => {
  
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
    cy.get('input[name="nome"]').type('randomName)
    cy.get('input[name="email"]').type(padronEmail)
    cy.get('input[name="password"]').type(randomPadronPassword)
    cy.get('button[type="submit"]').click()
    cy.contains('Serverest').should('be.visible')
  })


  it('Cenário 2 - Deve Adicionar produtos a lista e limpar a lista', () => {
    cy.get('input[name="email"]').type(padronEmail)
    cy.get('input[name="password"]').type(randomPadronPassword)
    cy.get('button[type="submit"]').click()
    cy.contains('Serverest').should('be.visible')


    cy.get('[data-testid="adicionarNaLista"]').then(($produtos) => {
      const randomIndex = Math.floor(Math.random() * $produtos.length)
      cy.wrap($produtos[randomIndex]).click()
    })
    
  cy.contains('Lista de Compras').should('be.visible')
  cy.get('[data-testid="limparLista"]').click()
  cy.contains('Lista de Compras').should('be.visible')

  })


 



})

