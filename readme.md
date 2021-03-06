# ko6a 🦍
**gorillas are insanely strong, we want your apps to be as well**

gorillas are stronger than 20 adult humans combined

they can they can lift 10x their body weight

other attributes:
- **running speed** 25mph
- **bite strength** 1.3k psi (stronger than great white shark or lion)

we want your app to be this strong, so we want to bring you a dashboard for managing your [k6](https://k6.io) performance tests

see how to [contribute](contributing.md)

- **framework**: [next.js](https://nextjs.org)
- **styling**: [chakra ui](http://chakra-ui.com)

## Requirements
- [node](.node-version)
- [k6](https://github.com/grafana/k6)
- [yarn](https://yarnpkg.com/getting-started/install)

## Getting started

```bash
git clone https://github.com/beansource/ko6a
cd ko6a
yarn
```

create a `.env.local` file similar to [`.env.example`](./.env.example)

```bash
yarn postgres
yarn prisma
```

starts up postgresql database and initalizes prisma ✨

```bash
yarn dev
```

that will start the app on [`localhost:1968`](http://localhost:1968)