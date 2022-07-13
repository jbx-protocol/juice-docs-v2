# _pay

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows a v1 project token holder to pay into this terminal to get commensurate about of its v2 token.**

#### Definition

```
function _pay(
  uint256 _amount,
  address _payer,
  uint256 _projectId,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string memory _memo,
  bytes memory _metadata
) private returns (uint256 beneficiaryTokenCount) { ... }
```

* Arguments:
  * `_projectId` is the ID of the v2 project to pay towards.
  * `_amount` is te amount of v1 project tokens being paid, as a fixed point number with the same amount of decimals as this terminal.
  * `_token` is the token being paid. This terminal ignores this property since it only manages v1 tokens preset by the project being paid.
  * `_beneficiary` is the address to mint v2 project tokens for.
  * `_minReturnedTokens` is the minimum number of v2 project tokens expected in return, as a fixed point number with 18 decimals.
  * `_preferClaimedTokens` is a flag indicating whether the request prefers to mint v2 project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  * `_memo` is memo to pass along to the emitted event. 
  * `_metadata` are bytes to send along to the data source, delegate, and emitted event, if provided. This terminal ignores this property because there's no data source.
* The function is private to this contract.
* The function returns the number of v2 tokens minted for the beneficiary, as a fixed point number with 18 decimals.

#### Body

1.  Get a reference to the v1 project ID that has been set for the v2 project being paid.

    ```
    // Get the v1 project for the v2 project being paid.
    uint256 _v1ProjectId = v1ProjectIdOf[_projectId];
    ```

    _Internal references:_

    * [`v1ProjectIdOf`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/v1projectidof.md)

2.  Make sure there is a v1 project ID set.

    ```
    // Make sure the v1 project has been set.
    if (_v1ProjectId == 0) revert V1_PROJECT_NOT_SET();
    ```

3.  Get a reference to the v1 project's ERC20 token, if one has been issued.

    ```
    // Get a reference to the v1 project's ERC20 tokens.
    ITickets _v1Token = ticketBooth.ticketsOf(_v1ProjectId);
    ```

    _Internal references:_

    * [`ticketBooth`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/ticketbooth.md)

    _External references:_
    
    * [`ticketsOf`](https://github.com/jbx-protocol/juice-contracts-v1/blob/a91b55e8d264267c338b089aa9a45b29fd8e8f13/contracts/interfaces/ITicketBooth.sol#L69)


4.  The following scoped block is a bit of a hack to prevent a "Stack too deep" error. Define a few variables outside of the scope that'll be set within the scope but later referenced again outside.

    ```
    // Define variables that will be needed outside the scoped section below.
    // Keep a reference to the amount of v2 tokens to mint from the message sender's v1 ERC20 balance.
    uint256 _tokensToMintFromERC20s;

    // Scoped section prevents stack too deep. `_unclaimedBalance` and `_erc20Balance` only used within scope.
    { ... }
    ```

    1.  Get a reference to the amount of unclaimed v1 tokens the message sender has in the contract.

        ```
        // Get a reference to the migrator's unclaimed balance.
        uint256 _unclaimedBalance = ticketBooth.stakedBalanceOf(msg.sender, _v1ProjectId);
        ```

        _Internal references:_

        * [`ticketBooth`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/ticketbooth.md)

        _External references:_
      
        * [`stakedBalanceOf`](https://github.com/jbx-protocol/juice-contracts-v1/blob/a91b55e8d264267c338b089aa9a45b29fd8e8f13/contracts/interfaces/ITicketBooth.sol#L84)

    2.  Get a reference to the amount of ERC20 v1 tokens the message sender has. If there's no ERC20, the balance is 0. 

        ```
        // Get a reference to the migrator's ERC20 balance.
        uint256 _erc20Balance = _v1Token == ITickets(address(0)) ? 0 : _v1Token.balanceOf(msg.sender);
        ```

        _External references:_
      
        * [`balanceOf`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-balanceOf-address-)

    3.  Make sure the message sender has enough of a balance between their v1 unclaimed tokens and v1 ERC20 tokens to cover the amount being exchanged for v2 tokens. 

        ```
        // There must be enough v1 tokens to migrate.
        if (_amount > _erc20Balance + _unclaimedBalance) revert INSUFFICIENT_FUNDS();
        ```

    4.  Calculate how many v1 project ERC20s will be exchanged for v2 tokens. If a project owner has both unclaimed tokens and ERC20 tokens, adhere to the claimed token preference to determine whether to prioritize exchanging one over the other. 

        ```
        // If there's no ERC20 balance, theres no tokens to mint as a result of the ERC20 balance.
        if (_erc20Balance == 0)
          _tokensToMintFromERC20s = 0;
          // If prefer claimed tokens, exchange ERC20 tokens before exchanging unclaimed tokens.
        else if (_preferClaimedTokens)
          _tokensToMintFromERC20s = _erc20Balance < _amount ? _erc20Balance : _amount;
          // Otherwise, exchange unclaimed tokens before ERC20 tokens.
        else _tokensToMintFromERC20s = _unclaimedBalance < _amount ? _amount - _unclaimedBalance : 0;
        ```

4.  Get a reference to the amount of v2 tokens to mint from the message sender's v1 unclaimed token balance, which is the total amount to exchange minus the amount of ERC20's to exchange.

    ```
    // The amount of unclaimed tokens to migrate.
    uint256 _tokensToMintFromUnclaimedBalance = _amount - _tokensToMintFromERC20s;
    ```

5.  If needed, transfer ERC20's from the message sender to this contract. This requires an allowance for this contract to transfer tokens on the message sender's behalf.

    ```
    // Transfer v1 ERC20 tokens to this terminal from the msg sender if needed.
    if (_tokensToMintFromERC20s != 0)
      IERC20(_v1Token).transferFrom(msg.sender, address(this), _tokensToMintFromERC20s);
    ```

    _External references:_

    * [`transferFrom`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-transferFrom-address-address-uint256-)

6.  If needed, transfer unclaimed tokens from the message sender to this contract. This requires operator permissions for this contract to transfer unclaimed tokens on the message sender's behalf.

    ```
    // Transfer v1 unclaimed tokens to this terminal from the msg sender if needed.
    if (_tokensToMintFromUnclaimedBalance != 0)
      ticketBooth.transfer(
        msg.sender,
        _v1ProjectId,
        _tokensToMintFromUnclaimedBalance,
        address(this)
      );
    ```

    _Internal references:_

    * [`ticketBooth`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/ticketbooth.md)

    _External references:_

    * [`transfer`](https://github.com/jbx-protocol/juice-contracts-v1/blob/a91b55e8d264267c338b089aa9a45b29fd8e8f13/contracts/interfaces/ITicketBooth.sol#L145)

7.  Mint v2 tokens for the specified beneficiary. 

    ```
    // Mint the v2 tokens for the beneficary.
    beneficiaryTokenCount = IJBController(directory.controllerOf(_projectId)).mintTokensOf(
      _projectId,
      _amount,
      _beneficiary,
      '',
      _preferClaimedTokens,
      false
    );
    ```

    _Internal references:_

    * [`directory`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/directory.md)

    _External references:_

    * [`controllerOf`](/dev/api/contracts/jbdirectory/properties/controllerof.md)
    * [`mintTokensOf`](/dev/api/contracts/or-controllers/jbcontroller/write/minttokensof.md)

8.  Make sure the beneficiary is getting the same amount of v2 tokens as v1 tokens were exchanged, and that the amount is at least as much as expected.

    ```
    // Make sure the token amount is the same as the v1 token amount and is at least what is expected.
    if (beneficiaryTokenCount != _amount || beneficiaryTokenCount < _minReturnedTokens)
      revert UNEXPECTED_AMOUNT();
    ```

3.  Emit a `Pay` event with the relevant parameters.

    ```
    emit Pay(
      _projectId,
      msg.sender,
      _beneficiary,
      _amount,
      beneficiaryTokenCount,
      _memo,
      msg.sender
    );
    ```

    _Event references:_

    * [`Pay`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/events/pay.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Allows a v1 project token holder to pay into this terminal to get commensurate about of its v2 token.

  @param _projectId The ID of the v2 project to pay towards.
  @param _amount The amount of v1 project tokens being paid, as a fixed point number with the same amount of decimals as this terminal.
  @param _beneficiary The address to mint tokens for.
  @param _minReturnedTokens The minimum number of v2 project tokens expected in return, as a fixed point number with the same amount of decimals as this terminal.
  @param _preferClaimedTokens A flag indicating whether the request prefers to mint v2 project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  @param _memo A memo to pass along to the emitted event. 

  @return beneficiaryTokenCount The number of v2 tokens minted for the beneficiary, as a fixed point number with 18 decimals.
*/
function _pay(
  uint256 _projectId,
  uint256 _amount,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string calldata _memo
) internal returns (uint256 beneficiaryTokenCount) {
  // Get the v1 project for the v2 project being paid.
  uint256 _v1ProjectId = v1ProjectIdOf[_projectId];

  // Make sure the v1 project has been set.
  if (_v1ProjectId == 0) revert V1_PROJECT_NOT_SET();

  // Get a reference to the v1 project's ERC20 tokens.
  ITickets _v1Token = ticketBooth.ticketsOf(_v1ProjectId);

  // Define variables that will be needed outside the scoped section below.
  // Keep a reference to the amount of v2 tokens to mint from an ERC20 balance.
  uint256 _tokensToMintFromERC20s;

  {
    // Get a reference to the migrator's unclaimed balance.
    uint256 _unclaimedBalance = ticketBooth.stakedBalanceOf(msg.sender, _v1ProjectId);

    // Get a reference to the migrator's ERC20 balance.
    uint256 _erc20Balance = _v1Token == ITickets(address(0)) ? 0 : _v1Token.balanceOf(msg.sender);

    // There must be enough v1 tokens to migrate.
    if (_amount > _erc20Balance + _unclaimedBalance) revert INSUFFICIENT_FUNDS();

    // If there's no ERC20 balance, theres no tokens to mint as a result of the ERC20 balance.
    if (_erc20Balance == 0)
      _tokensToMintFromERC20s = 0;
      // If prefer claimed tokens, exchange ERC20 tokens before exchanging unclaimed tokens.
    else if (_preferClaimedTokens)
      _tokensToMintFromERC20s = _erc20Balance < _amount ? _erc20Balance : _amount;
      // Otherwise, exchange unclaimed tokens before ERC20 tokens.
    else _tokensToMintFromERC20s = _unclaimedBalance < _amount ? _amount - _unclaimedBalance : 0;
  }

  // The amount of unclaimed tokens to migrate.
  uint256 _tokensToMintFromUnclaimedBalance = _amount - _tokensToMintFromERC20s;

  // Transfer v1 ERC20 tokens to this terminal from the msg sender if needed.
  if (_tokensToMintFromERC20s != 0)
    IERC20(_v1Token).transferFrom(msg.sender, address(this), _tokensToMintFromERC20s);

  // Transfer v1 unclaimed tokens to this terminal from the msg sender if needed.
  if (_tokensToMintFromUnclaimedBalance != 0)
    ticketBooth.transfer(
      msg.sender,
      _v1ProjectId,
      _tokensToMintFromUnclaimedBalance,
      address(this)
    );

  // Mint the v2 tokens for the beneficary.
  beneficiaryTokenCount = IJBController(directory.controllerOf(_projectId)).mintTokensOf(
    _projectId,
    _amount,
    _beneficiary,
    '',
    _preferClaimedTokens,
    false
  );

  // Make sure the token amount is the same as the v1 token amount and is at least what is expected.
  if (beneficiaryTokenCount != _amount || beneficiaryTokenCount < _minReturnedTokens)
    revert UNEXPECTED_AMOUNT();

  emit Pay(
    _projectId,
    msg.sender,
    _beneficiary,
    _amount,
    beneficiaryTokenCount,
    _memo,
    msg.sender
  );
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                    | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| **`V1_PROJECT_NOT_SET`** | Thrown if the v2 project being paid hasn't set its v1 project yet. |
| **`INSUFFICIENT_FUNDS`** | Thrown if the message sender doesn't have a sufficient balance of v1 tokens to pay. |
| **`UNEXPECTED_AMOUNT`** | Thrown if the amount of v2 tokens minted for the beneficiary isn't expected. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                          | Data                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Pay`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/events/pay.md)                                         | <ul><li><code>uint256 indexed projectId</code></li><li><code>address payer</code></li><li><code>address beneficiary</code></li><li><code>uint256 amount</code></li><li><code>uint256 beneficiaryTokenCount</code></li><li><code>string memo</code></li><li><code>address caller</code></li></ul>        |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
