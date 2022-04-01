# issueTokenFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/protocol/api/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/protocol/api/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Issues an owner's ERC20 JBTokens that'll be used when claiming tokens.**

_Deploys a project's ERC20 JBToken contract._

_Only a project's owner or operator can issue its token._

### Definition

```solidity
function issueFor(
  uint256 _projectId,
  string calldata _name,
  string calldata _symbol
)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.ISSUE)
  returns (IJBToken token) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project being issued tokens.
  * `_name` is the ERC20's name.
  * `_symbol` is the ERC20's symbol.
* Through the [`requirePermission`](/protocol/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the project's owner, or from an operator that has been given the [`JBOperations.ISSUE`](/protocol/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId`.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBController`](/protocol/api/interfaces/ijbcontroller.md) interface.
* The function returns the address of the token that was issued.

### Body

1.  Forward the call to the token store.

    ```solidity
    // Issue the token in the store.
    return tokenStore.issueFor(_projectId, _name, _symbol);
    ```

</TabItem>

<TabItem value="Code" label="Code">

```solidity
/**
  @notice
  Issues an owner's ERC20 JBTokens that'll be used when claiming tokens.

  @dev
  Deploys a project's ERC20 JBToken contract.

  @dev
  Only a project's owner or operator can issue its token.

  @param _projectId The ID of the project being issued tokens.
  @param _name The ERC20's name.
  @param _symbol The ERC20's symbol.
*/
function issueTokenFor(
  uint256 _projectId,
  string calldata _name,
  string calldata _symbol
)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.ISSUE)
  returns (IJBToken token)
{
  // Issue the token in the store.
  return tokenStore.issueFor(_projectId, _name, _symbol);
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
