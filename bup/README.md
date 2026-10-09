# Bup
1. Suba a pasta num repositório e importe na Vercel.
2. Vercel > Storage > Neon (Postgres): conecte ao projeto. Isso cria `DATABASE_URL`.
3. Em Settings > Environment Variables adicione `GEMINI_API_KEY` (aistudio.google.com) e `AUTH_SECRET` (qualquer texto longo e aleatório, ex.: `openssl rand -hex 32`).
4. Deploy. As tabelas (users, pets, messages) são criadas sozinhas no primeiro acesso.

Páginas: `/` (início), `/expressoes`, `/como-funciona`, `/faq`, `/privacidade`, `/termos`, `/conta`, `/configuracoes`, `/conversar` (login + chat). Menu e rodapé ficam em `site.js`; estilos em `site.css`.

## Pré-lançamento (/join) e contagem regressiva
- Enquanto o site estiver **travado**, quem abre qualquer página (`/`, `/expressoes`, `/faq`...) é redirecionado (307) para `/join`. Quem decide é o `middleware.js`, que consulta a tabela `launch` no Neon (cache de 10 s). Seguem livres: `/join`, `/admin`, `/api/*`, `/assets/*`, `/niverdamel`, `site.css`, `site.js`, `favicon.svg`.
- **Sem nenhuma data configurada o site fica travado** (modo pré-lançamento).
- **Para inaugurar:** em `/admin` (card "Lançamento do site") escolha **data e hora** e clique em **Agendar lançamento**. Quando a contagem chegar a zero o site abre sozinho, sem novo deploy. Também dá para **Liberar agora** ou **Travar e apagar data**.
- No `/admin`, o botão **Ver o site (sem a /join)** grava um cookie assinado (2 h, só nesse navegador; é encerrado ao travar/agendar ou em "Sair da prévia") que deixa o admin entrar no site mesmo travado (`api/admin-preview.js`).
- A `/join` mostra a contagem regressiva ao público (`/api/launch`) e, ao zerar, leva a pessoa para o site. Se o site já estiver liberado, `/join` redireciona para `/`.
- Na `/join` o menu mostra só a marca e o rodapé só tem o copyright. O formulário "Me avise quando inaugurar!" grava em `waitlist` (name, phone, created_at) via `/api/waitlist`.

## Administração
- `/admin` tem o card de lançamento e a lista de inscrições da `/join` (busca, WhatsApp, remover e baixar CSV).
- Protegida por chave: em Settings > Environment Variables da Vercel crie `ADMIN_KEY` (texto longo e aleatório) e faça o deploy. A página pede essa chave ao abrir; `/api/admin-waitlist` e `/api/admin-launch` recusam qualquer requisição sem ela.
- Arquivos do lançamento: `middleware.js`, `api/_launch.js`, `api/launch.js` (público), `api/admin-launch.js`, `api/_admin.js` (checagem da chave).

## Login
- O site liberado abre normalmente em `/` (index). O login só aparece em `/conversar` (botão "Conversar"/"Entrar"); lá a pessoa entra ou cria a conta.
- O login ignora maiúsculas no e-mail, aceita senha com espaço sobrando no fim e diz se faltou o e-mail ("Não achei nenhuma conta...") ou se a senha está errada.

## Gestão de contas (/gestao)
- `/gestao` (mesma `ADMIN_KEY` do /admin) lista nome, e-mail, status e data de cadastro de quem criou conta. A senha nunca aparece (no banco só existe o hash). Dá para **banir/desbanir**, **mudar senha** (digitada ou gerada) e **excluir conta** (apaga também as conversas). Há filtro Todos/Ativos/Banidos e busca.
- Conta banida é desconectada, não consegue entrar e é barrada no chat e no histórico (coluna `users.banned`, criada sozinha no primeiro acesso).
- Arquivos: `gestao.html`, `api/admin-users.js`.
