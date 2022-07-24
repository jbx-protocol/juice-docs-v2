# How to use Juicebox tokens in a Snapshot strategy

::: info
How to configure quadratic strategy? Look up documentation.
:::

_This takes both claimed ERC-20s or unclaimed tokens into account when setting up Snapshot ballot strategies._

1. Choose "contract-call".
2. Stick this in

```jsx
{
	"args": [
		"%{address}",
		"0x01" // TODO: REPLACE WITH YOUR PROJECT ID HEX ENCODED.
	],
	"symbol": "JBX", // TODO: REPLACE WITH YOUR TOKEN SYMBOL.
	"address": "0xee2eBCcB7CDb34a8A822b589F9E8427C24351bfc",
	"decimals": 18,
	"methodABI": {
	"name": "balanceOf",
	"type": "function",
	"inputs": [
		{
			"name": "",
			"type": "address",
			"internalType": "address"
		},
		{
			"name": "",
			"type": "uint256",
			"internalType": "uint256"
		}
	],
	"outputs": [
		{
			"name": "",
			"type": "uint256",
			"internalType": "uint256"
		}
	],
	"stateMutability": "view"
	}
}
```
