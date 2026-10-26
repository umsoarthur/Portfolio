# Portfólio — Arthur Magalhães

Site com duas páginas:

| Página | Endereço |
|---|---|
| Home (hero, projetos, sobre mim, contato) | `/` |
| Case: Evolução das coberturas do seguro Auto | `/projetos/evolucao-coberturas-seguro-auto/` |
| Case: Melhorias nos fluxos de gestão de cartões (Caju) | `/projetos/melhorias-gestao-cartoes/` |
| Home em inglês | `/en/` |
| Case em inglês | `/en/projects/auto-insurance-coverage/` |

## Como o projeto está organizado

```
portfolio/
├── index.html                      → página da Home
├── projetos/
│   └── evolucao-coberturas-seguro-auto/
│       └── index.html              → página do case da Pier
├── src/
│   ├── main-home.jsx               → liga a Home ao HTML
│   ├── main-case-pier.jsx          → liga o case ao HTML
│   └── pages/
│       ├── Home.jsx / Home.css     → conteúdo, interações e estilos da Home
│       └── CasePier.jsx / .css     → conteúdo, interações e estilos do case
├── public/
│   ├── assets/                     → todas as imagens e logos
│   └── favicon.svg                 → ícone da aba do navegador
├── build.mjs                       → gera o site final na pasta dist/
├── package.json                    → lista de dependências e comandos
└── vercel.json                     → configuração da Vercel
```

## Rodar no seu computador (opcional)

Precisa do [Node.js](https://nodejs.org) (versão 18 ou mais nova).

```bash
npm install      # baixa as dependências (só na primeira vez)
npm run dev      # gera o site e abre em http://localhost:5173
```

## Publicar

A Vercel roda sozinha `npm install` e `npm run build` e publica a pasta `dist/`.
Veja o passo a passo completo nas instruções que acompanham este arquivo.

## Editar textos depois

- Textos da Home: `src/pages/Home.jsx`
- Textos do case: `src/pages/CasePier.jsx`
- Textos do case da Caju: `src/pages/CaseCaju.jsx`
- Versão em inglês: `src/pages/HomeEN.jsx` e `src/pages/CasePierEN.jsx`

Use a busca do editor (Ctrl/Cmd + F) para achar a frase, troque e salve. No GitHub dá para editar direto pelo navegador (ícone de lápis), e a Vercel publica a nova versão sozinha em ~1 minuto.
