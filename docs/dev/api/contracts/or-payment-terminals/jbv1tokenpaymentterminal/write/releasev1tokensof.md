# releaseV1TokensOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBV1TokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows a project owner to gain custody of all the v1 tokens that have been paid, after they have finalized the ability for v1 token holders to convert to v2 tokens via this contract.**

#### Definition

```
function releaseV1TokensOf(uint256 _v1ProjectId, address _beneficiary) external override { ... }
```

* Arguments:
  * `_v1ProjectId` is the ID of the v1 project whose tokens are being released.
  * `_beneficiary` is the address that the tokens are being sent to.
* The function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBV1TokenPaymentTerminal`](/dev/api/interfaces/ijbv1tokenpaymentterminal.md) interface.
* The function doesn't return anything.

#### Body

1.  Make sure the message sender is the owner of the v1 project.

    ```
    // Make sure only the v1 project owner can retrieve the tokens.
    if (msg.sender != ticketBooth.projects().ownerOf(_v1ProjectId)) revert NOT_ALLOWED();
    ```

    _Internal references:_

    * [`ticketBooth`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/ticketbooth.md)

    _External references:_
    
    * [`ownerOf`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#IERC721-ownerOf-uint256-)
    * [`projects`](https://github.com/jbx-protocol/juice-contracts-v1/blob/a91b55e8d264267c338b089aa9a45b29fd8e8f13/contracts/interfaces/ITicketBooth.sol#L71)

2.  Make sure the v1 project has not yet been finalized.

    ```
    // Make sure v1 token conversion has not yet finalized.
    if (finalized[_v1ProjectId]) revert MIGRATION_TERMINATED();
    ```

    _Internal references:_

    * [`finalized`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/finalized.md)

3.  Get a reference to the v1 ERC20 token being used by the project.

    ```
    // Get a reference to the v1 project's ERC20 tokens.
    ITickets _v1Token = ticketBooth.ticketsOf(_v1ProjectId);
    ```

    _Internal references:_

    * [`ticketBooth`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/ticketbooth.md)

    _External references:_
    
    * [`ticketsOf`](https://github.com/jbx-protocol/juice-contracts-v1/blob/a91b55e8d264267c338b089aa9a45b29fd8e8f13/contracts/interfaces/ITicketBooth.sol#L69)

4.  Get a reference to the v1 unclaimed token balance currently being held by this contract.

    ```
    // Get a reference to this terminal's unclaimed balance.
    uint256 _unclaimedBalance = ticketBooth.stakedBalanceOf(address(this), _v1ProjectId);
    ```

    _Internal references:_

    * [`ticketBooth`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/ticketbooth.md)

    _External references:_
  
    * [`stakedBalanceOf`](https://github.com/jbx-protocol/juice-contracts-v1/blob/a91b55e8d264267c338b089aa9a45b29fd8e8f13/contracts/interfaces/ITicketBooth.sol#L84)

5.  Get a reference to the v1 ERC20 token balance currently being held by this contract.

    ```
    // Get a reference to this terminal's ERC20 balance.
    uint256 _erc20Balance = _v1Token == ITickets(address(0))
      ? 0
      : _v1Token.balanceOf(address(this));
    ```

    _External references:_
  
    * [`balanceOf`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-balanceOf-address-)

6.  Mark this v1 project as finalized so that this terminal no longer accepts this v1 token in exchange for any v2 token.

    ```
    // Store the finalized state.
    finalized[_v1ProjectId] = true;
    ```

    _Internal references:_

    * [`finalized`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/finalized.md)

7.  Transfer ERC20 token balance held by this contract to the specified beneficiary.

    ```
    // Transfer ERC20 v1 tokens to the beneficiary.
    if (_erc20Balance != 0) _v1Token.transfer(_beneficiary, _erc20Balance);
    ```

    _External references:_

    * [`transfer`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-transfer-address-uint256-)

8.  Transfer the unclaimed token balance held by this contract to the specified beneficiary.

    ```
    // Transfer unclaimed v1 tokens to the beneficiary.
    if (_unclaimedBalance != 0)
      ticketBooth.transfer(address(this), _v1ProjectId, _unclaimedBalance, _beneficiary);
    ```

    _Internal references:_

    * [`ticketBooth`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/ticketbooth.md)

    _External references:_

    * [`transfer`](https://github.com/jbx-protocol/juice-contracts-v1/blob/a91b55e8d264267c338b089aa9a45b29fd8e8f13/contracts/interfaces/ITicketBooth.sol#L145)


3.  Emit a `ReleaseV1Tokens` event with the relevant parameters.

    ```
    emit ReleaseV1Tokens(_v1ProjectId, _beneficiary, _unclaimedBalance, _erc20Balance, msg.sender);
    ```

    _Event references:_

    * [`ReleaseV1Tokens`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/events/releasev1tokens.md)


</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  Allows a project owner to gain custody of all the v1 tokens that have been paid, after they have finalized the ability for v1 token holders to convert to v2 tokens via this contract.

  @param _v1ProjectId The ID of the v1 project whose tokens are being released.
  @param _beneficiary The address that the tokens are being sent to.
*/
function releaseV1TokensOf(uint256 _v1ProjectId, address _beneficiary) external override {
  // Make sure only the v1 project owner can retrieve the tokens.
  if (msg.sender != ticketBooth.projects().ownerOf(_v1ProjectId)) revert NOT_ALLOWED();

  // Make sure v1 token conversion has not yet finalized.
  if (finalized[_v1ProjectId]) revert MIGRATION_TERMINATED();

  // Get a reference to the v1 project's ERC20 tokens.
  ITickets _v1Token = ticketBooth.ticketsOf(_v1ProjectId);

  // Get a reference to this terminal's unclaimed balance.
  uint256 _unclaimedBalance = ticketBooth.stakedBalanceOf(address(this), _v1ProjectId);

  // Get a reference to this terminal's ERC20 balance.
  uint256 _erc20Balance = _v1Token == ITickets(address(0))
    ? 0
    : _v1Token.balanceOf(address(this));

  // Store the finalized state.
  finalized[_v1ProjectId] = true;

  // Transfer ERC20 v1 tokens to the beneficiary.
  if (_erc20Balance != 0) _v1Token.transfer(_beneficiary, _erc20Balance);

  // Transfer unclaimed v1 tokens to the beneficiary.
  if (_unclaimedBalance != 0)
    ticketBooth.transfer(address(this), _v1ProjectId, _unclaimedBalance, _beneficiary);

  emit ReleaseV1Tokens(_v1ProjectId, _beneficiary, _unclaimedBalance, _erc20Balance, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| **`NOT_ALLOWED`** | Thrown if an address other than the v1 project's owner is attempting to release the v1 token. |
| **`MIGRATION_TERMINATED`** | Thrown if the specified v1 project has already been finalized. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                          | Data                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ReleaseV1Tokens`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/events/releasev1tokens.md)                                         | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed beneficiary</code></li><li><code>uint256 unclaimedBalance</code></li><li><code>uint256 claimedBalance</code></li><li><code>address caller</code></li></ul>        |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
