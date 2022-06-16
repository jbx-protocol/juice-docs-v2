# get

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBFundingCycleStore`](/dev/api/contracts/jbfundingcyclestore/README.md)​‌

Interface: `IJBFundingCycleStore`

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Get the funding cycle with the given configuration for the specified project.**

#### Definition

```
function get(uint256 _projectId, uint256 _configuration)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the funding cycle belongs.
  * `_configuration` is the configuration of the funding cycle to get.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBFundingCycleStore`](/dev/api/interfaces/ijbfundingcyclestore.md) interface.
* The function returns the [`JBFundingCycle`](/dev/api/data-structures/jbfundingcycle.md).

#### Body

1.  Return the struct for the provided configuration and project.

    ```
    return _getStructFor(_projectId, _configuration);
    ```

    _Internal references:_

    * [`_getStructFor`](/dev/api/contracts/jbfundingcyclestore/read/-_getstructfor.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice 
  Get the funding cycle with the given configuration for the specified project.

  @param _projectId The ID of the project to which the funding cycle belongs.
  @param _configuration The configuration of the funding cycle to get.

  @return fundingCycle The funding cycle.
*/
function get(uint256 _projectId, uint256 _configuration)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle)
{
  return _getStructFor(_projectId, _configuration);
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
