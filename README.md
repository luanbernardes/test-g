# test-g

## Run With Docker
- `docker compose build`
- `docker compose up` to run the project
- Access: http://localhost:3000/


## Run with ASDF
using `ASDF`:
- Install [ASDF](https://asdf-vm.com/guide/getting-started.html)
- Install [NodeJS](https://github.com/asdf-vm/asdf-nodejs) and [PNPM](https://github.com/jonathanmorley/asdf-pnpm) plugins
- run `asdf install`. Will have a **Node** and **PNPM** in the correct version.
- `pnpm install` to install the Node dependencies

# Commands
- To run project: `pnpm dev`
- To run end to end tests: `pnpm test:e2e`

## APIs
- All requests is based on: https://reqres.in/
  - success: 
    - email: `eve.holt@reqres.in`
    - password: `cityslicka`