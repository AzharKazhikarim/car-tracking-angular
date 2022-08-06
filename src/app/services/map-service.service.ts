import { Observable } from 'rxjs';
import { CarInterface } from './../models/car';
import 'leaflet-routing-machine';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
const icon = L.icon({
  iconUrl: 'assets/images/marker-icon.png',
  shadowUrl: 'assets/images/marker-shadow.png',
  popupAnchor: [13, 0],
});
@Injectable({
  providedIn: 'root',
})
export class MapServiceService {
  baseUrl: string = 'http://localhost:3500/data';
  constructor(private http: HttpClient) {}

  makeMarkers(map: L.Map): void {
    this.http.get(this.baseUrl).subscribe((res: any) => {
      for (const data of res) {

        // const startMarker = L.marker(
        //   [data.startPoint.lat, data.startPoint.lng],
        //   { icon }
        // ).bindPopup('Начало движения');
        // const endMarker = L.marker([data.endPoint.lat, data.endPoint.lng], {
        //   icon,
        // }).bindPopup('Конец движения');
        // startMarker.addTo(map);
        // endMarker.addTo(map);

        let control = L.Routing.control({
          waypoints:[
            L.latLng(data.startPoint.lat, data.startPoint.lng),
            L.latLng(data.endPoint.lat, data.endPoint.lng)
          ],
          collapsible:false,
        }).addTo(map)
      }

    });
  }
//  setTimeout(()=>map.removeControl(control),5000)

  getCars(): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>(this.baseUrl);
  }
  getCarRoute():Observable<CarInterface>{
    return this.http.get<CarInterface>(`${this.baseUrl}?carID=1`);
  }


}
