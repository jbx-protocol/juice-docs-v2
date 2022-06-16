# IJBETHERC20ProjectPayerDeployer

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/interfaces/IJBETHERC20ProjectPayerDeployer.sol

#### Definition

```
interface IJBETHERC20ProjectPayerDeployer {
  event DeployProjectPayer(
    IJBProjectPayer indexed projectPayer,
    uint256 defaultProjectId,
    address defaultBeneficiary,
    bool defaultPreferClaimedTokens,
    string defaultMemo,
    bytes defaultMetadata,
    bool preferAddToBalance,
    IJBDirectory directory,
    address owner,
    address caller
  );

  function deployProjectPayer(
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string memory _defaultMemo,
    bytes memory _defaultMetadata,
    bool _preferAddToBalance,
    IJBDirectory _directory,
    address _owner
  ) external returns (IJBProjectPayer projectPayer);
}
```
