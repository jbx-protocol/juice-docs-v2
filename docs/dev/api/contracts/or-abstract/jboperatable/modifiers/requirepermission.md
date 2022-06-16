# requirePermission

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBOperatable`](/dev/api/contracts/or-abstract/jboperatable/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Only allows the speficied account or an operator of the account to proceed.**

#### Definition

```
modifier requirePermission(
  address _account,
  uint256 _domain,
  uint256 _permissionIndex
) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project. 
* The modifier function can be used by any internal function.

#### Body

1.  Make sure the message's sender fulfills the criteria.

    ```
    _requirePermission(_account, _domain, _permissionIndex);
    ```

    _Internal references:_

    * [`_requirePermission`](/dev/api/contracts/or-abstract/jboperatable/read/-_requirepermission.md)

2.  Continue the rest of the function.

    ```
    _;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  Only allows the speficied account or an operator of the account to proceed. 

  @param _account The account to check for.
  @param _domain The domain namespace to look for an operator within. 
  @param _permissionIndex The index of the permission to check for. 
*/
modifier requirePermission(
  address _account,
  uint256 _domain,
  uint256 _permissionIndex
) {
  _requirePermission(_account, _domain, _permissionIndex);
  _;
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


```
```