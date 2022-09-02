const sinon = require("sinon");
const { expect } = require("chai");

const SalesService = require("../../../services/salesService");
const SalesController = require("../../../controllers/salesController");

describe('Testando a camada salesController', () => {
  describe("Testando getAllsales", () => {
    const response = {};
    const request = {};
    const resolve = [
      {
        saleId: 1,
        productId: 1,
        quantity: 5,
        date: "2022-07-02T20:38:31.000Z",
      },
    ];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, "getAllSales").resolves(resolve);
    });

    after(() => {
      SalesService.getAllSales.restore();
    });

    it("Item encontrado, retorno 200", async () => {
      await SalesController.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe("Testando getAllsales", () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, "getAllSales").resolves(null);
    });

    after(() => {
      SalesService.getAllSales.restore();
    });

    it("Item não encontrado, retorno 404", async () => {
      await SalesController.getAllSales(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe("Testando findSaleById", () => {
    const response = {};
    const request = {};
    const resolve = [
      {
        date: "2022-07-03T02:26:46.000Z",
        productId: 3,
        quantity: 15,
      },
    ];

    before(() => {
      request.params = { id: 2 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, "findSaleById").resolves(resolve);
    });

    after(() => {
      SalesService.findSaleById.restore();
    });

    it("Item encontrado, retorno 200", async () => {
      await SalesController.findSaleById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe("Testando findSaleById", () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 2 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, "findSaleById").resolves(null);
    });

    after(() => {
      SalesService.findSaleById.restore();
    });

    it("Item não encontrado, retorno 404", async () => {
      await SalesController.findSaleById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe("Testando findSaleById", () => {
    const response = {};
    const request = {};

    before(() => {

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, "findSaleById").resolves(null);
    });

    after(() => {
      SalesService.findSaleById.restore();
    });

    it("Erro capturado no catch, retorno 500", async () => {
      await SalesController.findSaleById(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
  });

})
