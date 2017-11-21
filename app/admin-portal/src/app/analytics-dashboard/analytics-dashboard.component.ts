import { Component, OnInit } from '@angular/core';
import { AnalyticsDashboardService } from '../services/analytics-dashboard.service';
declare var gapi: any;
declare var google: any;

@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.css']
})
export class AnalyticsDashboardComponent implements OnInit {
  loading: boolean = true;
  
  constructor() { }

  ngOnInit() {
   
    
    gapi.analytics.ready(function () {
      
      // Step 3: Authorize the user.

      var CLIENT_ID = '28470806434-1mskfeba3i1j64j3k7vqel8voejp1s14.apps.googleusercontent.com';

      gapi.analytics.auth.authorize({
        container: 'auth-button',
        clientid: CLIENT_ID,
      });

      // Step 4: Create the view selector.

      var viewSelector = new gapi.analytics.ViewSelector({
        container: 'view-selector'
      });

      // Step 5: Create the timeline chart.

      var timeline = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:date',
          'metrics': 'ga:sessions',
          'start-date': '30daysAgo',
          'end-date': 'today',
        },
        chart: {
          type: 'LINE',
          container: 'timeline',
          options: {
            'legend': 'left',
            'title': 'Number of Visits',
            // 'is3D':true,
            // 'width':400,
            // 'height':300
            width: '100%',
            // pieHole: 4 / 9
            colors: ['lightseagreen'],
            fontName: 'Muli',
            titleTextStyle: {
              // color: <string>,
              fontName: 'Muli',
              fontSize: 20,
              // bold: true
              // italic: <boolean> 
            },
            series: {
              // Gives each series an axis name that matches the Y-axis below.
              0: { axis: 'Sessions' },
            },

            // vAxis: {
            //   title: 'Sessions'
            // },
            // hAxis: {
            //   title: 'Time'
            // },

          }
        }
      });

      var patternClicks = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:productName',
          'metrics': 'ga:productListClicks',
          'start-date': '7daysAgo',
          'end-date': 'today',
          sort: '-ga:productListClicks',
          'max-results': 14
        },
        chart: {
          type: 'COLUMN',
          container: 'patternClicks',
          options: {
            'legend': 'left',
            'title': 'Top Viewed Products',
            // 'is3D':true,
            // 'width':400,
            // 'height':300
            width: '100%',
            colors: ['#DD0330'],
            // pieHole: 4 / 9
            fontName: 'Muli',
            titleTextStyle: {
              // color: <string>,
              fontName: 'Muli',
              fontSize: 20,
              // bold: true
              // italic: <boolean> 
            },
            
            
          }
        }
      });

      var userType = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:userType',
          'metrics': 'ga:users',
          'start-date': '30daysAgo',
          'end-date': 'today',
        },
        chart: {
          type: 'PIE',
          container: 'usertype',
          options: {
            'legend': 'left',
            'title': 'User Type',
            // 'is3D':true,
            // 'width':400,
            // 'height':300
            width: '100%',
            colors: ["#FFAA00","#2089B2"],
            // pieHole: 4 / 9
            fontName: 'Muli',
            titleTextStyle: {
              // color: <string>,
              fontName: 'Muli',
              fontSize: 20,
              // bold: true
              // italic: <boolean> 
            }
          }
        }
      });

      var userCountry = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: 'ga:sessions',
          dimensions: 'ga:country',
          'start-date': '30daysAgo',
          'end-date': 'today',
          'max-results': 6,
          sort: '-ga:sessions'
        },
        chart: {
          container: 'userCountry',
          type: 'PIE',
          options: {
            'legend': 'left',
            'title': 'User Location',
            // 'is3D':true,
            // 'width':400,
            // 'height':300
            width: '100%',
            pieHole: 4 / 9,
            fontName: 'Muli',
            titleTextStyle: {
              // color: <string>,
              fontName: 'Muli',
              fontSize: 20,
              // bold: true
              // italic: <boolean> 
            }
          }
        }
      });

      var userBrowser = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: 'ga:sessions',
          dimensions: 'ga:browser',
          'start-date': '30daysAgo',
          'end-date': 'today',
          'max-results': 8,
          sort: 'ga:sessions'
        },
        chart: {
          container: 'userBrowser',
          type: 'PIE',
          options: {
            'legend': 'left',
            'title': 'Top Browser',
            // 'is3D':true,
            // 'width':400,
            // 'height':300
            width: '100%',
            pieHole: 4 / 9,
            fontName: 'Muli',
            titleTextStyle: {
              // color: <string>,
              fontName: 'Muli',
              fontSize: 20,
              // bold: true
              // italic: <boolean> 
            }
          }
        }
      });


      var ecommerce1 = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: 'ga:itemRevenue,ga:itemQuantity,ga:buyToDetailRate',
          dimensions: 'ga:productName',
          'start-date': '7daysAgo',
          'end-date': 'today',
          'max-results': 6,
          sort: '-ga:itemRevenue'
        },
        chart: {
          container: 'ecommerce1',
          type: 'TABLE',
          options: {
            'legend': 'left',
            'title': 'Product Analysis',
            // 'is3D':true,
            // 'width':400,
            // 'height':300
            width: '100%',
            fontName: 'Muli',
            titleTextStyle: {
              // color: <string>,
              fontName: 'Muli',
              fontSize: 20,
              // bold: true
              // italic: <boolean> 
            }
          }
        }
      });

      var ecommerce3 = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: 'ga:sessions',
          dimensions: 'ga:shoppingStage',
          'start-date': '7daysAgo',
          'end-date': 'today',
        },
        chart: {
          container: 'ecommerce3',
          type: 'BAR',
          options: {
            'legend': 'left',
            'title': 'Top Products',
            // 'is3D':true,
            // 'width':400,
            // 'height':300
            width: '100%',
            fontName: 'Muli',
            titleTextStyle: {
              // color: <string>,
              fontName: 'Muli',
              fontSize: 20,
              // bold: true
              // italic: <boolean> 
            }
          }
        }
      });

      /*var ecommerce2 = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: 'ga:cartToDetailRate',
          dimensions: 'ga:productName',
          'start-date': '7daysAgo',
          'end-date': 'today',
          'max-results': 6,
        },
        chart: {
          container: 'ecommerce2',
          type: 'PIE',
          options: {
            'legend': 'left',
            'title': 'Top Products',
            // 'is3D':true,
            // 'width':400,
            // 'height':300
            width: '100%',
            fontName: 'Muli',
            titleTextStyle: {
              // color: <string>,
              fontName: 'Muli',
              fontSize: 20,
              // bold: true
              // italic: <boolean> 
            }
          }
        }
      });*/



      // Step 6: Hook up the components to work together.

      gapi.analytics.auth.on('success', function (response) {
        viewSelector.execute();
      });

      viewSelector.on('change', function (ids) {

        var newIds = {
          query: {
            ids: ids
          }
        }
        timeline.set(newIds).execute();
      });

      viewSelector.on('change', function (ids) {

        var newIds = {
          query: {
            ids: ids
          }
        }
        patternClicks.set(newIds).execute();
      });


      viewSelector.on('change', function (ids) {

        var newIds = {
          query: {
            ids: ids
          }
        }
        userCountry.set(newIds).execute();
      });


      viewSelector.on('change', function (ids) {

        var newIds = {
          query: {
            ids: ids
          }
        }
        userType.set(newIds).execute();
      });


      viewSelector.on('change', function (ids) {

        var newIds = {
          query: {
            ids: ids
          }
        }
        userBrowser.set(newIds).execute();
        this.loading = false;
      });

      viewSelector.on('change', function (ids) {
        
        var newIds = {
          query: {
            ids: ids
          }
        }
        ecommerce1.set(newIds).execute();
        this.loading = false;
      });

      viewSelector.on('change', function (ids) {
        
        var newIds = {
          query: {
            ids: ids
          }
        }
        ecommerce3.set(newIds).execute();
        this.loading = false;
      });



    });
  }

}
