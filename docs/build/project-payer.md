---
sidebar_position: 4
---

# Project payer

[`JBProjectPayer`](/protocol/api/contracts/jbprojectpayer/) contracts make it easy to route funds to a projects' treasuries from other contracts or from within inheriting contracts. This is useful for routing funds to a Juicebox treasury from within other contracts such as an NFT's minting function, or creating contract's that will automatically route any received funds to a project's treasury with preconfigured parameters to send along with the payment.  

The [`JBProjectPayer`] can be inherited from any contract to facilitate internal transactions to juicebox treasuries. They can also be deployed as stand alone project payer copies using [`JBProjectPayerDeployer`](/protocol/api/contracts/jbprojectpayerdeployer).

#### Inheriting JBProjectPayer

Inheriting from [`JBProjectPayer`](/protocol/api/contracts/jbprojectpayer/) will give a contract access to a public [`JBProjectPayer.pay(...)`](protocol/api/contracts/jbprojectpayer/write/pay.md) function and an internal [`JBProjectPayer._pay(...)`](protocol/api/contracts/jbprojectpayer/write/_pay.md) function. These can be used from within the contract to route funds to a juicebox treasury while specifying all relevant parameters to contextualize the payment. Use the internal version if the inheriting contract has already handled receiving the funds being forwaded.

Follow instructions in [`Getting started`](protocol/build/getting-started.md) to import the JBProjectPayer files into a project.

```solidity
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
) public payable virtual {}
```

```solidity
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

#### Deploying project payers

Instances of the [`JBProjectPayer`](/protocol/api/contracts/jbprojectpayer/) contract can also be deployed as stand-alone forwarders of payments to juicebox treasuries. A new project payer can be deployed using [`JBProjectPayerDeployer.deployProjectPayer(...)`](/protocol/api/contracts/jbprojectpayerdeployer/write/deployprojectpayer.md).

```solidity
function deployProjectPayer(
  uint256 _defaultProjectId,
  address payable _defaultBeneficiary,
  bool _defaultPreferClaimedTokens,
  string memory _defaultMemo,
  bytes memory _defaultMetadata,
  IJBDirectory _directory,
  address _owner
) external override returns (IJBProjectPayer projectPayer) { ... }
```
