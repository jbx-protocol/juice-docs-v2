# JBControllerUtility

_Provides tools for contracts with functionality that can only be accessed by a project's controller._

#### Traits

`abstract`

#### Code 

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/abstract/JBControllerUtility.sol

#### Interfaces

| Name                                                                      | Description                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBControllerUtility`**](/protocol/api/interfaces/ijbcontrollerutility.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Constructor

```
/** 
  @param _directory A contract storing directories of terminals and controllers for each project.
*/
constructor(IJBDirectory _directory) {
  directory = _directory;
}
```

* `_directory` is an [`IJBDirectory`](/protocol/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.

#### Modifiers

| Name                                                                                      | Data                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`onlyController`**](/protocol/api/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)                                 | <ul><li><code>uint256 _projectId</code></li></ul>                                               |

#### Read

| Function                                   | Definition                                                                                                                                                                                                  |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`directory`**](/protocol/api/contracts/or-abstract/jbcontrollerutility/properties/directory.md) | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>IJBDirectory directory</code></li></ul> |
