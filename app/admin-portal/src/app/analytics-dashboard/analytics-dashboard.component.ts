import { Component, OnInit } from '@angular/core';
import { AnalyticsDashboardService } from '../services/analytics-dashboard.service';
declare var gapi: any;

@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.css']
})
export class AnalyticsDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    gapi.analytics.ready(function() {
      
        // Step 3: Authorize the user.
      
        var CLIENT_ID = '28470806434-70vkmrvmro0pe549gvegrmspcqkao219.apps.googleusercontent.com';
      
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
            'end-date': 'yesterday',
          },
          chart: {
            type: 'LINE',
            container: 'timeline'
          }
        });
      
        // Step 6: Hook up the components to work together.
      
        gapi.analytics.auth.on('success', function(response) {
          viewSelector.execute();
        });
      
        viewSelector.on('change', function(ids) {
          console.log("CHANGED")
          var newIds = {
            query: {
              ids: ids
            }
          }
          timeline.set(newIds).execute();
        });
      });
  }

}
