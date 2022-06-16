# Airdrop Guide: Rewarding Your Community

:::info
This is a mirror of y4000.eth's [amazing blog post](https://mirror.xyz/y4000.eth/DwtMwn_rOOqTyTvvshlRLy9jNiKa__hag9zQgAQtSHw)
:::

It’s amazing when a community comes together in the world of web3. It’s a bit sad to see one fizzle out just as quickly as it forms.

Rewards play a key role in galvanizing a community further. As we’re figuring out these experiments with DAOs — I wanted to share the technicals of how I was able to whitelist 39,895 wallet addresses for an Ethereum mainnet smart contract while avoiding a cost prohibitive gas expense. This article dives into `NodeJS, JavaScript, Merkle Trees, and Solidity.`

The “DAO” in question is one that has partially fizzled out, ConstitutionDAO, the original team responsibly abandoned the project after the initial goal (to win an auction to acquire a historic copy of the Constitution) failed. They made sure everyone who donated could get a refund — and avoided ever looking like scammers, which was definitely a good move. [PeopleDAO](https://www.people-dao.com/) formed shortly after, organizing around the $People ERC-20 token (which contributors could opt to claim instead of their refund). The token is inherently a fairly distributed token and it is great to see a community evolve out of it.

I had come up with a generative art NFT Collection concept around the time the auction was lost — and I wanted to make it available for anyone who took part in the DAO. It was great to see so many new entrants into the world of web3 and I wanted to help keep them engaged. More about that [can be found here](https://constitution.y4000.xyz/).

To get to the nuts and bolts of it all the starting point was getting an export of all the contributor wallets.

JuiceBox — Get an Array of wallet addresses

If you’ve run your DAO fundraising via JuiceBox, as the ConstitutionDAO did, they make it pretty easy to export the wallet list as a CSV file:

![](/img/rewarding-your-community/erc20.png)
> *Simply click on "Holders"*

On the holders dialog you’ll be able to select “Amount paid”:

![](/img/rewarding-your-community/holders.png)
> *Clicking the little blue "download" icon on the right will get you a CSV*

Once you’ve got the CSV, you will want to process that into a JavaScript Array list of wallet addresses. Here is a snip of NodeJS to generate the JSON:

```js
const fs = require('fs');  const allFileContents = fs.readFileSync('../cdao_wallets.csv', 'utf-8'); let wallets = new Array(); allFileContents.split(/\r?\n/).forEach(line =>  {     wallets.push(line.split(',')[0]); }); fs.writeFileSync('./wallets.json', JSON.stringify(wallets, null, 2) , 'utf-8');
```

## Building a Merkle Tree

To get a basic understanding of what Merkle Trees are, I suggest starting [with the Wikipedia entry](https://en.wikipedia.org/wiki/Merkle_tree).

Now that we have a list of wallets as a JavaScript Array we can process that array into a Merkle Tree and generate a `rootHash` — this is basically the “public key” for the tree, any proof can be validated with knowledge of the `rootHash` — once this is generated we use the value within our Solidity smart contract. We leverage two open source projects to achieve this: [keccak256](https://www.npmjs.com/package/keccak256) and [merkletreejs](https://www.npmjs.com/package/merkletreejs) — here is a NodeJS code snip to generate the `rootHash`:

```js
const wallets = require('./wallets.json');
const keccak256 = require('keccak256')
const { MerkleTree } = require('merkletreejs')

const leafNodes = wallets.map(addr => keccak256(addr))

const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true})
const rootHash = merkleTree.getRoot()

console.log('rootHash', rootHash.toString('hex'))
```

## Setting up a Webservice to Generate Merkle Proofs

To verify if a wallet is a contributor we will need to generate a proof for that wallet and send that proof into the smart contract function the wallet wishes to transact on. In the case of the [CFRAC](https://constitution.y4000.xyz/) project, we’re allowing a contributor to mint an NFT for free…. On our mint website, the user is prompted to connect their wallet, once connected we verify if they are a contributing address, if so we generate the proof and allow them to run the `daoMint` function on our smart contract. Here a code snip of the simple webservice (built with [expressjs](https://www.npmjs.com/package/express)) to generate the proof:

```js
const wallets = require('./util/wallets.json');
const keccak256 = require('keccak256')
const { MerkleTree } = require('merkletreejs')
const leafNodes = wallets.map(addr => keccak256(addr))
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

app.get("/proof/:address", (req, res) => {
  let addrs = req.params.address.toLowerCase();
  let hexProof = merkleTree.getHexProof(keccak256(addrs))
  // send json of res
  res.json(hexProof);
});
```

The `address` is simply the hex wallet address the user connected with passed in by the mint website frontend code.

## Finally, verify the Merkle Proof in the Smart Contract

Once the frontend code has the proof in hand, it is ready to be sent to the `daoMint` function on the smart contract. Luckily for us, [OpenZeppeliln](https://openzeppelin.com/) makes available a library that makes this task super easy. Here is a Solidity code snip of the smart contract:

```solidity
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

...

    function daoMint(bytes32[] calldata _merkleProof) public whenNotPaused {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, MERKLE_ROOT, leaf), 'NOT_DAO_MEMBER');

        _safeMint(msg.sender, _tokenIdCounter.current());
        _tokenIdCounter.increment();
    }
```

Note the `MERKLE_ROOT` is a constant variable with the value of the earlier generated `rootHash`. You can view our full smart contract on Etherscan: [0x0fB73942cdffd45ccC8517061ae7430cDdde6b50](https://etherscan.io/address/0x0fB73942cdffd45ccC8517061ae7430cDdde6b50#code)

## Conclusion

Given the maturity of all the open source libraries available, this otherwise complex concept can be distilled into a simple and elegant implementation. Feel free to reach out to me on Twitter: [twitter.com/Y_4_K](https://twitter.com/Y_4_K) — and be sure to check out the [CFRAC NFT collection](https://constitution.y4000.xyz/).
