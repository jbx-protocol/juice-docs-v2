# balanceOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBTokenStore`](/dev/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The total balance of tokens a holder has for a specified project, including claimed and unclaimed tokens.**

### Definition

```
function balanceOf(address _holder, uint256 _projectId)
  external
  view
  override
  returns (uint256 balance) { ... }
```
* Arguments:
  * `_holder` is the token holder to get a balance for.
  * `_projectId` is the project to get the `_holder`s balance of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore.md) interface.
* The function returns the project token balance of the `_holder`.

#### Body

1.  Get a reference to the holder's unclaimed balance for the project.

    ```
    // Get a reference to the holder's unclaimed balance for the project.
    balance = unclaimedBalanceOf[_holder][_projectId];
    ```

    _Internal references:_

    * [`unclaimedBalanceOf`](/dev/api/contracts/jbtokenstore/properties/unclaimedbalanceof.md)
2.  Get a reference to the project's current token.

    ```
    // Get a reference to the project's current token.
    IJBToken _token = tokenOf[_projectId];
    ```

    _Internal references:_

    * [`tokenOf`](/dev/api/contracts/jbtokenstore/properties/tokenof.md)
3.  If the project has a current token, add the holder's balance to the total.

    ```
    // If the project has a current token, add the holder's balance to the total.
    if (_token != IJBToken(address(0))) balance = balance + _token.balanceOf(_holder, _projectId);
    ```

    _External references:_

    * [`balanceOf`](/dev/api/contracts/jbtoken/read/balanceof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  The total balance of tokens a holder has for a specified project, including claimed and unclaimed tokens.

  @param _holder The token holder to get a balance for.
  @param _projectId The project to get the `_holder`s balance of.

  @return balance The project token balance of the `_holder`.
*/
function balanceOf(address _holder, uint256 _projectId)
  external
  view
  override
  returns (uint256 balance)
{
  // Get a reference to the holder's unclaimed balance for the project.
  balance = unclaimedBalanceOf[_holder][_projectId];

  // Get a reference to the project's current token.
  IJBToken _token = tokenOf[_projectId];

  // If the project has a current token, add the holder's balance to the total.
  if (_token != IJBToken(address(0))) balance = balance + _token.balanceOf(_holder, _projectId);
}
```

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
