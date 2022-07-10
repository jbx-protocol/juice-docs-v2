# Splits payer

[`JBETHERC20SplitsPayer`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/README.md) contracts make it easy to route funds to a group of splits from other contracts or within inheriting contracts. This is useful for routing funds to a number of Juicebox project treasuries and other addresses within other contracts such as an NFT marketplaces.

The [`JBETHERC20SplitsPayer`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/README.md) can be inherited from any contract to facilitate internal transactions to split groups in ETH or any ERC-20, assuming the projects in the split group are using a payment terminal that accepts the tokens. They can also be deployed as standalone splits payer copies using [`JBSplitsPayerDeployer`](/dev/api/contracts/or-utilities/jbetherc20splitspayerdeployer).

#### Inheriting JBSplitsPayer

Inheriting from [`JBETHERC20SplitsPayer`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/README.md) will give a contract access to a public [`JBSplitsPayer.pay(...)`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/write/pay.md) function, a public [`JBSplitsPayer.addToBalanceOf(...)`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/write/addtobalanceof.md) function, and two functions [`JBSplitsPayer._payToSplits(...)`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/write/-_paytosplits.md) and [`JBSplitsPayer._payTo(...)`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/write/-_payto.md). These can be used from within the contract to route funds to a group of splits while specifying where leftover funds should go. Use the internal function if the inheriting contract has already handled receiving the funds being forwarded.

Follow instructions in [Getting started](/dev/build/getting-started.md) to import the `JBSplitsPayer` files into a project.

```
function pay(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string calldata _memo,
  bytes calldata _metadata
) public payable virtual override nonReentrant {}
```

```
function addToBalanceOf(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  string calldata _memo,
  bytes calldata _metadata
) public payable virtual override nonReentrant {}
```

```
function _payToSplits(
  uint256 _splitsProjectId,
  uint256 _splitsDomain,
  uint256 _splitsGroup,
  address _token,
  uint256 _amount,
  uint256 _decimals
) internal virtual returns (uint256 leftoverAmount) {}
```

```
function _payTo(
  JBSplit[] memory _splits,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _defaultBeneficiary
) internal virtual returns (uint256 leftoverAmount) { ... }
```

If your contract does not wish to route payments received via the native `receive` interaction to a group of splits, all default constructor arguments can be left as null values. The contract will revert any payment received.

#### Deploying splits payers

Instances of the [`JBETHERC20SplitsPayer`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/README.md) contract can also be deployed as standalone forwarders of payments to split groups. A new splits payer can be deployed using [`JBSplitsPayerDeployer.deploySplitsPayer(...)`](/dev/api/contracts/or-utilities/jbetherc20splitspayerdeployer/write/deploysplitspayer.md).

```
function deploySplitsPayer(
  uint256 _defaultSplitsProjectId,
  uint256 _defaultSplitsDomain,
  uint256 _defaultSplitsGroup,
  IJBSplitsStore _splitsStore,
  uint256 _defaultProjectId,
  address payable _defaultBeneficiary,
  bool _defaultPreferClaimedTokens,
  string memory _defaultMemo,
  bytes memory _defaultMetadata,
  bool _defaultPreferAddToBalance,
  address _owner
) external override returns (IJBSplitsPayer splitsPayer) { ... }
```


#### Examples

```
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@jbx-protocol/contracts-v2/contracts/JBETHERC20SplitsPayer.sol';

contract NFTSplitsPayer is ERC721, JBETHERC20SplitsPayer {
  JBSplits[] splits;

  constructor(JBSplits[] memory _splits, IJBDirectory _directory, address _owner) JBETHERC20ProjectPayer(0, address(0), false, "", bytes(0), false, _directory, _owner) {
    splits = _splits;
  },
  
  // Minting an NFT routes funds to a group of splits, and mints project tokens for msg.sender for splits that route to project treasuries.
  function mint(uint256 _tokenId,) external payable override {
    _mint(msg.sender, _tokenId);

    uint256 _numSplits = splits.length; 

    JBSplits[] memory _splitsWithBeneficiary;

    // Set the msg.sender to be the beneficiary of all project tokens resulting from splits that route to project treasuries.
    for (uint256 _i; _i < _numSplits; _i++)  {
      JBSplit _split = _splits[_i];
      if (_split.projectId != 0) _split.beneficiary = msg.sender;     
      _splitsWithBeneficiary.push(_split);
    }
    
    _payTo(_splitsWithBeneficiary, JBTokens.ETH, msg.value, 18, msg.sender);
  }
}
```