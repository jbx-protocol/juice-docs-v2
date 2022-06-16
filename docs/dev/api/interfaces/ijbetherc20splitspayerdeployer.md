# IJBETHERC20SplitsPayerDeployer

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/interfaces/IJBETHERC20SplitsPayerDeployer.sol

#### Definition

```solidity
interface IJBETHERC20SplitsPayerDeployer {
  event DeploySplitsPayer(
    IJBSplitsPayer indexed splitsPayer,
    uint256 defaultSplitsProjectId,
    uint256 defaultSplitsDomain,
    uint256 defaultSplitsGroup,
    IJBSplitsStore splitsStore,
    uint256 defaultProjectId,
    address defaultBeneficiary,
    bool defaultPreferClaimedTokens,
    string defaultMemo,
    bytes defaultMetadata,
    bool preferAddToBalance,
    address owner,
    address caller
  );

  function deploySplitsPayer(
    uint256 _defaultSplitsProjectId,
    uint256 _defaultSplitsDomain,
    uint256 _defaultSplitsGroup,
    IJBSplitsStore _splitsStore,
    uint256 _defaultProjectId,
    address payable _defaultBeneficiary,
    bool _defaultPreferClaimedTokens,
    string calldata _defaultMemo,
    bytes calldata _defaultMetadata,
    bool _preferAddToBalance,
    address _owner
  ) external returns (IJBSplitsPayer splitsPayer);
}
```