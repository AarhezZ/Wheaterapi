import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../services/covid.service';
import { Covid } from './covid.inteface';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  covidInfo: Covid[] = [];
  constructor(private climaService: ClimaService, private fireService: FirestoreService) { }

  ngOnInit(): void {
    this.climaService.getClima().subscribe(clima => {

      this.covidInfo = clima
      console.log(this.covidInfo);

    });


  }

  LogOut() {
    console.log('algo');

    this.fireService.logout();
  }

}
