# JBOperatable

_Modifiers to allow access to functions based on the message sender's operator status._

#### Traits

`abstract`

#### Code

https://github.com/jbx-protocol/juice-contracts/tree/main/contracts/v2abstract/JBOperatable.sol


#### Interfaces

| Name                                                                      | Description                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBOperatable`**](/dev/api/interfaces/ijboperatable.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Constructor

```
/** 
  @param _operatorStore A contract storing operator assignments.
*/
constructor(IJBOperatorStore _operatorStore) {
  operatorStore = _operatorStore;
}
```

* `_operatorStore` is an [`IJBOperatorStore`](/dev/api/interfaces/ijboperatorstore.md) contract storing operator assignments.

#### Modifiers

| Name                                                                                      | Data                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`requirePermission`**](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)                                 | <ul><li><code>address _account</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _index</code></li></ul>                                               |
| [**`requirePermissionAllowingOverride`**](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md) | <ul><li><code>address _account</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _permissionIndex</code></li><li><code>bool _override</code></li></ul> |

#### Read

| Function                                           | Definition                                                                                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`operatorStore`**](/dev/api/contracts/or-abstract/jboperatable/properties/operatorstore.md) | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>IJBOperationStore operatorStore</code></li></ul> |
| [**`_requirePermission`**](/dev/api/contracts/or-abstract/jboperatable/read/-_requirepermission.md) | <p><strong>Traits</strong></p><ul><li><code>internal</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _permissionIndex</code></li></ul> |
| [**`_requirePermissionAllowingOverride`**](/dev/api/contracts/or-abstract/jboperatable/read/-_requirepermissionallowingoverride.md) | <p><strong>Traits</strong></p><ul><li><code>internal</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _permissionIndex</code></li><li><code>bool override</code></li></ul> |
