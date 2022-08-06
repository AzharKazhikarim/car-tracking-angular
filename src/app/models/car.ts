export interface CarInterface {
  carID?: number;
  startPoint: {
    lat: number;
    lng: number;
  };
  endPoint: {
    lat: number;
    lng: number;
  };
  status: string;
  infringement: {
    speed: number;
    status: boolean;
  };
  fuel: number;
}
