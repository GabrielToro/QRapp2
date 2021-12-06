import { browser, element, by } from 'protractor';

describe('Prueba login', ()=>{
    // funcion para acceder a la pagina login
    beforeEach(() =>{
        browser.get("/login");
    });
    // prueba
    it("login debe tener al menos un campo de texto",()=>{
        expect(element(by.css(".login ion-label")).getText()).toContain("Usuario");
    });
});