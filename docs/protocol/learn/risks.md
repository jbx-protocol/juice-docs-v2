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

The following are risks that everyone should be aware of before interacting with the protocol. The protocol's design exposes these risks in consequence to its normal operating procedures. Most risks boil down to the trust. 

1. Ownership of each project on the Juicebox protocol belongs to the address possessing a [`JBProjects`](/protocol/api/contracts/jbprojects) NFT with a unique token ID, which also serves as the project's ID. The address that owns this token can reconfigure a project's funding cycles, which empower it to manipulate a project's finances both productively and maliciously.

   The following values can be reconfigured on a per-funding cycle basis:

   * **Setting a distribution limit and payout splits** 
     
     With a distribution limit of zero, all treasury funds belong to the community. Token holders can redeem their tokens to reclaim their share of the treasury at any time, according to the current funding cycle's redemption bonding curve rate.

     A non-zero distribution limit allocates a portion of the treasury for distribution to payout splits.
     
    <Highlight color="#009933"><em><strong>Used productively, this can be used to withdraw funds to a community safe, distribute funds to contributors, channel funds to other projects operating treasuries on the protocol, and more.</strong></em></Highlight><br/><br/>
     
     <Highlight color="#ff3300"><em><strong>Used maliciously, this can be used to rug the entire treasury into an arbitrary wallet.</strong></em></Highlight><br/><br/>

   * **Setting an overflow allowance limit** 
     
     With an overflow allowance of zero, all treasury funds belonging to the community – funds in excess of the distribution limit – can not be accessed by the project owner. The only way funds can leave the treasury is through token redemptions. 

     A non-zero overflow allowance gives the project owner access to a portion of the community's funds for on-demaind distribution to arbitrary addresses.
     
     <Highlight color="#009933"><em><strong>Used productively, this can be used to manage discretionary spending.</strong></em></Highlight><br/><br/>

     <Highlight color="#ff3300"><em><strong>Used maliciously, this can be used to rug the entire treasury into an arbitrary wallet.</strong></em></Highlight><br/><br/>

   * **Allowing on-demand token minting** 

     While token minting isn't allowed, the only way for new project tokens to be minted and distributed is for the project to receive new funds into its treasury. Tokens will get minted in accordance to the current funding cycle's values. 

     If token minting is allowed, an arbitrary number of tokens can be minted and distributed by the project owner, diluting the redemption value of all outstanding tokens.
     
     <Highlight color="#009933"><em><strong>Used productively, this can be used to premint tokens to members, or satisfy other agreed upon inflationary treasury strategies.</strong></em></Highlight><br/><br/>

     <Highlight color="#ff3300"><em><strong>Used maliciously, this can be used to mint exorbenant amount of tokens and redeem them to reclaim treasury funds into an arbitrary wallet.</strong></em></Highlight><br/><br/>

   * **Allowing changing of project tokens** 

     While changing tokens isn't allowed, the current project token will be used to satisfy redemptions and new issuance for the duration of the funding cycle. 

     If changing tokens is allowed, a new token can replace the role of a previous token for new issuance and redemptions. 
     
     <Highlight color="#009933"><em><strong>Used productively, this can be used to allow projects to augment a previous token strategy with a Juicebox treasury, dettach a token from a Juicebox treasury, or create custom token mechanisms associated with its Juicebox treasury.</strong></em></Highlight><br/><br/>

     <Highlight color="#ff3300"><em><strong>Used maliciously, this can be used to cut off a community of token holders from their treasury while using the redemption of a new token to reclaim treasury funds into an arbitrary wallet.</strong></em></Highlight><br/><br/>

   * **Allowing changing of project tokens** 

     While changing tokens isn't allowed, the current project token will be used to satisfy redemptions and new issuance for the duration of the funding cycle. 

     If changing tokens is allowed, a new token can replace the role of a previous token for new issuance and redemptions. 
     
     <Highlight color="#009933"><em><strong>Used productively, this can be used to allow projects to augment a previous token strategy with a Juicebox treasury, dettach a token from a Juicebox treasury, or create custom token mechanisms associated with its Juicebox treasury.</strong></em></Highlight><br/><br/>

     <Highlight color="#ff3300"><em><strong>Used maliciously, this can be used to cut off a community of token holders from their treasury while using the redemption of a new token to reclaim treasury funds into an arbitrary wallet.</strong></em></Highlight><br/><br/>

   * **Setting custom treasury extension implementations** 


WIP

* **`The owner of the project NFT can reconfigure the project's funding cycle`**\
  * **`Reconfigurations can include:`**\
  * **`custom treasury extension implementations`**\
  * **`the ability for projects to migrate funds to custom terminals`**\
  * **`the ability for projects to add new terminals with which it can manage inflows and outflows of funds`**\
  * **`the ability for projects to change the controller which manages its operating constraints`**\
  * **`a change in reserved tokens that are distributable`**\
* **`The owner of the project NFT can change the splits that aren't locked at any time`**\
* **`If a project's treasury references in multiple currencies, price oracles are used to resolve conversions`**\
