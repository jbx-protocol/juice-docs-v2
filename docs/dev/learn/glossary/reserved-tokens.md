# Reserved tokens

#### What everyone needs to know

* Reserved tokens allow a project to guarantee that a percentage of all newly minted tokens from payments will be reserved to a preprogrammed list of [`JBSplit`](/dev/api/data-structures/jbsplit.md)s. This percentage is referred to as the *reserved rate*.
* A project's reserved rate and reserved token splits can be reconfigured each funding cycle.
* Reserved token splits can be routed to addresses, the owners of other Juicebox projects, to contracts that adhere to the [`IJBSplitAllocator`](/dev/api/interfaces/ijbsplitallocator.md) interface, or to the address that sent the [`JBController.distributeReservedTokensOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/distributereservedtokensof.md) transaction.
* Reserved tokens do not get minted automatically when a new payment is received. Instead, they must be explicitly distributed during the funding cycle which contains the reserved rate and splits that should be applied. If a funding cycle's reserved rate or splits change before the allocation is distributed, the new values will apply.

#### What you'll want to know if you're building

* A reserved rate can be specified in a funding cycle through the [`JBController.launchProjectFor(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/launchprojectfor.md) or [`JBController.reconfigureFundingCyclesOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/reconfigurefundingcyclesof.md) transactions.
* Distributing currently allocated reserved tokens is done by calling [`JBController.distributeReservedTokensOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/distributereservedtokensof.md). Doing so will distribute the allocation according to the current funding cycle's reserved rate.
