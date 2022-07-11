---
slug: juicebox-funding-cycle-4-proposal
title: "Juicebox: Project update and FC4 proposal"
authors: [jango]
tags: [governance, dao]
---

Only a few minor changes are needed for Funding Cycle #4. All of the focus areas remain the same, with the addition of one new area for "Protocol upgrades". Updates to each are outlined below.

## Focus

As a DAO, we should continue focusing on the following areas:

### Risk mitigation 

*Goal: Make sure things don't go to zero. *

*Current team: jango (lead), exekias*

Updates: 

- One low severity bug was discovered, an explanation of what happened can be found [here](/blog/juicebox-postmortem-of-low-severity-bug-discovered-8-18-2021/), and a postmortem is available [here](https://github.com/jbx-protocol/juice-security/blob/main/incidents/08-18-2021.md).
- We're underway with a baseline audit being performed by DeFiYield.
- We still need to outline a bug bounty program with associated rewards for discovered vulnerabilities of varying severities.

### UX improvements 

*Goal: Improve and make templates for project onboarding and the project dashboard.*

*Current team: peri (lead), jango, exekias*

Updates:

- Added Web3 connect support for various other wallets using blocknative. [See this PR](https://github.com/jbx-protocol/juice-juicehouse/pull/105).
- Updated the "Projects" page of the site to be sortable by "Total earned".
- Added a data feed to each project feed to view total amount of ETH contributed by each address.
- Several bug fixes.

### Project support, education, & docs

*Goal: Make sure JB projects have the resources they need to get started and thrive. *

*Current team: jango (lead), natimuril, WAGMI Studios, CanuDAO*

Updates:

- Helped SharkDAO launch an AMM pool for their treasury token.
- Several conversations with projects that are interested in building their treasury using Juicebox. Actively workshopping solutions for [ScribeDAO](https://twitter.com/scribedao) and [Phlote](https://phlote.xyz/), with [FingerprintsDAO](https://twitter.com/FingerprintsDAO), $Loot, and a project by [NiftyTable](https://twitter.com/NiftyTabIe) also on the radar.
- No significant updates on tech or process documentation. We need to make progress here as we continue to understand the materials that projects and contributors need to be successful.

### Analytics 

*Goal: Give projects rich insights into their community treasury.*

*Current team: peri (lead), buradorii*

Updates:

- A new data feed that shows how much each address has contributed to each project has been added to each project page on [juicebox.money](https://juicebox.money).
- Progress has been made on charts that show a project's P&L using Flipside analytics tool.
- We have yet to deliver a data dashboard to projects. We're still working towards this end.

### Liquidity pools

*Goal: Add support for JB treasury tokens in secondary markets.*

*Current team: exekias (lead), jango*

Updates:

- SharkDAO's SHARK token has been pooled with ETH on Sushiswap, you can see the analytics [here](https://analytics.sushi.com/tokens/0x232afce9f1b3aae7cb408e482e847250843db931). SharkDAO's Juicebox page was closed during this transition, with plans to reopen in the coming days. 
- Research is underway to provide a staking contract to projects where LP rewards can be distributed.

### Marketplace

*Goal: Give JB projects a place to sell digital goods (and physical?) which pipe percentages of revenue to any number of addresses and Juicebox treasuries.*
*
Current team: nicholas (lead), jango, peri*

Updates:

- Researched how other protocols are doing split payments.
- Finalized the user journeys that we're trying to solve.
- Begun workshopping how the contracts should be architected.
- Begun ideating on what the UX should be.

### Governance

*Goal: Plan out how we will make decisions together.*

*Current team: zheug (lead), unicornio*

Updates:

- Created a process schema to follow when making proposals, voting on them, and conveying the decision on-chain.
- Created a Coordinape page where we can experiment with reputation assignment.
- Governance meetings are beginning to happen regularly on Tuesdays.

### Protocol upgrades  

*Goal: Evolve the protocol to be more useful and remove friction from the treasury management process. *

C*urrent team: jango (lead), exekias, peri, nicholas*

Updates:

- A TerminalV2 contract is well underway. This update will allow projects to customize their treasury strategy entirely. Details tbd, implementation and ongoing tests can be found [here](https://github.com/jbx-protocol/juice-juicehouse/tree/version/2).
- TerminalV2 will patches an edge case bug found, mentioned earlier under  "Risk mitigation"

### My proposal for FC4:

**Duration:** 14 days (no change)

**Ballot:** 3 day delay (changed from 7 day)
A reconfiguration proposal must be submitted 3 days before the end of the current funding cycle. Reconfiguration decisions are feelings a little rushed. Changing the ballot delay from 7-days to 3-days gives us a bit more time than what we currently have for evaluating proposals and conveying changes on-chain.

**Discount rate:** 10% 
The discount rate should continue to compound at 10% to reward contributors who continue to fund the JuiceboxDAO treasury at this risky stage.

**Bonding curve:** 60% (+-0%)
No need to change this. Still arbitrary, but there's no demand to redeem right now, so might as well keep it this tight as we adjust the discount rate.

**Payouts: **$33.5k total 

I propose we pay exekias, nicholas, nati, and buradorii slightly more. 

**Core contributors**

- **jango **| *dev: $10k (no change)*
- **peripheralist **| *dev : $10k (no change)*
- **CanuDAO **|*comms:$2.5k (no change)*
- **WAGMI Studios **| *art, animations, and educational content: $2.5k *(no change)
- **exekias **| *dev: $4k (+ $1k)*
Exekias has bee hands on with all aspects of the code. Increasingly becoming an integral part of the core dev staff.

**Experimental contributors**

- **nicholas** | *dev: $2k (+ $500)*
Nicholas has begun writing code, he's been an active voice in our community, and he's helping to progress pivotal discussions forward.
- **nati **| *community relations*: $1k (+$500)
Nati has begun onboarding DAOs onto Juicebox and is also helping progress pivotal discussions forward.
- **Buradorii** | *analytics: $1k *(+$500)
Buradorii has begun publishing Flipside data dashboards. We've yet to aggregate charts and deliver them to projects.

**Allocations**

- **Figma**, **Infura**, **Gitbook**, **Mee6** & **Fleek subscriptions** | $500

**Reserved rate:** 35% (No change)
We should continue to allocate 25% to core contributors, and reserve 10% for ETH/JBX liquidity provider incentives (soon).

**Reserved token distribution:**

- **jango: **35%
- **peripheralist:** 35%
- **CanuDAO:** 10%
- **WAGMI Studios:** 10%
- **exekias**: 7.5%
- **misc:** 2.5% - for on-demand incentives paid out by the multisig wallet.
