# receive

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20ProjectPayer`](/api/contracts/or-utilities/jbetherc20projectpayer/README.md)

Interface: [`IJBProjectPayer`](/api/interfaces/ijbprojectpayer.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Received funds are paid to the default project ID using the stored default properties.**

_Use the `addToBalance` function if there's a preference to do so. Otherwise use `pay`._

_This function is called automatically when the contract receives an ETH payment._


#### Definition

```
receive() external payable virtual override { ... }
```

* The function is triggered when the contract receives ETH.
* The function can be accessed externally by anyone.
* The function doesn't return anything.

#### Body

1.  Pay the ETH received to the default project ID using the default parameters. Use the `addToBalance` function if there's a preference to do so.

    ```
    if (defaultPreferAddToBalance)
      _addToBalance(
        defaultProjectId,
        JBTokens.ETH,
        address(this).balance,
        18, // balance is a fixed point number with 18 decimals.
        defaultMemo
      );
    else
      _pay(
        defaultProjectId,
        JBTokens.ETH,
        address(this).balance,
        18, // balance is a fixed point number with 18 decimals.
        defaultBeneficiary == address(0) ? msg.sender : defaultBeneficiary,
        0, // Can't determine expectation of returned tokens ahead of time.
        defaultPreferClaimedTokens,
        defaultMemo,
        defaultMetadata
      );
    ```

    _Library references:_

    * [`JBTokens`](/api/libraries/jbtokens.md)
      * `.ETH`
      
    _Internal references:_

    * [`defaultPreferClaimedTokens`](/api/contracts/or-utilities/jbetherc20projectpayer/properties/defaultpreferclaimedtokens.md)
    * [`defaultBeneficiary`](/api/contracts/or-utilities/jbetherc20projectpayer/properties/defaultbeneficiary.md)
    * [`defaultProjectId`](/api/contracts/or-utilities/jbetherc20projectpayer/properties/defaultprojectid.md)
    * [`_addToBalance`](/api/contracts/or-utilities/jbetherc20projectpayer/write/-_addtobalance.md)
    * [`_pay`](/api/contracts/or-utilities/jbetherc20projectpayer/write/-_pay.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  Received funds are paid to the default project ID using the stored default properties.

  @dev
  Use the `addToBalance` function if there's a preference to do so. Otherwise use `pay`.

  @dev
  This function is called automatically when the contract receives an ETH payment.
*/
receive() external payable virtual override {
  if (defaultPreferAddToBalance)
    _addToBalance(
      defaultProjectId,
      JBTokens.ETH,
      address(this).balance,
      18, // balance is a fixed point number with 18 decimals.
      defaultMemo
    );
  else
    _pay(
      defaultProjectId,
      JBTokens.ETH,
      address(this).balance,
      18, // balance is a fixed point number with 18 decimals.
      defaultBeneficiary == address(0) ? msg.sender : defaultBeneficiary,
      0, // Can't determine expectation of returned tokens ahead of time.
      defaultPreferClaimedTokens,
      defaultMemo,
      defaultMetadata
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
