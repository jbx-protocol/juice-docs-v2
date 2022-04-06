# receive

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20ProjectPayer`](/api/contracts/jbetherc20projectpayer/README.md)

Interface: [`IJBProjectPayer`](/api/interfaces/ijbprojectpayer.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Received funds are paid to the default project ID using the stored default properties.**

_This function is called automatically when the contract receives an ETH payment._

#### Definition

```solidity
receive() external payable virtual override { ... }
```

* The function is triggered when the contract receives ETH.
* The function can be accessed externally by anyone.
* The function doesn't return anything.

#### Body

1.  Pay the ETH received to the default proejct ID using the default parameters.

    ```solidity
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

    _Internal references:_

    * [`_pay`](/api/contracts/jbetherc20projectpayer/write/-_pay.md)

</TabItem>

<TabItem value="Code" label="Code">

```solidity
/** 
  @notice
  Received funds are paid to the default project ID using the stored default properties.

  @dev
  This function is called automatically when the contract receives an ETH payment.
*/
receive() external payable virtual override {
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
