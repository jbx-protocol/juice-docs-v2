---
sidebar_position: 3
---

# Token

## Overview

When people pay a project, project tokens are minted. **Token** parameters dictate how those tokens work.
- Token balances are tracked in the Juicebox contracts by default. If desired, project owners can issue an [ERC-20](https://www.investopedia.com/news/what-erc20-and-what-does-it-mean-ethereum/) on [juicebox.money](https://juicebox.money) once their project is deployed. This ERC-20 can be claimed by community members.
- Project tokens are often used for voting in governance, gated access to a Discord server, an NFT mint, or something else.
- These rules can be updated over time.

## Options

|Field|Description|
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|**Initial mint rate**|<p>The number of project tokens minted when 1 ETH is contributed.</p>|
|**Reserved tokens**|<p>Tokens are minted when people pay your project. Reserved tokens can be used to control where those tokens go.<br/><br/>By default, all tokens go to the person that pays your project. If the reserved rate is set to 30%, the person that pays your project will only receive 70% of the tokens minted by that payment. The remaining 30% of tokens will go to Ethereum addresses and Juicebox projects chosen by the project owner.<br/><br/>Project owners often use reserved tokens to ensure that core project members maintain a voice in governance as a project grows. A higher reserve rate makes a project more resilient to takeover, but reduces the incentive for individuals to contribute to your project (as they will receive fewer project tokens). A lower reserve rate will do the opposite.</p>|
|**Discount rate**|<p>The percentage your mint rate will decrease by every funding cycle. In other words: *how much more expensive do project tokens become each funding cycle?*<br/><br/>If a project has an intial mint rate of 1,000,000 tokens per ETH and a discount rate of 10%, that project's mint rate will be 900,000 tokens per ETH in its second funding cycle, and 810,000 tokens per ETH in the funding cycle after that. This mechanic encourages early contributions, but may also discourage later contributors if too extreme.</p>|
|**Redemption rate**|<p>By default, tokens can be redeemed for a proportional amount of [overflow](/dev/learn/glossary/overflow).<ul><li>Funds exceeding your costs/payouts are considered overflow.</li><li>By default, a token holder who redeems ten percent of all project tokens will receive ten percent of the overflow.</li></ul>The redemption rate alters this behaviour—if set to 60%, project tokens are only redeemable for 60% of the overflow they would otherwise correspond to. This means that somebody redeeming 10% of project tokens would only receive ~6% of the overflow, leaving the other ~4% in the treasury.<br/><br/> The funds remaining in the treasury increase the proportional value of other tokens. The redemption rate mechanic rewards individuals who redeem their project tokens later rather than earlier.</p>|

## Examples

<img src="/img/project-guide/token0.png" width="60%" style={{display: "block", margin: "auto"}} />
<p style={{textAlign: "center"}}><i>A mint rate displayed on <a href='https://juicebox.money'>juicebox.money</a></i></p><br/>
<img src="/img/project-guide/token1.png" width="70%" style={{display: "block", margin: "auto"}} />
<p style={{textAlign: "center"}}><i>Reserved tokens on <a href='https://juicebox.money'>juicebox.money</a></i></p><br/>
<img src="/img/project-guide/token2.png" width="60%" style={{display: "block", margin: "auto"}} />
<p style={{textAlign: "center"}}><i>Token incentive information on <a href='https://juicebox.money'>juicebox.money</a></i></p>
