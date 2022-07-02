---
sidebar_position: 4
---

# Programmable treasury

In order to understand what Juicebox can do for your project, all you have to do is understand how one transaction works: [`JBController.launchProjectFor(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/launchprojectfor.md), which creates a project, configures its first funding cycle, and specifies where it can begin receiving and managing funds from.

```
function launchProjectFor(
  address _owner,
  JBProjectMetadata calldata _projectMetadata,
  JBFundingCycleData calldata _data,
  JBFundingCycleMetadata calldata _metadata,
  uint256 _mustStartAtOrAfter,
  JBGroupedSplits[] calldata _groupedSplits,
  JBFundAccessConstraints[] calldata _fundAccessConstraints,
  IJBPaymentTerminal[] memory _terminals,
  string memory _memo
) external virtual override returns (uint256 projectId) { ... }
```

This transaction launches a project. It does so by:

* Minting a project in the [`JBProjects`](/dev/api/contracts/jbprojects/README.md) ERC-721 contract by calling [`JBProjects.createFor(...)`](/dev/api/contracts/jbprojects/write/createfor.md).
* Then giving the [`JBController`](/dev/api/contracts/or-controllers/jbcontroller/README.md) contract that is currently handling the [`launchProjectFor`](/dev/api/contracts/or-controllers/jbcontroller/write/launchprojectfor.md) transaction authority to write to the [`JBFundingCycleStore`](/dev/api/contracts/jbfundingcyclestore/README.md) and the [`JBTokenStore`](/dev/api/contracts/jbtokenstore/README.md) on the project's behalf by calling [`JBDirectory.setControllerOf(...)`](/dev/api/contracts/jbdirectory/write/setcontrollerof.md).
* Then creating the project's first funding cycle using the provided `_data`, `_metadata`, and `_mustStartAtOrAfter` parameters by calling [`JBFundingCycleStore.configureFor(...)`](/dev/api/contracts/jbfundingcyclestore/write/configurefor.md).
* Then storing splits for any provided split groups by calling [`JBSplitStore.set(...)`](/dev/api/contracts/jbsplitsstore/write/set.md).
* Then storing any provided constraints on how the project will be able to access funds within any specified payment terminals by storing values in [`JBController._packedDistributionLimitDataOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/properties/-_packeddistributionlimitdataof.md), [`JBController._packedOverflowAllowanceDataOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/properties/-_packedoverflowallowancedataof.md).
* Then giving the provided `_terminals` access to the [`JBController`](/dev/api/contracts/or-controllers/jbcontroller/README.md) contract that is handling the [`launchProjectFor(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/launchprojectfor.md) transaction that is currently being executed, and also allowing anyone or any other contract in Web3 to know that the project is currently accepting funds through them by calling [`JBDirectory.setTerminalsOf(...)`](/dev/api/contracts/jbdirectory/write/setterminalsof.md).

#### Basics

Here are some examples, starting with the simplest version:

*   For `_projectMetadata` send the following [`JBProjectMetadata`](/dev/api/data-structures/jbprojectmetadata) values:

    ```javascript
    {
      content: "QmbH96jj8RTJgC9526RdsFs5dPvcsRfiRuD9797JXzcvbw",
      domain: 0
    }
    ```
*   For `_data` send the following [`JBFundingCycleData`](/dev/api/data-structures/jbfundingcycledata.md) values:

    ```javascript
    {
      duration: 0,
      weight: 1000000000000000000000000,
      discountRate: 0,
      ballot: 0x0000000000000000000000000000000000000000
    }
    ```
*   For `_metadata` send the following [`JBFundingCycleMetadata`](/dev/api/data-structures/jbfundingcyclemetadata.md) values:

    ```javascript
    {
      global: {
        allowSetTerminals: false,
        allowSetController: false,
      },
      reservedRate: 0,
      redemptionRate: 0,
      ballotRedemptionRate: 0,
      pausePay: false, 
      pauseDistributions: false, 
      pauseRedeem: false, 
      pauseBurn: false, 
      allowMinting: false, 
      allowTerminalMigration: false, 
      allowControllerMigration: false, 
      holdFees: false, 
      useTotalOverflowForRedemptions: false,
      useDataSourceForPay: false, 
      useDataSourceForRedeem: false, 
      dataSource: 0x0000000000000000000000000000000000000000, 
    }
    ```
* For `_mustStartAtOrAfter` send current timestamp.
* For `_groupedSplits` send an empty array.
* For `_fundAccessConstraints` send an empty array.
* For `_terminals` send an array only including the contract address of the [`JBETHPaymentTerminal`](/dev/api/contracts/or-terminals/jbethpaymentterminal).

This is the most vanilla project you can launch, which also makes it cheapest to launch gas-wise. Relatively little needs to get saved into storage.

Under these conditions:

* Your project can begin receiving funds through the [`JBETHPaymentTerminal`](/dev/api/contracts/or-terminals/jbethpaymentterminal).
* 1,000,000 of your project's tokens will be minted per ETH received since the configured `_data.weight` is `1000000000000000000000000`. (The raw value sent has 18 decimal places).
* All tokens minted as a result of received ETH will go to the beneficiary address specified by the payer of the ETH since the configured `_metadata.reservedRate` is 0.
* Nothing fancy will happen outside of the default token minting behavior since the configured `_metadata.useDataSourceForPay` is `false`.
* Nothing fancy will happen outside of the default token redemption behavior since the configured `_metadata.useDataSourceForRedeem` is `false`.
* None of the funds in the treasury can be distributed to the project owner since no `_fundAccessConstraints` were specified. This means all funds in the treasury are considered overflow. Since the configured `_metadata.redemptionRate` sent is 0 (which represents 100%), all outstanding tokens can be redeemed/burned to claim a proportional part of the overflow. This lets everyone who contributed funds reclaim their ETH if desired.
* A new funding cycle with an updated configuration can be triggered at any time by the project owner since the configured `_data.duration` of 0 and `_data.ballot` of `0x0000000000000000000000000000000000000000`. This lets the project owner capture an arbitrary amount of what is in the treasury at any given point by sending a reconfiguration transaction with `_fundAccessConstraints` specified.
* Your project will have basic project info with the IPFS file on `ipfs://QmbH96jj8RTJgC9526RdsFs5dPvcsRfiRuD9797JXzcvbw` (Juicebox Frontend use domain `0` to locate project metadata through IPFS, such as project name, logo, description, twitter handle and discord link)

#### Fund access constraints

Here's what happens when basic `_fundAccessConstraints` are specified by sending the following [`JBFundAccessContraints`](/dev/api/data-structures/jbfundaccessconstraints.md) values:

```javascript
[
  {
    terminal: <address of JBETHPaymentTerminal>,
    token: 0x000000000000000000000000000000000000EEEe, // Address representing ETH in JBTokens.
    distributionLimit: 4200000000000000000,
    overflowAllowance: 0,
    distributionLimitCurrency: 1,
    overflowAllowanceCurrency: 0
  }
]
```

* During each funding cycle with this configuration, the project can receive up to 4.2 ETH worth of tokens from the [`JBETHPaymentTerminal`](/dev/api/contracts/or-terminals/jbethpaymentterminal), since the configured `distributionLimitCurrency` is 1 ([which represents ETH](/dev/api/libraries/jbcurrencies.md)) and the `distributionLimit` is `4200000000000000000`. (The raw value sent has 18 decimal places).
* Anyone can call the [`JBPayoutRedemptionPaymentTerminal.distributePayoutsOf(...)`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/distributepayoutsof.md) transaction to send up to 4.2 ETH per funding cycle to the preconfigured splits. Since no splits were specified, all distributed funds go to the project owner.
* With each new funding cycle, another 4.2 ETH can be distributed.
* The project cannot distribute any funds in excess of the distribution limit since there is no `overflowAllowance`.

Here's what happens when using an overflow allowance instead:

```
[
  {
    terminal: <address of JBETHPaymentTerminal>,
    token: 0x000000000000000000000000000000000000EEEe, // Address representing ETH in JBTokens.
    distributionLimit: 0,
    overflowAllowance: 690000000000000000000,
    distributionLimitCurrency: 0,
    overflowAllowanceCurrency: 2
  }
]
```

* Until a new reconfiguration transaction is sent, the project owner can send up to 690 USD worth of ETH tokens from the [`JBETHPaymentTerminal`](/dev/api/contracts/or-terminals/jbethpaymentterminal) to any address it chooses since the configured `overflowAllowanceCurrency` is 2 ([which represents USD](/dev/api/libraries/jbcurrencies.md)) and the `overflowAllowance` is `690000000000000000000` (the raw value sent has 18 decimal places).
* Meanwhile, all of the project's funds in the [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md) are considered overflow since there is no distribution limit.
* Rolled-over funding cycles (i.e. cycles with the same configuration) do not refresh the allowance.
* An overflow allowance is a free allowance the project can use without additional pre-programmed stipulations.

The `_distributionLimit` and `_overflowAllowance` parameters must fit in a `uint232`. 

#### Grouped splits

If you wish to automatically split treasury payouts or reserved token distributions between various destinations (addresses, other Juicebox projects, or split allocator contracts), add some grouped splits to the [`launchProjectFor`](/dev/api/contracts/or-controllers/jbcontroller/write/launchprojectfor.md) transaction.

```
{
  group: 1,
  splits: [
   {
     preferClaimed: false,
     preferAddToBalance: false,
     percent: 50000000, // 5%, out of 1000000000
     projectId: 0,
     beneficiary: 0x0123456789012345678901234567890123456789,
     lockedUntil: 0,
     allocator: 0x0000000000000000000000000000000000000000
   },
   {
     preferClaimed: false,
     preferAddToBalance: false,
     percent: 60000000, // 6%, out of 1000000000
     projectId: 420,
     beneficiary: 0x0123456789012345678901234567890123456789,
     lockedUntil: 0,
     allocator: 0x0000000000000000000000000000000000000000
   },
   {
     preferClaimed: true,
     preferAddToBalance: false,
     percent: 60000000, // 6%, out of 1000000000
     projectId: 421,
     beneficiary: 0x0123456789012345678901234567890123456789,
     lockedUntil: 0,
     allocator: 0x0000000000000000000000000000000000000000
   },
   {
     preferClaimed: false,
     preferAddToBalance: false,
     percent: 70000000, // 7%, out of 1000000000
     projectId: 0,
     beneficiary: 0x0000000000000000000000000000000000000000,
     lockedUntil: 1644543173,
     allocator: 0x6969696969696969696969696969696969696969
   },
   {
     preferClaimed: false,
     preferAddToBalance: false,
     percent: 10000000, // 1%, out of 1000000000
     projectId: 0,
     beneficiary: 0x0000000000000000000000000000000000000000,
     lockedUntil: 0,
     allocator: 0x0000000000000000000000000000000000000000
   },
  ]
}
```

* If an `allocator` is provided, the split will try to send the split funds to it. Otherwise, if a `projectId` is provided the split will try to send funds to that projectId's Juicebox treasury by calling `pay(...)` or `addToBalanceOf(...)`, sending the project's tokens to the `beneficiary` if using `pay(...)`. Otherwise, if a `beneficiary` is provided the split funds will be sent directly to it. Otherwise, the split will not have a destination defined within it and so applications can treat it as a wild card. In this case, payouts send the split amount to the `msg.sender` of the transaction.
* There are 5 splits in this group.
  * The first will send 5% of the total directly to address `0x0123456789012345678901234567890123456789`.
  * The second will send 6% to the treasury of the Juicebox project with ID 420. Since `preferAddToBalance` is false, the payment will be made through the `pay(...)` function of the project's current primary terminal for the token being distributed. Project 420's tokens will be sent to address `0x0123456789012345678901234567890123456789.`.
  * The third will send 6% to the Juicebox treasury of project with ID 421. This project's tokens will be sent to address `0x0123456789012345678901234567890123456789.`, and they will be automatically claimed as ERC-20s in the beneficiary's wallet if the project has issued them due to the `preferClaimed` flag being `true`.
  * The fourth will send 7% to the `allocate` function in contract with address `0x6969696969696969696969696969696969696969` which must adhere to [`IJBSplitAllocator`](/dev/api/interfaces/ijbsplitallocator.md). This function will also receive all contextual information regarding the split for it to do custom things with. This split will not be editable or removable from the group during this funding cycle configuration while the `lockedUntil` date has yet to passed.
  * The last will send 1% of the total directly to `msg.sender` address since no destination was specified within the split.
  * All of the remaining funds (100% - 5% - 6% - 6% - 7% - 1% = 75%) will be sent to the project owner's address.
* Since the configured split group is 1 ([which represents ETH payouts](/dev/api/libraries/jbsplitsgroups.md)), the protocol will use this group of splits when distributing funds from the ETH terminal.
* This splits will only apply to the funding cycle configuration during which they were set. Splits will have to be set again for future configurations.
* The same group split behavior applies to reserved tokens ([represented by group namespace 2](/dev/api/libraries/jbsplitsgroups.md)), although those routed to a `projectId` will be sent to the project's owner, and those routed to an allocator will be sent to the contract before having the contract's `allocate` function called.
