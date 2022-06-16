# _initFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBFundingCycleStore`](/dev/api/contracts/jbfundingcyclestore/README.md)​

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Initializes a funding cycle with the specified properties.**

#### Definition

```
function _initFor(
  uint256 _projectId,
  JBFundingCycle memory _baseFundingCycle,
  uint256 _configuration,
  uint256 _mustStartAtOrAfter,
  uint256 _weight
) private { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the funding cycle being initialized belongs.
  * `_baseFundingCycle` is the funding cycle to base the initialized one on.
  * `_configuration` is the configuration of the funding cycle being initialized.
  * `_mustStartAtOrAfter` is the time before which the initialized funding cycle cannot start.
  * `_weight` is the weight to give the newly initialized funding cycle.
* The function is private to this contract.
* The function doesn't return anything.

#### Body

1.  If no base funding cycle was provided, create a first funding cycle for the project by storing its intrinsic properties. Otherwise, create a new funding cycle by deriving values from the specified base cycle, interpreting a weight of 0 to inherit from the discounted weight of the base funding cycle and a weight of 1 as a weight of 0.

    ```
    // If there is no base, initialize a first cycle.
    if (_baseFundingCycle.number == 0) {
      // The first number is 1.
      uint256 _number = 1;

      // Set fresh intrinsic properties.
      _packAndStoreIntrinsicPropertiesOf(
        _configuration,
        _projectId,
        _number,
        _weight,
        _baseFundingCycle.configuration,
        _mustStartAtOrAfter
      );
    } else {
      // Derive the correct next start time from the base.
      uint256 _start = _deriveStartFrom(_baseFundingCycle, _mustStartAtOrAfter);

      // A weight of 1 is treated as a weight of 0.
      // This is to allow a weight of 0 (default) to represent inheriting the discounted weight of the previous funding cycle.
      _weight = _weight > 0
        ? (_weight == 1 ? 0 : _weight)
        : _deriveWeightFrom(_baseFundingCycle, _start);

      // Derive the correct number.
      uint256 _number = _deriveNumberFrom(_baseFundingCycle, _start);

      // Update the intrinsic properties.
      _packAndStoreIntrinsicPropertiesOf(
        _configuration,
        _projectId,
        _number,
        _weight,
        _baseFundingCycle.configuration,
        _start
      );
    }
    ```

    _Internal references:_

    * [`_packAndStoreIntrinsicPropertiesOf`](/dev/api/contracts/jbfundingcyclestore/write/-_packandstoreintrinsicpropertiesof.md)
    * [`_deriveStartFrom`](/dev/api/contracts/jbfundingcyclestore/read/-_derivestartfrom.md)
    * [`_deriveWeightFrom`](/dev/api/contracts/jbfundingcyclestore/read/-_deriveweightfrom.md)
    * [`_deriveNumberFrom`](/dev/api/contracts/jbfundingcyclestore/read/-_derivenumberfrom.md)
2.  Store the initialized configuration as the latest of the project.

    ```
    // Set the project's latest funding cycle configuration.
    latestConfigurationOf[_projectId] = _configuration;
    ```

    _Internal references:_

    * [`latestConfigurationOf`](/dev/api/contracts/jbfundingcyclestore/properties/latestconfigurationof.md)
3.  Emit an `Init` event with the relevant parameters.

    ```
    emit Init(_configuration, _projectId, _baseFundingCycle.configuration);
    ```

    _Event references:_

    * [`Init`](/dev/api/contracts/jbfundingcyclestore/events/init.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice 
  Initializes a funding cycle with the specified properties.

  @param _projectId The ID of the project to which the funding cycle being initialized belongs.
  @param _baseFundingCycle The funding cycle to base the initialized one on.
  @param _configuration The configuration of the funding cycle being initialized.
  @param _mustStartAtOrAfter The time before which the initialized funding cycle cannot start.
  @param _weight The weight to give the newly initialized funding cycle.
*/
function _initFor(
  uint256 _projectId,
  JBFundingCycle memory _baseFundingCycle,
  uint256 _configuration,
  uint256 _mustStartAtOrAfter,
  uint256 _weight
) private {
  // If there is no base, initialize a first cycle.
  if (_baseFundingCycle.number == 0) {
    // The first number is 1.
    uint256 _number = 1;

    // Set fresh intrinsic properties.
    _packAndStoreIntrinsicPropertiesOf(
      _configuration,
      _projectId,
      _number,
      _weight,
      _baseFundingCycle.configuration,
      _mustStartAtOrAfter
    );
  } else {
    // Derive the correct next start time from the base.
    uint256 _start = _deriveStartFrom(_baseFundingCycle, _mustStartAtOrAfter);

    // A weight of 1 is treated as a weight of 0.
    // This is to allow a weight of 0 (default) to represent inheriting the discounted weight of the previous funding cycle.
    _weight = _weight > 0
      ? (_weight == 1 ? 0 : _weight)
      : _deriveWeightFrom(_baseFundingCycle, _start);

    // Derive the correct number.
    uint256 _number = _deriveNumberFrom(_baseFundingCycle, _start);

    // Update the intrinsic properties.
    _packAndStoreIntrinsicPropertiesOf(
      _configuration,
      _projectId,
      _number,
      _weight,
      _baseFundingCycle.configuration,
      _start
    );
  }

  // Set the project's latest funding cycle configuration.
  latestConfigurationOf[_projectId] = _configuration;

  emit Init(_configuration, _projectId, _baseFundingCycle.configuration);
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name       | Data                                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Init`**](/dev/api/contracts/jbfundingcyclestore/events/init.md)           | <ul><li><code>uint256 indexed configuration</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed basedOn</code></li></ul>                                                                                                                                                                                                 |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
