# distributionLimitOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/dev/api/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/dev/api/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The amount of token that a project can distribute per funding cycle, and the currency it's in terms of.**

_The number of decimals in the returned fixed point amount is the same as that of the specified terminal._

### Definition

```
function distributionLimitOf(
  uint256 _projectId,
  uint256 _configuration,
  IJBPaymentTerminal _terminal,
  address _token
) external view override returns (uint256, uint256) { ... }
```

* Arguments:
* `_projectId` is the ID of the project to get the distribution limit of.
* `_configuration` is the configuration during which the distribution limit applies.
* `_terminal` is the [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) from which distributions are being limited.
* `_token` is the token for which the distribution limit applies.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBController`](/dev/api/interfaces/ijbcontroller.md) interface.
* The function returns:
  * `distributionLimit` is the distribution limit, as a fixed point number with the same number of decimals as the provided terminal.
  * `distributionLimitCurrency` is the currency from [`JBCurrencies`](/dev/api/libraries/jbcurrencies.md) that the returned distribution limit is in terms of.

#### Body

1.  Get a reference to the packed distribution limit data.

    ```
    // Get a reference to the packed data.
    uint256 _data = _packedDistributionLimitDataOf[_projectId][_configuration][_terminal][_token];
    ```

    _Internal references:_

    * [`_packedDistributionLimitDataOf`](/dev/api/contracts/or-controllers/jbcontroller/properties/-_packeddistributionlimitdataof.md)
2.  Return the distribution limit, which is in the first 248 bits, and the currency the distribution limit is in terms of, which is in the last 8 bits.

    ```
    // The limit is in bits 0-231. The currency is in bits 232-255.
    return (uint256(uint232(_data)), _data >> 232);
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  The amount of token that a project can distribute per funding cycle, and the currency it's in terms of.

  @dev
  The number of decimals in the returned fixed point amount is the same as that of the specified terminal. 

  @param _projectId The ID of the project to get the distribution limit of.
  @param _configuration The configuration during which the distribution limit applies.
  @param _terminal The terminal from which distributions are being limited.
  @param _token The token for which the distribution limit applies.

  @return The distribution limit, as a fixed point number with the same number of decimals as the provided terminal.
  @return The currency of the distribution limit.
*/
function distributionLimitOf(
  uint256 _projectId,
  uint256 _configuration,
  IJBPaymentTerminal _terminal,
  address _token
) external view override returns (uint256, uint256) {
  // Get a reference to the packed data.
  uint256 _data = _packedDistributionLimitDataOf[_projectId][_configuration][_terminal][_token];

  // The limit is in bits 0-231. The currency is in bits 232-255.
  return (uint256(uint248(_data)), _data >> 232);
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
