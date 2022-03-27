---
slug: state-of-jbx
title: "Observations: State of JBX"
authors: [jango]
tags: [observations]
---

*JuiceboxDAO runs its community treasury on the Juicebox protocol. The tools at its disposal are also publicly available. Check out the protocol's tokenomics toolkit [here](.//juicebox-protocol-tokenomics/). *

*JBX is the membership token of JuiceboxDAO. Its utility is to vote on proposals of how the DAO should evolve over time. Check out the potential use cases each project's tokens can be programmed to have within the Juicebox protocol [here](../overflow/).*

*Thanks to Nicholas, Zom-Bae, Zeugh, and Aeolian for edits and feedback.*

---

JuiceboxDAO is currently issuing **208,920 JBX** per ETH to anyone who contributes to the treasury. This rate currently decreases by 10% every other week. There is a proposal to push this up to 20%.

At the current redemption bonding curve of 60%, the protocol is offering 1 ETH back from the treasury for each **679,652 JBX **burned. There is a proposal to change this rate to 95%, at which the protocol would be offering 1 ETH for about **459,219 JBX** burned.

The price of JBX / ETH on Uniswap is currently **446,380 JBX** per 1 ETH traded.

JuiceboxDAO currently has a reserved rate of 35%, which means 112,495 new JBX get reserved per ETH contributed to the treasury alongside the amount issued for the contributor. 30% of this goes to the DAO (dao.jbx.eth), 24% to jango.eth, 24% to peri.eth, 7% to nnnnicholas.eth, 7% to exekias.eth, 4% to CanuDAO, and 4% to WAGMI Studios. 

### Observations

- JBX is currently trading in between the issuance and the burn rates on off-protocol markets such as the Uniswap AMM. There's currently no incentive for anyone to inflate or shrink the JBX supply.

The protocol says nothing about what might happen off-protocol. The following are just my assumptions and not financial advice.  

- If the market price of JBX increases past the protocol's issuance price, any additional demand of JBX can be fulfilled by contributing ETH to the Juicebox treasury which will in turn mint and distribute JBX.

Risk taking arbitragers might be incentivized to mint extra JBX at this funding cycle's rate to cover the 10% spread that will become available when the cycle rolls over and the discount takes effect. They can also benefit from information asymmetry by minting JBX to fill buy orders on off-protocol markets – *the JuiceboxDAO community should work to minimize the opportunity for information asymmetry*.

Either of these will benefit all JBX holders who have held their JBX from better rates during previous funding cycles – their share of the total JBX in circulation will shrink, but the ETH treasury that backs each JBX will grow at a faster rate, which has the effect of increasing the burn rate.

- If the price of JBX decreases past the protocol's burn rate, further demand to sell JBX can be fulfilled by burning JBX to get ETH that is locked in the treasury's overflow.

Again, arbitragers can benefit from information asymmetry by burning JBX to fill sell orders on off-protocol markets – *again, the JuiceboxDAO community should work to minimize the opportunity for information asymmetry. *

Either of these will benefit all JBX holders who chose to hold their JBX through the sell pressure – every JBX that is redeemed at a redemption bonding curve leaves some ETH on the table from its proportional share (60% curve leaves a lot more on the table for holders than a 95% curve, exaggerating the effect). In all cases except a 100% redemption curve, the JBX circulating supply will be decreasing at a faster rate than the treasury's ETH supply. This will marginally increase the burn rate for JBX with each subsequent burn, which will add upward pressure on prices, shrink supply, and leave only the holders that turned away the potentially mounting exit incentive to keep building. 

- Over time as the market pushes against the issue and burn rates, a JBX holder's burn rate will increase and might eventually exceed the value that the JBX was minted at. 

The more pressure on either side, the more the burn rate increases for each holder. On the other hand, the burn rate will stay the same if the market is being satisfied off protocol.

Tail market events benefit JBX holders most, albeit in a contained and measured way. The only thing that does not benefit JBX holders is the lack of change in JBX demand over time. Under this mechanism, it seems we are sacrificing price swings for resiliency.

- The DAO is spending ETH each funding cycle to pay out contributors, services, and grants as proposals get approved by JBX holders. The impact of this spending is spread across all JBX holders, marginally reducing everyone's burn rate. 

The DAO could also allocate ETH off-platform in its multisig wallet or various other contracts across web3. This value is currently impossible to account for in the burn rate given the current version of the Juicebox protocol.

- The reserved token list only captures value when the token supply is growing. Once token supply has expanded and the market is satisfied off protocol, reserved token holders are massively incentivized to push the price up towards its limit. 

- It is expensive to mint 51% of all tokens in existence, even without a reserved rate. If this were to happen, the ETH used to mint the token majority would immediately fund an increased burn rate for every token holder from previous cycles. The new influential JBX holder would have to appease a community with potentially significant exit incentive.

This same effect exists if the 51% is bought all-of-the-sudden by thousands of uncoordinated people on the internet.

- The DAO (dao.jbx.eth) currently receives 30% of reserved JBX tokens. The DAO is considering committing a percent of this built up supply to circulate among contributors via the DAO's discord. 

It can do so in many ways, one approach is to split the allocation among the addresses on the reserved list, who are then encouraged to split this initial supply entirely between those who they work closest with and who's contributions they want to recognize. Those recipients are in turn encouraged to continue circulating this supply. 

The goal is to make sure everyone who is building and maintaining the protocol and ecosystem becomes significant JBX token holders that can formally help the DAO make decisions.

If this internal JBX distribution system increases the governance participation of new builders and of those who steward the protocol, then the DAO may benefit from expanding this program by increasing the portion of reserved tokens allocated to the DAO treasury, and reducing the reserved token allocation to other recipients.
