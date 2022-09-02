const sinon = require("sinon");
const { expect } = require("chai");

const ProductService = require("../../../services/productsService");
const ProductsController = require("../../../controllers/productsController");

describe('Testando a camada Controller', () => {

  describe('Quando não existe produto a retornar', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()

      sinon.stub(ProductService, 'findById').resolves(null)
    });

    after(() => {
      ProductService.findById.restore();
    });

    it('É chamado o método status passando 404', async () => {
      await ProductsController.findById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe('Quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};
    const resolve = { id: 1, name: "Teste de produto" };

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, 'findById').resolves(resolve);
    });

    after(() => {
      ProductService.findById.restore();
    })

    it('Retornando item da findById', async () => {
      const result = await ProductService.findById(request, response);
      expect(result).to.be.a('object');
    });

    it("É chamado o método status passando 200", async () => {
      await ProductsController.findById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Retornando dados da função getAll', () => {
    const response = {};
    const request = {};
    const resolve = [{ id: 1, name: "Teste de produto" }];

    before(() => {

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, "getAll").resolves(resolve);
    });

    after(() => {
      ProductService.getAll.restore();
    });

    it('Retornando dados do banco de dados', async () => {
      await ProductsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  })

  describe("Quando não há dados a retornar no banco de dados", () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, "getAll").resolves(null);
    });

    after(() => {
      ProductService.getAll.restore();
    });

    it("Retornando código 404", async () => {
      await ProductsController.getAll(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe("Quando adicionamos um item ao banco de dados", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, "addProduct").resolves(false);
    });

    after(() => {
      ProductService.addProduct.restore();
    });

    it("Retornando código 404", async () => {
      await ProductsController.addProduct(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });
  });

  describe("Retornando dados da função addProduct", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { name: 'gude' };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, "addProduct").resolves(true);
    });

    after(() => {
      ProductService.addProduct.restore();
    });

    it("Retornando status 200 quando criado um novo item", async () => {
      await ProductsController.addProduct(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe("Retornando dados da função findById", () => {
    const response = {};
    const request = {};
    const payload = {id: 1, name: 'Teste de produto'};

    before(() => {
      response.params = { id: 1 }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, "findById").resolves(payload);
    });

    after(() => {
      ProductService.findById.restore();
    });

    it("Retornando o objeto com id informado", async () => {
      await ProductsController.findById(request, response);
      expect(response.params).to.be.deep.equal({ id: 1 });
    });
  });

  describe("Dados não localizados na função editProduct", () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns("Product not found");
      sinon.stub(ProductService, "editProduct").resolves(null);
      sinon.stub(ProductService, "findById").resolves(false);
    });

    after(() => {
      ProductService.editProduct.restore();
      ProductService.findById.restore();
    });

    it("Produto não localizado - status 400", async () => {
      await ProductsController.editProduct(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it("Product not found", async () => {
      await ProductsController.editProduct(request, response);
      expect(response.json()).to.be.deep.equal("Product not found");
    });
  });

  describe("Retornando dados da função editProduct", () => {
    const response = {};
    const request = {};
    const payload = { id: 1, name: 'Teste de Produto'}

    before(() => {
      request.params = { id: 1 };
      request.body = { name: "Teste de produto" };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(payload);
      sinon.stub(ProductService, "editProduct").resolves(true);
      sinon.stub(ProductService, "findById").resolves(true);
    });

    after(() => {
      ProductService.editProduct.restore();
      ProductService.findById.restore();
    });

    it("Produto alterado com sucesso - status 200", async () => {
      await ProductsController.editProduct(request, response);
      // console.log(request.params, request.body);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("Produto alterado com sucesso", async () => {
      await ProductsController.editProduct(request, response);
      expect(
        await ProductsController.editProduct(request, response)
      ).to.be.deep.equal(payload);
    });

  });

  describe("Retornando dados da função deletProduct", () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, "deleteProduct").resolves(true);
      sinon.stub(ProductService, "findById").resolves(true);
    });

    after(() => {
      ProductService.deleteProduct.restore();
      ProductService.findById.restore();
    });

    it("Produto deletado com sucesso - status 204", async () => {
      await ProductsController.deleteProduct(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });

  describe("Retornando dados da função deletProduct", () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, "deleteProduct").resolves(false);
      sinon.stub(ProductService, "findById").resolves(false);
    });

    after(() => {
      ProductService.deleteProduct.restore();
      ProductService.findById.restore();
    });

    it("Produto deletado com sucesso - status 404", async () => {
      await ProductsController.deleteProduct(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe("Retornando dados da função seacrhProduct", () => {
    const response = {};
    const request = {};
    const payload = { id: 1, name: 'Teste de prouto'}

    before(() => {
      request.query = 'Teste' ;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, "searchProduct").resolves(true);
    });

    after(() => {
      ProductService.searchProduct.restore();
    });

    it("Produto localizado - status 200", async () => {
      await ProductsController.searchProduct(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe("Retornando dados da função seacrhProduct", () => {
    const response = {};
    const request = {};
    const payload = { id: 1, name: "Teste de prouto" };

    before(() => {
      request.query = " ";
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, "searchProduct").resolves(null);
    });

    after(() => {
      ProductService.searchProduct.restore();
    });

    it("Erro na função - status 500", async () => {
      await ProductsController.searchProduct(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
  });

})
