---
sidebar_position: 4
---

# Risks 

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

The following are risks that everyone should be aware of before interacting with the protocol. The protocol's design exposes these risks in consequence to its normal operating procedures. 

#### Smart contract risk
<p>
The protocol runs entirely on public smart contracts explained in detail throughout these docs. The Juicebox protocol is public infrastructure running well-known code, all consequences from interacting with networks running the protocol are borne by the entities who sign each transaction. The protocol works according to the specifications outlined in these docs to the extent the code is written and deployed correctly, which is a collective responsibility and not guarenteed. There is a major risk that this is not the case. Please do your own research.
</p>

#### Project owner risk
Ownership of each project on the Juicebox protocol belongs to the address possessing a [`JBProjects`](/dev/api/contracts/jbprojects) NFT with a unique token ID, which also serves as the project's ID. The address that owns this token can reconfigure a project's funding cycles, which empower it to manipulate a project's finances both productively and maliciously.

   * The following values can be reconfigured by a project's owner on a per-funding cycle basis:

     #### Setting a distribution limit and payout splits
     
     With a distribution limit of zero, all treasury funds belong to the community. Token holders can redeem their tokens to reclaim their share of the treasury at any time, according to the current funding cycle's redemption bonding curve rate.

     A non-zero distribution limit allocates a portion of the treasury for distribution to payout splits.

     A project owner can also change the split allocations that are bound by the funding cycle's distribution limit at any time, unless the split was explicitly locked until a specified date during its creation.
     
     🟢 <strong>Used productively</strong> this can be used to withdraw funds to a community safe, distribute funds to contributors, channel funds to other projects operating treasuries on the protocol, and more.<br/>
     
     🔴 <strong>Used maliciously</strong> this can be used to rug the entire treasury into an arbitrary wallet.<br/><br/>

     #### Setting an overflow allowance
     
     With an overflow allowance of zero, all treasury funds belonging to the community – funds in excess of the distribution limit – cannot be accessed by the project owner. The only way funds can leave the treasury is through token redemptions. 

     A non-zero overflow allowance gives the project owner access to a portion of the community's funds for on-demand distribution to arbitrary addresses.
     
     🟢 <strong>Used productively</strong> this can be used to manage discretionary spending.<br/>

     🔴 <strong>Used maliciously</strong> this can be used to rug the entire treasury into an arbitrary wallet.<br/><br/>

     #### Allowing token minting

     While token minting is not allowed, the only way for new project tokens to be minted and distributed is for the project to receive new funds into its treasury. Tokens will get minted in accordance to the current funding cycle's values. 

     If token minting is allowed, an arbitrary number of tokens can be minted and distributed by the project owner, diluting the redemption value of all outstanding tokens.
     
     🟢 <strong>Used productively</strong> this can be used to premint tokens to members, or satisfy other agreed upon inflationary treasury strategies.<br/>

     🔴 <strong>Used maliciously</strong> this can be used to mint extra tokens and redeem them to reclaim treasury funds into an arbitrary wallet, rugging the entire treasury.<br/><br/>

     #### Setting the funding cycle's weight 
     
     A funding cycle's weight determines how many tokens will be minted and distributed when a treasury receives funds. By default, a funding cycle has the same weight as the cycle that preceded it after applying the preceding cycle's discount rate.  
     
     🟢 <strong>Used productively</strong> this can be used to manage how tokens are issued over time.<br/>

     🔴 <strong>Used maliciously</strong> this can be used to manipulate token issuance, and rug the entire treasury into an arbitrary wallet.<br/><br/>

     #### Allowing changing of project tokens

     While changing tokens isn't allowed, the current project token will be used to satisfy redemptions and new issuance for the duration of the funding cycle. 

     If changing tokens is allowed, a new token can replace the role of a previous token for new issuance and redemptions. 
     
     🟢 <strong>Used productively</strong> this can be used to allow projects to augment a previous token strategy with a Juicebox treasury, detach a token from a Juicebox treasury, or create custom token mechanisms associated with its Juicebox treasury.<br/>

     🔴 <strong>Used maliciously</strong> this can be used to cut off a community of token holders from their treasury while using the redemption of a new token to reclaim treasury funds into an arbitrary wallet.<br/><br/>

     #### Pause payments, pause distributions, pause redemptions, pause burn

     While each functionality isn't paused, the standard functionality will be accessible.

     If payments are paused to a project, the protocol will reject any inbound payments. If disitributions are paused for a project, the protocol will reject any request to distribute funds from the treasury. If redemptions are paused, the protocol will reject any request to redeem tokens. If burning is paused, the protocol will reject any request by token holders to burn their tokens. 

     🟢 <strong>Used productively</strong> this can be used to allow projects to creatively tune how its treasury can be accessed.<br/>

     🔴 <strong>Used maliciously</strong> this can be used to cut off a community of token holders from standard treasury functionality.<br/><br/>

     #### Custom treasury extensions
    
     If a project's funding cycles have no data source, delegate, split allocator, or ballot contracts attached, the consequences of each interaction with the protocol are predictable, consistent, and specified within these docs.

     If a project has attached a data source, delegate, split allocator, or ballot contract to a funding cycle, the protocol will access information from them and call functionality within them at specific moments during the execution of various transactions within the regular operation of the protocol.
     
     🟢 <strong>Used productively</strong> this can be used to customize what happens when a treasury receives funds, under what conditions funds can leave a treasury, and under what conditions reconfigurations can take effect.<br/>

     🔴 <strong>Used maliciously</strong> this can be used to mint excess tokens, rug the entire treasury into an arbitrary wallet, trick users into compromising their individual wallets, create arbitrary unwanted and extractive behavior, or introduce smart contract bugs into otherwise productive extension designs. Do not interact with a project that is using an untrusted extension.<br/><br/>

     #### Add and remove payment terminals

     While setting payment terminals isn't allowed, a project can only receive funds and offer token redemptions from within the payment terminals it has already attached. 

     If setting payment terminals is allowed, projects can begin managing inflows and outflows of funds from new contracts, or remove current contracts where they are doing so.
     
     🟢 <strong>Used productively</strong> this can be used to begin accepting new tokens into a treasury, or creating totally custom treasury behavior.<br/>

     🔴 <strong>Used maliciously</strong> this can be used to cut off a community of token holders from their treasury, create arbitrary unwanted and extractive behavior, or introduce smart contract bugs. Do not interact with a projects using untrusted payment terminals.<br/><br/>

     #### Setting the controller

     While setting the controller isn't allowed, a project can only operate according to the rules of its currently set controller. 

     If setting the controller is allowed, projects can bring new rules according to which it'll operate.
     
     🟢 <strong>Used productively</strong> this can be used to creating totally custom treasury behavior.<br/>

     🔴 <strong>Used maliciously</strong> this can be used to cut off a community of token holders from their treasury, create arbitrary unwanted and extractive behavior, or introduce smart contract bugs. Do not interact with a projects using an untrusted controller.<br/><br/>

     #### Migrating funds between terminals

     While migrating funds between terminals isn't allowed, a project's funds in a terminal cannot be migrated to another terminal which may have alternate constraints. 

     If migrating funds between terminals is allowed, a project can move its funds from one terminal to another.
     
     🟢 <strong>Used productively</strong> this can be used to move a treasury into a totally custom environment, or to trusted upgraded versions of the protocol.<br/>

     🔴 <strong>Used maliciously</strong> this can be used to cut off a community of token holders from their treasury, create arbitrary unwanted and extractive behavior, or introduce smart contract bugs.<br/><br/>

#### Undistributed reserved rate risk
If a project enters a funding cycle with a different reserved rate than the preceding cycle while still having outstanding reserved tokens to distribute, the quantity of distributable tokens will change to reflect the new reserved rate.
 
   For example, if in FC#1 a project has a reserved rate of 10% and 9,000 tokens are minted, 1,000 tokens (10% of the total) are reserved to be distributed to the configured reserved token receivers. If FC#2 with a reserved rate of 50% begins without the reserved tokens having been distributed, there will now be 9,000 tokens (50% of the total) reserved to be distributed to the configured reserved token receivers. 

   Distributing reserved tokens is a public action – anyone can send a transaction to do this.

#### Price oracle risk

The protocol uses price oracles to normalize prices throughout the its standard operations. These oracles are smart contract mechanisms external to the core Juicebox protocol. Projects using multiple currencies for certain functionality bare the risk of these external oracle systems misreporting price values. 

#### Large number risk

Under certain circumstances, token holders attempting to burn token amounts greater than (2^256 / 2) - 1, or 57896044618658097711785492504343953926634992332820282019728792003956564819968, will have their transactions reverted due to a arithmetic underflow.

