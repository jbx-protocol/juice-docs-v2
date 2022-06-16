# _packedOverflowAllowanceDataOf

Contract: [`JBController`](/dev/api/contracts/or-controllers/jbcontroller/README.md)​‌

**Data regarding the overflow allowance of a project during a configuration.**

_bits 0-247: The amount of overflow that a project is allowed to tap into on-demand throughout the configuration._

_bits 248-255: The currency of the amount of overflow that a project is allowed to tap._

#### Definition

```
/**
  @notice
  Data regarding the overflow allowance of a project during a configuration.

  @dev
  bits 0-231: The amount of overflow that a project is allowed to tap into on-demand throughout the configuration.

  @dev
  bits 232-255: The currency of the amount of overflow that a project is allowed to tap.

  _projectId The ID of the project to get the packed overflow allowance data of.
  _configuration The configuration during which the packed overflow allowance data applies.
  _terminal The terminal managing the overflow.
  _token The token for which overflow is being allowed.
*/
mapping(uint256 => mapping(uint256 => mapping(IJBPaymentTerminal =>  mapping(address => uint256))))
  internal _packedOverflowAllowanceDataOf;
```

* Arguments:
  * `_projectId` is the ID of the project to get the packed overflow allowance data of.
  * `_configuration` is the configuration during which the packed overflow allowance data applies.
  * `_terminal` is the [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) managing the overflow.
  * `_token` is the token for which overflow is being allowed.
* The resulting function is internal to this contract and its inheriters. 
