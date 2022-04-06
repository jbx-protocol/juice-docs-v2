# requirePermissionAllowingOverride

```solidity
/** 
  @notice
  Require the message sender is either the account, has the specified permission, or the override condition is true.

  @param _account The account to allow.
  @param _domain The domain within which the permission index will be checked.
  @param _domain The permission index that an operator must have within the specified domain to be allowed.
  @param _override The override condition to allow.
*/
function _requirePermissionAllowingOverride(
  address _account,
  uint256 _domain,
  uint256 _permissionIndex,
  bool _override
) internal view {
  if (
    !_override &&
    msg.sender != _account &&
    !operatorStore.hasPermission(msg.sender, _account, _domain, _permissionIndex) &&
    !operatorStore.hasPermission(msg.sender, _account, 0, _permissionIndex)
  ) revert UNAUTHORIZED();
}
```