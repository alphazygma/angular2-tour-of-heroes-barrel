import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroListComponent, HeroDetailComponent, HeroService } from './modules/hero';

@Component({
    selector:   'my-app',
    directives: [ROUTER_DIRECTIVES],
    providers:  [
        ROUTER_PROVIDERS,
        HeroService
    ],
    template:   `
<h1>{{title}}</h1>
<nav>
    <a [routerLink]="['Dashboard']">Dashboard</a>
    <a [routerLink]="['HeroList']">Hero List</a>
</nav>
<router-outlet></router-outlet>
`,
    styleUrls: ['app/app.component.css']
})
@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/hero-list',
        name: 'HeroList',
        component: HeroListComponent
    },
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    }
])
export class AppComponent {
    title: string = 'Tour of Heroes';
}