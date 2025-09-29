// Importa comandos personalizados
import './commands';
import 'cypress-mochawesome-reporter/register';

// Configurações globais
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora erros não capturados para evitar falhas nos testes
  return false;
});