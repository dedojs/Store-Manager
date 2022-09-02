const sinon = require("sinon");
const { expect } = require("chai");

const ProductService = require("../../../services/productsService");
const ProductModel = require("../../../models/productsModel");

describe("Testando a camada Service", () => {

  describe("Quando não existe produtos cadastrados", () => {

    before(() => {
      const execute = [];
      sinon.stub(ProductModel, "getAll").resolves(execute);
    });

    afterEach(() => ProductModel.getAll.restore());

    it("retorna um array vazio", async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.length(0);
    });

  });

  describe("Quando existem produtos cadastrados", () => {
    before(() => {

      const execute = [
        {
          id: 1,
          name: "Teste de produto 1",
        },
        {
          id: 2,
          name: "Teste de produto 2",
        },
      ];
      sinon.stub(ProductModel, "getAll").resolves(execute);
    });

    afterEach(async () => {
      await ProductModel.getAll.restore()
    });

    it("retorna um array com objetos", async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.length(2);
    });
  });

  describe('Quando não existe produto com ID informado', () => {

    before(() => {
      const execute = null
      sinon.stub(ProductModel, "findById").resolves(execute);
    })

    afterEach(() => ProductModel.findById.restore());

    it("retorna um objeto vazio", async () => {
      const response = await ProductService.findById('a');
      expect(response).to.be.equal(null);
    });

  });

  describe("Quando existe um produto com ID cadastrado", () => {
     const id = 1
     before(() => {
       const execute = {
         id,
         name: 'Tesde de produto 1'
       };
       sinon.stub(ProductModel, "findById").resolves(execute);
     });

     afterEach(() => ProductModel.findById.restore());

     it("retorna um objeto vazio", async () => {
       const response = await ProductService.findById(id);
       expect(response).to.be.all.keys('id', 'name');
     });
  });

  describe("Quando um produto é cadastrado com sucesso", () => {
    const payloadProduct = [{ name: "badoque" }];
    before(() => {
      sinon.stub(ProductModel, "addProduct").resolves(payloadProduct);
    });

    afterEach(() => ProductModel.addProduct.restore());

    it("retorna um objeto vazio", async () => {
      const response = await ProductService.addProduct(payloadProduct);
      expect(response).to.be.equal(payloadProduct);
    });
  });

  describe("Quando um produto é editado com sucesso", () => {
    const payloadProduct = { id: 1, name: "badoque" };
    before(() => {
      sinon.stub(ProductModel, "editProduct").resolves(payloadProduct);
    });

    afterEach(() => ProductModel.editProduct.restore());

    it("retorna um objeto com as chaves 'id', 'name'", async () => {
      const response = await ProductService.editProduct(payloadProduct);
      expect(response).to.include.all.keys("id", "name");
    });
  });

  describe("Quando um produto é deletado com sucesso", () => {
    const payloadProduct = [{ id:2, name:'bazuca' }];
    before(() => {
      sinon
        .stub(ProductModel, "deleteProduct").resolves(payloadProduct);
    });

    afterEach(() => ProductModel.deleteProduct.restore());

    it("retorna um array sem o produto deletado", async () => {
      const response = await ProductService.deleteProduct(1);
      expect(response).to.be.deep.equal(payloadProduct);
    });
  });

  describe("Quando um produto é localizado pelo nome", () => {
    const payloadProduct = [
      {
        id: 1,
        name: "Teste de produto",
      },
    ];
    before(() => {
      sinon.stub(ProductModel, "searchProduct").resolves(payloadProduct);
    });

    afterEach(() => ProductModel.searchProduct.restore());

    it("retorna um array com o produto pesquisado", async () => {
      const response = await ProductService.searchProduct('Teste');
      expect(response).to.be.deep.equal(payloadProduct);
    });
  });

});
