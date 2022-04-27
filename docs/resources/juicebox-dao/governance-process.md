---
sidebar_position: 2
---

# Governance Process
    
*Juicebox governance runs on a 14 day cycle.* 
    
![](/img/docs/gov-calendar.png)
    
### Governance Schedule

Day 1 -  Temperature Check - Saturday (00:00 UTC) <br/>
Day 4 - Snapshot Vote - Tuesday (00:00 UTC) <br/>
Day 8 - Multisig Execution - Saturday (00:00 UTC) <br/>
Day 12 - Reconfiguration Delay - Wednesday (19:19 UTC) <br/>
Day 15 / Day 1 - Funding Cycle Updated - Saturday (19:19 UTC) <br/>

## Step 1 - Temperature Check

`Begins on Day 1 of Funding Cycle - Saturday 00:00 UTC`

A **3-day temperature check** (react-vote Discord poll) will be created in the discussion thread for each submitted proposal on day 1 of the governance cycle. During the temp check, the author can update or redact their proposal based on the DAO's feedback.

Proposals cannot be edited during the last 24 hours of Temperature Check (starting Monday 00:00 UTC).

**Executable proposals that have at least 10 affirmative votes amounting to 30% or more of the total votes cast will proceed to the next stage.**

*[How to Make a Governance Proposal](https://juicebox.notion.site/How-to-Make-a-Governance-Proposal-d841f3530f10464ba8b6c745eebc94d6)*

## Step 2 - Voting Off-Chain

`Begins on Day 4 of Funding Cycle - Tuesday 00:00 UTC`

Formal voting is conducted on [Snapshot.org/#/jbdao.eth](https://snapshot.org/#/jbdao.eth). Voting will be open for at least 48 hours. Typically, voting will open on day 4 of the governance cycle and close on day 8. All Snapshot proposals are decided based on single-choice vote. Voting is conducted among groups defined below in Proposal Types and Voter Responsibilities.

Each Snapshot proposal must include the full proposal text and a link to an immutable (IPFS or Arweave) version of the proposal text.

**Proposals that have at least 66% approval and 15 or more total votes pass and are queued for execution.**

## Step 3 - Execution

`Begins on Day 7 of Funding Cycle - Saturday 00:00 UTC`

The DAO's Gnosis multisig (*mainnet: [0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e](https://etherscan.io/address/0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e)*) has four days to queue the funding cycle reconfiguration.

*The multisig has total control over all treasury decisions and certain on-chain protocol parameters. The execution of JBX token holder votes depends upon the cooperation of these signers. The Juicebox DAO multisig signers have committed to executing the will of the DAO as expressed in Snapshot votes.*

## Step 4 - Reconfiguration Delay

`Begins on Day 12 of Funding Cycle - Wednesday 19:19 UTC`

The Juicebox multisig must submit reconfigurations to Juicebox DAO at least 3 days before the start of a funding cycle. This practice gives JBX holders time to verify queued reconfigurations and proposals, and to burn their JBX tokens if desired.

## Emergency Governance Process
    
**Emergency governance processes** enable the DAO to act quickly in extreme circumstances. Non-standard governance measures should be reserved for crisis scenarios only.

In a crisis scenario where the DAO must take action, a 24-hour Discord poll must be created in a public thread or channel, with a message tagging `@Juicer(DAO Member)`. The poll must receive at least 15 affirmative votes constituting 80% of the total votes to pass. For extremely time sensitive actions (<24 hours), 4 of 5 multisig members must agree.
