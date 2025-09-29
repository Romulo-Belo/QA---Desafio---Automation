# Desafio QA – Seu Barriga

## Objetivo
Automatizar os fluxos de gestão de movimentações na plataforma **Seu Barriga** utilizando **Cypress** e **JavaScript**.

Desafio QA – Seu Barriga

Este repositório contém a automação de testes para o desafio.

## Objetivo
Automatizar o fluxo de gestão de movimentações financeiras na plataforma Seu Barriga, incluindo criação de usuário, gestão de contas, movimentações, filtros e logout, com validação de fluxos principais e alternativos.

## Tecnologias Utilizadas
- [Cypress](https://www.cypress.io/) 15.3.0
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/)

## Como Executar

1. Clone este repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute os testes em modo headless:
   ```bash
   npx cypress run
   ```
   npx cypress open
   ```
4. As evidências serão geradas automaticamente:
   - Vídeos: pasta `cypress/videos/`
   - Relatório HTML (opcional): pasta `cypress/reports/`

## Estrutura do Projeto
- `cypress/e2e/seuBarriga.cy.js`: testes automatizados
- `cypress/support/commands.js`: comandos customizados
- `cypress/support/e2e.js`: configuração do relatório
- `cypress.config.js`: configuração do Cypress
- `testes.md`: documento com especificação dos casos de teste
- `README.md`: este arquivo

## Entregáveis
- Testes automatizados funcionais
- Documento de testes (`testes.md`)
- Evidências por vídeo (`cypress/videos/`)
- Relatório HTML (`cypress/reports/index.html`)
- Instruções claras de execução (este arquivo)

## Observações
- Todos os dados são gerados dinamicamente para evitar conflitos entre execuções.
- O projeto atende a 100% dos requisitos descritos no desafio.

## Licença
Este projeto está licenciado sob a licença ISC.

## Contribuição
Sinta-se à vontade para abrir issues ou enviar pull requests para melhorias.

## Contato
- Email: romulo-belo@hotmail.com
- LinkedIn: [Romulo Belo](https://linkedin.com/in/romulo-belo)
