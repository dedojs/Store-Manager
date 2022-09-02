const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const ProductModel = require("../../../models/productsModel");

describe("Testando a camada Model", () => {
  describe("Testando retorno do getAll", () => {
    const execute = [
      {
        id: 1,
        name: "Teste de produto",
      },
    ];

    before(() => {
      sinon.stub(connection, "execute").resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it("Retornar um objeto na função getAll", async () => {
      const response = await ProductModel.getAll();
      expect(response).to.be.an("object");
    });
  });

  describe("Testando retorno do findById", () => {

    beforeEach(async () => {
      const result = [[{
          id: 1,
          name: "teste de produto1",
        }]];
      await sinon.stub(connection, "execute").resolves(result);
    });

    afterEach(async () => await connection.execute.restore());

    it("Retornar um objeto da função findById", async () => {
      const response = await ProductModel.findById(1);
      expect(response).to.be.a("object");
    });

    it("Retornar o item referente ao id informado", async () => {
      const response = await ProductModel.findById(1);
      expect(response).to.be.deep.equal({ id: 1, name: "teste de produto1" });
    });
  });

  describe("Testando retorno do addProduct", () => {
    const payloadProduct = [{ name: 'badoque' }];
    beforeEach(async () => {
      await sinon.stub(connection, "execute").resolves(payloadProduct);
    });

    afterEach(async () => await connection.execute.restore());

    it("Retornar um objeto da função addProduct", async () => {
      const response = await ProductModel.addProduct(payloadProduct);
      expect(response).to.be.a("object");
    });
  });

  describe("Testando retorno do editProduct", () => {
    const payloadProduct = [{ id: 1, name: "badoque" }];
    beforeEach(async () => {
      await sinon.stub(connection, "execute").resolves(payloadProduct);
    });

    afterEach(async () => await connection.execute.restore());

    it("Retornar um objeto da função editProduct", async () => {
      const response = await ProductModel.editProduct(payloadProduct);
      expect(response).to.be.a("object");
    });

     it("O objeto possui as propriedades 'id', 'name'", async () => {
       const response = await ProductModel.editProduct(payloadProduct);
       expect(response).to.include.all.keys("id", "name");
     });
  });

  describe("Testando retorno do deleteProduct", () => {
    const payloadProduct = [[]];
    beforeEach(async () => {
      await sinon.stub(connection, "execute").resolves(payloadProduct);
    });

    afterEach(async () => await connection.execute.restore());

    it("Retornar um array vazio", async () => {
      const response = await ProductModel.deleteProduct(1);
      expect(response).to.be.empty;
    });
  });

  describe("Testando retorno do searchProduct", () => {
    const payloadProduct = [{
      findProducts: {
        id: 1,
        name: 'Teste de produto'
      }
    }];
    beforeEach(async () => {
      await sinon.stub(connection, "execute").resolves(payloadProduct);
    });

    afterEach(async () => await connection.execute.restore());

    it("Retorna um array com o objeto localizado", async () => {
      const response = await ProductModel.searchProduct('Teste');
      expect(response).to.include.all.keys("findProducts");
    });
  });

});
