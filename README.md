## Setup

- Create project and init npm: `npm init`
- Install hardhat: `npm install --save-dev hardhat`
- Initiate hardhat project: `npx hardhat`


## Hardhat basic

1. Basic actions on hardhat

- Compile: `npx hardhat compile`. Hardhat recommend to alway setting the compiler version of solidity to avoid unexpected behavior
- Run test: `npx hardhat test`
- Run network: `npx hardhat node`
- Measuring coverage: `npx hardhat coverage`

2. Folder structures

- `contracts/`: contains all contract files
- `test/`: test file should be placed here. **Be aware that** Hardhat project using `mocha` and `chai` as default. But we can switch to use `jest` by a third party package since it's designed to be extensible. But hardhat already built some extensions for `chai` (eg: `hardhat-chai-matchers`). Then there is no reason to not use these default packages.
- `scripts/`: simple scripts
- `artifacts/` compiled contracts will be placed here as default

3. Configuration

- We can config networks, solidity version, paths in this file `hardhat.config.js`

## Development

### Testing

Thanks `typechain` package for automatically generate `Typescript` type declaration while using hardhat.

1. Develop faster with VSCode extension

- We can take a look at this official extension from hardhat that probably help to increase the productivity `https://hardhat.org/hardhat-vscode/docs/overview`

2. Write test

- Some notices:
  + Instead of alway using `beforeEach` to handle duplication code, hardhat recommends to use `loadFixture` helper to optimize test speed for some cases 
  + Using `revertedWith` to verify action revert scenario
  + Using command `npx hardhat coverage` to verify the test coverage for the contract


### Testing for NUTS_storage contract

- Since there is no specific actions in the constructor, no need test cases for the Deployment action
- `owner` state variable has been declared but it is not used anywhere in this contract, then we temporarily ignore it when writing test.
- There are two functions inside the contract, which are `addAuthUser` and `setImportant`. Both of them has the function types indicate that function can be used when contract was deployed (`public` and `external`) => I will write test for both of them at this moment.
- Test coverage is important but it still just a number, it is more important to follow the business logic (what functionality does) when writing test.

#### Result

1. Run test
![Storage contract testing](https://github.com/harryduong99/nuts-finance-hardhat/assets/33088334/74eec786-7012-4964-9736-b649c783717e "")

2. Test Coverage
![Storage contract testing](https://github.com/harryduong99/nuts-finance-hardhat/assets/33088334/74a250a4-43cd-4864-8f31-93c522df817a "")



*Small notice*: it is difference between `tx.origin` and `msg.sender`