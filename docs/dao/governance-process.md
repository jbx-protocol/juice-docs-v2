---
sidebar_position: 2
---

# Governance Process

*Juicebox DAO governance runs on a 14 day cycle.* 

![](/img/gov-calendar.png)
    
### Governance Schedule

Day 1 -  Temperature Check - Saturday (00:00 UTC) <br/>
Day 4 - Snapshot Vote - Tuesday (00:00 UTC) <br/>
Day 8 - Multisig Execution - Saturday (00:00 UTC) <br/>
Day 12 - Reconfiguration Delay - Wednesday (19:19 UTC) <br/>
Day 15 / Day 1 - Funding Cycle Updated - Saturday (19:19 UTC) <br/>

## Step 0 - Discussion

Proposals can be submitted to the [Proposals Database](https://juicebox.notion.site/9d126f9148dc42ee83317d5cd74e4db4?v=50d0bbcb498044059cc0d4d83e8b13fa) at any time. Once a proposal is ready for discussion, authors can change the proposal `Status` from `Draft` to `Discussion`, which will automatically create a discussion thread in the [Juicebox DAO Discord Server](https://www.discord.gg/juicebox).

*For more, see [How to Make a Governance Proposal](how-to-make-a-governance-proposal.md)*

## Step 1 - Temperature Check

`Begins on Day 1 of the Governance Cycle - Saturday 00:00 UTC`

A **3-day temperature check** (react-vote Discord poll) will be created for each proposal submitted by day 1 of a Governance Cycle. During the temperature check stage, authors can update or redact their proposals based on the DAO's feedback. Proposals cannot be edited during the last 24 hours of Temperature Check (starting Monday 00:00 UTC).

**Executable proposals that have at least 10 affirmative votes amounting to 30% or more of the total votes cast will proceed to the next stage.**

## Step 2 - Offchain Voting 

`Begins on Day 4 of the Governance Cycle - Tuesday 00:00 UTC`

Offchain voting is conducted on [snapshot.org/#/jbdao.eth](https://snapshot.org/#/jbdao.eth). Voting must be open for at least 72 hours. Typically, voting will open on day 4 of the governance cycle and close on day 8. The DAO decides which Snapshot proposals are approved by single choice vote. Each Snapshot proposal must include the full proposal text and a link to an immutable (IPFS or Arweave) version of the proposal text.

**Proposals that have at least 66% approval and 15 or more total votes pass and are queued for execution. "Abstain" votes are not included in these counts.**

## Step 3 - Execution

`Begins on Day 7 of the Governance Cycle - Saturday 00:00 UTC`

The DAO's Gnosis multisig (*mainnet: [0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e](https://etherscan.io/address/0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e)*) has four days to queue the funding cycle reconfiguration.

*The multisig has control over treasury decisions and certain onchain protocol parameters. The execution of JBX token holder votes depends upon the cooperation of these signers. The Juicebox DAO multisig signers have committed to executing the will of the DAO as expressed by Snapshot votes.*

## Step 4 - Reconfiguration Delay

`Begins on Day 12 of the Governance Cycle - Wednesday 19:19 UTC`

The Juicebox DAO multisig must submit reconfigurations to the Juicebox DAO project at least 3 days before the start of the next funding cycle. This practice gives the DAO time to verify queued reconfigurations and proposals, and to burn their JBX tokens if desired.

## Emergency Governance Process
    
**Emergency governance processes** enable the DAO to act quickly in extreme circumstances. Non-standard governance measures should be reserved for crisis scenarios only.

In a crisis scenario where the DAO must take action, a 24-hour Discord poll must be created in a public thread or channel, with a message tagging `@everyone`. The poll must receive at least 15 affirmative votes constituting 80% of the total votes to pass. For extremely time-sensitive matters (action needed in 24 hours or less), 80% of multisig members must explicitly agree to any onchain actions.
