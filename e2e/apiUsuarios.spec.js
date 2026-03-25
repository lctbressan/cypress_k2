/// <reference types="cypress" />

describe('Testes de API - Usuários', () => {
  let randomEmail
  const password = '123456'
  let userId 

  before(() => {
    randomEmail = `user_${Date.now()}@example.com`
  })

  it('Cenário 1 - Deve cadastrar usuário com sucesso', () => {
    cy.request('POST', 'https://serverest.dev/usuarios', {
      nome: 'Teste API',
      email: randomEmail,
      password: password,
      administrador: 'true'
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      userId = response.body._id 
    })
  })

  it('Cenário 2 - Deve realizar login com usuário cadastrado', () => {
    cy.request('POST', 'https://serverest.dev/login', {
      email: randomEmail,
      password: password
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Login realizado com sucesso')
      expect(response.body.authorization).to.exist
    })
  })

  it('Cenário 3 - Deve listar usuários cadastrados', () => {
    cy.request('GET', 'https://serverest.dev/usuarios')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.be.greaterThan(0)
        expect(response.body.usuarios).to.be.an('array')
        expect(response.body.usuarios.some(u => u.email === randomEmail)).to.be.true
      })
  })

  it('Cenário 4 - Deve excluir usuário cadastrado', () => {
    cy.request('DELETE', `https://serverest.dev/usuarios/${userId}`)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Registro excluído com sucesso')
      })
  })


  
})

