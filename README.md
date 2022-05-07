## Running this project locally

- installing graph-cli:
  ```
  yarn global add @graphprotocol/graph-cli
  ```

- start a local hardhat network in solidity directory
  ```
  npx hardhat node 
  ```
- start up a local graph node by entering the graph-node-docker-file project directory and running:
    ```
    sh start.sh
    ```
- fianlly run this in the default-subgraph project directory to create graphql generated code and deploy to your local graph node:
  ```
  yarn && yarn codegen
  yarn create-local
  yarn deploy-local
  ```
This should deploy the subgraph to your local graph node which is listening to your local network.

