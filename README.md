Desafio QA – Seu Barriga

Este repositório contém a automação de testes para o desafio de vaga de QA, conforme especificado no documento oficial.

Objetivo
Automatizar o fluxo completo de gestão de movimentações financeiras na plataforma Seu Barriga, incluindo:
- Criação de novo usuário com sucesso
- Validação de login apenas com usuário cadastrado (fluxo alternativo)
- Realização de login com sucesso
- Adição de no mínimo duas contas
- Listagem de todas as contas
- Alteração dos nomes das contas
- Tentativa de exclusão de conta vinculada a movimentação (fluxo alternativo)
- Tentativa de criação de conta com nome já existente (fluxo alternativo)
- Criação de no mínimo duas movimentações (receita e despesa)
- Criação de no mínimo duas movimentações por conta
- Criação de no mínimo duas movimentações por situação (pago/pendente)
- Criação de no mínimo duas movimentações em meses diferentes
- Validação dos campos de data (fluxo alternativo)
- Validação do campo valor (fluxo alternativo)
- Utilização dos filtros no resumo mensal para exibir as movimentações criadas
- Exclusão de uma movimentação
- Logout do sistema

Tecnologias Utilizadas
- Cypress 15.3.0
- JavaScript
- Node.js

Pré-requisitos
- Ter o Node.js instalado (versão 18 ou superior recomendada)
- Acesso à internet

Como Executar

1. Clone este repositório:
   git clone https://github.com/Romulo-Belo/QA---Desafio---Automation.git

2. Acesse a pasta do projeto:
   cd QA---Desafio---Automation

3. Instale as dependências:
   npm install

4. Instale Cypress:
   npm install --save-dev cypress

5. Execute os testes em modo headless (recomendado para gerar evidências):
   npx cypress run

Evidências Geradas
Após a execução, as seguintes evidências são geradas automaticamente:
- Vídeos completos dos testes: pasta cypress/videos/
- Relatório HTML detalhado (diferencial opcional): cypress/reports/index.html

Estrutura do Projeto
- cypress/e2e/seuBarriga.cy.js: testes automatizados
- cypress/support/commands.js: comandos customizados
- cypress/support/e2e.js: configuração do relatório Mochawesome
- cypress.config.js: configuração do Cypress
- package.json: dependências do projeto
- testes.md: documento com especificação dos casos de teste
- Documento de Casos de Teste - Seu Barriga.pdf: versão oficial em PDF

Observações
- Todos os dados (usuário, contas, movimentações) são gerados dinamicamente com timestamp único para evitar conflitos entre execuções.
- O projeto foi testado e validado na plataforma https://seubarriga.wcaquino.me.
- O relatório HTML é gerado automaticamente pelo plugin cypress-mochawesome-reporter, conforme mencionado como diferencial no desafio.
- O repositório contém todos os artefatos solicitados: código, documento de testes, evidências por vídeo e instruções de execução.
