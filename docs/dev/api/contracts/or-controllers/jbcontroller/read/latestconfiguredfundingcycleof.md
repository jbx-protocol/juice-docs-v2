# latestConfiguredFundingCycleOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/dev/api/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/dev/api/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**A project's latest configured funding cycle along with its metadata and the ballot state of the configuration.**

### Definition

```
function latestConfiguredFundingCycleOf(uint256 _projectId)
  external
  view
  override
  returns (
    JBFundingCycle memory fundingCycle,
    JBFundingCycleMetadata memory metadata,
    JBBallotState ballotState
  ) { ... }
```

* Arguments:
* `_projectId` is the ID of the project to which the funding cycle belongs.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBController`](/dev/api/interfaces/ijbcontroller.md) interface.
* The function returns:
  * `fundingCycle` is the latest configured funding cycle.
  * `metadata` is the latest configured funding cycle's metadata.
  * `ballotState` is the state of the configuration.

#### Body

1.  Get the latest configured funding cycle and its ballot state.

    ```
    (fundingCycle, ballotState) = fundingCycleStore.latestConfiguredOf(_projectId);
    ```

    _Internal references:_

    * [`fundingCycleStore`](/dev/api/contracts/or-controllers/jbcontroller/properties/fundingcyclestore.md)

    _External references:_

    * [`latestConfiguredOf`](/dev/api/contracts/jbfundingcyclestore/read/latestconfiguredof.md)
2.  Expand the metadata of the funding cycle.

    ```
    metadata = fundingCycle.expandMetadata();
    ```

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/dev/api/libraries/jbfundingcyclemetadataresolver.md)<br/>
      * `.expandMetadata(...)`
      
</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  A project's latest configured funding cycle along with its metadata and the ballot state of the configuration.

  @param _projectId The ID of the project to which the funding cycle belongs.

  @return fundingCycle The latest configured funding cycle.
  @return metadata The latest configured funding cycle's metadata.
  @return ballotState The state of the configuration.
*/
function latestConfiguredFundingCycleOf(uint256 _projectId)
  external
  view
  override
  returns (
    JBFundingCycle memory fundingCycle,
    JBFundingCycleMetadata memory metadata,
    JBBallotState ballotState
  )
{
  (fundingCycle, ballotState) = fundingCycleStore.latestConfiguredOf(_projectId);
  metadata = fundingCycle.expandMetadata();
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
