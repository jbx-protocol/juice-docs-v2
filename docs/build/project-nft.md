---
sidebar_position: 3
---

# Project NFT

Anyone can build on the [`JBProjects`](/api/contracts/jbprojects) NFT contract. This allows developers to write new contracts which use `JBProjects` NFTs to manage permissions in a standardized way, and allows any project using Juicebox payment terminals to access your contracts, and vice versa. 

#### Create a project

To create a project, call [`JBProjects.createFor(...)`](/api/contracts/jbprojects/write/createfor.md). The [`JBProjectMetadata`](/api/data-structures/jbprojectmetadata.md) structure allows arbitrary metadata to be mapped to any namespace domain. [juicebox.money](https://juicebox.money) metadata uses a domain of 0 to store its formatted metadata.

```
function createFor(address _owner, JBProjectMetadata calldata _metadata)
  external
  override
  returns (uint256 projectId) { ... }
```

```
struct JBProjectMetadata {
  string content;
  uint256 domain;
}
```

<details>

<summary>View project info</summary>

Launching a project will mint a new NFT in the [`JBProjects`](/api/contracts/jbprojects/README.md) contract. The owner can be found using [`JBProjects.ownerOf(...)`](https://docs.openzeppelin.com/contracts/3.x/api/token/erc721#IERC721-ownerOf-uint256-).

```
function ownerOf(uint256 _projectId) external returns (address owner) { ... }
```

The project's metadata can be found using [`JBProjects.metadataContentOf(...)`](/api/contracts/jbprojects/properties/metadatacontentof.md).

```
function metadataContentOf(uint256 _projectId, uint256 _domain)
  external
  view
  returns (string memory) { ... }
```

</details>

Once a project has been created, new metadata can be added by calling [`JBProjects.metadataContentOf(...)`](/api/contracts/jbprojects/properties/metadatacontentof.md).

```
function setMetadataOf(uint256 _projectId, JBProjectMetadata calldata _metadata)
  external
  override
  requirePermission(ownerOf(_projectId), _projectId, JBOperations.SET_METADATA) { ... }
```

The project can set a new token URI by calling [`JBProjects.setTokenUriResolver(...)`](/api/contracts/jbprojects/properties/settokenuriresolver.md).

```
function setTokenUriResolver(IJBTokenUriResolver _newResolver) external override onlyOwner { ... }
```
