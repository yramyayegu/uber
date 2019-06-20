//app.component.ts

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent,AgmCoreModule } from '@agm/core';


import {FormGroup, FormControl, Validators}  from '@angular/forms';
import { stringify } from '@angular/core/src/render3/util';
import { variable } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Uber';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
dist :number;
cost : number;

pool:number;
go : number;
moto : number;
display='none'; //default Variable

  @ViewChild('search')
    public searchElementRef: ElementRef;
    clat:any;
    clng:any;
    public origin: any;
    public destination: any;
  ll: { lat: any; lng: any; };
  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone  ) {  }
  ngOnInit() {

    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.clng = +pos.coords.longitude;
        this.clat = +pos.coords.latitude;
        this.getDirection(this.clat,this.clng,0,0);
      });
    }
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getDirection(this.clat,this.clng,this.latitude,this.longitude);
          this.zoom = 12;
          this.calculateDistance(this.clat,this.clng,this.latitude,this.longitude);
        });
      });
    });
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.ll = { lat: latitude, lng: longitude };
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  getDirection(x,y,a,b) {
    var person = {lat:x,lng:y}; 
    this.origin = person;
    this.destination = { lat: a, lng: b }; 
  }

  calculateDistance(x,y,a,b) {
    const origin = new google.maps.LatLng(x, y);
    const destination = new google.maps.LatLng(a, b);
    const dist = google.maps.geometry.spherical.computeDistanceBetween;
    const distance = (dist(origin, destination)/1000).toFixed(1) ;
    console.log(distance);   
    setTimeout(()=>{    
      this.openModalDialog(distance);
 }, 3000);
     
  }

  openModalDialog(x){
    const y = Math.round(x);
    this.pool = (y*11)/4;
    this.go=y*11;
    this.moto=(y*11)/2;
    
    this.display='block'; //Set block css
 }

 closeModalDialog(){
  this.display='none'; //set none css after close dialog
 }

}