# redeemTokensOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Holders can redeem their tokens to claim the project's overflowed tokens, or to trigger rules determined by the project's current funding cycle's data source.**

_Only a token holder or a designated operator can redeem its tokens._

#### Definition

```
function redeemTokensOf(
  address _holder,
  uint256 _projectId,
  uint256 _tokenCount,
  address _token,
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

* Arguments:
  * `_holder` is the account to redeem tokens for.
  * `_projectId` is the ID of the project to which the tokens being redeemed belong.
  * `_tokenCount` is the number of project tokens to redeem, as a fixed point number with 18 decimals.
  * `_token` is the token being reclaimed. This terminal ignores this property since it only manages one currency.
  * `_minReturnedTokens` is the minimum amount of terminal tokens expected in return, as a fixed point number with the same amount of decimals as this terminal.
  * `_beneficiary` is the address to send the terminal tokens to.
  * `_memo` is a memo to pass along to the emitted event.
  * `_metadata` are bytes to send along to the data source, delegate, and emitted event, if provided.
* Through the [`requirePermission`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the token holder, or from an operator that has been given the [`JBOperations.REDEEM`](/dev/api/libraries/jboperations.md) permission by the token holder.
* The function can be overriden by inheriting contracts.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
* The function returns the amount of terminal tokens that the tokens were redeemed for, as a fixed point number with the same amount of decimals as this terminal.

#### Body

1.  Forward to the internal function.

    ```
    return
      _redeemTokensOf(
        _holder,
        _projectId,
        _tokenCount,
        _minReturnedTokens,
        _beneficiary,
        _memo,
        _metadata
      );
    ```

    _Internal references:_

    * [`_redeemTokensOf`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_redeemtokensof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Holders can redeem their tokens to claim the project's overflowed tokens, or to trigger rules determined by the project's current funding cycle's data source.

  @dev
  Only a token holder or a designated operator can redeem its tokens.

  @param _holder The account to redeem tokens for.
  @param _projectId The ID of the project to which the tokens being redeemed belong.
  @param _tokenCount The number of project tokens to redeem, as a fixed point number with 18 decimals.
  @param _token The token being reclaimed. This terminal ignores this property since it only manages one token. 
  @param _minReturnedTokens The minimum amount of terminal tokens expected in return, as a fixed point number with the same amount of decimals as this terminal.
  @param _beneficiary The address to send the terminal tokens to.
  @param _memo A memo to pass along to the emitted event.
  @param _metadata Bytes to send along to the data source, delegate, and emitted event, if provided.

  @return reclaimAmount The amount of terminal tokens that the project tokens were redeemed for, as a fixed point number with 18 decimals.
*/
function redeemTokensOf(
  address _holder,
  uint256 _projectId,
  uint256 _tokenCount,
  address _token,
  uint256 _minReturnedTokens,
  address payable _beneficiary,
  string memory _memo,
  bytes memory _metadata
)
  external
  virtual
  override
  requirePermission(_holder, _projectId, JBOperations.REDEEM)
  returns (uint256 reclaimAmount)
{
  _token; // Prevents unused var compiler and natspec complaints.

  return
    _redeemTokensOf(
      _holder,
      _projectId,
      _tokenCount,
      _minReturnedTokens,
      _beneficiary,
      _memo,
      _metadata
    );
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
