---
sidebar_position: 1
---

# Overview

The Juicebox protocol is a framework for funding and operating projects openly on Ethereum. It lets you:

#### Deploy an NFT that represents ownership over a project
<p>
  Whichever address owns this NFT has administrative privileges to configure treasury parameters within the Juicebox ecosystem.
  </p>
<p>
  <a href="/dev/learn/glossary/project">Learn more about projects</a>
  </p>
  

#### Configure funding cycles for a project
<p>
  Funding cycles define contractual constraints according to which the project will operate.
  </p>
<p>
  <a href="/dev/learn/glossary/funding-cycle">Learn more about funding cycles</a><br/>
  </p>
<p>
  The following properties can be configured into a funding cycle:
  </p>

<details>

<summary><em>Funding cycle properties</em></summary>

##### Start timestamp
<p>
  The timestamp at which the funding cycle is considered active. Projects can configure the start time of their first funding cycle to be in the future, and can ensure reconfigurations don't take effect before a specified timestamp.
  </p>
  <p>
  Once a funding cycle ends, a new one automatically starts right away. If there's an approved reconfiguration queued to start at this time, it will be used. Otherwise, a copy of the rolled over funding cycle will be used.
  </p>

##### Duration
<p>
  How long each funding cycle lasts (specified in seconds). All funding cycle properties are unchangeable while the cycle is in progress. In other words, any proposed reconfigurations can only take effect during the subsequent cycle.
  </p>
<p>
  If no reconfigurations were submitted by the project owner, or if proposed changes fail the current cycle's <a href="#ballot">ballot</a>, a copy of the latest funding cycle will automatically start once the current one ends.
  </p>
<p>
  A cycle with no duration lasts indefinitely, and reconfigurations can start a new funding cycle with the proposed changes right away.
  </p>

##### Distribution limit
<p>
  The amount of funds that can be distributed out from the project's treasury during a funding cycle. The project owner can pre-program a list of addresses, other Juicebox projects, and contracts that adhere to <a href="/dev/api/interfaces/ijbsplitsallocator.md">IJBSplitsAllocator</a> to split distributions between. Treasury funds in excess of the distribution limit is considered overflow, which can serve as runway or be reclaimed by token holders who redeem their tokens.
</p>
<p>
  Distributing is a public transaction that anyone can call on a project's behalf. The project owner can also include a split that sends a percentage of the distributed funds to the address who executes this transaction.
</p>
<p>
The protocol charges a <a href="#jbx-membership-fee">JBX membership fee</a> on funds withdrawn from the network. There are no fees for distributions to other Juicebox projects.
</p>
<p>
  Distribution limits can be specified in any currency that the <a href="/dev/api/contracts/jbprices"><code>JBPrices</code></a> contract has a price feed for.  
</p>

<!---->

##### Overflow allowance
<p>
  The amount of treasury funds that the project owner can distribute on-demand. 
</p>
<p>
  This allowance does not reset per-funding cycle. Instead, it lasts until the project owner explicitly proposes a reconfiguration with a new allowance.
</p>
<p>
The protocol charges a <a href="#jbx-membership-fee">JBX membership fee</a> on funds withdrawn from the network. 
</p>
<p>
  Overflow allowances can be specified in any currency that the <a href="/dev/api/contracts/jbprices"><code>JBPrices</code></a> contract has a price feed for.  
</p>

<!---->

##### Weight
<p>
  A number used to determine how many project tokens should be minted and transferred when payments are received during the funding cycle. In other words, weight is the exchange rate between the project token and a currency (defined by a <a href="/dev/api/contracts/jbpayoutredemptionpaymentterminal">JBPayoutRedemptionPaymentTerminal</a>) during that funding cycle. Project owners can configure this directly, or allow it to be derived automatically from the previous funding cycle's weight and discount rate.
</p>

<!---->

##### Discount rate
<p>
  The percent to automatically decrease the subsequent cycle's weight from the current cycle's weight.
</p>
<p>
  The discount rate is not applied during funding cycles where the weight is explicitly reconfigured.
</p>
<p>
  <a href="/dev/learn/glossary/discount-rate">Learn more about discount rates</a>
</p>

<!---->

##### Ballot
<p>
  The address of a contract that adheres to <a href="/dev/api/interfaces/ijbfundingcycleballot"><code>IJBFundingCycleBallot</code></a>, which can provide custom criteria that prevents funding cycle reconfigurations from taking effect.
</p>
<p>
  A common implementation is to force reconfigurations to be submitted at least X days before the end of the current funding cycle, giving the community foresight into any misconfigurations or abuses of power before they take effect.
</p>
<p>
  A more complex implementation might include on-chain governance.
</p>
<p>
  <a href="/dev/learn/glossary/ballot">Learn more ballots</a>
</p>

<!---->

##### Reserved rate
<p>
  The percentage of newly minted tokens that a project wishes to withhold for custom distributions. The project owner can pre-program a list of addresses, other Juicebox project owners, and contracts that adhere to <a href="/dev/api/interfaces/ijbsplitsallocator.md">IJBSplitsAllocator</a> to split reserved tokens between.
</p>
<p>
  <a href="/dev/learn/glossary/reserved-tokens">Learn more about reserved rate</a>
</p>

<!---->

##### Redemption rate
<p>
  The percentage of a project's treasury funds that can be reclaimed by community members by redeeming the project's tokens during the funding cycle.
</p>
<p>
  A rate of 100% suggests a linear proportion, meaning X% of treasury overflow can be reclaimed by redeeming X% of the token supply.
</p>
<p>
  <a href="/dev/learn/glossary/redemption-rate">Learn more about redemption rates</a>
</p>

<!---->

##### Ballot redemption rate
<p>
  A project can specify a custom redemption rate that only applies when a proposed reconfiguration is waiting to take effect.
</p>
<p>
  This can be used to automatically allow for more favorable redemption rates during times of potential change.
</p>

<!---->

##### Pause payments, pause distributions, pause redemptions, pause burn
<p>
  Projects can pause various bits of its treasury's functionality on a per-funding cycle basis. These functions are unpaused by default.
</p>

<!---->

##### Allow minting tokens, allow changing tokens, allow setting terminals, allow setting the controller, allow terminal migrations, allow controller migration
<p>
  Projects can allow various bits of treasury functionality on a per-funding cycle basis. These functions are disabled by default.
</p>

<!---->

##### Hold fees
<p>
  By default, JBX membership fees are paid automatically when funds are distributed out of the ecosystem from a project's treasury. During funding cycles configured to hold fees, this fee amount is set aside instead of being immediately processed. Projects can get their held fees returned by adding the same amount of withdrawn funds back to their treasury. Otherwise, JuiceboxDAO or the project can process these held fees at any point to get JBX at the current rate.
</p>
<p>
  This allows a project to withdraw funds and later add them back into their Juicebox treasury without incurring fees.<br/>
</p>
<p>
  This applies to both distributions from the distribution limit and from the overflow allowance.
</p>

<!---->

##### Data source
<p>
  The address of a contract that adheres to <a href="/dev/api/interfaces/ijbfundingcycledatasource"><code>IJBFundingCycleDataSource</code></a>, which can be used to extend or override what happens when the treasury receives funds, and what happens when someone tries to redeem their project tokens.
</p>
<p>
  <a href="/dev/learn/glossary/data-source">Learn more about data sources</a>
</p>

</details>

#### Mint tokens
<p>
  By default, a project starts with 0 tokens and mints them when its treasury receives contributions.<br/>
  A project can mint and distribute tokens on demand if its current funding cycle is configured to allow minting.<br/>
  By default, project tokens are not ERC-20s and thus not compatible with standard market protocols like Uniswap. At any time, you can issue ERC-20s that your token holders can claim. This is optional.
</p>

#### Burn tokens
<p>
  Anyone can burn a project's tokens if the project's current funding cycle isn't configured to paused burning.
</p>

#### Bring-your-own token
<p>
  A project can bring its own token, as long as it adheres to <a href="/dev/api/interfaces/ijbtoken"><code>IJBToken</code></a> and uses fixed point accounting with 18 decimals.<br/>
</p>
<p>
  This allows a project to use ERC-721's, ERC-1155's, or any other custom contract that'll be called upon when the protocol asks to mint or burn tokens.<br/>
</p>
<p>
  A project can change its token during any of its funding cycles that are explicitly configured to allow changes.<br/>
</p>
<p>
  By default, the protocol provides a transaction for projects to deploy <a href="/dev/api/contracts/jbtoken"><code>JBToken</code></a> ERC-20 tokens. 
</p>

#### Splits
<p>
  A project can pre-program token distributions to splits. The destination of a split can be an Ethereum address, the project ID of another project's Juicebox treasury (the split will allow you to configure the beneficiary of that project's tokens that get minted in response to the contribution), to the <code>allocate(...)</code> function of any contract that adheres to <a href="/dev/api/interfaces/ijbsplitallocator"><code>IJBSplitAllocator</code></a>, or to the address that initiated the transaction that distributes tokens to the splits.
</p>
<p>
  <a href="/dev/learn/glossary/splits">Learn more about splits</a><br/>
  <a href="/dev/learn/glossary/split-allocator">Learn more about allocators</a>
</p>

#### JBX membership fee
<p>
  All funds distributed by projects from their treasuries to destinations outside of the Juicebox ecosystem (i.e. distributions that do not go to other Juicebox treasuries) will incure a protocol fee. This fee is sent to the JuiceboxDAO treasury which runs on the Juicebox protocol itself (project ID of 1), triggering the same functionality as a payment directly to JuiceboxDAO (by default, minting JBX for the fee payer according to JuiceboxDAO's current funding cycle configuration) from an external source.<br/>
</p>
<p>
  This fee is adjustable by JuiceboxDAO, with a max value of 5%.<br/>
</p>
<p>
  Any funds sent from one juicebox treasury to another via splits do not incur fees.
</p>

#### Custom treasury strategies
<p>
  Funding cycles can be configured to use an <a href="/dev/api/interfaces/ijbfundingcycledatasource"><code>IJBFundingCycleDataSource</code></a>, <a href="/dev/api/interfaces/ijbpaydelegate"><code>IJBPayDelegate</code></a>, and <a href="/dev/api/interfaces/ijbredemptiondelegate"><code>IJBRedemptionDelegate</code></a> to extend or override the default protocol's behavior that defines what happens when an address tries to make a payment to the project's treasury, and what happens when someone tries to redeem the project tokens during any particular funding cycle.
</p>
<p>
  <a href="/dev/learn/glossary/data-source">Learn more about data sources</a><br/>
  <a href="/dev/learn/glossary/delegate">Learn more about delegates</a>
</p>

#### Accept multiple tokens
<p>
  A project can specify any number of payment terminal contracts where it can receive funds denominated in various tokens. This allows projects to create distinct rules for accepting ETH, any ERC-20, or any asset in general.
</p>
<p>
  Anyone can roll their own contract that adheres to <a href="/dev/api/interfaces/ijbpaymentterminal"><code>IJBPaymentTerminal</code></a> for projects to use, and a project can migrate funds between terminals that use the same token as it wishes.
</p>

#### Forkability and migratability
<p>
  A project can migrate its treasury's controller to any other contract that adheres to <a href="/dev/api/interfaces/ijbcontroller"><code>IJBController</code></a>. This allows a project to evolve into updated or custom treasury dynamics over time as it wishes.
</p>

#### Operators
<p>
  Addresses can specify other addresses that are allowed to operate certain administrative treasury transactions on its behalf.<br/>
</p>
<p>
  <a href="/dev/learn/glossary/operator">Learn more about operators</a>
</p>
