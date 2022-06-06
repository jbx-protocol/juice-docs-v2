# _packedDistributionLimitDataOf

:::caution
This page describes v2 contracts used before [a bug was identified](/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Contract: [`JBController`](/protocol/api/contracts/or-controllers/jbcontroller/README.md)​‌

**Data regarding the distribution limit of a project during a configuration.**

_bits 0-247: The amount of token that a project can distribute per funding cycle._

_bits 248-255: The currency of amount that a project can distribute._

#### Definition

```
/**
  @notice
  Data regarding the distribution limit of a project during a configuration.

  @dev
  bits 0-231: The amount of token that a project can distribute per funding cycle.

  @dev
  bits 232-255: The currency of amount that a project can distribute.

  _projectId The ID of the project to get the packed distribution limit data of.
  _configuration The configuration during which the packed distribution limit data applies.
  _terminal The terminal from which distributions are being limited.
  _token The token for which distributions are being limited.
*/
mapping(uint256 => mapping(uint256 => mapping(IJBPaymentTerminal => mapping(address => uint256))))
  private _packedDistributionLimitDataOf;
```

* Arguments:
  * `_projectId` is the ID of the project to get the packed distribution limit data of.
  * `_configuration` is the configuration during which the packed distribution limit data applies.
  * `_terminal` is the [`IJBPaymentTerminal`](/protocol/api/interfaces/ijbpaymentterminal.md) from which distributions are being limited.
  * `_token` is the token for which distributions are being limited.
* The resulting view function is private to this contract.
