import { browser, element, by } from 'protractor';

describe('Prueba ver clases', ()=>{
    // funcion para acceder a la pagina ver clases
    beforeEach(() =>{
        browser.get("/verClases");
    });
    // prueba
    it("La pagina 404 debe tener un body",()=>{
        expect(element(by.css(".ion-text-center ion-title")));
    });
});