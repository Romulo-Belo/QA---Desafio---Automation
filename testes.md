# Documento de Testes – Desafio QA Seu Barriga

## Objetivo
Automatizar os fluxos de gestão de movimentações na plataforma Seu Barriga, validando funcionalidades de login, contas, movimentações e resumo mensal, incluindo cenários principais e alternativos.

Documento de Testes – Desafio QA Seu Barriga

Objetivo
Automatizar o fluxo completo de gestão de movimentações financeiras na plataforma Seu Barriga, conforme requisitos do desafio.

Ambiente de Teste
- URL: https://seubarriga.wcaquino.me/login
- Framework: Cypress + JavaScript
- Navegador: Electron (headless)
- Dados: Todos os dados (usuário, contas, movimentações) são gerados dinamicamente com prefixo único para evitar conflitos.

Casos de Teste

Módulo 1: Login
- CT01: Criar um novo usuário com sucesso
- CT02: Validar que o sistema só permite login se tiver um usuário cadastrado (fluxo alternativo)
- CT03: Realizar login com sucesso

Módulo 2: Contas
- CT04: Adicionar no mínimo 2 contas
- CT05: Listar todas as contas
- CT06: Alterar o nome das contas
- CT07: Tentar excluir uma conta que esteja vinculada a uma movimentação (fluxo alternativo)
- CT08: Tentar adicionar uma conta com o nome já existente (fluxo alternativo)

Módulo 3: Criar Movimentação
- CT09: Criar no mínimo 2 movimentações (Receita e Despesa)
- CT10: Criar no mínimo 2 movimentações para cada conta
- CT11: Criar no mínimo 2 movimentações para cada situação (Pago / Pendente)
- CT12: Criar no mínimo 2 movimentações para meses diferentes (Abril, Junho, Setembro)
- CT13: Validar os campos de data (fluxo alternativo – campo obrigatório)
- CT14: Validar o campo valor (fluxo alternativo – campo obrigatório)

Módulo 4: Resumo Mensal
- CT15: Utilizar os filtros para exibir as movimentações criadas (Abril/2025, Junho/2025, Setembro/2025)
- CT16: Excluir uma movimentação

Módulo 5: Logout
- CT17: Deslogar do sistema

Evidências
- Vídeos de execução gerados automaticamente pelo Cypress na pasta: cypress/videos/
- Relatório HTML opcional gerado pelo plugin Mochawesome na pasta: cypress/reports/index