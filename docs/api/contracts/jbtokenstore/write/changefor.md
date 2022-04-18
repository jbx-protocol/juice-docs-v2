# changeFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBTokenStore`](/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/api/interfaces/ijbtokenstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Swap the current project's token for another, and transfer ownership of the current token to another address if needed.**

_Only a project's current controller can change its token._

_This contract must have access to all of the token's [`IJBToken`](/api/interfaces/ijbtoken.md) interface functions._

_Can't change to a token that's currently being used by another project._

#### Definition

```
function changeFor(
  uint256 _projectId,
  IJBToken _token,
  address _newOwner
) external override onlyController(_projectId) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the changed token belongs.
  * `_token` is the new token. Send an empty address to remove the project's current token without adding a new one, if claiming tokens isn't currency required by the project
  * `_newOwner` is an address to transfer the current token's ownership to. This is optional, but it cannot be done later.
* Through the [`onlyController`](/api/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md) modifier, the function can only be accessed by the controller of the `_projectId`.
* The function overrides a function definition from the [`IJBTokenStore`](/api/interfaces/ijbtokenstore.md) interface.
* The function doesn't return anything.

#### Body

1.  Make sure claiming isn't required if removing the token.

    ```
    // Can't remove the project's token if the project requires claiming tokens.
    if (_token == IJBToken(address(0)) && requireClaimFor[_projectId])
      revert CANT_REMOVE_TOKEN_IF_ITS_REQUIRED();
    ```

    _Internal references:_

    * [`requireClaimFor`](/api/contracts/jbtokenstore/properties/requireclaimfor.md)

2.  Make sure the token being changed to isn't being used by another project.

    ```
    // Can't change to a token already in use.
    if (projectOf[_token] != 0) revert TOKEN_ALREADY_IN_USE();
    ```

    _Internal references:_

    * [`projectOf`](/api/contracts/jbtokenstore/properties/projectof.md)

3.  Make sure the token has 18 decimals.

    ```
    // Can't change to a token that doesn't use 18 decimals.
    if (_token != IJBToken(address(0)) && _token.decimals() != 18) 
      revert TOKENS_MUST_HAVE_18_DECIMALS();
    ```

    _External references:_

    * [`decimals`](/api/interfaces/ijbtoken.md)

4.  Get a reference to the project's current token.

    ```
    // Get a reference to the current token for the project.
    oldToken = tokenOf[_projectId];
    ```

    _Internal references:_

    * [`tokenOf`](/api/contracts/jbtokenstore/properties/tokenof.md)
5.  Store the provided token as the token of the project.

    ```
    // Store the new token.
    tokenOf[_projectId] = _token;
    ```

    _Internal references:_

    * [`tokenOf`](/api/contracts/jbtokenstore/properties/tokenof.md)
6.  Store the project the new token is being used for.

    ```
    // Store the project for the new token.
    if (_token != IJBToken(address(0)))
      projectOf[_token] = _projectId;
    ```

    _Internal references:_

    * [`tokenOf`](/api/contracts/jbtokenstore/properties/tokenof.md)
7.  Reset the project for the project's old token.

    ```
    // Reset the project for the old token.
    projectOf[oldToken] = 0;
    ```

    _Internal references:_

    * [`tokenOf`](/api/contracts/jbtokenstore/properties/tokenof.md)
8.  If there's a current token and a new owner address was provided, transfer the ownership of the current token from this contract to the new owner.

    ```
    // If there's a current token and a new owner was provided, transfer ownership of the old token to the new owner.
    if (_newOwner != address(0) && oldToken != IJBToken(address(0)))
      oldToken.transferOwnership(_newOwner);
    ```

    _External references:_

    * [`transferOwnership`](/api/contracts/jbtoken/write/transferownership.md)
9.  Emit a `Change` event with the relevant parameters.

    ```
    emit Change(_projectId, _token, oldToken, _newOwner, msg.sender);
    ```

    _Event references:_

    * [`Change`](/api/contracts/jbtokenstore/events/change.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Swap the current project's token for another, and transfer ownership of the current token to another address if needed.

  @dev
  Only a project's current controller can change its token.

  @dev
  This contract must have access to all of the token's `IJBToken` interface functions.

  @dev
  Can't change to a token that's currently being used by another project.

  @param _projectId The ID of the project to which the changed token belongs.
  @param _token The new token. Send an empty address to remove the project's current token without adding a new one, if claiming tokens isn't currency required by the project.
  @param _newOwner An address to transfer the current token's ownership to. This is optional, but it cannot be done later.

  @return oldToken The token that was removed as the project's token.
*/
function changeFor(
  uint256 _projectId,
  IJBToken _token,
  address _newOwner
) external override onlyController(_projectId) returns (IJBToken oldToken) {
  // Can't remove the project's token if the project requires claiming tokens.
  if (_token == IJBToken(address(0)) && requireClaimFor[_projectId])
    revert CANT_REMOVE_TOKEN_IF_ITS_REQUIRED();

  // Can't change to a token already in use.
  if (projectOf[_token] != 0) revert TOKEN_ALREADY_IN_USE();

  // Can't change to a token that doesn't use 18 decimals.
  if (_token != IJBToken(address(0)) && _token.decimals() != 18) 
    revert TOKENS_MUST_HAVE_18_DECIMALS();

  // Get a reference to the current token for the project.
  oldToken = tokenOf[_projectId];

  // Store the new token.
  tokenOf[_projectId] = _token;

  // Store the project for the new token.
  if (_token != IJBToken(address(0)))
    projectOf[_token] = _projectId;

  // Reset the project for the old token.
  projectOf[oldToken] = 0;

  // If there's a current token and a new owner was provided, transfer ownership of the old token to the new owner.
  if (_newOwner != address(0) && oldToken != IJBToken(address(0)))
    oldToken.transferOwnership(_newOwner);

  emit Change(_projectId, _token, oldToken, _newOwner, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                              | Description                                               |
| ----------------------------------- | --------------------------------------------------------- |
| **`CANT_REMOVE_TOKEN_IF_ITS_REQUIRED`**    | Thrown if the token is being removed but claiming is required.        |
| **`TOKEN_ALREADY_IN_USE`**    | Thrown if the token being attached is already being used by another project.        |
| **`TOKENS_MUST_HAVE_18_DECIMALS`**    | Thrown if the token being attached doesn't use 18 decimals.        |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                | Data                                                                                                                                                                                |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Change`**](/api/contracts/jbtokenstore/events/change.md)               | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBToken](/api/interfaces/ijbtoken.md)indexed newToken</code></li><li><code>[IJBToken](/api/interfaces/ijbtoken.md)indexed oldToken</code></li><li><code>address indexed owner</code></li><li><code>address caller</code></li></ul>                                                                                           |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
