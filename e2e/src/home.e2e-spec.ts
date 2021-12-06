import { browser, element, by } from 'protractor';

describe('Prueba home', () =>{
    // codigo de configuración para acceder a la pagina
    beforeEach(() =>{
        browser.get("/");
    });
    // prueba 1
    it("El home debe tener un boton",()=>{
        expect(element(by.css(".boton ion-button")).getText()).toContain("Iniciar sesión");
    });
});