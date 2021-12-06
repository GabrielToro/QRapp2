import { Component, OnInit } from '@angular/core';
import { Clases } from 'src/app/interfaces/clases';
import { BdLocalService } from 'src/app/services/bd-local.service';

@Component({
  selector: 'app-ver-clases',
  templateUrl: './ver-clases.page.html',
  styleUrls: ['./ver-clases.page.scss'],
})
export class VerClasesPage implements OnInit {

  clases: Clases[] = [];
  
  constructor(private api: BdLocalService)  { }
  
  ngOnInit() {
    this.getClases();
  }

  ionViewWillEnter(){
    this.getClases();
  }
  
  getClases(){
    this.api.getClases().subscribe((data)=>{
      this.clases=data;
    });
  }


}
