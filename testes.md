# Documento de Testes – Desafio QA Seu Barriga

## Objetivo
Automatizar o fluxo completo de gestão de movimentações financeiras na plataforma [Seu Barriga](https://seubarriga.wcaquino.me/login), validando as funcionalidades de login, contas, movimentações e resumo mensal, cobrindo cenários principais e alternativos.

## Ambiente de Teste
- URL: https://seubarriga.wcaquino.me/login  
- Framework: Cypress + JavaScript  
- Navegadores testados: Edge, Chrome e Firefox  
- Dados de teste: usuários, contas e movimentações são gerados dinamicamente com nomes únicos para evitar conflitos entre execuções. Também é utilizado um login fixo para cenários que exigem persistência.

## Casos de Teste

### Módulo 1: Login
- CT01 – Criar um novo usuário com sucesso  
- CT02 – Validar que o sistema não permite login com usuário inexistente (fluxo alternativo)  
- CT03 – Realizar login com sucesso  

### Módulo 2: Contas
- CT04 – Adicionar no mínimo 2 contas  
- CT05 – Listar todas as contas cadastradas  
- CT06 – Alterar o nome das contas  
- CT07 – Tentar excluir uma conta vinculada a movimentação (fluxo alternativo)  
- CT08 – Tentar adicionar uma conta já existente (fluxo alternativo)  

### Módulo 3: Criar Movimentação
- CT09 – Criar no mínimo 2 movimentações (Receita e Despesa)  
- CT10 – Criar no mínimo 2 movimentações para cada conta  
- CT11 – Criar no mínimo 2 movimentações para cada situação (Pago / Pendente)  
- CT12 – Criar no mínimo 2 movimentações para meses diferentes (Abril, Junho, Setembro)  
- CT13 – Validar obrigatoriedade dos campos de data (fluxo alternativo)  
- CT14 – Validar obrigatoriedade do campo valor (fluxo alternativo)  

### Módulo 4: Resumo Mensal
- CT15 – Utilizar os filtros para exibir movimentações criadas em meses diferentes  
- CT16 – Excluir uma movimentação  

### Módulo 5: Logout
- CT17 – Efetuar logout com sucesso  

## Cobertura de Testes
- Fluxos principais (happy path)  
- Fluxos alternativos com erros esperados  
- Validação de campos obrigatórios  
- Testes realizados em navegadores diferentes (Edge, Chrome e Firefox)  
- Validação em diferentes meses e situações (Pago e Pendente)  

## Evidências
- Vídeos: gerados automaticamente pelo Cypress em `cypress/videos/`  
- Relatório HTML (opcional): pode ser gerado pelo plugin Mochawesome em `cypress/reports/index.html`  

## Conclusão
Este plano de testes garante que as principais funcionalidades do sistema Seu Barriga sejam validadas de forma automática, repetível e rastreável, permitindo a rápida detecção de falhas e aumentando a confiabilidade da aplicação.  
