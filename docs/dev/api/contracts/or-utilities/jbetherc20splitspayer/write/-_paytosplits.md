# _payToSplits

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20SplitsPayer`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/README.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Split an amount between all splits.**

#### Definition

```
function _payToSplits(
  uint256 _splitsProjectId,
  uint256 _splitsDomain,
  uint256 _splitsGroup,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _defaultBeneficiary
) internal virtual returns (uint256 leftoverAmount) { ... }
```

* Arguments:
  * `_splitsProjectId` is the ID of the project to which the splits belong.
  * `_splitsDomain` is the splits domain to which the group belongs.
  * `_splitsGroup` is the splits group to pay.
  * `_token` is the token the amonut being split is in.
  * `_amount` is the amount of tokens being split, as a fixed point number. If the `_token` is ETH, this is ignored and msg.value is used in its place.
  * `_decimals` is the number of decimals in the `_amount` fixed point number. 
  * `_defaultBeneficiary` is the address that will benefit from any non-specified beneficiaries in splits.
* The function is private to this contract.
* The function returns the amount leftover after all splits were paid.

#### Body

1.  Pay the splits of the specified project, domain, and group.

    ```
    // Pay the splits.
    leftoverAmount = _payTo(
      splitsStore.splitsOf(_splitsProjectId, _splitsDomain, _splitsGroup),
      _token,
      _amount,
      _decimals,
      _defaultBeneficiary
    );
    ```
    
    _Internal references:_

    * [`_payTo`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/write/-_payto.md)

    _External references:_

    * [`splitsStore`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/properties/splitsstore.md)
    * [`splitsOf`](/dev/api/contracts/jbsplitsstore/read/splitsof.md)

2.  Emit a `DistributeToSplitGroup` event with the relevant parameters.

    ```
    emit DistributeToSplitGroup(_splitsProjectId, _splitsDomain, _splitsGroup, msg.sender);
    ```

    _Event references:_

    * [`DistributeToSplitGroup`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/events/distributetosplitgroup.md)
    
</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Split an amount between all splits.

  @param _splitsProjectId The ID of the project to which the splits belong.
  @param _splitsDomain The splits domain to which the group belongs.
  @param _splitsGroup The splits group to pay.
  @param _token The token the amonut being split is in.
  @param _amount The amount of tokens being split, as a fixed point number. If the `_token` is ETH, this is ignored and msg.value is used in its place.
  @param _decimals The number of decimals in the `_amount` fixed point number. 
  @param _defaultBeneficiary The address that will benefit from any non-specified beneficiaries in splits.

  @return leftoverAmount The amount leftover after all splits were paid.
*/
function _payToSplits(
  uint256 _splitsProjectId,
  uint256 _splitsDomain,
  uint256 _splitsGroup,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _defaultBeneficiary
) internal virtual returns (uint256 leftoverAmount) {
  // Pay the splits.
  leftoverAmount = _payTo(
    splitsStore.splitsOf(_splitsProjectId, _splitsDomain, _splitsGroup),
    _token,
    _amount,
    _decimals,
    _defaultBeneficiary
  );
  emit DistributeToSplitGroup(_splitsProjectId, _splitsDomain, _splitsGroup, msg.sender);
}
```
</TabItem>

<TabItem value="Events" label="Events">

| Name                                                                          | Data                                                                                          |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [**`DistributeToSplitGroup`**](/dev/api/contracts/or-utilities/jbetherc20splitspayer/events/distributetosplitgroup.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>address caller</code></li></ul>                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
