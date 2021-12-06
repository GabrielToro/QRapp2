import { browser, element, by } from 'protractor';

describe('Prueba olvide contrasenha', ()=>{
    // funcion para acceder a la pagina olvide contrasenha
    beforeEach(() =>{
        browser.get("/olvide-contrasenha");
    });
    // prueba
    it("Que haya un campo de texto de usuario",()=>{
        expect(element(by.css(".usuario ion-label")).getText()).toContain("Usuario");
    });
});