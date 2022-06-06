# _configure

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Configures a funding cycle and stores information pertinent to the configuration.**

#### Definition

```
function _configure(
  uint256 _projectId,
  JBFundingCycleData calldata _data,
  JBFundingCycleMetadata calldata _metadata,
  uint256 _mustStartAtOrAfter,
  JBGroupedSplits[] memory _groupedSplits,
  JBFundAccessConstraints[] memory _fundAccessConstraints
) internal returns (uint256) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project whose funding cycles are being reconfigured.
  * `_data` is a [`JBFundingCycleData`](/api/data-structures/jbfundingcycledata.md) data structure that defines the funding cycle. These properties will remain fixed for the duration of the funding cycle.
  * `_metadata` is a [`JBFundingCycleMetadata`](/api/data-structures/jbfundingcyclemetadata.md) data structure specifying the controller specific params that a funding cycle can have. These properties will remain fixed for the duration of the funding cycle.
  * `_mustStartAtOrAfter` is the time before which the configured funding cycle cannot start.
  * `_groupedSplits` is an array of [`JBGroupedSplits`](/api/data-structures/jbgroupedsplits.md) data structures containing splits to set for any number of groups. The core protocol makes use of groups defined in [`JBSplitsGroups`](/api/libraries/jbsplitsgroups.md).
  * `_fundAccessConstraints` is an array of [`JBFundAccessConstraints`](/api/data-structures/jbfundaccessconstraints.md) data structures containing amounts that a project can use from its treasury for each payment terminal. Amounts are fixed point numbers using the same number of decimals as the accompanying terminal. The `distributionLimit` applies for each funding cycle, and the `overflowAllowance` applies for the entirety of the configuration. The `_distributionLimit` and `_overflowAllowance` parameters must fit in a `uint232`.
* The resulting function is internal to this contract and its inheriters. 
* The function returns the funding cycle configuration that was successfully updated.

#### Body

1.  Make sure the reserved rate is a valid number out of the max value.

    ```
    // Make sure the provided reserved rate is valid.
    if (_metadata.reservedRate > JBConstants.MAX_RESERVED_RATE) revert INVALID_RESERVED_RATE();
    ```

    _Library references:_

    * [`JBConstants`](/api/libraries/jbconstants.md)
      * `.MAX_RESERVED_RATE(...)`
2.  Make sure the redemption rate is a valid number out of the max value.

    ```
    // Make sure the provided redemption rate is valid.
    if (_metadata.redemptionRate > JBConstants.MAX_REDEMPTION_RATE)
      revert INVALID_REDEMPTION_RATE();
    ```

    _Library references:_

    * [`JBConstants`](/api/libraries/jbconstants.md)
      * `.MAX_REDEMPTION_RATE(...)`
3.  Make sure the ballot redemption rate is less than the max value.

    ```
    // Make sure the provided ballot redemption rate is valid.
    if (_metadata.ballotRedemptionRate > JBConstants.MAX_REDEMPTION_RATE)
      revert INVALID_BALLOT_REDEMPTION_RATE();
    ```

    _Library references:_

    * [`JBConstants`](/api/libraries/jbconstants.md)
      * `.MAX_REDEMPTION_RATE(...)`
4.  Configure the project's funding cycles. Pack the metadata into a `uint256`.

    ```
    // Configure the funding cycle's properties.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.configureFor(
      _projectId,
      _data,
      JBFundingCycleMetadataResolver.packFundingCycleMetadata(_metadata),
      _mustStartAtOrAfter
    );
    ```

    _External references:_

    * [`configureFor`](/api/contracts/jbfundingcyclestore/write/configurefor.md)

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/api/libraries/jbfundingcyclemetadataresolver.md)
      * `.packFundingCycleMetadata(...)`
5.  Set splits.

    ```
    // Set splits for the group.
    splitsStore.set(_projectId, _fundingCycle.configuration, _groupedSplits);
    ```

    _External references:_

    * [`set`](/api/contracts/jbsplitsstore/write/set.md)
6.  For each fund access constraint struct in the array passed in, store the values of the distribution limit and overflow allowance packed with their respective currencies. Make sure the values are contained within their bit limit so that they can be packed together in one `uint256`. Emit a `SetFundAccessConstraints` event with the relevant parameters.

    ```
    // Set distribution limits if there are any.
    for (uint256 _i; _i < _fundAccessConstraints.length; _i++) {
      JBFundAccessConstraints memory _constraints = _fundAccessConstraints[_i];

      // If distribution limit value is larger than 232 bits, revert.
      if (_constraints.distributionLimit > type(uint232).max) revert INVALID_DISTRIBUTION_LIMIT();

      // If distribution limit currency value is larger than 24 bits, revert.
      if (_constraints.distributionLimitCurrency > type(uint24).max)
        revert INVALID_DISTRIBUTION_LIMIT_CURRENCY();

      // If overflow allowance value is larger than 232 bits, revert.
      if (_constraints.overflowAllowance > type(uint232).max) revert INVALID_OVERFLOW_ALLOWANCE();

      // If overflow allowance currency value is larger than 24 cbits, revert.
      if (_constraints.overflowAllowanceCurrency > type(uint24).max)
        revert INVALID_OVERFLOW_ALLOWANCE_CURRENCY();

      // Set the distribution limit if there is one.
      if (_constraints.distributionLimit > 0)
        _packedDistributionLimitDataOf[_projectId][_fundingCycle.configuration][
          _constraints.terminal
        ] = _constraints.distributionLimit | (_constraints.distributionLimitCurrency << 232);

      // Set the overflow allowance if there is one.
      if (_constraints.overflowAllowance > 0)
        _packedOverflowAllowanceDataOf[_projectId][_fundingCycle.configuration][
          _constraints.terminal
        ] = _constraints.overflowAllowance | (_constraints.overflowAllowanceCurrency << 232);

      emit SetFundAccessConstraints(
        _fundingCycle.configuration,
        _fundingCycle.number,
        _projectId,
        _constraints,
        msg.sender
      );
    }

    ```

    _Internal references:_

    * [`_packedDistributionLimitDataOf`](/api/contracts/or-controllers/jbcontroller/properties/-_packeddistributionlimitdataof.md)
    * [`_packedOverflowAllowanceDataOf`](/api/contracts/or-controllers/jbcontroller/properties/-_packedoverflowallowancedataof.md)

    _Event references:_

    * [`SetFundAccessConstraints`](/api/contracts/or-controllers/jbcontroller/events/setfundaccessconstraints.md)
7.  Return the funding cycle's configuration.

    ```
    return _fundingCycle.configuration;
    ```

</TabItem>

<TabItem value="Only code" label="Only code">

```
/**
  @notice
  Configures a funding cycle and stores information pertinent to the configuration.

  @param _projectId The ID of the project whose funding cycles are being reconfigured.
  @param _data Data that defines the funding cycle. These properties will remain fixed for the duration of the funding cycle.
  @param _metadata Metadata specifying the controller specific params that a funding cycle can have. These properties will remain fixed for the duration of the funding cycle.
  @param _mustStartAtOrAfter The time before which the configured funding cycle cannot start.
  @param _groupedSplits An array of splits to set for any number of groups. 
  @param _fundAccessConstraints An array containing amounts that a project can use from its treasury for each payment terminal. Amounts are fixed point numbers using the same number of decimals as the accompanying terminal. The `_distributionLimit` and `_overflowAllowance` parameters must fit in a `uint232`.
  
  @return configuration The configuration of the funding cycle that was successfully reconfigured.
*/
function _configure(
  uint256 _projectId,
  JBFundingCycleData calldata _data,
  JBFundingCycleMetadata calldata _metadata,
  uint256 _mustStartAtOrAfter,
  JBGroupedSplits[] memory _groupedSplits,
  JBFundAccessConstraints[] memory _fundAccessConstraints
) internal returns (uint256) {
  // Make sure the provided reserved rate is valid.
  if (_metadata.reservedRate > JBConstants.MAX_RESERVED_RATE) revert INVALID_RESERVED_RATE();

  // Make sure the provided redemption rate is valid.
  if (_metadata.redemptionRate > JBConstants.MAX_REDEMPTION_RATE)
    revert INVALID_REDEMPTION_RATE();

  // Make sure the provided ballot redemption rate is valid.
  if (_metadata.ballotRedemptionRate > JBConstants.MAX_REDEMPTION_RATE)
    revert INVALID_BALLOT_REDEMPTION_RATE();

  // Configure the funding cycle's properties.
  JBFundingCycle memory _fundingCycle = fundingCycleStore.configureFor(
    _projectId,
    _data,
    JBFundingCycleMetadataResolver.packFundingCycleMetadata(_metadata),
    _mustStartAtOrAfter
  );

  // Set splits for the group.
  splitsStore.set(_projectId, _fundingCycle.configuration, _groupedSplits);

  // Set distribution limits if there are any.
  for (uint256 _i; _i < _fundAccessConstraints.length; _i++) {
    JBFundAccessConstraints memory _constraints = _fundAccessConstraints[_i];

    // If distribution limit value is larger than 232 bits, revert.
    if (_constraints.distributionLimit > type(uint232).max) revert INVALID_DISTRIBUTION_LIMIT();

    // If distribution limit currency value is larger than 24 bits, revert.
    if (_constraints.distributionLimitCurrency > type(uint24).max)
      revert INVALID_DISTRIBUTION_LIMIT_CURRENCY();

    // If overflow allowance value is larger than 232 bits, revert.
    if (_constraints.overflowAllowance > type(uint232).max) revert INVALID_OVERFLOW_ALLOWANCE();

    // If overflow allowance currency value is larger than 24 bits, revert.
    if (_constraints.overflowAllowanceCurrency > type(uint24).max)
      revert INVALID_OVERFLOW_ALLOWANCE_CURRENCY();

    // Set the distribution limit if there is one.
    if (_constraints.distributionLimit > 0)
      _packedDistributionLimitDataOf[_projectId][_fundingCycle.configuration][
        _constraints.terminal
      ][_constraints.token] =
        _constraints.distributionLimit |
        (_constraints.distributionLimitCurrency << 232);

    // Set the overflow allowance if there is one.
    if (_constraints.overflowAllowance > 0)
      _packedOverflowAllowanceDataOf[_projectId][_fundingCycle.configuration][
        _constraints.terminal
      ][_constraints.token] =
        _constraints.overflowAllowance |
        (_constraints.overflowAllowanceCurrency << 232);

    emit SetFundAccessConstraints(
      _fundingCycle.configuration,
      _fundingCycle.number,
      _projectId,
      _constraints,
      msg.sender
    );
  }

  return _fundingCycle.configuration;
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                               | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| **`INVALID_RESERVED_RATE`**          | Thrown if the reserved rate is greater than 100%.          |
| **`INVALID_REDEMPTION_RATE`**        | Thrown if the redemption rate is greater than 100%.        |
| **`INVALID_BALLOT_REDEMPTION_RATE`** | Thrown if the ballot redemption rate is greater than 100%. |
| **`INVALID_DISTRIBUTION_LIMIT`** | Thrown if the distribution limit is greater than 248 bits. |
| **`INVALID_DISTRIBUTION_LIMIT_CURRENCY`** | Thrown if the distribution limit currency is greater than 8 bits. |
| **`INVALID_OVERFLOW_ALLOWANCE`** | Thrown if the overflow allowance is greater than 248 bits. |
| **`INVALID_OVERFLOW_ALLOWANCE_CURRENCY`** | Thrown if the overflow allowance currency is greater than 8 bits. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                                                    | Data                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetFundAccessConstraints`**](/api/contracts/or-controllers/jbcontroller/events/setfundaccessconstraints.md) | <ul><li><code>uint256 indexed fundingCycleConfiguration</code></li><li><code>uint256 indexed fundingCycleNumber</code></li><li><code>uint256 indexed projectId</code></li><li><code>[JBFundAccessConstraints](/api/data-structures/jbfundaccessconstraints.md)constraints</code></li><li><code>address caller</code></li></ul> |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
