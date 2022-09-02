const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const SalesModel = require('../../../models/salesModel');
const { execute } = require("../../../models/connection");

describe('Testando a camada salesModel', () => {
  describe('Testando o retorno do getAllSales', () => {
    const execute = [[
      {
        saleId: 1,
        productId: 1,
        quantity: 5,
        date: "2022-07-02T20:12:09.000Z",
      },
      {
        saleId: 1,
        productId: 2,
        quantity: 10,
        date: "2022-07-02T20:12:09.000Z",
      },
    ]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Retornar um objeto na função getAllSales', async () => {
      const response = await SalesModel.getAllSales();
      expect(response).to.be.an('array')
    })

    it('Verificar tamanho do array na função getAllSales', async () => {
      const response = await SalesModel.getAllSales();
      expect(response).to.be.length(2)
    })

    it("Verificar o retorno na função getAllSales", async () => {
      const response = await SalesModel.getAllSales();
      expect([response]).to.be.deep.equal(execute);
    });
  })

  describe("Testando o retorno do findSaleById", () => {
    const execute = [
      [
        {
          date: "2022-07-02T20:12:09.000Z",
          productId: 3,
          quantity: 15,
        },
      ],
    ];

    before(() => {
      sinon.stub(connection, "execute").resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it("Retornar um objeto na função findSaleById", async () => {
      const response = await SalesModel.findSaleById(2);
      expect(response).to.be.an("array");
    });

    it("Verificar tamanho do array na função findSaleById", async () => {
      const response = await SalesModel.findSaleById(2);
      expect(response).to.be.length(1);
    });

    it("Verificar o retorno na função findSaleById", async () => {
      const response = await SalesModel.findSaleById(2);
      expect([response]).to.be.deep.equal(execute);
    });
  });
})
