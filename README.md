# Dear Future

Aplicação de cápsulas do tempo: crie uma conta, escreva uma carta, agende a
abertura e consulte suas cápsulas. O frontend usa a API Spring Boot para
cadastro, login, criação, listagem, detalhe e leitura da carta. O painel de
feriados consulta a BrasilAPI independentemente da abertura da cápsula.

## Executar localmente

Use Node.js conforme o campo `engines` do `package.json`.
Inicie o backend DearFuture na porta 8080, seguindo o README dele, e execute:

```sh
npm ci
npm run dev
```

Abra **http://localhost:5173**. O Vite encaminha `/api` ao backend em
`http://127.0.0.1:8080`. O backend local permite por padrão a origem
`http://localhost:5173`; abrir por `127.0.0.1` ou por outra porta exige ajustar
`CORS_ORIGINS` no backend para a origem correspondente.

Cadastre uma conta com nome, e-mail e senha de 12 a 128 caracteres. Após o
cadastro, entre com e-mail e senha. O token JWT fica somente em memória:
recarregar a página exige novo login, mas as cápsulas continuam no backend.
Sair ou receber uma resposta 401 encerra a sessão e protege as telas.

Os dados antigos do localStorage não são migrados automaticamente. Use
novas contas e cápsulas fictícias para validar a integração.

```sh
npm run lint
npm run build
```

## Configuração e publicação na cloud

`VITE_API_URL` é opcional e tem valor padrão `/api/v1`. Consulte `.env.example`.
Para uma API em outro domínio, informe a URL completa com `/api/v1` e configure
a origem do frontend no CORS do backend. Mudanças nessa variável exigem nova
build; nunca coloque senhas, chaves ou tokens em variáveis públicas do Vite.

Na implantação com frontend e API no mesmo domínio HTTPS, mantenha `/api/v1`.
Publique o conteúdo de `dist` no diretório servido pelo Nginx, preservando o
proxy `/api/` para o backend. O proxy do Vite funciona apenas em desenvolvimento.
As rotas da interface precisam retornar `index.html` ao atualizar a página;
as rotas `/api/` devem continuar retornando respostas da API.

Não use `npm run dev` como servidor de produção. Depois de publicar a build,
repita o fluxo de cadastro, login, criação, listagem e abertura por HTTPS,
incluindo recarregamento e uma segunda conta.

## Stack e organização

- React, TypeScript, Vite e npm para desenvolvimento e build.
- React Router DOM em `src/App.tsx`, com páginas em `src/pages/`.
- Material UI, Emotion e CSS; componentes reutilizáveis em pastas próprias.
- `src/services/api.ts`: cliente HTTP, tratamento de erros e token em memória.
- `src/services/authApi.ts`: cadastro e login.
- `src/hooks/useSession.ts` e `ProtectedRoute`: sessão e acesso às rotas.
- `src/services/capsuleApi.ts`: criação, listagem, detalhe e leitura da carta.
- `src/hooks/useCapsules.ts`: consulta compartilhada pela Home e pela lista,
  com carregamento, erro, nova tentativa e cancelamento ao desmontar.
- `src/hooks/useCountdown.ts`: contagem regressiva.
- `CapsuleForm`: validação e bloqueio de envio durante a gravação;
  `CapsuleCard`: cartão compartilhado pela Home e pela listagem.
- `src/services/holidaysApi.ts` e `HolidayContext`: feriados com carregamento,
  dados, vazio, erro, nova tentativa e cancelamento ao desmontar.

| Rota | Tela |
| --- | --- |
| `/login` | Entrar |
| `/register` | Criar conta |
| `/` | Início, exige sessão |
| `/capsules/new` | Nova cápsula, exige sessão |
| `/capsules` | Minhas cápsulas, exige sessão |
| `/capsules/:id` | Detalhe, exige sessão |
| `*` | Página não encontrada |

## Equipe e sequência de trabalho

| Integrante                              | Branch | Sequência de mudanças |
|-----------------------------------------| --- | --- |
| Aline Silva Oliveira de Figueiredo Lima | `sofl-aline/base-navegacao` | Configuração → rotas → layout → destaque na Home → README |
| Mateus Cavalcante de Lima               | `MateusCavalcanteLima/criacao` | Campos controlados → validação → gravação e feedback |
| José Vasconcelos de Carvalho Neto       | `netocarvalhopb/persistencia-listagem` | Tipo → leitura e busca → gravação → cartões → filtro |
| Romulo Frade Cardoso Fernandes          | `RomuloFCF/abertura` | Detalhe por ID → estado inexistente → contagem regressiva → abertura |
| Rafaella Porto                          | `rafaellaneporto/api-contexto` | Serviço → painel → carregamento e vazio → erro e nova tentativa → integração |

Cada integrante publica commits pequenos conforme termina mudanças revisáveis e abre PRs incrementais
para `main`.

## Contratos e validação da integração

- `Capsule` contém somente metadados: `id`, `title`, `createdAt`, `opensAt`
  e `status`. O texto da carta não faz parte da listagem nem do detalhe.
- `NewCapsule` contém título, mensagem e data de abertura. O formulário exige
  título de até 120 caracteres, mensagem de até 10000 caracteres e data futura.
  O serviço converte o horário local para ISO com fuso UTC antes do envio.
- Após salvar, a interface abre o detalhe pelo ID; erros de gravação preservam
  os campos. O botão permanece desabilitado enquanto a API responde.
- Home e lista compartilham o cartão. O relógio local orienta os filtros e a
  contagem; a decisão de liberar a mensagem é sempre do backend.
- A carta é buscada em `GET /api/v1/capsules/{id}/message` ao clicar em abrir.
  O backend verifica data e propriedade. Erros são apresentados na interface.
- O painel de feriados funciona independentemente da leitura da carta.

Verificação local em 25/11/2026: lint e build aprovados; cliente HTTP exercitado
com respostas simuladas para autenticação, 401, 409 de cápsula selada, 429 e
falha de rede. No navegador, usando backend local e banco temporário: cadastro,
login, lista vazia, criação com data futura, listagem, contagem antes da abertura,
leitura posterior, painel de feriados, saída e recarregamento com novo login e
retorno à rota original. Uma segunda conta apresentou lista vazia e recebeu
“Cápsula não encontrada” ao tentar consultar a cápsula da primeira conta.

A publicação dessa integração e a validação final por HTTPS na cloud ainda
precisam ser realizadas. O acabamento visual permanece uma etapa separada.
