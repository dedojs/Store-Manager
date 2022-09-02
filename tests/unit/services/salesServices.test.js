const sinon = require("sinon");
const { expect } = require("chai");

const SalesService = require("../../../services/salesService");
const SalesModel = require("../../../models/salesModel");

describe('Testando a camada salesService', () => {
  describe('Retornando todas as vendas cadastradas', () => {

    const execute = [
      {
        saleId: 1,
        productId: 1,
        quantity: 5,
        date: "2022-07-02T20:38:31.000Z",
      },
      {
        saleId: 1,
        productId: 2,
        quantity: 10,
        date: "2022-07-02T20:38:31.000Z",
      },
      {
        saleId: 2,
        productId: 3,
        quantity: 15,
        date: "2022-07-02T20:38:31.000Z",
      },
    ];

    before(() => {
      sinon.stub(SalesModel, 'getAllSales').resolves(execute)
    })

    after(async () => {
      await SalesModel.getAllSales.restore()
    })

    it('Retorna um array com objetos', async () => {
      const response = await SalesService.getAllSales();
      expect(response).to.be.equal(execute)
    })
  })

describe("Retornando uma venda solicitada pelo ID", () => {
  const execute = [
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
      date: "2022-07-02T20:38:31.000Z",
    },
  ];

  before(() => {
    sinon.stub(SalesModel, "findSaleById").resolves(execute);
  });

  after(async () => {
    await SalesModel.findSaleById.restore();
  });

  it("Retorna um array com objetos", async () => {
    const response = await SalesService.findSaleById(2);
    expect(response).to.be.equal(execute);
  });
});

})
