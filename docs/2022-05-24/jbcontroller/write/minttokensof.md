# mintTokensOf

:::caution
This page describes v2 contracts used before [a bug was identified](/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/protocol/api/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/protocol/api/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Mint new token supply into an account, and optionally reserve a supply to be distributed according to the project's current funding cycle configuration.**

_Only a project's owner, a designated operator, one of its terminals, or the current data source can mint its tokens._

#### Definition

```
function mintTokensOf(
  uint256 _projectId,
  uint256 _tokenCount,
  address _beneficiary,
  string calldata _memo,
  bool _preferClaimedTokens,
  bool _useReservedRate
) external virtual override returns (uint256 beneficiaryTokenCount) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the tokens being minted belong.
  * `_tokenCount` is the amount of tokens to mint in total, counting however many should be reserved.
  * `_beneficiary` is the account that the tokens are being minted for.
  * `_memo` is a memo to pass along to the emitted event.
  * `_preferClaimedTokens` is a flag indicating whether a project's attached token contract should be minted if they have been issued.
  * `_useReservedRate` is whether to use the current funding cycle's reserved rate in the mint calculation.
* Through the [_requirePermissionAllowingOverride`](/protocol/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md) internal function call, the function is only accessible by the project's owner, from an operator that has been given the [`JBOperations.MINT`](/protocol/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId`, from one of the project's terminals, or from the project's current funding cycle data source.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBController`](/protocol/api/interfaces/ijbcontroller.md) interface.
* The function returns the amount of tokens minted for the beneficiary.

#### Body

1.  Make sure there is a specified amount of tokens to mint.

    ```
    // There should be tokens to mint.
    if (_tokenCount == 0) revert ZERO_TOKENS_TO_MINT();
    ```
2.  Make sure the message sender has appropriate permissions and that the project currently allows directly minting tokens by checking that it isn't paused when being called by any contract other than one of the project's terminals or current data sources. If the request is coming from a terminal or current data source, allow minting regardless of the pause state because it could be a sub-routine of another operation such as receiving payments. If minting is allowed, get a reference to the reserved rate that should be used. 

    ```
    // Define variables that will be needed outside scoped section below.
    uint256 _reservedRate;

    // Scoped section prevents stack too deep. `_fundingCycle` is only used within scope.
    {
      // Get a reference to the project's current funding cycle.
      JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);

      // Minting limited to: project owner, authorized callers, project terminal and current funding cycle data source
      _requirePermissionAllowingOverride(
        projects.ownerOf(_projectId),
        _projectId,
        JBOperations.MINT,
        directory.isTerminalOf(_projectId, IJBPaymentTerminal(msg.sender)) ||
          msg.sender == address(_fundingCycle.dataSource())
      );

      // If the message sender is not a terminal or a datasource, the current funding cycle must allow minting.
      if (
        !_fundingCycle.mintingAllowed() &&
        !directory.isTerminalOf(_projectId, IJBPaymentTerminal(msg.sender)) &&
        msg.sender != address(_fundingCycle.dataSource())
      ) revert MINT_NOT_ALLOWED_AND_NOT_TERMINAL_DELEGATE();

      // Determine the reserved rate to use.
      _reservedRate = _useReservedRate ? _fundingCycle.reservedRate() : 0;
    }
    ```

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/protocol/api/libraries/jbfundingcyclemetadataresolver.md)
      * `.mintPaused(...)`
      * `.reservedRate(...)`

    _Internal references:_

    * [`fundingCycleStore`](/protocol/api/contracts/or-controllers/jbcontroller/properties/fundingcyclestore.md)
    * [`directory`](/protocol/api/contracts/or-controllers/jbcontroller/properties/directory.md)

    _External references:_

    * [`currentOf`](/protocol/api/contracts/jbfundingcyclestore/read/currentof.md)
    * [`isTerminalOf`](/protocol/api/contracts/jbdirectory/read/isterminalof.md)
3.  If the operation should reserve 100% of the minted tokens, the token tracker should be updated to add a difference of the specified token count instead of minting the tokens directly. This will allow a future distribution of reserved tokens to mint the token count to reserved addresses. Otherwise, update the token tracker if there is no intent to reserve tokens alongside the mint and mint the unreserved tokens for the beneficiary.

    ```
    if (_reservedRate == JBConstants.MAX_RESERVED_RATE)
      // Subtract the total weighted amount from the tracker so the full reserved token amount can be printed later.
      _processedTokenTrackerOf[_projectId] =
        _processedTokenTrackerOf[_projectId] -
        int256(_tokenCount);
    else {
      // The unreserved token count that will be minted for the beneficiary.
      beneficiaryTokenCount = PRBMath.mulDiv(
        _tokenCount,
        JBConstants.MAX_RESERVED_RATE - _reservedRate,
        JBConstants.MAX_RESERVED_RATE
      );

      if (_reservedRate == 0)
        // If there's no reserved rate, increment the tracker with the newly minted tokens.
        _processedTokenTrackerOf[_projectId] =
          _processedTokenTrackerOf[_projectId] +
          int256(beneficiaryTokenCount);

      // Mint the tokens.
      tokenStore.mintFor(_beneficiary, _projectId, beneficiaryTokenCount, _preferClaimedTokens);
    }
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`
    * [`JBConstants`](/protocol/api/libraries/jbconstants.md)
      * `.MAX_RESERVED_RATE`

    _Internal references:_

    * [`tokenStore`](/protocol/api/contracts/or-controllers/jbcontroller/properties/tokenstore.md)
    * [`_processedTokenTrackerOf`](/protocol/api/contracts/or-controllers/jbcontroller/properties/-_processedtokentrackerof.md)

    _External references:_

    * [`mintFor`](/protocol/api/contracts/jbtokenstore/write/mintfor.md)
4.  Emit a `MintTokens` event with the relevant parameters.

    ```
    emit MintTokens(_beneficiary, _projectId, _tokenCount, _memo, _reservedRate, msg.sender);
    ```

    _Event references:_

    * [`MintTokens`](/protocol/api/contracts/or-controllers/jbcontroller/events/minttokens.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Mint new token supply into an account, and optionally reserve a supply to be distributed according to the project's current funding cycle configuration.

  @dev
  Only a project's owner, a designated operator, one of its terminals, or the current data source can mint its tokens.

  @param _projectId The ID of the project to which the tokens being minted belong.
  @param _tokenCount The amount of tokens to mint in total, counting however many should be reserved.
  @param _beneficiary The account that the tokens are being minted for.
  @param _memo A memo to pass along to the emitted event.
  @param _preferClaimedTokens A flag indicating whether a project's attached token contract should be minted if they have been issued.
  @param _useReservedRate Whether to use the current funding cycle's reserved rate in the mint calculation.

  @return beneficiaryTokenCount The amount of tokens minted for the beneficiary.
*/
function mintTokensOf(
  uint256 _projectId,
  uint256 _tokenCount,
  address _beneficiary,
  string calldata _memo,
  bool _preferClaimedTokens,
  bool _useReservedRate
) external virtual override returns (uint256 beneficiaryTokenCount) {
  // There should be tokens to mint.
  if (_tokenCount == 0) revert ZERO_TOKENS_TO_MINT();

  // Define variables that will be needed outside scoped section below.
  uint256 _reservedRate;

  // Scoped section prevents stack too deep. `_fundingCycle` only used within scope.
  {
    // Get a reference to the project's current funding cycle.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);

    // Minting limited to: project owner, authorized callers, project terminal and current funding cycle data source
    _requirePermissionAllowingOverride(
      projects.ownerOf(_projectId),
      _projectId,
      JBOperations.MINT,
      directory.isTerminalOf(_projectId, IJBPaymentTerminal(msg.sender)) ||
        msg.sender == address(_fundingCycle.dataSource())
    );

    // If the message sender is not a terminal or a datasource, the current funding cycle must allow minting.
    if (
      !_fundingCycle.mintingAllowed() &&
      !directory.isTerminalOf(_projectId, IJBPaymentTerminal(msg.sender)) &&
      msg.sender != address(_fundingCycle.dataSource())
    ) revert MINT_NOT_ALLOWED_AND_NOT_TERMINAL_DELEGATE();

    // Determine the reserved rate to use.
    _reservedRate = _useReservedRate ? _fundingCycle.reservedRate() : 0;
  }

  if (_reservedRate == JBConstants.MAX_RESERVED_RATE)
    // Subtract the total weighted amount from the tracker so the full reserved token amount can be printed later.
    _processedTokenTrackerOf[_projectId] =
      _processedTokenTrackerOf[_projectId] -
      int256(_tokenCount);
  else {
    // The unreserved token count that will be minted for the beneficiary.
    beneficiaryTokenCount = PRBMath.mulDiv(
      _tokenCount,
      JBConstants.MAX_RESERVED_RATE - _reservedRate,
      JBConstants.MAX_RESERVED_RATE
    );

    if (_reservedRate == 0)
      // If there's no reserved rate, increment the tracker with the newly minted tokens.
      _processedTokenTrackerOf[_projectId] =
        _processedTokenTrackerOf[_projectId] +
        int256(beneficiaryTokenCount);

    // Mint the tokens.
    tokenStore.mintFor(_beneficiary, _projectId, beneficiaryTokenCount, _preferClaimedTokens);
  }

  emit MintTokens(_beneficiary, _projectId, _tokenCount, _memo, _reservedRate, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                                   | Description                                                                                                                |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **`ZERO_TOKENS_TO_MINT`**                                | Thrown if no tokens are being minted.                                                                                      |
| **`MINT_PAUSED_AND_NOT_TERMINAL_DELEGATE`**              | Thrown if the request is not being made by a payment terminal, and the project's current funding cycle has paused minting. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                     | Data                                                                                                                                                                                                                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`MintTokens`**](/protocol/api/contracts/or-controllers/jbcontroller/events/minttokens.md)                                         | <ul><li><code>address indexed beneficiary</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 tokenCount</code></li><li><code>uint256 beneficairyTokenCount</code></li><li><code>string memo</code></li><li><code>uint256 reservedRate</code></li><li><code>address caller</code></li></ul>                 |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
