# recordUsedAllowanceOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/api/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Records newly used allowance funds of a project.**

_The msg.sender must be an [`IJBSingleTokenPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md)._

#### Definition

```
function recordUsedAllowanceOf(
  uint256 _projectId,
  uint256 _amount,
  uint256 _currency
)
  external
  override
  nonReentrant
  returns (JBFundingCycle memory fundingCycle, uint256 usedAmount) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to use the allowance of.
  * `_amount` is the amount to use from the allowance, as a fixed point number. 
  * `_currency` is the currency of the `_amount`. Must match the currency of the overflow allowance.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
* The function returns:
  * `fundingCycle` is the funding cycle during which the withdrawal was made.
  * `usedAmount` is the amount of terminal tokens used, as a fixed point number with the same amount of decimals as its relative terminal.

#### Body

1.  Get a reference to the project's first funding cycle.

    ```
    // Get a reference to the project's current funding cycle.
    fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _External references:_

    * [`currentOf`](/dev/api/contracts/jbfundingcyclestore/read/currentof.md)
2.  Get a reference to the new used overflow allowance for this funding cycle configuration.

    ```
    // Get a reference to the new used overflow allowance for this funding cycle configuration.
    uint256 _newUsedOverflowAllowanceOf = usedOverflowAllowanceOf[
      IJBSingleTokenPaymentTerminal(msg.sender)
    ][_projectId][fundingCycle.configuration] + _amount;
    ```

    _Internal references:_

    * [`usedOverflowAllowanceOf`](/dev/api/contracts/jbsingletokenpaymentterminalstore/properties/usedoverflowallowanceof.md)
3.  Get a reference to the overflow allowance of the project during the current funding cycle configuration, and the currency the overflow allowance is in terms of.

    ```
    // There must be sufficient allowance available.
    (uint256 _overflowAllowanceOf, uint256 _overflowAllowanceCurrency) = IJBController(
      directory.controllerOf(_projectId)
    ).overflowAllowanceOf(
        _projectId,
        fundingCycle.configuration,
        IJBSingleTokenPaymentTerminal(msg.sender),
        IJBSingleTokenPaymentTerminal(msg.sender).token()
      );
    ```

    _External references:_

    * [`controllerOf`](/dev/api/contracts/jbdirectory/properties/controllerof.md)
    * [`overflowAllowanceOf`](/dev/api/contracts/or-controllers/jbcontroller/read/overflowallowanceof.md)
    * [`token`](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/properties/token.md)
4.  Make sure there's enough allowance left to accomodate the new used amount.

    ```
    // Make sure the new used amount is within the allowance.
    if (_newUsedOverflowAllowanceOf > _overflowAllowanceOf || _overflowAllowanceOf == 0)
      revert INADEQUATE_CONTROLLER_ALLOWANCE();
    ```

5.  Make the sure the provided currency matches the expected currency for the overflow allowance.

    ```
    // Make sure the currencies match.
    if (_currency != _overflowAllowanceCurrency) revert CURRENCY_MISMATCH();
    ```

6.  Get a reference to the terminal's currency.

    ```
    // Get a reference to the terminal's currency.
    uint256 _balanceCurrency = IJBSingleTokenPaymentTerminal(msg.sender).currency();
    ```

7.  Get a reference to the current distribution limit of the project during the current funding cycle configuration.

    ```
    // Get the current funding target
    uint256 distributionLimit =
      directory.controllerOf(_projectId).distributionLimitOf(
        _projectId,
        fundingCycle.configuration,
        terminal
      );
    ```

    _External references:_

    * [`controllerOf`](/dev/api/contracts/jbdirectory/properties/controllerof.md)
    * [`distributionLimitOf`](/dev/api/contracts/or-controllers/jbcontroller/read/distributionlimitof.md)

8.  Calculate how much of the balance will be used. If the currency of the allowance and the balance are the same, no price conversion is necessary. Otherwise, convert the allowance currency to that of the balance. 

    ```
    // Convert the amount to this store's terminal's token.
    usedAmount = (_currency == _balanceCurrency)
      ? _amount
      : PRBMath.mulDiv(
        _amount,
        10**_MAX_FIXED_POINT_FIDELITY, // Use _MAX_FIXED_POINT_FIDELITY to keep as much of the `_amount.value`'s fidelity as possible when converting.
        prices.priceFor(_currency, _balanceCurrency, _MAX_FIXED_POINT_FIDELITY)
      );
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`

    _Internal references:_

    * [`_MAX_FIXED_POINT_FIDELITY`](/dev/api/contracts/jbsingletokenpaymentterminalstore/properties/-_max_fixed_point_fidelity.md)

    _External references:_

    * [`priceFor`](/dev/api/contracts/jbprices/read/pricefor.md)

9.  Make sure the amount being used is available in overflow.

    ```
    // The amount being distributed must be available in the overflow.
    if (
      usedAmount >
      _overflowDuring(
        IJBSingleTokenPaymentTerminal(msg.sender),
        _projectId,
        fundingCycle,
        _balanceCurrency
      )
    ) revert INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE();
    ```

    _Internal references:_

    * [`_overflowDuring`](/dev/api/contracts/jbsingletokenpaymentterminalstore/read/-_overflowduring.md)
10. Store the incremented value that tracks how much of a project's allowance was used during the current funding cycle configuration.

    ```
    // Store the incremented value.
    usedOverflowAllowanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId][
      fundingCycle.configuration
    ] = _newUsedOverflowAllowanceOf;
    ```

    _Internal references:_

    * [`usedOverflowAllowanceOf`](/dev/api/contracts/jbsingletokenpaymentterminalstore/properties/usedoverflowallowanceof.md)

11. Store the decremented balance.

    ```
    // Update the project's balance.
    balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] =
      balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] -
      usedAmount;
    ```

    _Internal references:_

    * [`balanceOf`](/dev/api/contracts/jbsingletokenpaymentterminalstore/properties/balanceof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Records newly used allowance funds of a project.

  @dev
  The msg.sender must be an IJBSingleTokenPaymentTerminal. 

  @param _projectId The ID of the project to use the allowance of.
  @param _amount The amount to use from the allowance, as a fixed point number. 
  @param _currency The currency of the `_amount`. Must match the currency of the overflow allowance.
  @param _balanceCurrency The currency that the balance is expected to be in terms of.

  @return fundingCycle The funding cycle during which the overflow allowance is being used.
  @return usedAmount The amount of terminal tokens used, as a fixed point number with the same amount of decimals as its relative terminal.
*/
function recordUsedAllowanceOf(
  uint256 _projectId,
  uint256 _amount,
  uint256 _currency,
  uint256 _balanceCurrency
)
  external
  override
  nonReentrant
  returns (JBFundingCycle memory fundingCycle, uint256 usedAmount)
{
  // Get a reference to the project's current funding cycle.
  fundingCycle = fundingCycleStore.currentOf(_projectId);

  // Get a reference to the new used overflow allowance for this funding cycle configuration.
  uint256 _newUsedOverflowAllowanceOf = usedOverflowAllowanceOf[
    IJBSingleTokenPaymentTerminal(msg.sender)
  ][_projectId][fundingCycle.configuration] + _amount;

  // There must be sufficient allowance available.
  (uint256 _overflowAllowanceOf, uint256 _overflowAllowanceCurrency) = IJBController(
    directory.controllerOf(_projectId)
  ).overflowAllowanceOf(
      _projectId,
      fundingCycle.configuration,
      IJBSingleTokenPaymentTerminal(msg.sender),
      IJBSingleTokenPaymentTerminal(msg.sender).token()
    );

  // Make sure the new used amount is within the allowance.
  if (_newUsedOverflowAllowanceOf > _overflowAllowanceOf || _overflowAllowanceOf == 0)
    revert INADEQUATE_CONTROLLER_ALLOWANCE();

  // Make sure the currencies match.
  if (_currency != _overflowAllowanceCurrency) revert CURRENCY_MISMATCH();

  // Get a reference to the terminal's currency.
  uint256 _balanceCurrency = IJBSingleTokenPaymentTerminal(msg.sender).currency();

  // Convert the amount to this store's terminal's token.
  usedAmount = (_currency == _balanceCurrency)
    ? _amount
    : PRBMath.mulDiv(
      _amount,
      10**_MAX_FIXED_POINT_FIDELITY, // Use _MAX_FIXED_POINT_FIDELITY to keep as much of the `_amount.value`'s fidelity as possible when converting.
      prices.priceFor(_currency, _balanceCurrency, _MAX_FIXED_POINT_FIDELITY)
    );

  // The amount being distributed must be available in the overflow.
  if (
    usedAmount >
    _overflowDuring(
      IJBSingleTokenPaymentTerminal(msg.sender),
      _projectId,
      fundingCycle,
      _balanceCurrency
    )
  ) revert INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE();

  // Store the incremented value.
  usedOverflowAllowanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId][
    fundingCycle.configuration
  ] = _newUsedOverflowAllowanceOf;

  // Update the project's balance.
  balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] =
    balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] -
    usedAmount;
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                          | Description                                                                                                       |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **`CURRENCY_MISMATCH`**                         | Thrown if the currency of the specified amount doesn't match the currency of the project's current funding cycle. |
| **`INADEQUATE_CONTROLLER_ALLOWANCE`**           | Thrown if there isn't enough allowance for the specified terminal to fulfill the desired withdrawal.              |
| **`INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE`** | Thrown if the project's balance isn't sufficient to fulfill the desired withdrawal.                               |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
