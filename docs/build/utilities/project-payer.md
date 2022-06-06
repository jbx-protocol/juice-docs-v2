# Project payer

[`JBETHERC20ProjectPayer`](/api/contracts/or-utilities/jbetherc20projectpayer/README.md) contracts make it easy to route funds to projects' treasuries from other contracts or within inheriting contracts. This is useful for routing funds to a Juicebox treasury within other contracts such as an NFT's minting function, or creating contracts that will automatically route any received funds to a project's treasury with preconfigured parameters to send along with the payment.  

The [`JBETHERC20ProjectPayer`](/api/contracts/or-utilities/jbetherc20projectpayer/README.md) can be inherited from any contract to facilitate internal transactions to Juicebox treasuries in ETH or any ERC-20, assuming the project is using a payment terminal that accepts the tokens. They can also be deployed as standalone project payer copies using [`JBProjectPayerDeployer`](/api/contracts/or-utilities/jbetherc20projectpayerdeployer).

#### Inheriting JBProjectPayer

Inheriting from [`JBETHERC20ProjectPayer`](/api/contracts/or-utilities/jbetherc20projectpayer/README.md) will give a contract access to a public [`JBProjectPayer.pay(...)`](/api/contracts/or-utilities/jbetherc20projectpayer/write/pay.md) function, a public [`JBProjectPayer.addToBalanceOf(...)`](/api/contracts/or-utilities/jbetherc20projectpayer/write/addtobalanceof.md) function, an internal [`JBProjectPayer._pay(...)`](/api/contracts/or-utilities/jbetherc20projectpayer/write/-_pay.md) function, and an internal [`JBProjectPayer._addToBalanceOf(...)`](/api/contracts/or-utilities/jbetherc20projectpayer/write/-_addtobalanceof.md) function. These can be used from within the contract to route funds to a Juicebox treasury while specifying all relevant parameters to contextualize the payment. Use the internal versions if the inheriting contract has already handled receiving the funds being forwarded.

Follow instructions in [Getting started](/build/getting-started.md) to import the `JBProjectPayer` files into a project.

```
function pay(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string calldata _memo,
  bytes calldata _metadata
) public payable virtual override {}
```

```
function addToBalanceOf(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  string calldata _memo
  bytes calldata _metadata
) public payable virtual override {}
```

```
function _pay(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string memory _memo,
  bytes memory _metadata
) internal virtual {}
```

```
function _addToBalanceOf(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  string memory _memo,
  string memory _metadata
) internal virtual  {}
```

If your contract does not wish to route payments received via the native `receive` interaction to a Juicebox treasury, all default constructor arguments can be left as null values. The contract will revert any payment received.

#### Deploying project payers

Instances of the [`JBETHERC20ProjectPayer`](/api/contracts/or-utilities/jbetherc20projectpayer/README.md) contract can also be deployed as stand-alone forwarders of payments to Juicebox treasuries. A new project payer can be deployed using [`JBProjectPayerDeployer.deployProjectPayer(...)`](/api/contracts/or-utilities/jbetherc20projectpayerdeployer/write/deployprojectpayer.md).

```
function deployProjectPayer(
  uint256 _defaultProjectId,
  address payable _defaultBeneficiary,
  bool _defaultPreferClaimedTokens,
  string memory _defaultMemo,
  bytes memory _defaultMetadata,
  bool _defaultPreferAddToBalance,
  IJBDirectory _directory,
  address _owner
) external override returns (IJBProjectPayer projectPayer) { ... }
```
