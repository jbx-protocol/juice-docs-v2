# _currentTotalOverflowOf

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/protocol/api/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Gets the amount that is currently overflowing across all of a project's terminals.**

_This amount changes as the value of the balances changes in relation to the currency being used to measure the project's distribution limits._

#### Definition

```
function _currentTotalOverflowOf(
  uint256 _projectId,
  uint256 _decimals,
  uint256 _currency
) private view returns (uint256) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get the total overflow for.
  * `_decimals` is the number of decimals that the fixed point overflow should include.
  * `_currency` is the currency that the overflow should be in terms of.
* The view function is private to this contract.
* The view function does not alter state on the blockchain.
* The function returns the total overflow of a project's funds.

#### Body

1.  Get a reference to all of the project's current terminals.

    ```
    // Get a reference to the project's terminals.
    IJBPaymentTerminal[] memory _terminals = directory.terminalsOf(_projectId);
    ```

    _Internal references:_

    * [`terminalsOf`](/protocol/api/contracts/jbdirectory/read/terminalsof.md)
2.  Create a reference where the total balance across all terminals is be stored in terms of ETH.

    ```
    // Keep a reference to the ETH overflow across all terminals, as a fixed point number with 18 decimals.
    uint256 _ethOverflow;
    ```
3.  For each terminal, add its balance in terms of ETH to the total ETH balance.

    ```
    // Add the current ETH overflow for each terminal.
    for (uint256 _i = 0; _i < _terminals.length; _i++)
      _ethOverflow = _ethOverflow + _terminals[_i].currentEthOverflowOf(_projectId);
    ```

    _External references:_

    * [`currentEthOverflowOf`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/read/currentethoverflowof.md)
4.  If the total overflow is to be returned in a currency other than ETH, make the conversion while maintaining 18 decimals of fidelity.

    ```
    // Convert the ETH overflow to the specified currency if needed, maintaining a fixed point number with 18 decimals.
    uint256 _totalOverflow18Decimal = _currency == JBCurrencies.ETH
      ? _ethOverflow
      : PRBMath.mulDiv(_ethOverflow, 10**18, prices.priceFor(JBCurrencies.ETH, _currency, 18));
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`
    * [`JBCurrencies`](/protocol/api/libraries/jbcurrencies.md)
      * `.ETH`

    _External references:_

    * [`priceFor`](/protocol/api/contracts/jbprices/read/pricefor.md)
5.  If the fixed point overflow is to be returned with a number of decimals other than 18, adjust the number accordingly. 

    ```
    // Adjust the decimals of the fixed point number if needed to match the target decimals.
    return
      (_decimals == 18)
        ? _totalOverflow18Decimal
        : JBFixedPointNumber.adjustDecimals(_totalOverflow18Decimal, 18, _decimals);
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`
    * [`JBFixedPointNumber`](/protocol/api/libraries/jbfixedpointnumber.md)
      * `.adjustDecimals(...)`

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Gets the amount that is currently overflowing across all of a project's terminals. 

  @dev
  This amount changes as the value of the balances changes in relation to the currency being used to measure the project's distribution limits.

  @param _projectId The ID of the project to get the total overflow for.
  @param _decimals The number of decimals that the fixed point overflow should include.
  @param _currency The currency that the overflow should be in terms of.

  @return overflow The total overflow of a project's funds.
*/
function _currentTotalOverflowOf(
  uint256 _projectId,
  uint256 _decimals,
  uint256 _currency
) private view returns (uint256) {
  // Get a reference to the project's terminals.
  IJBPaymentTerminal[] memory _terminals = directory.terminalsOf(_projectId);

  // Keep a reference to the ETH overflow across all terminals, as a fixed point number with 18 decimals.
  uint256 _ethOverflow;

  // Add the current ETH overflow for each terminal.
  for (uint256 _i = 0; _i < _terminals.length; _i++)
    _ethOverflow = _ethOverflow + _terminals[_i].currentEthOverflowOf(_projectId);

  // Convert the ETH overflow to the specified currency if needed, maintaining a fixed point number with 18 decimals.
  uint256 _totalOverflow18Decimal = _currency == JBCurrencies.ETH
    ? _ethOverflow
    : PRBMath.mulDiv(_ethOverflow, 10**18, prices.priceFor(JBCurrencies.ETH, _currency, 18));

  // Adjust the decimals of the fixed point number if needed to match the target decimals.
  return
    (_decimals == 18)
      ? _totalOverflow18Decimal
      : JBFixedPointNumber.adjustDecimals(_totalOverflow18Decimal, 18, _decimals);
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
