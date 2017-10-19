import { Component, OnInit } from '@angular/core';
declare var VRView: any;
@Component({
  selector: 'app-virtual-reality',
  templateUrl: './virtual-reality.component.html',
  styleUrls: ['./virtual-reality.component.css']
})
export class VirtualRealityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.addEventListener('load', onVrViewLoad)
    function onVrViewLoad() {
      var vrView = new VRView.Player('#vrview', {
        image: './assets/images/360.png',
        is_stereo: true
      });
    }
  }


}
