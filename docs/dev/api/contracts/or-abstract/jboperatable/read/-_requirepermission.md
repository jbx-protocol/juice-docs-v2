# _requirePermission

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBOperatable`](/dev/api/contracts/or-abstract/jboperatable/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Require the message sender is either the account or has the specified permission.**

#### Definition

```
function _requirePermission(
  address _account,
  uint256 _domain,
  uint256 _permissionIndex
) internal view { ... }
```

* Arguments:
  * `_account` is the account to allow.
  * `_domain` is the domain namespace within which the permission index will be checked.
  * `_permissionIndex` is the permission index that an operator must have within the specified domain to be allowed.
* The resulting function is internal to this contract and its inheriters.
* The function doesn't return anything.

#### Body

1.  Make sure the message sender is the specified account, an operator of the account within the specified domain, or an operator of the account within the wildcard domain. 

    ```
    if (
      msg.sender != _account &&
      !operatorStore.hasPermission(msg.sender, _account, _domain, _permissionIndex) &&
      !operatorStore.hasPermission(msg.sender, _account, 0, _permissionIndex)
    ) revert UNAUTHORIZED();
    ```

    _Internal references:_

    * [`operatorStore`](/dev/api/contracts/or-abstract/jboperatable/properties/operatorstore.md)

    _External references:_

    * [`hasPermission`](/dev/api/contracts/jboperatorstore/read/haspermission.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  Require the message sender is either the account or has the specified permission.

  @param _account The account to allow.
  @param _domain The domain namespace within which the permission index will be checked.
  @param _permissionIndex The permission index that an operator must have within the specified domain to be allowed.
*/
function _requirePermission(
  address _account,
  uint256 _domain,
  uint256 _permissionIndex
) internal view {
  if (
    msg.sender != _account &&
    !operatorStore.hasPermission(msg.sender, _account, _domain, _permissionIndex) &&
    !operatorStore.hasPermission(msg.sender, _account, 0, _permissionIndex)
  ) revert UNAUTHORIZED();
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                    | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| **`UNAUTHORIZED`** | Thrown if the message sender is neither the specified account nor an operator of the specified account. |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
