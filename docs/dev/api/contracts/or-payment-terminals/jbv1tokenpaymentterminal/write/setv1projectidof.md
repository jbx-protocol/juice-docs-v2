# setV1ProjectId

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBV1TokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBV1TokenPaymentTerminal`](/dev/api/interfaces/ijbv1tokenpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows a project owner to initialize the acceptance of a v1 project's tokens in exchange for its v2 project token.**

#### Definition

```
function setV1ProjectId(uint256 _projectId, uint256 _v1ProjectId) external override { ... }
```

* Arguments:
  * `_projectId` is the ID of the v2 project to set a v1 project ID for.
  * `_v1ProjectId` is the ID of the v1 project to set.
* The function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBV1TokenPaymentTerminal`](/dev/api/interfaces/ijbv1tokenpaymentterminal.md) interface.
* The function doesn't return anything.

#### Body

1.  Make sure the v1 project and v2 project have the same owner. 

    ```
    // Can't set the v1 project ID if it isn't owned by the same address who owns the v2 project.
    if (
      msg.sender != projects.ownerOf(_projectId) ||
      msg.sender != ticketBooth.projects().ownerOf(_v1ProjectId)
    ) revert NOT_ALLOWED();
    ```

    _Internal references:_

    * [`projects`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/projects.md)
    * [`ticketBooth`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/ticketbooth.md)

    _External references:_
    
    * [`ownerOf`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#IERC721-ownerOf-uint256-)
    * [`projects`](https://github.com/jbx-protocol/juice-contracts-v1/blob/a91b55e8d264267c338b089aa9a45b29fd8e8f13/contracts/interfaces/ITicketBooth.sol#L71)

2.  Set the v1 project ID. 

    ```
    // Store the mapping.
    v1ProjectIdOf[_projectId] = _v1ProjectId;
    ```

    _Internal references:_

    * [`v1ProjectIdOf`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/v1projectidof.md)

3.  Emit a `SetV1ProjectId` event with the relevant parameters.

    ```
    emit SetV1ProjectId(_projectId, _v1ProjectId, msg.sender);
    ```

    _Event references:_

    * [`SetV1ProjectId`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/events/setv1projectid.md)


</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Allows a project owner to initialize the acceptance of a v1 project's tokens in exchange for its v2 project token.

  @dev
  Only a project owner can initiate token migration.

  @param _projectId The ID of the v2 project to set a v1 project ID for.
  @param _v1ProjectId The ID of the v1 project to set.
*/
function setV1ProjectId(uint256 _projectId, uint256 _v1ProjectId) external override {
  // Can't set the v1 project ID if it isn't owned by the same address who owns the v2 project.
  if (
    msg.sender != projects.ownerOf(_projectId) ||
    msg.sender != ticketBooth.projects().ownerOf(_v1ProjectId)
  ) revert NOT_ALLOWED();

  // Store the mapping.
  v1ProjectIdOf[_projectId] = _v1ProjectId;

  emit SetV1ProjectId(_projectId, _v1ProjectId, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| **`NOT_ALLOWED`** | Thrown if the v1 and v2 project's don't have the same owner. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                          | Data                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetV1ProjectId`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/events/setv1projectid.md)                                         | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed v1ProjectId</code></li><li><code>address caller</code></li></ul>        |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
