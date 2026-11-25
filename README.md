# Dear Future

Aplicação de cápsulas do tempo que permite escrever uma carta, agendar a
abertura e consultar as cápsulas no mesmo navegador. O fluxo funcional do MVP
está integrado à `main`: formulário com validação e gravação, destaque da
próxima cápsula na Home, listagem com filtros, abertura de cartas na data
programada e painel de feriados do mês de criação. A validação final no
navegador e o acabamento visual seguem como próximas etapas.

## Executar localmente

Use Node.js 22.12 ou superior em uma linha LTS, ou Node.js 20.19 na linha 20.
A base foi preparada com Node.js 26.8.1.

```sh
npm ci
npm run dev
npm run lint
npm run build
```

Abra o endereço indicado pelo Vite. A publicação do código-fonte será no GitHub.
A demonstração será local.

## Stack e organização

- React, TypeScript, Vite e npm para desenvolvimento e build.
- React Router DOM em `src/App.tsx`, com páginas em `src/pages/`.
- Material UI, Emotion e CSS para interface. Componentes reutilizáveis ficam
  em pastas próprias dentro de `src/components/`.
- ESLint para verificação estática.
- Na implementação do MVP, `src/types/capsule.ts` define `Capsule`.
  `src/services/capsuleStorage.ts` concentra o acesso ao localStorage.
  `src/hooks/useCountdown.ts` controla a contagem regressiva.
  `CapsuleForm` valida os campos e envia os dados para gravação; após salvar,
  a página de criação navega para o detalhe e preserva os campos em caso de erro.
  `CapsuleCard` é compartilhado pela Home e pela listagem.
  O serviço `src/services/holidaysApi.ts` consulta a BrasilAPI com fetch.
  O painel `HolidayContext` está integrado ao detalhe e apresenta carregamento,
  dados, vazio e erro, com nova tentativa e cancelamento ao desmontar.

| Rota | Tela |
| --- | --- |
| `/` | Início |
| `/capsules/new` | Nova cápsula |
| `/capsules` | Minhas cápsulas |
| `/capsules/:id` | Detalhe |
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

## Contratos e aceite do MVP

- `Capsule` contém `id`, `title`, `message`, `createdAt` e `opensAt`.
  O serviço expõe `listCapsules`, `getCapsule` e `createCapsule`.
- O formulário exige título, mensagem e data futura. Salva datas em ISO,
  abre o detalhe após sucesso e preserva os campos em caso de erro.
- Home e lista compartilham o cartão. O detalhe atualiza a contagem,
  limpa o intervalo ao sair e libera a ação de abrir no horário. A selagem
  acontece na interface e os dados ficam no navegador.
- O painel carrega os feriados do mês e ano de criação da cápsula. Deve
  exibir carregamento, vazio e erro com nova tentativa, cancelar a consulta
  ao desmontar e funcionar independentemente da leitura da carta.

Até 18/11, publicar a base e criar branches. Até 24/11, integrar o fluxo
principal. De 25 a 28/11, testar instalação limpa, lint, build, navegação por
teclado, tela móvel, formulário inválido, lista vazia, persistência após
recarregar, ID inexistente, abertura no horário e estados da API. Conferir
console, nomes completos e autoria dos commits.

Enviar o código pelo Classroom até 29/11/2026. Na apresentação de
30/11 ou 07/12, conforme sorteio, cada integrante demonstra sua entrega e
explica uma decisão técnica.
