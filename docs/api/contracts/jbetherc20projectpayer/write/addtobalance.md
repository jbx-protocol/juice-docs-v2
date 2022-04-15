# pay

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20ProjectPayer`](/api/contracts/jbetherc20projectpayer/README.md)

Interface: [`IJBProjectPayer`](/api/interfaces/ijbprojectpayer.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Add to the balance of the specified project.**

#### Definition

```
function addToBalance(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  string memory _memo
) public payable virtual override { ... }
```

* Arguments:
  * `_projectId` is the ID of the project that is being paid.
  * `_token` is the token being paid in.
  * `_amount` is the amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  * `_decimals` is the number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  * `_memo` is a memo to pass along to the emitted event.
* The function can be accessed externally by anyone, or internally from this contract or one that inherits it.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBProjectPayer`](/api/interfaces/ijbprojectpayer.md) interface.
* The function doesn't return anything.

#### Body

1.  If the token isn't ETH, make sure ETH wasn't sent to the function, then transfer the amount of tokens from the message sender to this contract. If the token is ETH, override the specified amount and decimals values with with amount of ETH sent to the function, which is denoted as a fixed point number with 18 decimals.

    ```
    // ETH shouldn't be sent if the token isn't ETH.
    if (address(_token) != JBTokens.ETH) {
      if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

      // Transfer tokens to this terminal from the msg sender.
      IERC20(_token).transferFrom(msg.sender, address(this), _amount);
    } else {
      _amount = msg.value;
      _decimals = 18;
    }
    ```

    _External references:_

    * [`transferFrom`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-transferFrom-address-address-uint256-)
2.  Add to the project's balance.

    ```
    _addToBalance(_projectId, _token, _amount, _decimals, _memo);
    ```

    _Internal references:_

    * [`_addToBalance`](/api/contracts/jbetherc20projectpayer/write/-_addtobalance.md)
    
</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Add to the balance of the specified project.

  @param _projectId The ID of the project that is being paid.
  @param _token The token being paid in.
  @param _amount The amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  @param _decimals The number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  @param _memo A memo to pass along to the emitted event.
*/
function addToBalance(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  string memory _memo
) public payable virtual override {
  // ETH shouldn't be sent if the token isn't ETH.
  if (address(_token) != JBTokens.ETH) {
    if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

    // Transfer tokens to this terminal from the msg sender.
    IERC20(_token).transferFrom(msg.sender, address(this), _amount);
  } else {
    _amount = msg.value;
    _decimals = 18;
  }

  _addToBalance(_projectId, _token, _amount, _decimals, _memo);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                       | Description                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| **`NO_MSG_VALUE_ALLOWED`**    | Thrown if ETH was sent to a non-ETH terminal.   |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
