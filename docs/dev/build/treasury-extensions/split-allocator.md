# Split allocator

Before implementing, learn about allocators [here](/dev/learn/glossary/split-allocator.md), and splits [here](/dev/learn/glossary/splits.md).

#### Specs

A contract can become a split allocator by adhering to [`IJBSplitAllocator`](/dev/api/interfaces/ijbsplitallocator.md):

```
interface IJBSplitAllocator {
  function allocate(JBSplitAllocationData calldata _data) external payable;
}
```

When extending payout distribution or reserved token distribution functionality with an allocator, the protocol will pass a [`JBSplitAllocationData`](/dev/api/data-structures/jbsplitallocationdata.md) to the `allocate(...)` function:

```
struct JBSplitAllocationData {
  address token;
  uint256 amount;
  uint256 decimals;
  uint256 projectId;
  uint256 group;
  JBSplit split;
}
```

```
struct JBSplit {
  bool preferClaimed;
  bool preferAddToBalance;
  uint256 percent;
  uint256 projectId;
  address payable beneficiary;
  uint256 lockedUntil;
  IJBSplitAllocator allocator;
}
```

The `msg.sender` to the allocator will either be the payment terminal that facilitated the payout distribution, or the controller that facilitated the reserved tokens distribution.

In payment terminals based on the [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal), such as [`JBETHPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbethpaymentterminal/README.md)'s and [`JBERC20PaymentTerminal`](/dev/api/contracts/or-payment-terminals/jberc20paymentterminal/README.md)'s, the allocator hook gets called while the payouts are being distributed to splits. [View the docs](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_distributetopayoutsplitsof.md). 

* If the allocation is coming from an ETH payment terminal such as [`JBETHPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbethpaymentterminal/README.md), the ETH will be included in the call to `allocate(...)`. 
* If the allocation is coming from an ERC20 payment terminal such as [`JBERC20PaymentTerminal`](/dev/api/contracts/or-payment-terminals/jberc20paymentterminal/README.md), the tokens will be pre-approved for the allocator contract to transfer them to it. Make sure to initiate the transfer, and make sure to not leave allocated tokens stuck in the allocator contract.
* If the allocation is coming from a controller such as [`JBController`](/dev/api/contracts/or-controllers/jbcontroller/README.md) distributing reserved tokens, the tokens will be minted pre-distributed to the allocator's address. If the split's `preferClaimed` property is `true` and the project has a token a contract attached, the tokens will be minted directly to the allocator contract. Otherwise, they will be allocated in the  [`JBTokenStore`](/dev/api/contracts/jbtokenstore/README.md) as unclaimed tokens from which the allocator can then [`claimFor(...)`](/dev/api/contracts/jbtokenstore/write/claimfor.md) itself or [`transferFrom(...)`](/dev/api/contracts/jbtokenstore/write/transferfrom.md) itself to another address. Make sure to not leave allocated tokens stuck in the allocator contract or unclaimed in the [`JBTokenStore`](/dev/api/contracts/jbtokenstore/README.md) contract.

#### Attaching

New allocator contracts should be deployed independently. Once deployed, its address can be configured into a project's payout splits or reserved token splits so that any distribution triggered while the funding cycle is active sends the relevant token to the allocator contract's `allocate(...)` hook. 
