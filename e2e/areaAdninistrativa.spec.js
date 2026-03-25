/// <reference types="cypress" />

describe('Regressiovo E2E - Bressan K2', () => {
   
  
    const padronEmail = `user_${Date.now()}@k2partnering.com`
    const randomPadronPassword = Math.random().toString(36).slice(-6)
    const adminnEmail = `user_${Date.now()}@k3partnering.com`
    const randomPAdminassword = Math.random().toString(36).slice(-6)
    const randomName = `User_${Math.random().toString(36).substring(2, 8)}`
    const randomNameNew = `User_${Math.random().toString(36).substring(2, 8)}`
    const randomProductName = `Produto_${Math.random().toString(36).substring(2, 8)}` 
  
  
    beforeEach(() => {
       cy.visit('https://front.serverest.dev/login')
  
  })

 
  it('Cenário 1 - Deve cadastrar usuário admin com email aleatório', () => {
    cy.get('[data-testid="cadastrar"]').click()
    cy.get('input[name="nome"]').type(randomName)
    cy.get('input[name="email"]').type(adminnEmail)
    cy.get('input[name="password"]').type(randomPAdminassword)
    cy.get('input[type="checkbox"]').check()
    cy.get('button[type="submit"]').click()
    cy.contains('Bem Vindo').should('be.visible')
  })





  it('Cenário 2 - Deve verificar menus da area administrativa', () => {
    cy.get('input[name="email"]').type(adminnEmail)
    cy.get('input[name="password"]').type(randomPAdminassword)
    cy.get('button[type="submit"]').click()
    
    cy.get('[data-testid="home"]').click()
    cy.contains('Bem Vindo').should('be.visible')

    cy.get('[data-testid="cadastrar-usuarios"]').click()
    cy.contains('Cadastro de usuários').should('be.visible')

    cy.get('[data-testid="listar-usuarios"]').click()
    cy.contains('Listar Usuários').should('be.visible')

    cy.get('[data-testid="cadastrar-produtos"]').click()
    cy.contains('Cadastrar Produtos').should('be.visible')

    cy.get('[data-testid="listar-produtos"]').click()
    cy.contains('Listar Produtos').should('be.visible')

    cy.get('[data-testid="link-relatorios"]').click()
    cy.contains('Relatórios').should('be.visible')

  })
 


  it('Cenário 3 - Deve Cadastrar Usuarios pelo admin', () => {
    cy.get('input[name="email"]').type(adminnEmail)
    cy.get('input[name="password"]').type(randomPAdminassword)
    cy.get('button[type="submit"]').click()

    cy.get('[data-testid="cadastrar-usuarios"]').click()
    cy.contains('Cadastro de usuários').should('be.visible')


    cy.get('input[name="nome"]').type(randomNameNew)
    cy.get('input[name="email"]').type(padronEmail)
    cy.get('input[name="password"]').type(randomPadronPassword)
    cy.get('button[type="submit"]').click()

    cy.get('table.table.table-striped')
    .contains('td', randomNameNew) // procura a célula com esse texto
    .should('be.visible')            // valida que está visível


  })
 

  it('Cenário 4 - Devo verificar se o usaurio tem acesso', () => {
    cy.get('input[name="email"]').type(padronEmail)
    cy.get('input[name="password"]').type(randomPadronPassword)
    cy.get('button[type="submit"]').click()
    cy.contains('Serverest').should('be.visible')
  })



  it('Cenário 5 - Deve Cadastrar Produto', () => {
    cy.get('input[name="email"]').type(adminnEmail)
    cy.get('input[name="password"]').type(randomPAdminassword)
    cy.get('button[type="submit"]').click()

    cy.get('[data-testid="cadastrar-produtos"]').click()
    cy.contains('Cadastrar Produtos').should('be.visible')

    cy.get('[data-testid="nome"]').type(randomProductName)
    cy.get('[data-testid="preco"]').type('6,00')
    cy.get('[data-testid="descricao"]').type('This is a good product to buy')
    cy.get('[data-testid="quantity"]').type('10')

    cy.get('[data-testid="cadastarProdutos"]').click()

     
    cy.get('table.table.table-striped')
    .contains('td', randomProductName)  
    .should('be.visible')             
       


  })




  it('Cenário 6 - Deve verificar o produto na lista de produtos', () => {
    cy.get('input[name="email"]').type(adminnEmail)
    cy.get('input[name="password"]').type(randomPAdminassword)
    cy.get('button[type="submit"]').click()
    
    cy.get('[data-testid="home"]').click()
    cy.contains('Bem Vindo').should('be.visible')

    

    cy.get('[data-testid="listar-produtos"]').click()
    cy.contains('Listar Produtos').should('be.visible')

    cy.get('table.table.table-striped')
    .contains('td', randomProductName)  
    .should('be.visible')    

  })


  it('Cenário 7 - Deve verificar na area do cliente o produto cadastrado', () => {
    cy.get('input[name="email"]').type(padronEmail)
    cy.get('input[name="password"]').type(randomPadronPassword)
    cy.get('button[type="submit"]').click()
    cy.contains('Serverest').should('be.visible')

    cy.get('h5.card-title.negrito')
    .contains(randomProductName)
    .should('be.visible')
   

  })

})

