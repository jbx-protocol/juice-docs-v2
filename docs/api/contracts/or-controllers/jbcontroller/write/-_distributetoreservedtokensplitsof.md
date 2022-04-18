# _distributeToReservedTokenSplitsOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Distribute tokens to the splits according to the specified funding cycle configuration.**

#### Definition

```
function _distributeToReservedTokenSplitsOf(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group,
  uint256 _amount
) private returns (uint256 leftoverAmount) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project for which reserved token splits are being distributed.
  * `_fundingCycle` is the [`JBFundingCycle`](/api/data-structures/jbfundingcycle.md) to base the token distribution on.
  * `_domain` is the domain of the splits to distribute the reserved tokens between.
  * `_group` is the group of the splits to distribute the reserved tokens between.
  * `_amount` is the total amount of tokens to mint.
* The function is private to this contract.
* The function returns the leftover amount after all splits have been distributed.

#### Body

1.  Save the passed in amount as the leftover amount that will be returned. The subsequent routine will decrement the leftover amount as splits are settled.

    ```
    // Set the leftover amount to the initial amount.
    leftoverAmount = _amount;
    ```
2.  Get a reference to reserved token splits for the current funding cycle configuration of the project.

    ```
    // Get a reference to the project's reserved token splits.
    JBSplit[] memory _splits = splitsStore.splitsOf(_projectId, _domain, _group);
    ```

    _Internal references:_

    * [`splitsStore`](/api/contracts/or-controllers/jbcontroller/properties/splitsstore.md)

    _External references:_

    * [`splitsOf`](/api/contracts/jbsplitsstore/read/splitsof.md)
3.  Loop through each split.

    ```
    //Transfer between all splits.
    for (uint256 _i = 0; _i < _splits.length; _i++) { ... }
    ```

    1.  Get a reference to the current split being iterated on.

        ```
        // Get a reference to the split being iterated on.
        JBSplit memory _split = _splits[_i];
        ```
    2.  Get a reference to the amount of tokens to distribute to the current split. This amount is the total amount multiplied by the percentage of the split, which is a number out of the max value.

        ```
        // The amount to send towards the split.
        uint256 _tokenCount = PRBMath.mulDiv(
          _amount,
          _split.percent,
          JBConstants.SPLITS_TOTAL_PERCENT
        );
        ```

        _Library references:_

        * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
          * `.mulDiv(...)`
        * [`JBConstants`](/api/libraries/jbconstants.md)
          * `.SPLITS_TOTAL_PERCENT`
    6.  If there are tokens to mint for the given split, do so. If the split has an allocator specified, the tokens should go to that address. Otherwise if the split has a project ID specified, the tokens should be directed to the project's owner. Otherwise, the tokens should be directed at the beneficiary address of the split if it has one, or to the message sender if not. Afterwards, if there's an allocator specified, let it know that tokens have been sent. Reduce the leftover amount by the tokens that were sent to the split.

        ```
        // Mints tokens for the split if needed.
        if (_tokenCount > 0) {
          tokenStore.mintFor(
            // If an allocator is set in the splits, set it as the beneficiary.
            // Otherwise if a projectId is set in the split, set the project's owner as the beneficiary.
            // If the split has a beneficiary send to the split's beneficiary. Otherwise send to the msg.sender.
            _split.allocator != IJBSplitAllocator(address(0))
              ? address(_split.allocator)
              : _split.projectId != 0
              ? projects.ownerOf(_split.projectId)
              : _split.beneficiary != address(0)
              ? _split.beneficiary
              : msg.sender,
            _projectId,
            _tokenCount,
            _split.preferClaimed
          );

          // If there's an allocator set, trigger its `allocate` function.
          if (_split.allocator != IJBSplitAllocator(address(0)))
            _split.allocator.allocate(
              JBSplitAllocationData(
                address(tokenStore.tokenOf(_projectId)),
                _tokenCount,
                18, // 18 decimals.
                _projectId,
                _group,
                _split
              )
            );

          // Subtract from the amount to be sent to the beneficiary.
          leftoverAmount = leftoverAmount - _tokenCount;
        }
        ```

        _External references:_

        * [`mintFor`](/api/contracts/jbtokenstore/write/mintfor.md)
        * [`tokenOf`](/api/contracts/jbtokenstore/properties/tokenof.md)
        * [`allocate`](/api/interfaces/ijbsplitallocator.md)
        * [`ownerOf`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#IERC721-ownerOf-uint256-)

7.  Emit a `DistributeToReservedTokenSplit` event for the split being iterated on with the relevant parameters.

    ```
    emit DistributeToReservedTokenSplit(
      _projectId,
      _domain,
      _group,
      _split,
      _tokenCount,
      msg.sender
    );
    ```

    _Event references:_

    * [`DistributeToReservedTokenSplit`](/api/contracts/or-controllers/jbcontroller/events/distributetoreservedtokensplit.md)

</TabItem>

<TabItem value="Only code" label="Only code">

```
/**
  @notice
  Distribute tokens to the splits according to the specified funding cycle configuration.

  @param _projectId The ID of the project for which reserved token splits are being distributed.
  @param _domain The domain of the splits to distribute the reserved tokens between.
  @param _group The group of the splits to distribute the reserved tokens between.
  @param _amount The total amount of tokens to mint.

  @return leftoverAmount If the splits percents dont add up to 100%, the leftover amount is returned.
*/
function _distributeToReservedTokenSplitsOf(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group,
  uint256 _amount
) private returns (uint256 leftoverAmount) {
  // Set the leftover amount to the initial amount.
  leftoverAmount = _amount;

  // Get a reference to the project's reserved token splits.
  JBSplit[] memory _splits = splitsStore.splitsOf(_projectId, _domain, _group);

  //Transfer between all splits.
  for (uint256 _i = 0; _i < _splits.length; _i++) {
    // Get a reference to the split being iterated on.
    JBSplit memory _split = _splits[_i];

    // The amount to send towards the split.
    uint256 _tokenCount = PRBMath.mulDiv(
      _amount,
      _split.percent,
      JBConstants.SPLITS_TOTAL_PERCENT
    );

    // Mints tokens for the split if needed.
    if (_tokenCount > 0) {
      tokenStore.mintFor(
        // If an allocator is set in the splits, set it as the beneficiary.
        // Otherwise if a projectId is set in the split, set the project's owner as the beneficiary.
        // If the split has a beneficiary send to the split's beneficiary. Otherwise send to the msg.sender.
        _split.allocator != IJBSplitAllocator(address(0))
          ? address(_split.allocator)
          : _split.projectId != 0
          ? projects.ownerOf(_split.projectId)
          : _split.beneficiary != address(0)
          ? _split.beneficiary
          : msg.sender,
        _projectId,
        _tokenCount,
        _split.preferClaimed
      );

      // If there's an allocator set, trigger its `allocate` function.
      if (_split.allocator != IJBSplitAllocator(address(0)))
        _split.allocator.allocate(
          JBSplitAllocationData(
            address(tokenStore.tokenOf(_projectId)),
            _tokenCount,
            18, // 18 decimals.
            _projectId,
            _group,
            _split
          )
        );

      // Subtract from the amount to be sent to the beneficiary.
      leftoverAmount = leftoverAmount - _tokenCount;
    }

    emit DistributeToReservedTokenSplit(
      _projectId,
      _domain,
      _group,
      _split,
      _tokenCount,
      msg.sender
    );
  }
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                                                                | Data                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`DistributeToReservedTokenSplit`**](/api/contracts/or-controllers/jbcontroller/events/distributetoreservedtokensplit.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>[JBSplit](/api/data-structures/jbsplit.md) split</code></li><li><code>uint256 count</code></li><li><code>address caller</code></li></ul>                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
