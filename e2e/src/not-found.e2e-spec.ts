import { browser, element, by } from 'protractor';

describe('Prueba error 404', ()=>{
    // funcion para acceder a la pagina error 404
    beforeEach(() =>{
        browser.get("/logi");
    });
    // prueba
    it("La pagina 404 debe tener un body",()=>{
        expect(element(by.css(".body h1")));
    });
});