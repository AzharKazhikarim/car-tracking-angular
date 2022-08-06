import { MapServiceService } from '../../services/map-service.service';
import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';
import 'leaflet-routing-machine';
import { Icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = new Icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

//Defaults
const tiles = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
    minZoom: 3,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
);
const icon = L.icon({
  iconUrl: 'assets/images/red.png',
  popupAnchor: [13, 0],
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private map: any;

  constructor(private service: MapServiceService) {}

  private initMap(): void {
    this.map = L.map('map', {
      zoomControl: true,
      center: [51.12820816040039, 71.43041229248047],
      zoom: 12,
      markerZoomAnimation: false,
    });
    tiles.addTo(this.map);
    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(this.map);

    // // current user location
    // this.getCurrentPosition().subscribe((position: any) => {
    //   this.map.flyTo([position.latitude, position.longitude], 15);
    //   const marker = L.marker([position.latitude, position.longitude], {
    //     icon,
    //   }).bindPopup('Мое местонахождение');
    //   marker.addTo(this.map);
    // });
  }

  ngAfterViewInit(): void {
    this.initMap();
    console.log('Map control ' + this.service.makeMarkers(this.map));
    Marker.prototype.options.icon = iconDefault;
    setTimeout(() => this.getCarRoute());
  }

  getCarRoute() {
    this.service.getCarRoute().subscribe((e) => {
      console.log(e[0].carID);
      let control = L.Routing.control({
        waypoints: [
          L.latLng(e[0].startPoint.lat, e[0].startPoint.lng),
          L.latLng(e[0].endPoint.lat, e[0].endPoint.lng),
        ],
      });
      this.map.removeControl(control);
    });
  }

  //current position
  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }
}
