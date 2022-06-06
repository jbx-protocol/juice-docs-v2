# prepForMigrationOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/api/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/api/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows other controllers to signal to this one that a migration is expected for the specified project.**

_This controller should not yet be the project's controller._

### Definition

```
function prepForMigrationOf(uint256 _projectId, address _from) external virtual override { ... }
```

* Arguments:
  * `_projectId` is the ID of the project that will be migrated to this controller.
  * `_from` is the controller being migrated from.
* The function can be accessed externally by anyone.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBController`](/api/interfaces/ijbcontroller.md) interface.
* The function doesn't return anything.

#### Body

1.  Make sure this controller isn't the project's current controller. If it is, there shouldn't be a need to prepare anything.

    ```
    // This controller must not be the project's current controller.
    if (directory.controllerOf(_projectId) == address(this)) 
      revert CANT_MIGRATE_TO_CURRENT_CONTROLLER();
    ```

    _Internal references:_

    * [`directory`](/api/contracts/or-controllers/jbcontroller/properties/directory.md)

    _External references:_

    * [`controllerOf`](/api/contracts/jbdirectory/properties/controllerof.md)
2.  Update the processed token tracker to equal the current total supply of tokens. This prevents any inadvertant outstanding reserved tokens from being distributable upon migrating to this controller.

    ```
    // Set the tracker as the total supply.
    _processedTokenTrackerOf[_projectId] = int256(tokenStore.totalSupplyOf(_projectId));
    ```

    _Internal references:_

    * [`tokenStore`](/api/contracts/or-controllers/jbcontroller/properties/tokenstore.md)
    * [`_processedTokenTrackerOf`](/api/contracts/or-controllers/jbcontroller/properties/-_processedtokentrackerof.md)

    _External references:_

    * [`totalSupplyOf`](/api/contracts/jbtokenstore/read/totalsupplyof.md)

3.  Emit a `PrepMigration` event with the relevant parameters.

    ```
    emit PrepMigration(_projectId, _from, msg.sender);
    ```

    _Event references:_

    * [`PrepMigration`](/api/contracts/or-controllers/jbcontroller/events/prepmigration.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Allows other controllers to signal to this one that a migration is expected for the specified project.

  @dev
  This controller should not yet be the project's controller.

  @param _projectId The ID of the project that will be migrated to this controller.
  @param _from The controller being migrated from.
*/
function prepForMigrationOf(uint256 _projectId, address _from) external virtual override {
  // This controller must not be the project's current controller.
  if (directory.controllerOf(_projectId) == address(this)) 
    revert CANT_MIGRATE_TO_CURRENT_CONTROLLER();

  // Set the tracker as the total supply.
  _processedTokenTrackerOf[_projectId] = int256(tokenStore.totalSupplyOf(_projectId));

  emit PreppedMigration(_projectId, _from, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                   | Description                                                         |
| ---------------------------------------- | ------------------------------------------------------------------- |
| **`CANT_MIGRATE_TO_CURRENT_CONTROLLER`** | Thrown if the controller is the current controller for the project. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                        | Data                                                                                                                                                                                                                                                       |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`PrepMigration`**](/api/contracts/or-controllers/jbcontroller/events/prepmigration.md)                                               | <ul><li><code>uint256 projectId</code></li><li><code>[IJBController](/api/interfaces/ijbcontroller.md) from</code></li><li><code>address caller</code></li></ul>                                                                                                                  |
{

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>

</Tabs>
