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
    gapi.analytics.ready(function () {

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

      var patternClicks = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:productName',
          'metrics': 'ga:productAddsToCart',
          'start-date': '30daysAgo',
          'end-date': 'today',
        },
        chart: {
          type: 'LINE',
          container: 'patternClicks'
        }
      });



      var userType = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:userType',
          'metrics': 'ga:users',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'PIE',
          container: 'usertype'
        }
      });

      var userType = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:userType',
          'metrics': 'ga:users',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'PIE',
          container: 'usertype'
        }
      });

      var userCountry = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: 'ga:sessions',
          dimensions: 'ga:country',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
          'max-results': 6,
          sort: '-ga:sessions'
        },
        chart: {
          container: 'userCountry',
          type: 'PIE',
          options: {
            width: '100%',
            pieHole: 4 / 9
          }
        }
      });

      var userBrowser = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: 'ga:pageviews',
          dimensions: 'ga:browser',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
          'max-results': 6,
          sort: 'ga:pageviews'
        },
        chart: {
          container: 'userBrowser',
          type: 'PIE',
          options: {
            width: '100%',
            pieHole: 4 / 9
          }
        }
      });




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
      });
    });
  }

}
