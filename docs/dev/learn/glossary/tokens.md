# Tokens

#### What everyone needs to know

* By default, all payments that come in to a Juicebox project mint tokens. These tokens are distributed to a beneficiary specified by the payer, and to any addresses specified in the project's reserved token list. The amount of tokens minted depends on the amount paid and the `weight` (i.e. exchange rate) of the project's current funding cycle. Projects can override or extended this default behavior using [data sources](/dev/learn/glossary/data-source.md).
* By default, the protocol allocates tokens to recipients using an internal accounting mechanism in [`JBTokenStore`](/dev/api/contracts/jbtokenstore/README.md). These are fungible but do not conform to the ERC-20 standard, and as such cannot be composed with ecosystem ERC-20/ERC-721 marketplaces like AMMs and Opensea. Their balances can be used for voting on various platforms.
* Projects can issue their own ERC-20 token directly from the protocol to use as its token. Projects can also bring their own token as long as it conforms to the [`IJBToken`](/dev/api/interfaces/ijbtoken.md) interface and uses 18 decimal fixed point accounting. This makes it possible to use ERC-1155's or custom tokens.
* Once a project has issued a token, token holders can export tokens from the protocol's internal accounting mechanism in [`JBTokenStore`](/dev/api/contracts/jbtokenstore/README.md) to their wallet to use across Web3. A project's owner can also force project tokens to be issued directly to the exported version. This bypasses the internal accounting mechanism, but slightly increases gas costs for transactions that requires tokens to be minted.
* By default, tokens can be [redeemed](/dev/learn/glossary/redemption-rate.md) by holders to reclaim a portion of what's in the project's [overflow](/dev/learn/glossary/overflow.md). The amount of overflow claimable is determined by the [`redemptionRate`](/dev/learn/glossary/redemption-rate.md) of the project's current funding cycle. Projects can override or extend this default behavior. Redeeming tokens burns them, shrinking the total supply.
* A project owner can mint and distribute more of the project's tokens on demand. This behavior must be explicitly allowed on a per-funding cycle basis.
* A project can use its tokens however it wishes. It can be purely ceremonial, used for governance, used for airdrops, or whatever.

#### What you'll want to know if you're building

* Tokens can be minted on-demand by project owners or their operators by calling [`JBController.mintTokensOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/minttokensof.md). The ability to do so must be explicitly turned on via a funding cycle configuration metadata parameter.
* Tokens can be burned on-demand by holders by calling [`JBController.burnTokensOf(...)`](/dev/api/contracts/or-controllers/jbcontroller/write/burntokensof.md). The ability to do so can be turned off via a funding cycle configuration metadata parameter.
