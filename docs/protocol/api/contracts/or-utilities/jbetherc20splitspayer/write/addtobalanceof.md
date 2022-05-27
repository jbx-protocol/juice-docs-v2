# addToBalanceOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20SplitsPayer`](/protocol/api/contracts/or-utilities/jbetherc20splitspayer/README.md)

Interface: [`IJBSplitsPayer`](/protocol/api/interfaces/ijbsplitspayer.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Add to the balance of the specified project.**

#### Definition

```
function addToBalanceOf(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  string calldata _memo,
  bytes calldata _metadata
) public payable virtual override nonReentrant { ... }
```

* Arguments:
  * `_projectId` is the ID of the project that is being paid after.
  * `_token` is the token being paid in.
  * `_amount` is the amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  * `_decimals` is the number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  * `_memo` is a memo to pass along to the emitted event.
  * `_metadata` is @param extra data to pass along to the terminal.
* The function can be accessed externally by anyone, or internally from this contract or one that inherits it.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBSplitsPayer`](/protocol/api/interfaces/ijbsplitspayer.md) interface.
* The function doesn't return anything.

#### Body

1.  If the token isn't ETH, make sure ETH wasn't sent to the function, then transfer the amount of tokens from the message sender to this contract. If the token is ETH, override the specified amount and decimals values with with amount of ETH sent to the function, which is denoted as a fixed point number with 18 decimals.

    ```
    // ETH shouldn't be sent if the token isn't ETH.
    if (address(_token) != JBTokens.ETH) {
      if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

      // Transfer tokens to this contract from the msg sender.
      IERC20(_token).transferFrom(msg.sender, address(this), _amount);
    } else {
      // If ETH is being paid, set the amount to the message value, and decimals to 18.
      _amount = msg.value;
      _decimals = 18;
    }
    ```

    _Library references:_

    * [`JBTokens`](/protocol/api/libraries/jbtokens.md)
      * `.ETH`
      
    _External references:_

    * [`transferFrom`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-transferFrom-address-address-uint256-)

2.  Send the funds to the splits and get a reference to the leftover amount.

    ```solidity
    // Pay the splits and get a reference to the amount leftover.
    uint256 _leftoverAmount = _payToSplits(
      defaultSplitsProjectId,
      defaultSplitsDomain,
      defaultSplitsGroup,
      _token,
      _amount,
      _decimals,
      defaultBeneficiary != address(0) ? defaultBeneficiary : msg.sender
    );
    ```

    _Internal references:_

    * [`defaultSplitsProjectId`](/protocol/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsprojectid.md)
    * [`defaultSplitsDomain`](/protocol/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsdomain.md)
    * [`defaultSplitsGroup`](/protocol/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsgroup.md)
    * [`defaultBeneficiary`](/protocol/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultbeneficiary.md)
    * [`_payToSplits`](/protocol/api/contracts/or-utilities/jbetherc20splitspayer/write/-_paytosplits.md)
3.  If there's any leftover amount, add to balance of the specified project. If no project is specified, send the leftover funds to the beneficiary or the msg.sender.

    ```
    // Distribute any leftover amount.
    if (_leftoverAmount > 0) {
      // If there's a default project ID, try to add to its balance.
      if (_projectId != 0)
        // Add to the project's balance.
        _addToBalanceOf(_projectId, _token, _leftoverAmount, _decimals, _memo, _metadata);

        // Otherwise, send a payment to the beneficiary.
      else {
        // Transfer the ETH.
        if (_token == JBTokens.ETH)
          Address.sendValue(
            // If there's a default beneficiary, send the funds directly to the beneficiary. Otherwise send to the msg.sender.
            defaultBeneficiary != address(0) ? defaultBeneficiary : payable(msg.sender),
            _leftoverAmount
          );
          // Or, transfer the ERC20.
        else
          IERC20(_token).transfer(
            // If there's a default beneficiary, send the funds directly to the beneficiary. Otherwise send to the msg.sender.
            defaultBeneficiary != address(0) ? defaultBeneficiary : msg.sender,
            _leftoverAmount
          );
      }
    }
    ```

    _Library references:_

    * [`JBTokens`](/protocol/api/libraries/jbtokens.md)
      * `.ETH`
    * [`Address`](https://docs.openzeppelin.com/contracts/4.x/api/utils#Address)
      * `.sendValue(...)`

    _Internal references:_

    * [`defaultBeneficiary`](/protocol/api/contracts/or-utilities/jbetherc20projectpayer/properties/defaultbeneficiary.md)
    * [`_addToBalanceOf`](/protocol/api/contracts/or-utilities/jbetherc20projectpayer/write/-_addtobalanceof.md)

    _External references:_

    * [`transfer`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-Transfer-address-address-uint256-)
    
4.  Emit a `AddToBalance` event with the relevant parameters.

    ```
    emit AddToBalance(
      _projectId,
      defaultBeneficiary != address(0) ? defaultBeneficiary : msg.sender,
      _token,
      _amount,
      _decimals,
      _leftoverAmount,
      _memo,
      msg.sender
    );
    ```

    _Event references:_

    * [`AddToBalance`](/protocol/api/contracts/or-utilities/jbetherc20splitspayer/events/addtobalance.md)
    
</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Add to the balance of the specified project after first splitting the amount among the stored default splits.

  @param _projectId The ID of the project that is being paid after.
  @param _token The token being paid in.
  @param _amount The amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  @param _decimals The number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  @param _memo A memo to pass along to the emitted event.  
  @param _metadata Extra data to pass along to the terminal.
*/
function addToBalanceOf(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  string calldata _memo,
  bytes calldata _metadata
) public payable virtual override nonReentrant {
  // ETH shouldn't be sent if this terminal's token isn't ETH.
  if (address(_token) != JBTokens.ETH) {
    if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

    // Transfer tokens to this contract from the msg sender.
    IERC20(_token).transferFrom(msg.sender, address(this), _amount);
  } else {
    // If ETH is being paid, set the amount to the message value, and decimals to 18.
    _amount = msg.value;
    _decimals = 18;
  }

  // Pay the splits and get a reference to the amount leftover.
  uint256 _leftoverAmount = _payToSplits(
    defaultSplitsProjectId,
    defaultSplitsDomain,
    defaultSplitsGroup,
    _token,
    _amount,
    _decimals,
    defaultBeneficiary != address(0) ? defaultBeneficiary : msg.sender
  );

  // Distribute any leftover amount.
  if (_leftoverAmount > 0) {
    // If there's a default project ID, try to add to its balance.
    if (_projectId != 0)
      // Add to the project's balance.
     _addToBalanceOf(_projectId, _token, _leftoverAmount, _decimals, _memo, _metadata);

      // Otherwise, send a payment to the beneficiary.
    else {
      // Transfer the ETH.
      if (_token == JBTokens.ETH)
        Address.sendValue(
          // If there's a default beneficiary, send the funds directly to the beneficiary. Otherwise send to the msg.sender.
          defaultBeneficiary != address(0) ? defaultBeneficiary : payable(msg.sender),
          _leftoverAmount
        );
        // Or, transfer the ERC20.
      else
        IERC20(_token).transfer(
          // If there's a default beneficiary, send the funds directly to the beneficiary. Otherwise send to the msg.sender.
          defaultBeneficiary != address(0) ? defaultBeneficiary : msg.sender,
          _leftoverAmount
        );
    }
  }

  emit AddToBalance(
    _projectId,
    defaultBeneficiary != address(0) ? defaultBeneficiary : msg.sender,
    _token,
    _amount,
    _decimals,
    _leftoverAmount,
    _memo,
    _metadata,
    msg.sender
  );
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                       | Description                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| **`NO_MSG_VALUE_ALLOWED`**    | Thrown if ETH was sent to a non-ETH terminal.   |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                                                          | Data                                                                                          |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [**`AddToBalance`**](/protocol/api/contracts/or-utilities/jbetherc20splitspayer/events/addtobalance.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>address beneficiary</code></li><li><code>address token</code></li><li><code>uint256 amount</code></li><li><code>uint256 decimals</code></li><li><code>uint256 leftoverAmount</code></li><li><code>string memo</code></li><li><code>bytes metadata</code></li><li><code>address caller</code></li></ul>                  |

</TabItem>


<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
