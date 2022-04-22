---
sidebar_position: 4
---

# Splits payer

[`JBETHERC20SplitsPayer`](/api/contracts/or-utilities/jbetherc20splitspayer/README.md) contracts make it easy to route funds to a group of splits from other contracts or from within inheriting contracts. This is useful for routing funds to a number of Juicebox project treasuries and other addresses from within other contracts such as an NFT marketplaces.

The [`JBETHERC20SplitsPayer`](/api/contracts/or-utilities/jbetherc20splitspayer/README.md) can be inherited from any contract to facilitate internal transactions to split groups in ETH or any ERC-20, assuming the projects in the split group are using a payment terminal that accepts the tokens. They can also be deployed as stand alone splits payer copies using [`JBSplitsPayerDeployer`](/api/contracts/or-utilities/jbetherc20splitspayerdeployer).

#### Inheriting JBSplitsPayer

Inheriting from [`JBETHERC20SplitsPayer`](/api/contracts/or-utilities/jbetherc20splitspayer/README.md) will give a contract access to a public [`JBSplitsPayer.pay(...)`](/api/contracts/or-utilities/jbetherc20splitspayer/write/pay.md) function, a public [`JBSplitsPayer.addToBalanceOf(...)`](/api/contracts/or-utilities/jbetherc20splitspayer/write/addtobalanceof.md), and an internal [`JBSplitsPayer._payToSplits(...)`](/api/contracts/or-utilities/jbetherc20splitspayer/write/-_paytosplits.md) function. These can be used from within the contract to route funds to a group of splits while specifying where leftover funds should go. Use the internal function if the inheriting contract has already handled receiving the funds being forwaded.

Follow instructions in [Getting started](/build/getting-started.md) to import the `JBSplitsPayer` files into a project.

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
) public payable virtual override nonReentrant {}
```

```
function addToBalanceOf(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  string calldata _memo,
  bytes calldata _metadata
) public payable virtual override nonReentrant {}
```

```
function _payToSplits(
  uint256 _splitsProjectId,
  uint256 _splitsDomain,
  uint256 _splitsGroup,
  address _token,
  uint256 _amount,
  uint256 _decimals
) internal virtual returns (uint256 leftoverAmount) {}
```

If your contract does not wish to route payments received via the native `receive` interaction to a group of splits, all default constructor arguments can be left as null values. The contract will revert any payment received.

#### Deploying splits payers

Instances of the [`JBETHERC20SplitsPayer`](/api/contracts/or-utilities/jbetherc20splitspayer/README.md) contract can also be deployed as stand-alone forwarders of payments to split groups. A new splits payer can be deployed using [`JBSplitsPayerDeployer.deploySplitsPayer(...)`](/api/contracts/or-utilities/jbetherc20splitspayerdeployer/write/deploysplitspayer.md).

```
function deploySplitsPayer(
  uint256 _defaultSplitsProjectId,
  uint256 _defaultSplitsDomain,
  uint256 _defaultSplitsGroup,
  IJBSplitsStore _splitsStore,
  uint256 _defaultProjectId,
  address payable _defaultBeneficiary,
  bool _defaultPreferClaimedTokens,
  string memory _defaultMemo,
  bytes memory _defaultMetadata,
  bool _defaultPreferAddToBalance,
  address _owner
) external override returns (IJBSplitsPayer splitsPayer) { ... }
```
