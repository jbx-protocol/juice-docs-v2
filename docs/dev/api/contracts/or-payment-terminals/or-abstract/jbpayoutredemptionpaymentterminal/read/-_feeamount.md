# _feeAmount

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Returns the fee amount based on the provided amount for the specified project.**

#### Definition

```
function _feeAmount(
  uint256 _amount,
  uint256 _fee,
  uint256 _feeDiscount
) private pure returns (uint256) { ... }
```

* Arguments:
  * `_amount` is the amount that the fee is based on, as a fixed point number with the same amount of decimals as this terminal.
  * `_fee` is the percentage of the fee, out of MAX_FEE.
  * `_feeDiscount` is the percentage discount that should be applied out of the max amount, out of MAX_FEE_DISCOUNT.
* The view function is private to this contract.
* The view function does not alter state on the blockchain.
* The function returns the amount of the fee, as a fixed point number with the same amount of decimals as this terminal.

#### Body

1.  Calculate the discounted fee by subtracting the discount from the fee.

    ```
    // Calculate the discounted fee.
    uint256 _discountedFee = _fee -
      PRBMath.mulDiv(_fee, _feeDiscount, JBConstants.MAX_FEE_DISCOUNT);
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`
    * [`JBConstants`](/dev/api/libraries/jbconstants.md)
      * `.MAX_FEE_DISCOUNT`
2.  Return the amount of tokens from the specified amount that should be paid as a fee.

    ```
    // The amount of tokens from the `_amount` to pay as a fee.
    return
      _amount - PRBMath.mulDiv(_amount, JBConstants.MAX_FEE, _discountedFee + JBConstants.MAX_FEE);
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`
    * [`JBConstants`](/dev/api/libraries/jbconstants.md)
      * `.MAX_FEE`

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Returns the fee amount based on the provided amount for the specified project.

  @param _amount The amount that the fee is based on, as a fixed point number with the same amount of decimals as this terminal.
  @param _fee The percentage of the fee, out of MAX_FEE. 
  @param _feeDiscount The percentage discount that should be applied out of the max amount, out of MAX_FEE_DISCOUNT.

  @return The amount of the fee, as a fixed point number with the same amount of decimals as this terminal.
*/
function _feeAmount(
  uint256 _amount,
  uint256 _fee,
  uint256 _feeDiscount
) private pure returns (uint256) {
  // Calculate the discounted fee.
  uint256 _discountedFee = _fee -
    PRBMath.mulDiv(_fee, _feeDiscount, JBConstants.MAX_FEE_DISCOUNT);

  // The amount of tokens from the `_amount` to pay as a fee.
  return
    _amount - PRBMath.mulDiv(_amount, JBConstants.MAX_FEE, _discountedFee + JBConstants.MAX_FEE);
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
