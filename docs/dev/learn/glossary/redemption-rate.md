# Redemption rate

#### What everyone needs to know

* The redemption rate determines what proportion of treasury assets can be reclaimed by a token holder by redeeming their tokens.
* By default, all treasury assets that are considered overflow can be reclaimed by token holders. This can be modified using [data source](/dev/learn/glossary/data-source.md) extensions.
* A project's redemption rate and extensions can be reconfigured each funding cycle.
* A redemption rate of 100% is linear, meaning a holder with 1% of the token supply can redeem all of their tokens for 1% of available treasury assets.
* A redemption rate of `x`% where `x` < 100% will leave some assets in the treasury to share between those who wait longer to redeem. The smaller the `x`, the fewer assets can be reclaimed.
* A project can set a different redemption rate that takes effect only when the project's current funding cycle has an active [ballot](ballot.md). 

#### What you'll want to know if you're building

* A redemption rate can be specified in a funding cycle through the [`JBController.launchProjectFor(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/launchprojectfor.md) or [`JBController.reconfigureFundingCyclesOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/reconfigurefundingcyclesof.md) transactions.
* A ballot redemption rate can be specified in a funding cycle through the [`JBController.launchProjectFor(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/launchprojectfor.md) or [`JBController.reconfigureFundingCyclesOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/reconfigurefundingcyclesof.md) transactions, which will override the standard redemption rate if there is currently a [reconfiguration ballot active](/dev/learn/glossary/ballot.md).
