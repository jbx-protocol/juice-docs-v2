# requirePermission

```solidity
/** 
  @notice
  Require the message sender is either the account or has the specified permission.

  @param _account The account to allow.
  @param _domain The domain within which the permission index will be checked.
  @param _domain The permission index that an operator must have within the specified domain to be allowed.
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