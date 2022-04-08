---
sidebar_position: 1
---

# Getting started

#### Import

Add the protocol files to the project.
```bash
# command line
npm install @jbx-protocol/contracts-v2
```

If referencing from typescript:
```typescript
const contract = require(`@jbx-protocol/contracts-v2/deployments/${network}/${contractName}.json`)
```

If referencing from a contract:
```
import '@jbx-protocol/contracts-v2/contracts/[file-path].sol'
```

#### Workflows

The first transaction to call when getting started is [`JBController.launchProjectFor(...)`](/api/contracts/or-controllers/jbcontroller/write/launchprojectfor.md).

```
function launchProjectFor(
  address _owner,
  JBProjectMetadata calldata _projectMetadata,
  JBFundingCycleData calldata _data,
  JBFundingCycleMetadata calldata _metadata,
  uint256 _mustStartAtOrAfter,
  JBGroupedSplits[] calldata _groupedSplits,
  JBFundAccessConstraints[] calldata _fundAccessConstraints,
  IJBPaymentTerminal[] calldata _terminals,
  string memory _memo
) external override returns (uint256 projectId) { ... }
```

Check out the [Project design](/build/project-design.md) page for more info on how to build projects to various specifications.

<details>

<summary>View project info</summary>

Launching a project will mint a new NFT in the [`JBProjects`](/api/contracts/jbprojects/README.md) contract. The owner can be found using [`JBProjects.ownerOf(...)`](https://docs.openzeppelin.com/contracts/3.x/api/token/erc721#IERC721-ownerOf-uint256-).

```
function ownerOf(uint256 _projectId) external returns (address owner) { ... }
```

The project's metadata can be found using [`JBProjects.metadataContentOf(...)`](/api/contracts/jbprojects/properties/metadatacontentof.md).

```
function metadataContentOf(uint256 _projectId, uint256 _domain)
  external
  view
  returns (string memory) { ... }
```

</details>

<details>

<summary>View funding cycles</summary>

Funding cycle data can be found in the [`JBFundingCycleStore`](/api/contracts/jbfundingcyclestore/README.md) contract. A funding cycle configuration can be found using [`JBFundingCycleStore.get(...)`](/api/contracts/jbfundingcyclestore/read/get.md), where `_configuration` is the block timestamp when the funding cycle was configured.

```
function get(uint256 _projectId, uint256 _configuration)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle) { ... }
```

The project's current funding cycle can be found using [`JBFundingCycleStore.currentOf(...)`](/api/contracts/jbfundingcyclestore/read/currentof.md).

```
function currentOf(uint256 _projectId)
  public
  view
  override
  returns (JBFundingCycle memory fundingCycle) { ... }
```

The project's queued funding cycle can be found using [`JBFundingCycleStore.queuedOf(...)`](/api/contracts/jbfundingcyclestore/read/queuedof.md).\
\
By default, the queued cycle is a copy of the current one that starts immediately afterwards, using a discounted weight.\
\
If the project has proposed a reconfiguration, the queued cycle will reflect the changes once they are approved by the current cycle's ballot. Reconfigurations during a funding cycle with no ballot are automatically queued.\
\
The project has no queued cycle if the current cycle has no duration.

```
function queuedOf(uint256 _projectId)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle) { ... }
```

</details>

<details>

<summary>View splits</summary>

A project's splits data can be found in the [`JBSplitStore`](/api/contracts/jbsplitsstore/README.md) contract. A group of splits belonging to any particular domain during any particular funding cycle configuration can be found using [`JBSplitStore.splitsOf(...)`](/api/contracts/jbsplitsstore/read/splitsof.md).

```
function splitsOf(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group
) external view override returns (JBSplit[] memory) { ... }
```

</details>

<details>

<summary>View fund access constraints</summary>

A project's fund access conatraints can found in the [`JBController`](/api/contracts/or-controllers/jbcontroller/README.md) contract used to launch the project. It's distribution limit of any payment terminal during any funding cycle configuration can be found using [`JBController.distributionLimitOf(...)`](/api/contracts/or-controllers/jbcontroller/read/distributionlimitof.md). The currency being used for this distribution limit is returned alongside.

```
function distributionLimitOf(
  uint256 _projectId,
  uint256 _configuration,
  IJBPaymentTerminal _terminal
) external view override returns (uint256 distributionLimit, uint256 distributionLimitCurrency) { ... }
```

It's overflow allowance from any payment terminal during any funding cycle configuration can be found using [`JBController.overflowAllowanceOf(...)`](/api/contracts/or-controllers/jbcontroller/read/overflowallowanceof.md). The currency being used for this overflow allowance is returned alongside. 

```
function overflowAllowanceOf(
  uint256 _projectId,
  uint256 _configuration,
  IJBPaymentTerminal _terminal
) external view override returns (uint256 overflowAllowance, uint256 overflowAllowanceCurrency) { ... }
```

</details>

<details>

<summary>View terminals and controller</summary>

The [`JBDirectory`](/api/contracts/jbdirectory/README.md) contract stores addresses of payment terminals where a project is currently accepting funds through. A projects currently set terminals can be found using [`JBDirectory.terminalsOf(...)`](/api/contracts/jbdirectory/read/terminalsof.md).

```
function terminalsOf(uint256 _projectId) external view override returns (IJBPaymentTerminal[] memory) { ... }
```

If a project has multiple terminals for the same token, the primary terminal that it wishes to accept funds through of that token type can be found using [`JBDirectory.primaryTerminalOf(...)`](/api/contracts/jbdirectory/read/primaryterminalof.md).

```
function primaryTerminalOf(uint256 _projectId, address _token)
  public
  view
  override
  returns (IJBPaymentTerminal) { ... }
```

The [`JBDirectory`](/api/contracts/jbdirectory/README.md) contract also stores the address of the controller that is managing a project's funding cycles and tokens. A projects current terminal can be found using [`JBDirectory.controllerOf(...)`](/api/contracts/jbdirectory/properties/controllerof.md).

```
function controllerOf(uint256 _projectId) external view override returns (IJBController) { ... }
```

</details>

Once a project has been created, it can begin accepting funds from anyone through any terminal it has added. For example, if the project has added the [`JBETHPaymentTerminal`](/api/contracts/or-payment-terminals/jbethpaymentterminal), ETH can be sent to the project by calling its [`pay(...)`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/pay.md) transaction.

```
function pay(
  uint256 _amount,
  uint256 _projectId,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string calldata _memo,
  bytes calldata _metadata
) external payable virtual override isTerminalOf(_projectId) { ... }
```

<details>

<summary>View treasury balance</summary>

A project's treasury balance in a terminal can be found in the store contract. For example, in the [`JBPaymentTerminalStore`](/api/contracts/jbpaymentterminalstore/README.md), the balance can be found using [`JBPaymentTerminalStore.balanceOf(...)`](/api/contracts/jbpaymentterminalstore/properties/balanceof.md).

```
function balanceOf(IJBPaymentTerminal _terminal, uint256 _projectId)
  external
  view
  override
  returns (uint256) { ... }
```

The project's current overflow for a terminal can also be found in the store contracts. For example, in the [`JBPaymentTerminalStore`](/api/contracts/jbpaymentterminalstore/README.md), the terminal's overflow can be found using [`JBPaymentTerminalStore.currentOverflowOf(...)`](/api/contracts/jbpaymentterminalstore/read/currentoverflowof.md).

```
function currentOverflowOf(IJBPaymentTerminal _terminal, uint256 _projectId)
  external
  view
  returns (uint256) { ... }
```

A terminal store can also resolve the total amount of overflow in all of a project's terminals. For example, in the [`JBPaymentTerminalStore`](/api/contracts/jbpaymentterminalstore/README.md), the project's overall overflow can be found using [`JBPaymentTerminalStore.currentTotalOverflowOf(...)`](/api/contracts/jbpaymentterminalstore/read/currenttotaloverflowof.md). You'll need to send the number of decimals you're expecting the returned fixed point number to include, and the curreny it's in terms of.

```
function currentTotalOverflowOf(
  uint256 _projectId,
  uint256 _decimals,
  uint256 _currency
) external view returns (uint256) { ... }
```

</details>

<details>

<summary>View project token distribution</summary>

Each holder's balance of a project's token can be found in the [`JBTokenStore`](/api/contracts/jbtokenstore/README.md) contract. The balance can be found using [`JBTokenStore.balanceOf(...)`](/api/contracts/jbtokenstore/read/balanceof.md).

```
function balanceOf(address _holder, uint256 _projectId) external view returns (uint256 _result)
```

The project token's total supply can also be found in the [`JBTokenStore`](/api/contracts/jbtokenstore/README.md) contract using [`JBTokenStore.totalSupplyOf(...)`](/api/contracts/jbtokenstore/read/totalsupplyof.md)

```
function totalSupplyOf(uint256 _projectId) external view returns (uint256)
```

</details>

<details>

<summary>View reserved token balance</summary>

A project's undistributed reserved token balance can be found in the project's current controller. For example in the [`JBController`](/api/contracts/or-controllers/jbcontroller/README.md), the used can be found using [`JBController.reservedTokenBalanceOf(...)`](/api/contracts/or-controllers/jbcontroller/read/reservedtokenbalanceof.md).

```
function reservedTokenBalanceOf(uint256 _projectId, uint256 _reservedRate)
  external
  view
  returns (uint256) { ... }
```

</details>

At any point, anyone can distribute a project's funds from a terminal up to its current funding cycle's distribution limit to its preprogrammed payout splits. For example, if the project has added the [`JBETHPaymentTerminal`](/api/contracts/or-payment-terminals/jbethpaymentterminal), funds can be distributed by calling its [`distributePayoutsOf(...)`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/distributepayoutsof.md) transaction. 

```
function distributePayoutsOf(
  uint256 _projectId,
  uint256 _amount,
  uint256 _currency,
  uint256 _minReturnedWei,
  string memory _memo
) external override nonReentrant returns (uint256) { ... }
```

<details>

<summary>View used distribution limit</summary>

Any used distribution limit can be found in the terminal store contract for each terminal. For example, in the [`JBPaymentTerminalStore`](/api/contracts/jbpaymentterminalstore/README.md), the used distribution limit during a funding cycle can be found using [`JBPaymentTerminalStore.usedDistributionLimitOf(...)`](/api/contracts/jbpaymentterminalstore/properties/useddistributionlimitof.md).

```
function usedDistributionLimitOf(
  IJBPaymentTerminal _terminal,
  uint256 _projectId,
  uint256 _fundingCycleNumber
) external view override returns (uint256) { ... }
```

</details>

A project's owner can also distribute additional funds from its treasury's overflow for each of its terminals up until its preconfigured allowance. For example, if the project has added the [`JBETHPaymentTerminal`](/api/contracts/or-payment-terminals/jbethpaymentterminal), funds can be distributed by calling its [`useAllowanceOf(...)`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/useallowanceof.md) transaction. 



```
function usedDistributionLimitOf(
  IJBPaymentTerminal _terminal,
  uint256 _projectId,
  uint256 _fundingCycleNumber
) external view override returns (uint256) { ... }
```

<details>

<summary>View used overflow allowance</summary>

Any used overflow allowance can also be found in the terminal store contracts for each terminal. For example, in the [`JBPaymentTerminalStore`](/api/contracts/jbpaymentterminalstore/README.md), the used overflow allowance during a funding cycle can be found using [`JBPaymentTerminalStore.usedOverflowAllowanceOf(...)`](/api/contracts/jbpaymentterminalstore/properties/usedoverflowallowanceof.md).

```
function usedOverflowAllowanceOf(
  uint256 _projectId,
  uint256 _configuration
) external view override returns (uint256) { ... }
```

</details>

The protocol uses price feeds to convert values from one currency to another when distributing payouts, using overflow allowance, issuing project tokens when payments are received in various currencies, and more Current currency indexes can be found in [`JBCurrencies`](/api/libraries/jbcurrencies.md), and new currencies and price feeds can be added by the protocol's maintainers in the future.

<details>

<summary>View price conversions</summary>

 The same price feeds the protocol uses internally can be accessed externally through the [`JBPrices`](/api/contracts/jbprices/README.md) contract using [`JBPrices.priceFor(...)`](/api/contracts/jbprices/read/pricefor.md). This will revert if a feed is not found for the provided currency pair.

```
function priceFor(
  uint256 _currency,
  uint256 _base,
  uint256 _decimals
) external view override returns (uint256) { ... }
```

</details>

A project's owner can mint more of its token by calling [`JBController.mintTokensOf(...)`](/api/contracts/jbtokenstore/write/mintfor.md). Anyone can burn their tokens by calling [`JBController.burnFrom(...)`](/api/contracts/jbtokenstore/write/burnfrom.md).

```
function mintTokensOf(
  uint256 _projectId,
  uint256 _tokenCount,
  address _beneficiary,
  string calldata _memo,
  bool _preferClaimedTokens,
  bool _useReservedRate
)
  external
  override
  requirePermissionAllowingOverride(
    projects.ownerOf(_projectId),
    _projectId,
    JBOperations.MINT,
    directory.isTerminalOf(_projectId, IJBPaymentTerminal(msg.sender))
  ) { ... }
```

```
function burnTokensOf(
  address _holder,
  uint256 _projectId,
  uint256 _tokenCount,
  string calldata _memo,
  bool _preferClaimedTokens
)
  external
  override
  nonReentrant
  requirePermissionAllowingOverride(
    _holder,
    _projectId,
    JBOperations.BURN,
    directory.isTerminalDelegateOf(_projectId, msg.sender)
  ) { ... }
```

At any point, anyone can distribute a project's reserved tokens to the project's preprogrammed reserved token splits by calling [`JBController.distributeReservedTokensOf(...)`](/api/contracts/or-controllers/jbcontroller/write/distributereservedtokensof.md).

```
function distributeReservedTokensOf(uint256 _projectId, string memory _memo)
  external
  nonReentrant
  returns (uint256) { ... }
```

Anyone who holds your project's tokens can burn them at one of the project's terminals for a proportional share of the project's overflow. For example, if the project has added the [`JBETHPaymentTerminal`](/api/contracts/or-payment-terminals/jbethpaymentterminal), ETH can be reclaimed by redeeming project tokens in its [`redeemTokensOf(...)`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/redeemtokensof.md) transaction. The overflow amount is the terminal's balance minus the current funding cycle's distribution limit, and can be set to include the project's balance across all terminals.

Redeeming tokens allows your token holders to exit the community at any time with their share of the funds.

```
function redeemTokensOf(
  address _holder,
  uint256 _projectId,
  uint256 _tokenCount,
  uint256 _minReturnedTokens,
  address payable _beneficiary,
  string memory _memo,
  bytes memory _metadata
)
  external
  virtual
  override
  requirePermission(_holder, _projectId, JBOperations.REDEEM)
  returns (uint256 reclaimAmount) { ... }
```

A project's owner can reconfigure its project's funding cycle at any time by calling [`JBController.reconfigureFundingCyclesOf(...)`](/api/contracts/or-controllers/jbcontroller/write/reconfigurefundingcyclesof.md). If the project is in the middle of a funding cycle, the update will be queued to take effect next cycle. If the current funding cycle has an attached ballot contract, the reconfiguration must be approved by it before taking effect.

```
function reconfigureFundingCyclesOf(
  uint256 _projectId,
  JBFundingCycleData calldata _data,
  JBFundingCycleMetadata calldata _metadata,
  uint256 _mustStartAtOrAfter,
  JBGroupedSplits[] calldata _groupedSplits,
  JBFundAccessConstraints[] calldata _fundAccessConstraints,
  string calldata _memo
)
  external
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.RECONFIGURE)
  returns (uint256 configuration) { ... }
```

<details>

<summary>View reconfiguration ballot status</summary>

Reconfigurations are subject to the approval of the ballot contract included in the current funding cycle. The current ballot state can be found using [`JBFundingCycleStore.ballotStateOf(...)`](/api/contracts/jbfundingcyclestore/read/currentballotstateof.md).

```
function currentBallotStateOf(uint256 _projectId) external view override returns (JBBallotState) { ... } 
```

</details>

At any point, anyone can inject funds into a project's treasury via one of its terminals. For example, if the project has added the [`JBETHPaymentTerminal`](/api/contracts/or-payment-terminals/jbethpaymentterminal), it can add ETH to its treasury by calling the terminal's [`addToBalanceOf(...)`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/addtobalanceof.md) transaction.

```
function addToBalanceOf(
  uint256 _projectId,
  uint256 _amount,
  string calldata _memo
) external payable virtual override isTerminalOf(_projectId) { ... }
```

At any time after the project has been created, its owner can issue ERC-20 tokens for the protocol to use as its community token by calling [`JBController.issueTokenFor(...)`](/api/contracts/jbtokenstore/write/issuefor.md). By default the protocol uses an internal accounting mechanism to account for projects' tokens.

A project can instead bring their own token, so long as it adheres to the [`IJBToken`](/api/interfaces/ijbtoken.md) interface. They can do so by calling [`JBController.changeTokenFor(...)`](/api/contracts/jbtokenstore/write/changefor.md) This makes it easy to use ERC-1155's or custom contracts, and to change tokens over time to acheive a more creative design.

```
function issueTokenFor(
  uint256 _projectId,
  string calldata _name,
  string calldata _symbol
)
  external
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.ISSUE)
  returns (IJBToken token) { ... }
```

```
function changeTokenOf(
  uint256 _projectId,
  IJBToken _token,
  address _newOwner
)
  external
  nonReentrant
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.CHANGE_TOKEN) { ... }
```

<details>

<summary>View the project's token</summary>

The current token being used by the project can be found in the [`JBTokensStore`](/api/contracts/jbtokenstore/README.md) contract using [`JBTokenStore.tokenOf(...)`](/api/contracts/jbtokenstore/properties/tokenof.md). This will return a zero address if the project hasn't yet issued tokens or changed into a custom token.

```
function tokenOf(uint256 _projectId) external view override returns (IJBToken) { ... }
```

</details>

If a project has issued its ERC-20's or is using a custom [`IJBToken`](/api/interfaces/ijbtoken.md), a holder can claim tokens that are being represented via the internal accounting mechanism into the token by calling [`JBTokenStore.claimFor(...)`](/api/contracts/jbtokenstore/write/claimfor.md).

```
function claimFor(
  address _holder,
  uint256 _projectId,
  uint256 _amount
) external override requirePermission(_holder, _projectId, JBOperations.CLAIM) { ... }
```

<details>

<summary>View a holder's unclaimed project token balance</summary>

The unclaimed balance for each project token holder can be found in the [`JBTokensStore`](/api/contracts/jbtokenstore/README.md) contract using [`JBTokenStore.unclaimedBalanceOf(...)`](/api/contracts/jbtokenstore/properties/unclaimedbalanceof.md).

```
function unclaimedBalanceOf(address _holder, uint256 _projectId) external view override returns (uint256) { ... }
```

A project's total supply of unclaimed tokens can be found using [`JBTokenStore.unclaimedTotalSupplyOf(...)`](/api/contracts/jbtokenstore/properties/unclaimedtotalsupplyof.md)

```
function unclaimedTotalSupplyOf(uint256 _projectId) external view override returns (uint256) { ... }
```

</details>
