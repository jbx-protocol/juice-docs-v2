# requirePermission

```solidity
modifier requirePermission(
  address _account,
  uint256 _domain,
  uint256 _permissionIndex
) {
  _requirePermission(_account, _domain, _permissionIndex);
  _;
}
```