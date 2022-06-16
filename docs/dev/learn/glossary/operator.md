# Operator

#### What everyone needs to know

* An operator is an address that has been given permission to take one or more actions on another address's behalf.
* Several functions are only available to a project's owner, or to an operator address that the project's owner has set.
* Operator permissions are stored and managed in the [`JBOperatorStore`](/dev/api/contracts/jboperatorstore/README.md), where they can be added or revoked at any time by the address being operated on behalf of.
* Operator permissions are expressed in terms of indexes defined in [`JBOperations`](/dev/api/libraries/jboperations.md).
* Operator permissions apply to a specific domain namespace, which is used in the Juicebox ecosystem to allow addresses to give permissions that only apply to a specific project (where the domain is the project's ID). A domain of 0 is a wildcard domain, giving an operator access to an action across all domains.

#### What you'll want to know if you're building

* All permission indexes can be found in [`JBOperations`](/dev/api/libraries/jboperations.md).
* Any address can give an operator permissions to take one or more actions on its behalf by sending a transaction to [`JBOperatorStore.setOperator(...)`](/dev/api/contracts/jboperatorstore/events/setoperator.md). To set multiple operators in the same transaction, use [`JBOperatorStore.setOperators(...)`](/dev/api/contracts/jboperatorstore/write/setoperators.md).
* Access can be revoked from an operator through the same operations as above by sending  an array of permissions that does not include those you wish to revoke.
* Permission for each operation is stored in a bit within an `uint256`. If the bit is 1, the permission is enabled for the particular operator within the particular domain. Otherwise it is disabled.
* [`JBOperatorStore.hasPermission(...)`](/dev/api/contracts/jboperatorstore/read/haspermission.md) and [`JBOperatorStore.hasPermissions(...)`](/dev/api/contracts/jboperatorstore/read/haspermissions.md) can be used to check if an operator has a particular permission.

#### Operatable functionality

For each project, the following functions can only be accessed by either the address that owns the project's NFT or by operator addresses explicitly allowed by the address that owns the project's NFT. Operators are only valid in the context of a particular owner – if the NFT changes hands, the operators for the project must be set again by the new owner.

An address can set operators for its project with [`JBOperatorStore.setOperator(...)`](/dev/api/contracts/jboperatorstore/write/setoperator.md), using the indexes from the [`JBOperations`](/dev/api/libraries/jboperations.md) library. An Operator's permissions depend on the specific parameters the admin allows them. Each of the following functions can be called by the admin, and also by any operator that has been granted permission to call the function by the admin.

* [`JBController.launchFundingCyclesFor(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/launchfundingcyclesfor.md)
* [`JBController.reconfigureFundingCyclesOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/reconfigurefundingcyclesof.md)
* [`JBController.mintTokensOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/minttokensof.md)
* [`JBController.issueTokenFor(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/issuetokenfor.md)
* [`JBController.changeTokenOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/changetokenof.md)
* [`JBController.migrate(...)`](/dev/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/migrate.md)
* [`JBPayoutRedemptionPaymentTerminal.useAllowanceOf(...)`](/dev/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/useallowanceof.md)
* [`JBPayoutRedemptionPaymentTerminal.migrate(...)`](/dev/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/migrate.md)
* [`JBPayoutRedemptionPaymentTerminal.processFees(...)`](/dev/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/processfees.md)
* [`JBProjects.setMetadataOf(...)`](/dev/api/contracts/jbprojects/write/setmetadataof.md)
* [`JBSplitsStore.set(...)`](/dev/api/contracts/jbsplitsstore/write/set.md)
* [`JBTokenStore.shouldRequireClaimingFor(...)`](/dev/api/contracts/jbtokenstore/write/shouldrequireclaimingfor.md)
* [`JBDirectory.setControllerOf(...)`](/dev/api/contracts/jbdirectory/write/setcontrollerof.md)
* [`JBDirectory.setTerminalsOf(...)`](/dev/api/contracts/jbdirectory/write/setterminalsof.md)
* [`JBDirectory.setPrimaryTerminalOf(...)`](/dev/api/contracts/jbdirectory/write/setprimaryterminalof.md)

The following transactions can be used by token holders or operator addresses explicitly allowed by the address that owns the tokens. If the tokens change hands, the operators must be set again by the new holder.

* [`JBController.burnTokensOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/burntokensof.md)
* [`JBPayoutRedemptionPaymentTerminal.redeemTokensOf(...)`](/dev/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/redeemtokensof.md)
* [`JBTokenStore.claimFor(...)`](/dev/api/contracts/jbtokenstore/write/claimfor.md)
* [`JBTokenStore.transferFrom(...)`](/dev/api/contracts/jbtokenstore/write/transferfrom.md)
