# pay

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20SplitsPayer`](/api/contracts/or-utilities/jbetherc20splitspayer/README.md)

Interface: [`IJBSplitsPayer`](/api/interfaces/ijbsplitspayer.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Make a payment to the specified project after first splitting the amount among the stored default splits.**

#### Definition

```
function pay(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string memory _memo,
  bytes memory _metadata
) public payable virtual override nonReentrant { ... }
```

* Arguments:
  * `_projectId` is the ID of the project that is being paid after.
  * `_token` is the token being paid in.
  * `_amount` is the amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  * `_decimals` is the number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  * `_beneficiary` is the address who will receive tokens from the payment.
  * `_minReturnedTokens` is the minimum number of project tokens expected in return, as a fixed point number with 18 decimals.
  * `_preferClaimedTokens` is a flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  * `_memo` is a memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.
  * `_metadata` are bytes to send along to the data source, delegate, and emitted event, if provided.
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

      // Transfer tokens to this contract from the msg sender.
      IERC20(_token).transferFrom(msg.sender, address(this), _amount);
    } else {
      // If ETH is being paid, set the amount to the message value, and decimals to 18.
      _amount = msg.value;
      _decimals = 18;
    }
    ```

    _Library references:_

    * [`JBTokens`](/api/libraries/jbtokens.md)
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
      _decimals
    );
    ```

    _Internal references:_

    * [`defaultSplitsProjectId`](/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsprojectid.md)
    * [`defaultSplitsDomain`](/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsdomain.md)
    * [`defaultSplitsGroup`](/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsgroup.md)
    * [`_payToSplits`](/api/contracts/or-utilities/jbetherc20splitspayer/write/-_paytosplits.md)

3.  If there's any leftover amount, pay the specified project. If no project is specified, send the leftover funds to the beneficiary or the msg.sender.

    ```
    // Pay any leftover amount.
    if (_leftoverAmount > 0) {
      // If there's a default project ID, try to pay it.
      if (_projectId != 0) {
        _pay(
          _projectId,
          _token,
          _leftoverAmount,
          _decimals,
          _beneficiary != address(0) ? _beneficiary : msg.sender,
          _minReturnedTokens,
          _preferClaimedTokens,
          _memo,
          _metadata
        );
      }
      // If no project was specified, send the funds directly to the beneficiary or the msg.sender.
      else {
        // Transfer the ETH.
        if (_token == JBTokens.ETH)
          Address.sendValue(
            // If there's a beneficiary, send the funds directly to the beneficiary. Otherwise send to the msg.sender.
            _beneficiary != address(0) ? payable(_beneficiary) : payable(msg.sender),
            _leftoverAmount
          );
          // Or, transfer the ERC20.
        else
          IERC20(_token).transfer(
            // If there's a beneficiary, send the funds directly to the beneficiary. Otherwise send to the msg.sender.
            _beneficiary != address(0) ? _beneficiary : msg.sender,
            _leftoverAmount
          );
      }
    }
    ```

    _Library references:_

    * [`JBTokens`](/api/libraries/jbtokens.md)
      * `.ETH`
    * [`Address`](https://docs.openzeppelin.com/contracts/4.x/api/utils#Address)
      * `.sendValue(...)`

    _Internal references:_

    * [`_pay`](/api/contracts/or-utilities/jbetherc20projectpayer/write/-_pay.md)

    _External references:_

    * [`transfer`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-Transfer-address-address-uint256-)

4.  Emit a `Pay` event with the relevant parameters.

    ```
    emit Pay(
      _projectId,
      _beneficiary != address(0) ? defaultBeneficiary : msg.sender,
      _token,
      _amount,
      _decimals,
      _leftoverAmount,
      _minReturnedTokens,
      _preferClaimedTokens,
      _memo,
      _metadata,
      msg.sender
    );
    ```

    _Event references:_

    * [`Pay`](/api/contracts/or-utilities/jbetherc20splitspayer/events/pay.md)
    
</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Make a payment to the specified project after first splitting the amount among the stored default splits.

  @param _projectId The ID of the project that is being paid after.
  @param _token The token being paid in.
  @param _amount The amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  @param _decimals The number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  @param _beneficiary The address who will receive tokens from the payment made with leftover funds.
  @param _minReturnedTokens The minimum number of project tokens expected in return, as a fixed point number with 18 decimals.
  @param _preferClaimedTokens A flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  @param _memo A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate. A data source can alter the memo before emitting in the event and forwarding to the delegate.
  @param _metadata Bytes to send along to the data source, delegate, and emitted event, if provided.
*/
function pay(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string memory _memo,
  bytes memory _metadata
) public payable virtual override nonReentrant {
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

  // Pay the splits and get a reference to the amount leftover.
  uint256 _leftoverAmount = _payToSplits(
    defaultSplitsProjectId,
    defaultSplitsDomain,
    defaultSplitsGroup,
    _token,
    _amount,
    _decimals
  );

  // Pay any leftover amount.
  if (_leftoverAmount > 0) {
    // If there's a default project ID, try to pay it.
    if (_projectId != 0) {
      _pay(
        _projectId,
        _token,
        _leftoverAmount,
        _decimals,
        _beneficiary != address(0) ? _beneficiary : msg.sender,
        _minReturnedTokens,
        _preferClaimedTokens,
        _memo,
        _metadata
      );
    }
    // If no project was specified, send the funds directly to the beneficiary or the msg.sender.
    else {
      // Transfer the ETH.
      if (_token == JBTokens.ETH)
        Address.sendValue(
          // If there's a beneficiary, send the funds directly to the beneficiary. Otherwise send to the msg.sender.
          _beneficiary != address(0) ? payable(_beneficiary) : payable(msg.sender),
          _leftoverAmount
        );
        // Or, transfer the ERC20.
      else
        IERC20(_token).transfer(
          // If there's a beneficiary, send the funds directly to the beneficiary. Otherwise send to the msg.sender.
          _beneficiary != address(0) ? _beneficiary : msg.sender,
          _leftoverAmount
        );
    }
  }

  emit Pay(
    _projectId,
    _beneficiary != address(0) ? defaultBeneficiary : msg.sender,
    _token,
    _amount,
    _decimals,
    _leftoverAmount,
    _minReturnedTokens,
    _preferClaimedTokens,
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
| [**`Pay`**](/api/contracts/or-utilities/jbetherc20splitspayer/events/pay.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>address beneficiary</code></li><li><code>address token</code></li><li><code>uint256 amount</code></li><li><code>uint256 decimals</code></li><li><code>uint256 leftoverAmount</code></li><li><code>uint256 minReturnedTokens</code></li><li><code>bool preferClaimedTokens</code></li><li><code>string memo</code></li><li><code>bytes metadata</code></li><li><code>address caller</code></li></ul>                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
