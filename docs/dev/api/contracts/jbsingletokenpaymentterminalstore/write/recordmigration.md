# recordMigration

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/api/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Records the migration of funds from this store.**

_The msg.sender must be an [`IJBSingleTokenPaymentTerminal`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md)._

#### Definition

```
function recordMigration(uint256 _projectId)
  external
  override
  nonReentrant
  returns (uint256 balance) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project being migrated.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
* The function returns the project's migrated balance, as a fixed point number with the same amount of decimals as its relative terminal.

#### Body

1.  Get a reference to the project's current funding cycle.

    ```
    // Get a reference to the project's current funding cycle.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _External references:_

    * [`currentOf`](/dev/api/contracts/jbfundingcyclestore/read/currentof.md)
2.  Make sure that migrating terminals is allowed by the current funding cycle.

    ```
    // Migration must be allowed.
    if (!_fundingCycle.terminalMigrationAllowed()) revert PAYMENT_TERMINAL_MIGRATION_NOT_ALLOWED();
    ```

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/dev/api/libraries/jbfundingcyclemetadataresolver.md)
      * `.terminalMigrationAllowed(...)`
3.  Get a reference to the project's current balance. Set this to the value that the function will return.

    ```
    // Return the current balance.
    balance = balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId];
    ```

    _Internal references:_

    * [`balanceOf`](/dev/api/contracts/jbsingletokenpaymentterminalstore/properties/balanceof.md)
4.  Set the project's balance to 0 since funds are moving away from this terminal.

    ```
    // Set the balance to 0.
    balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] = 0;
    ```

    _Internal references:_

    * [`balanceOf`](/dev/api/contracts/jbsingletokenpaymentterminalstore/properties/balanceof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Records the migration of funds from this store.

  @dev
  The msg.sender must be an IJBSingleTokenPaymentTerminal. 

  @param _projectId The ID of the project being migrated.

  @return balance The project's migrated balance, as a fixed point number with the same amount of decimals as its relative terminal.
*/
function recordMigration(uint256 _projectId)
  external
  override
  nonReentrant
  returns (uint256 balance)
{
  // Get a reference to the project's current funding cycle.
  JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);

  // Migration must be allowed.
  if (!_fundingCycle.terminalMigrationAllowed()) revert PAYMENT_TERMINAL_MIGRATION_NOT_ALLOWED();

  // Return the current balance.
  balance = balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId];

  // Set the balance to 0.
  balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] = 0;
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                  | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| **`PAYMENT_TERMINAL_MIGRATION_NOT_ALLOWED`** | Thrown if the project's current funding cycle disallows terminal migrations. |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
