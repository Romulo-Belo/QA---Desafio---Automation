// cypress/e2e/seubarriga-final.cy.js

describe('Seu Barriga - Teste de Automação Completo', () => {
  const baseUrl = 'https://seubarriga.wcaquino.me';
  const SUITE_PREFIX = `AUTO_${Date.now()}`;

  // Dados do usuário (criado uma vez)
  const testUser = {
    name: `Usuario ${SUITE_PREFIX}`,
    email: `usuario.${SUITE_PREFIX}@qa.com`,
    password: '123456'
  };

  // Contas com prefixo único
  const contas = {
    conta1_initial: `Chaves_${SUITE_PREFIX}`,
    conta2_initial: `Chiquinha_${SUITE_PREFIX}`,
    conta1_rename: `Godines_${SUITE_PREFIX}`,
    conta2_rename: `Chapolin_${SUITE_PREFIX}`
  };

  // ------------------------------------------
  // MÓDULO 1: LOGIN (único ponto de criação)
  // ------------------------------------------

  describe('1. Login', () => {
    it('1.1 - Criar um novo usuário com sucesso', () => {
      cy.visit(`${baseUrl}/login`);
      cy.contains('Novo usuário?').click();
      cy.get('#nome').type(testUser.name);
      cy.get('#email').type(testUser.email);
      cy.get('#senha').type(testUser.password);
      cy.get('.btn-primary').click();
      cy.get('.alert-success').should('contain', 'Usuário inserido com sucesso');
    });

    it('1.2 - FLUXO ALTERNATIVO: Login só com usuário cadastrado', () => {
      cy.visit(`${baseUrl}/login`);
      cy.get('#email').type('nao.cadastrado@qa.com');
      cy.get('#senha').type('123456');
      cy.get('.btn-primary').click();
      cy.get('.alert-danger').should('contain', 'Problemas com o login do usuário');
    });

    it('1.3 - Realizar login com sucesso', () => {
      cy.visit(`${baseUrl}/login`);
      cy.get('#email').type(testUser.email);
      cy.get('#senha').type(testUser.password);
      cy.get('.btn-primary').click();
      cy.url().should('include', '/logar');
      cy.get('.alert-success').should('contain', 'Bem vindo');
    });
  });

  // ------------------------------------------
  // MÓDULO 2: CONTAS (usa o usuário já criado)
  // ------------------------------------------

  describe('2. Contas', () => {
    beforeEach(() => {
      // Faz login com o usuário já criado
      cy.visit(`${baseUrl}/login`);
      cy.get('#email').type(testUser.email);
      cy.get('#senha').type(testUser.password);
      cy.get('.btn-primary').click();
      cy.url().should('include', '/logar');
    });

    it('2.1 - Adicionar no mínimo 2 contas', () => {
      const addConta = (nome) => {
        cy.contains('.dropdown-toggle', 'Contas').click();
        cy.get('[href="/addConta"]').click();
        cy.get('#nome').type(nome);
        cy.get('.btn-primary').click();
        cy.get('.alert-success').should('contain', 'sucesso');
      };
      addConta(contas.conta1_initial);
      addConta(contas.conta2_initial);
    });

    it('2.2 - Listar todas as contas', () => {
      cy.contains('.dropdown-toggle', 'Contas').click();
      cy.get('[href="/contas"]').click();
      cy.get('tbody').should('contain', contas.conta1_initial);
      cy.get('tbody').should('contain', contas.conta2_initial);
    });

    it('2.3 - Alterar o nome das contas', () => {
      cy.contains('.dropdown-toggle', 'Contas').click();
      cy.get('[href="/contas"]').click();
      cy.contains('tr', contas.conta1_initial).find('.glyphicon-edit').click();
      cy.get('#nome').clear().type(contas.conta1_rename);
      cy.get('.btn-primary').click();
      cy.get('.alert-success').should('contain', 'sucesso');

      cy.contains('.dropdown-toggle', 'Contas').click();
      cy.get('[href="/contas"]').click();
      cy.contains('tr', contas.conta2_initial).find('.glyphicon-edit').click();
      cy.get('#nome').clear().type(contas.conta2_rename);
      cy.get('.btn-primary').click();
      cy.get('.alert-success').should('contain', 'sucesso');
    });

    it('2.4 - FLUXO ALTERNATIVO: Conta com nome já existente', () => {
      cy.contains('.dropdown-toggle', 'Contas').click();
      cy.get('[href="/addConta"]').click();
      cy.get('#nome').type(contas.conta1_rename); // já existe
      cy.get('.btn-primary').click();
      cy.get('.alert-danger').should('contain', 'Já existe uma conta com esse nome');
    });

    it('2.5 - FLUXO ALTERNATIVO: Excluir conta com movimentação', () => {
      // Cria movimentação vinculada
      cy.get('a').contains('Criar Movimentação').click();
      cy.get('#tipo').select('Receita');
      cy.get('#data_transacao').type('15/09/2025');
      cy.get('#data_pagamento').type('15/09/2025');
      cy.get('#descricao').type('Vinculo exclusao');
      cy.get('#interessado').type('QA');
      cy.get('#valor').type('100');
      cy.get('#conta').select(contas.conta1_rename);
      cy.get('#status_pago').check();
      cy.get('.btn-primary').click();
      cy.get('.alert-success').should('contain', 'sucesso');

      // Tenta excluir
      cy.contains('.dropdown-toggle', 'Contas').click();
      cy.get('[href="/contas"]').click();
      cy.contains('tr', contas.conta1_rename).find('.glyphicon-remove-circle').click();
      cy.get('.alert-danger').should('contain', 'Conta em uso na movimentações');
    });
  });

  // ------------------------------------------
  // MÓDULO 3: MOVIMENTAÇÕES
  // ------------------------------------------

  describe('3. Movimentações', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/login`);
      cy.get('#email').type(testUser.email);
      cy.get('#senha').type(testUser.password);
      cy.get('.btn-primary').click();
    });

    it('3.1 - Criar ≥2 movimentações (Receita e Despesa)', () => {
      cy.createMovimentacao('Receita', '15/09/2025', '15/09/2025', 'Salário', 'Empresa', '3000', contas.conta1_rename, 'PAGO');
      cy.createMovimentacao('Despesa', '16/09/2025', '16/09/2025', 'Aluguel', 'Imob', '1200', contas.conta2_rename, 'PENDENTE');
    });

    it('3.2 - Criar ≥2 movimentações para cada conta', () => {
      cy.createMovimentacao('Receita', '17/09/2025', '17/09/2025', 'Freelance', 'Cliente', '500', contas.conta1_rename, 'PAGO');
      cy.createMovimentacao('Despesa', '18/09/2025', '18/09/2025', 'Compras', 'Loja', '200', contas.conta1_rename, 'PAGO');
      cy.createMovimentacao('Receita', '19/09/2025', '19/09/2025', 'Venda', 'Comprador', '800', contas.conta2_rename, 'PENDENTE');
      cy.createMovimentacao('Despesa', '20/09/2025', '20/09/2025', 'Combustível', 'Posto', '150', contas.conta2_rename, 'PAGO');
    });

    it('3.3 - Criar ≥2 movimentações para cada situação', () => {
      cy.createMovimentacao('Receita', '21/09/2025', '21/09/2025', 'Consultoria PAGO', 'Cliente', '1000', contas.conta1_rename, 'PAGO');
      cy.createMovimentacao('Despesa', '22/09/2025', '22/09/2025', 'Internet PAGO', 'Provedor', '100', contas.conta2_rename, 'PAGO');
      cy.createMovimentacao('Receita', '23/09/2025', '23/09/2025', 'Projeto PENDENTE', 'Cliente', '2000', contas.conta1_rename, 'PENDENTE');
      cy.createMovimentacao('Despesa', '24/09/2025', '24/09/2025', 'Cartão PENDENTE', 'Banco', '300', contas.conta2_rename, 'PENDENTE');
    });

    it('3.4 - Criar ≥2 movimentações para meses diferentes', () => {
      cy.createMovimentacao('Receita', '15/04/2025', '15/04/2025', 'Salário Abril', 'Empresa', '3000', contas.conta1_rename, 'PAGO');
      cy.createMovimentacao('Despesa', '16/04/2025', '16/04/2025', 'Aluguel Abril', 'Imob', '1200', contas.conta2_rename, 'PAGO');
      cy.createMovimentacao('Receita', '15/06/2025', '15/06/2025', 'Salário Junho', 'Empresa', '3000', contas.conta1_rename, 'PAGO');
      cy.createMovimentacao('Despesa', '16/06/2025', '16/06/2025', 'Aluguel Junho', 'Imob', '1200', contas.conta2_rename, 'PAGO');
    });

    it('3.5 - FLUXO ALTERNATIVO: Validar campo de data', () => {
      cy.get('a').contains('Criar Movimentação').click();
      cy.get('#tipo').select('Receita');
      // Não preenche data_transacao nem data_pagamento
      cy.get('#descricao').type('Sem data');
      cy.get('#interessado').type('QA');
      cy.get('#valor').type('100');
      cy.get('#conta').select(contas.conta1_rename);
      cy.get('#status_pago').check();
      cy.get('.btn-primary').click();
      cy.get('.alert-danger').should('contain', 'obrigatório');
    });

    it('3.6 - FLUXO ALTERNATIVO: Validar campo valor', () => {
      cy.get('a').contains('Criar Movimentação').click();
      cy.get('#tipo').select('Receita');
      cy.get('#data_transacao').type('25/09/2025');
      cy.get('#data_pagamento').type('25/09/2025');
      cy.get('#descricao').type('Sem valor');
      cy.get('#interessado').type('QA');
      // Não preenche #valor
      cy.get('#conta').select(contas.conta1_rename);
      cy.get('#status_pago').check();
      cy.get('.btn-primary').click();
      cy.get('.alert-danger').should('contain', 'obrigatório');
    });
  });

  // ------------------------------------------
  // MÓDULO 4: RESUMO MENSAL
  // ------------------------------------------

  describe('4. Resumo Mensal', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/login`);
      cy.get('#email').type(testUser.email);
      cy.get('#senha').type(testUser.password);
      cy.get('.btn-primary').click();
    });

    it('4.1 - Utilize os filtros para exibir as movimentações criadas', () => {
      cy.get('a').contains('Resumo Mensal').click();

      // Setembro
      cy.get('#mes').select('09');
      cy.get('#ano').select('2025');
      cy.get('.btn-primary').contains('Buscar').click();
      cy.get('tbody').should('contain', 'Salário');

      // Abril
      cy.get('#mes').select('04');
      cy.get('#ano').select('2025');
      cy.get('.btn-primary').contains('Buscar').click();
      cy.get('tbody').should('contain', 'Salário Abril');

      // Junho
      cy.get('#mes').select('06');
      cy.get('#ano').select('2025');
      cy.get('.btn-primary').contains('Buscar').click();
      cy.get('tbody').should('contain', 'Salário Junho');
    });

    it('4.2 - Exclua uma movimentação', () => {
      cy.get('a').contains('Resumo Mensal').click();
      cy.get('#mes').select('09');
      cy.get('#ano').select('2025');
      cy.get('.btn-primary').contains('Buscar').click();
      cy.get('tbody tr').first().find('.glyphicon-remove-circle').click();
      cy.get('.alert-success').should('contain', 'removida');
    });
  });

  // ------------------------------------------
  // MÓDULO 5: LOGOUT
  // ------------------------------------------

  describe('5. Logout', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/login`);
      cy.get('#email').type(testUser.email);
      cy.get('#senha').type(testUser.password);
      cy.get('.btn-primary').click();
    });

    it('5.1 - Deslogue do sistema', () => {
      cy.get('a').contains('Sair').click();
      cy.url().should('eq', `${baseUrl}/logout`);
    });
  });
});