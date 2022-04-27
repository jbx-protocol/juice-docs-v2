# Multisig transaction guide

## Multisig Process

The Multisig Process was ratified by JBX holders in [*JBP - 98 Ratify Multisig Process](https://snapshot.org/#/jbdao.eth/proposal/0xaff54a1eebc16329758c925ff0fbbeb73718a0d06918609b1e8bbbf9c7cada68).* Multisig members should be aware of the following stipulations:

1. **The Juicebox multisig and Juicebox multisig owner accounts must agree to execute the will of JBX token holders, as expressed through the Juicebox Governance Process.**
2. Existing multisig members must agree to these principles, and prospective multisig members must agree to these principles before being added to the multisig.
3. These principles are intended as general guidelines that formalize existing processes while being flexible enough to adapt as Juicebox changes over time.

## Routine

- Check the [**transaction queue**](https://gnosis-safe.io/app/eth:0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e/transactions/queue) to see pending transactions. Double check the transaction data and [relevant proposals](https://snapshot.org/#/jbdao.eth) **before signing**.
- Keep an eye on `#multisig` in the JuiceboxDAO Discord server to coordinate with other multisig members
- The latest payouts and reserved JBX recipients can be found in `#bookkeeping.` Queue the reconfiguration and notify others in `#multisig`.
- Request gas reimbursements in `#bookkeeping`.

## Juicebox v1.0 Multisig Actions

*For more information about v1 transactions, look at the [Juicebox Docs](https://docs.juicebox.money/).*

### Treasury and Tickets

| Transaction | Description |
| --- | --- |
| TerminalV1.configure | Configure funding cycle properties including funding target, funding distribution, reserved tokens, etc. |
| TerminalV1.printPreminedTickets | Print tickets to any address. Only works before payments have been received (no longer possible for JuiceboxDAO). |
| TerminalV1.migrate | Migrate funds and operations to a new contract. |
| TicketBooth.issue | Issues an owner's ERC-20 Tickets that'll be used when unstaking tickets and deploys an owner's Ticket ERC-20 token contract. |
| TerminalV1_1.printTickets | Print tickets to any address (Only available on V1.1 projects—Allow minting tokens must be enabled). |

### Project Details

| Transaction | Description |
| --- | --- |
| Projects.setHandle | Set the project's handle. |
| Projects.setUri | Set the project's URI (IPFS CDN with project info). |
| Projects.transferHandle | Transfer handle to another address. |
| Projects.claimHandle | Claim and apply a transferred handle. |
| Projects.renewHandle | Renew a handle to prevent claiming for a year after it is challenged. |

### Project Control

| Transaction | Description |
| --- | --- |
| OperatorStore.setOperator | Give an address permission to take actions (full operation list) pertaining to a specified domain |
| Projects.transfer | Transfer the ERC-721 that confers ownership in a Juicebox project to a new address. |

### Gnosis

All Gnosis actions are available on [their app](https://gnosis-safe.io/app/eth:0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e/settings/owners), use them for better UX.

| Transaction | Description |
| --- | --- |
| OwnerManager.addOwnerWithThreshold | Add a new owner to the Safe and update the threshold at the same time (check txn here) |
| OwnerManager.removeOwner | Remove an owner from the Safe and update the threshold at the same time (check txn here) |
| OwnerManager.changeThreshold | Update the number of owner accounts needed to confirm a Gnosis Safe transaction. |
|  |  |

## Add Juicebox Safe

1. Go to [https://gnosis-safe.io/app/](https://gnosis-safe.io/app/)

![Untitled](Multisig%20transaction%20guide%2092ebc0838ddb4ed3986b6e20550fba65/Untitled.png)

1. Click “Add existing Safe”, input address “0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e”

![Untitled](Multisig%20transaction%20guide%2092ebc0838ddb4ed3986b6e20550fba65/Untitled%201.png)

1. Label the owners if you’d like

![Untitled](Multisig%20transaction%20guide%2092ebc0838ddb4ed3986b6e20550fba65/Untitled%202.png)

1. Finish the procedure, and next time you could find JuiceboxDAO on your Gnosis App.

## How to write a “configure” transaction:

![Untitled](Multisig%20transaction%20guide%2092ebc0838ddb4ed3986b6e20550fba65/Untitled%203.png)

First, add the [Juicebox app](https://gnosis-safe.io/app/eth:0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e/apps?appUrl=https://juicebox.money) to Gnosis Safe:

- navigate to Gnosis Apps
- Add custom app -> [https://juicebox.money/](https://juicebox.money/)
- check "This app is not a Gnosis product and I agree to use this app at my own risk."
- click “Add”

You can access the Juicebox website with multisig wallet connected. Navigate to the JuiceboxDAO project and find the “Reconfigure upcoming” button:

![Untitled](Multisig%20transaction%20guide%2092ebc0838ddb4ed3986b6e20550fba65/Untitled%204.png)

Click on it to reconfigure. You will be able to see the preview before submit transaction. If you submit the txn, call other members to sign it on Gnosis App.

![Untitled](Multisig%20transaction%20guide%2092ebc0838ddb4ed3986b6e20550fba65/Untitled%205.png)

## How to read a “configure” transaction:

Here are the interface definitions:

```solidity
/**
      @notice 
      Configures the properties of the current funding cycle if the project hasn't distributed tickets yet, or
      sets the properties of the proposed funding cycle that will take effect once the current one expires
      if it is approved by the current funding cycle's ballot.
      @dev
      Only a project's owner or a designated operator can configure its funding cycles.
      @param _projectId The ID of the project being reconfigured. 
      @param _properties The funding cycle configuration.
        @dev _properties.target The amount that the project wants to receive in this funding stage. Sent as a wad.
        @dev _properties.currency The currency of the `target`. Send 0 for ETH or 1 for USD.
        @dev _properties.duration The duration of the funding stage for which the `target` amount is needed. Measured in days. Send 0 for a boundless cycle reconfigurable at any time.
        @dev _properties.cycleLimit The number of cycles that this configuration should last for before going back to the last permanent. This has no effect for a project's first funding cycle.
        @dev _properties.discountRate A number from 0-200 indicating how valuable a contribution to this funding stage is compared to the project's previous funding stage.
          If it's 200, each funding stage will have equal weight.
          If the number is 180, a contribution to the next funding stage will only give you 90% of tickets given to a contribution of the same amount during the current funding stage.
          If the number is 0, an non-recurring funding stage will get made.
        @dev _properties.ballot The new ballot that will be used to approve subsequent reconfigurations.
      @param _metadata A struct specifying the TerminalV1 specific params _bondingCurveRate, and _reservedRate.
        @dev _metadata.reservedRate A number from 0-200 indicating the percentage of each contribution's tickets that will be reserved for the project owner.
        @dev _metadata.bondingCurveRate The rate from 0-200 at which a project's Tickets can be redeemed for surplus.
          The bonding curve formula is https://www.desmos.com/calculator/sp9ru6zbpk
          where x is _count, o is _currentOverflow, s is _totalSupply, and r is _bondingCurveRate.
        @dev _metadata.reconfigurationBondingCurveRate The bonding curve rate to apply when there is an active ballot.
      @return The ID of the funding cycle that was successfully configured.
    */
function configure(
    uint256 _projectId,
    FundingCycleProperties calldata _properties,
    FundingCycleMetadata calldata _metadata,
    PayoutMod[] memory _payoutMods,
    TicketMod[] memory _ticketMods
)

struct PayoutMod {
    bool preferUnstaked;
    uint16 percent;
    uint48 lockedUntil;
    address payable beneficiary;
    IModAllocator allocator;
    uint56 projectId;
}

struct TicketMod {
    bool preferUnstaked;
    uint16 percent;
    uint48 lockedUntil;
    address payable beneficiary;
}
```

### Real transaction as example to explain

Check Gnosis safe tx detail [here](https://gnosis-safe.io/app/eth:0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e/transactions/0x3c4ab13fcd7f62c4d6149b32fca3c64b1814d3931bb048bbbbce7cb681acdc68).

![Untitled](Multisig%20transaction%20guide%2092ebc0838ddb4ed3986b6e20550fba65/Untitled%206.png)

What does this tx mean?

- `_projectId: 1` we are configuring the JuiceboxDAO project
- `_properties: `

```solidity
[
// it's 117453.82 based on 18 decimals
117453820000000000000000
// 0 for ETH, 1 for USD
// funding target: $117,453.82
1
// funding duration: 14 days
14
// cycle limit: 0
0
// discount rate: 10% (based on 1000)
100
// contract address https://etherscan.io/address/0x6d6da471703647Fd8b84FFB1A29e037686dBd8b2
// ballot: 3-day delay
0x6d6da471703647Fd8b84FFB1A29e037686dBd8b2
]
```

- `_metadata:`

```solidity
[
// reserve rate: 50% (based on 200)
100
// bonding curve: 95% (based on 200)
190
// reconfiguration bonding curve: 95%
190
]
```

- `_payoutMod:`

```solidity
[
	[
  // preferUnstaked: false
	False
  // percent: 13.4
	1340
  // lockedUntil: 0
	0
  // beneficiary: 0x823b...ADAD (jango.eth)
	0x823b92d6a4b2AED4b15675c7917c9f922ea8ADAD
  // allocator: zero address
	0x0000000000000000000000000000000000000000
  // only set this if you are paying other projects on Juicebox
  // projectId: 0 (not project but address outside Juicebox ecosystem)
	0
	]
  // other payout mod
  // ...
]
```

- `_ticketMods:`

```solidity
[
	[
  // preferUnstaked: false
	False
  // percent: 1.92%
	192
  // lockedUtil: 0
	0
  // beneficiary: 0x823b...ADAD (jango.eth)
	0x823b92d6a4b2AED4b15675c7917c9f922ea8ADAD
	]
  // other ticket mod
  // ...
]
```