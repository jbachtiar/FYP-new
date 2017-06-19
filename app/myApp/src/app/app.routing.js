"use strict";
var router_1 = require("@angular/router");
var user_components_1 = require("./components/user.components");
var about_components_1 = require("./components/about.components");
var appRoutes = [
    {
        path: '',
        component: user_components_1.UserComponent
    },
    {
        path: 'about',
        component: about_components_1.AboutComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map