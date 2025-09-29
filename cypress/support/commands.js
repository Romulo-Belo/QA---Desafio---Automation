// Comandos personalizados do Cypress
Cypress.Commands.add('createMovimentacao', (tipo, dtTrans, dtPag, desc, int, val, conta, situacao) => {
  cy.get('a').contains('Criar Movimentação').click();
  cy.get('#tipo').select(tipo);
  cy.get('#data_transacao').type(dtTrans);
  cy.get('#data_pagamento').type(dtPag);
  cy.get('#descricao').type(desc);
  cy.get('#interessado').type(int);
  cy.get('#valor').type(val);
  cy.get('#conta').select(conta);
  
  if (situacao === 'PAGO') {
    cy.get('#status_pago').check();
  } else {
    cy.get('#status_pendente').check();
  }
  
  cy.get('.btn-primary').click();
  cy.get('.alert-success').should('contain', 'sucesso');
});