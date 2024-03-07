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

    // Deployed Escrow Contract -
    const Escrow = await ethers.getContractFactory("Escrow");
    escrow = await Escrow.deploy(
      realEstate.address,
      seller.address,
      inspector.address,
      lender.address
    );
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
});
