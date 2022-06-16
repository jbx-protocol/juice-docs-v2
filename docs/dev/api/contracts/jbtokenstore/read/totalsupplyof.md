# totalSupplyOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBTokenStore`](/dev/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The total supply of tokens for each project, including claimed and unclaimed tokens.**

### Definition

```
function totalSupplyOf(uint256 _projectId) external view override returns (uint256 totalSupply) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get the total token supply of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBTokenStore`](/dev/api/interfaces/ijbtokenstore.md) interface.
* The function returns the total supply of the project's tokens.

#### Body

1.  Get a reference to the total supply of the project's unclaimed tokens.

    ```
    // Get a reference to the total supply of the project's unclaimed tokens. Assign it to the return value.
    totalSupply = unclaimedTotalSupplyOf[_projectId];
    ```

    _Internal references:_

    * [`unclaimedTotalSupplyOf`](/dev/api/contracts/jbtokenstore/properties/unclaimedtotalsupplyof.md)
2.  Get a reference to the project's current token.

    ```
    // Get a reference to the project's current token.
    IJBToken _token = tokenOf[_projectId];
    ```

    _Internal references:_

    * [`tokenOf`](/dev/api/contracts/jbtokenstore/properties/tokenof.md)
3.  If the project has a current token, add its total supply to the total.

    ```
    // If the project has a current token, add its total supply to the total.
    if (_token != IJBToken(address(0))) totalSupply = totalSupply + _token.totalSupply(_projectId);
    ```

    _External references:_

    * [`totalSupply`](../../jbtoken/read/totalsupply.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  The total supply of tokens for each project, including claimed and unclaimed tokens.

  @param _projectId The ID of the project to get the total token supply of.

  @return totalSupply The total supply of the project's tokens.
*/
function totalSupplyOf(uint256 _projectId) external view override returns (uint256 totalSupply) {
  // Get a reference to the total supply of the project's unclaimed tokens.
  totalSupply = unclaimedTotalSupplyOf[_projectId];

  // Get a reference to the project's current token.
  IJBToken _token = tokenOf[_projectId];

  // If the project has a current token, add it's total supply to the total.
  if (_token != IJBToken(address(0))) totalSupply = totalSupply + _token.totalSupply(_projectId);
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
