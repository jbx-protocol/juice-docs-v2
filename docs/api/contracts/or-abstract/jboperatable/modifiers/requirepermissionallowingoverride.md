# requirePermissionAllowingOverride

```
modifier requirePermissionAllowingOverride(
  address _account,
  uint256 _domain,
  uint256 _permissionIndex,
  bool _override
) {
  _requirePermissionAllowingOverride(_account, _domain, _permissionIndex, _override);
  _;
}
```