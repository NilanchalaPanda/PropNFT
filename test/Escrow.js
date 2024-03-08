const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Escrow Smart Contract", () => {
  let buyer, seller, inspector, lender;
  let realEstate, escrow;

  beforeEach(async () => {
    // Setup accounts -
    [buyer, seller, inspector, lender] = await ethers.getSigners();

    // Deployed RealEstate Contract -
    const RealEstate = await ethers.getContractFactory("RealEstate");
    realEstate = await RealEstate.deploy();

    // Minting of Properties -
    let transaction = await realEstate
      .connect(seller)
      // Function from RealEstate.sol
      .mintProprtyItems(
        "https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS"
      );

    // Deployed Escrow Contract -
    const Escrow = await ethers.getContractFactory("Escrow");
    escrow = await Escrow.deploy(
      realEstate.address,
      seller.address,
      inspector.address,
      lender.address
    );

    //Approve the property -
    transaction = await realEstate.connect(seller).approve(escrow.address, 1);
    await transaction.wait();

    // List the property -
    transaction = await escrow
      .connect(seller)
      // Function from Escrow.sol
      .listProperties(1, buyer.address, tokens(10), tokens(5));
    await transaction.wait();
  });

  describe("Deployment", () => {
    it("Returns NFT address", async () => {
      const NFTresult = await escrow.nftAddress();
      expect(NFTresult).to.be.equal(realEstate.address);
    });

    it("Returns Seller", async () => {
      const sellerResult = await escrow.seller();
      expect(sellerResult).to.be.equal(seller.address);
    });

    it("Returns Inspector", async () => {
      const inspectorResult = await escrow.inspector();
      expect(inspectorResult).to.be.equal(inspector.address);
    });

    it("Returns Lender", async () => {
      const lenderResult = await escrow.lender();
      expect(lenderResult).to.be.equal(lender.address);
    });
  });

  describe("Listing of Property", () => {
    it("Update the Listing", async () => {
      const result = await escrow.isListed(1); // Function of Escrow.sol {isListed}
      expect(result).to.be.equal(true);
    });

    it("Returns the Buyer", async () => {
      const result = await escrow.buyer(1); // Mapping var of Escrow.sol {buyer}
      expect(result).to.be.equal(buyer.address);
    });

    it("Returns the Purchase Price", async () => {
      const result = await escrow.purchasePrice(1); // Mapping var of Escrow.sol {purchasePrice}
      expect(result).to.be.equal(tokens(10));
    });

    it("Returns the Escrow Amount", async () => {
      const result = await escrow.escrowAmount(1); // Mapping var of Escrow.sol {escrowAmount}
      expect(result).to.be.equal(tokens(5));
    });

    it("Update the Ownership", async () => {
      expect(await realEstate.ownerOf(1)).to.be.equal(escrow.address);
    });
  });

  describe("Deposits Funds", () => {
    it("Update the Contract Balance", async () => {
      const transaction = await escrow
        .connect(buyer)
        .depositEarnest(1, { value: tokens(5) });
      await transaction.wait();
      const result = await escrow.getBalance();
      expect(result).to.be.equal(tokens(5));
    });
  });

  describe("Inspection", () => {
    it("Updates inspection status", async () => {
      const transaction = await escrow
        .connect(inspector)
        .updateInspectionStatus(1, true);
      await transaction.wait();
      const result = await escrow.inspectionPassed(1);
      expect(result).to.be.equal(true);
    });
  });

  describe("Approval", () => {
    it("Updates approval status", async () => {
      let transaction = await escrow.connect(buyer).approveSale(1);
      await transaction.wait();

      transaction = await escrow.connect(seller).approveSale(1);
      await transaction.wait();

      transaction = await escrow.connect(lender).approveSale(1);
      await transaction.wait();

      expect(await escrow.approval(1, buyer.address)).to.be.equal(true);
      expect(await escrow.approval(1, seller.address)).to.be.equal(true);
      expect(await escrow.approval(1, lender.address)).to.be.equal(true);
    });
  });
});
