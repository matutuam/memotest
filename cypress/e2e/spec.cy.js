/// <reference types="Cypress" />

const DIR_URL = "127.0.0.1:8080";
const estadoInicial = [];
const estadoDespuesDeReiniciar = [];

context("Memotest", () => {

  beforeEach(() => {
    cy.visit(DIR_URL);
  });

  describe("Verifica el memotest", () => {

    it("Verifica que todos los cuadros no sean iguales", () => {
      cy.get("div.cuadro").then(($cuadros) => {
        $cuadros.each((i, cuadro) => {
          estadoInicial.push(cuadro.classList);
        });
      });
  
      cy.visit(DIR_URL);
  
      cy.get("div.cuadro").then(($nuevosCuadros) => {
        $nuevosCuadros.each((i, nuevoCuadro) => {
          const estadoDespuesDeReiniciar = nuevoCuadro.classList;
          expect(estadoDespuesDeReiniciar).not.to.equal(estadoInicial);
        });
      });
    });

    it("Verfica que los cuadros estén dividos en pares del mismo color", () => {
      cy.visit(DIR_URL);

      cy.get("div.cuadro").should("have.length", 8).as("cuadros");

      cy.get("@cuadros").then(($cuadros) => {
        for (let i = 0; i < $cuadros.length; i+= 2) {
          const clasePrimerCuadro = $cuadros.eq(i).attr("class");
          const claseSegundoCuadro = $cuadros.eq(i + 1).attr("class");

          expect(clasePrimerCuadro).to.equal(claseSegundoCuadro);
        }
      });
    });

    it("Verifica que al seleccionar pares de cuadros erróneos se tapen nuevamente", () => {
      cy.visit(DIR_URL);

      cy.get("button#boton-jugar").click();

      cy.get("div.cuadro").as("cuadros");

      cy.get("@cuadros").eq(0).click();
      cy.get("@cuadros").eq(1).click();

      cy.get("@cuadros").should("have.class", "tapada");
    });
  });
});
