---
sidebar_position: 1
---

# Getting started

#### Import

Add the protocol files to the project.
```bash
# command line
npm install @jbx-protocol/contracts-v2
```

If referencing from typescript:
```typescript
const contract = require(`@jbx-protocol/contracts-v2/deployments/${network}/${contractName}.json`)
```

If referencing from a contract:
```
import '@jbx-protocol/contracts-v2/contracts/[file-path].sol'
```

#### Now what

From here, you can build the following:

[Basics](basics.md) - Interact with the protocol's basic functionality. Useful for building front-ends.  

[Project design](project-design.md) - Get familiar with the configurable properties available when launching a project. 

[Treasury extensions](treasury-extensions) - Create custom contractual rules defining what happens when a project receives funds, and under what conditions funds can leave the treasury during a funding cycle.

[Project payer](utilities/project-payer.md) - Deploy or inherit from a contract that makes it easy to forward funds to Juicebox projects.

[Splits payer](utilities/splits-payer.md) - Deploy or inherit from a contract that makes it easy to forward funds to groups of splits whose members are either addresses, Juicebox projects, or arbitrary contracts that inherit from [`IJBSplitAllocator`](treasury-extensions/split-allocator.md).


