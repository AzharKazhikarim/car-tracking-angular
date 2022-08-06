import { CarInterface } from './../../models/car';
import { MapServiceService } from './../../services/map-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private service: MapServiceService) {}

  cars!: CarInterface[];

  ngOnInit(): void {
    this.getCars();
  }
  getCars() {
    this.service.getCars().subscribe((e) => {
      this.cars = e;
    });
  }
}
