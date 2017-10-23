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
        image: 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/3_3.png',
        //is_stereo: true
      });
    }
  }


}
