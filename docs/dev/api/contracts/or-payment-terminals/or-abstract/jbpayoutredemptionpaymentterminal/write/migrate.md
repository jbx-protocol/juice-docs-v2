# migrate

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows a project owner to migrate its funds and operations to a new terminal that accepts the same token type.**

_Only a project's owner or a designated operator can migrate it._

#### Definition

```
function migrate(uint256 _projectId, IJBPaymentTerminal _to)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.MIGRATE_TERMINAL) 
  returns (uint256 balance) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project being migrated.
  * `_to` is the terminal contract that will gain the project's funds.
* Through the [`requirePermission`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the project's owner, or from an operator that has been given the [`JBOperations.MIGRATE_TERMINAL`](/dev/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId`.
* The function can be overriden by inheriting contracts.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
* The function returns the amount of funds that were migrated, as a fixed point number with the same amount of decimals as this terminal.

#### Body

1.  Make sure the token type of the terminal being migrated to matches the token type of this terminal.

    ```
    // The terminal being migrated to must accept the same token as this terminal.
    if (!_to.acceptsToken(token, _projectId)) revert TERMINAL_TOKENS_INCOMPATIBLE();
    ```

    _Internal references:_

    * [`token`](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/properties/token.md)

    _External references:_

    * [`acceptsToken`](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/read/acceptstoken.md)
2.  Record the migration and get a reference to the project's balance.

    ```
    // Record the migration in the store.
    balance = store.recordMigration(_projectId);
    ```

    _Internal references:_

    * [`store`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/properties/store.md)

    _External references:_

    * [`recordMigration`](/dev/api/contracts/jbsingletokenpaymentterminalstore/write/recordmigration.md)
3.  If there's a balance to migrate, move the funds over to the new terminal. Send ETH along with the transaction if this terminal is an ETH terminal. Make sure any inherited pre-transfer logic is called before transferring. 

    ```
    // Transfer the balance if needed.
    if (balance > 0) {
      // Trigger any inherited pre-transfer logic.
      _beforeTransferTo(address(_to), balance);

      // If this terminal's token is ETH, send it in msg.value.
      uint256 _payableValue = token == JBTokens.ETH ? balance : 0;

      // Withdraw the balance to transfer to the new terminal;
      _to.addToBalanceOf{value: _payableValue}(balance, _projectId, token, '', bytes(''));
    }
    ```

    _Library references:_

    * [`JBTokens`](/dev/api/libraries/jbcurrencies.md)
      * `.ETH`

    _Virtual references:_

    * [`_beforeTransferTo`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_beforetransferto.md)

    _Internal references:_

    * [`addToBalanceOf`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/addtobalanceof.md)
4.  Emit a `Migrate` event with the relevant parameters.

    ```
    emit Migrate(_projectId, _to, balance, msg.sender);
    ```

    _Event references:_

    * [`Migrate`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/events/migrate.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Allows a project owner to migrate its funds and operations to a new terminal that accepts the same token type.

  @dev
  Only a project's owner or a designated operator can migrate it.

  @param _projectId The ID of the project being migrated.
  @param _to The terminal contract that will gain the project's funds.

  @return balance The amount of funds that were migrated, as a fixed point number with the same amount of decimals as this terminal.
*/
function migrate(uint256 _projectId, IJBPaymentTerminal _to)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.MIGRATE_TERMINAL)
  returns (uint256 balance)
{
  // The terminal being migrated to must accept the same token as this terminal.
  if (!_to.acceptsToken(token, _projectId)) revert TERMINAL_TOKENS_INCOMPATIBLE();

  // Record the migration in the store.
  balance = store.recordMigration(_projectId);

  // Transfer the balance if needed.
  if (balance > 0) {
    // Trigger any inherited pre-transfer logic.
    _beforeTransferTo(address(_to), balance);

    // If this terminal's token is ETH, send it in msg.value.
    uint256 _payableValue = token == JBTokens.ETH ? balance : 0;

    // Withdraw the balance to transfer to the new terminal;
    _to.addToBalanceOf{value: _payableValue}(_balance, _projectId, token, '', bytes(''));
  }

  emit Migrate(_projectId, _to, balance, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                             | Description                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| **`TERMINAL_TOKENS_INCOMPATIBLE`** | Thrown if the terminal being migrated to doesn't use the same token as this terminal. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                       | Data                                                                                                                                                                                                                                               |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Migrate`**](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/events/migrate.md)                                 | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBPaymentTerminal](/dev/api/interfaces/ijbpaymentterminal.md) indexed to</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                                                                                                                                                                                                 |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
