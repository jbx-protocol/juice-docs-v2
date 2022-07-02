# useAllowanceOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows a project to send funds from its overflow up to the preconfigured allowance.**

_Only a project's owner or a designated operator can use its allowance._

_Incurs the protocol fee._

#### Definition

```
function useAllowanceOf(
  uint256 _projectId,
  uint256 _amount,
  uint256 _currency,
  address _token,
  uint256 _minReturnedTokens,
  address payable _beneficiary,
  string memory _memo
)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.USE_ALLOWANCE)
  returns (uint256 netDistributedAmount) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to use the allowance of.
  * `_amount` is the amount of terminal tokens to use from this project's current allowance, as a fixed point number with the same amount of decimals as this terminal.
  * `_currency` is the expected currency of the amount being distributed. Must match the project's current funding cycle's overflow allowance currency.
  * `_token` is the token being distributed. This terminal ignores this property since it only manages one token. 
  * `_minReturnedTokens` is the minimum number of tokens that the `_amount` should be valued at in terms of this terminal's currency, as a fixed point number with the same amount of decimals as this terminal.
  * `_beneficiary` is the address to send the funds to.
* Through the [`requirePermission`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the project's owner, or from an operator that has been given the [`JBOperations.USE_ALLOWANCE`](/dev/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId`.
* The function can be overriden by inheriting contracts.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
* The function returns the amount of tokens that was distributed to the beneficiary, as a fixed point number with the same amount of decimals as the terminal.

#### Body

1.  Forward to the internal function.

    ```
    return _useAllowanceOf(_projectId, _amount, _currency, _minReturnedTokens, _beneficiary, _memo);
    ```

    _Internal references:_

    * [`_useAllowanceOf`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_useallowanceof.md)


</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Allows a project to send funds from its overflow up to the preconfigured allowance.

  @dev
  Only a project's owner or a designated operator can use its allowance.
  
  @dev
  Incurs the protocol fee.

  @param _projectId The ID of the project to use the allowance of.
  @param _amount The amount of terminal tokens to use from this project's current allowance, as a fixed point number with the same amount of decimals as this terminal.
  @param _currency The expected currency of the amount being distributed. Must match the project's current funding cycle's overflow allowance currency.
  @param _token The token being distributed. This terminal ignores this property since it only manages one token. 
  @param _minReturnedTokens The minimum number of tokens that the `_amount` should be valued at in terms of this terminal's currency, as a fixed point number with the same amount of decimals as this terminal.
  @param _beneficiary The address to send the funds to.
  @param _memo A memo to pass along to the emitted event.

  @return netDistributedAmount The amount of tokens that was distributed to the beneficiary, as a fixed point number with the same amount of decimals as the terminal.)
*/
function useAllowanceOf(
  uint256 _projectId,
  uint256 _amount,
  uint256 _currency,
  address _token, 
  uint256 _minReturnedTokens,
  address payable _beneficiary,
  string memory _memo
)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.USE_ALLOWANCE)
  returns (uint256 netDistributedAmount)
{
  _token; // Prevents unused var compiler and natspec complaints.
  
  return _useAllowanceOf(_projectId, _amount, _currency, _minReturnedTokens, _beneficiary, _memo);
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
