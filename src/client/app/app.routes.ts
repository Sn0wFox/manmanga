import { Routes } from '@angular/router';

export const rootRouterConfig: Routes = [
  { path: 'home', loadChildren: './search/search.module#SearchModule' },  // Lazy loaded module
  { path: 'about', loadChildren: './about/about.module#AboutModule' },    // Lazy loaded module
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

/**
 * Example of a route with children.
 */
// { path: 'github', component: RepoBrowserComponent,
//   children: [
//     { path: '', component: RepoListComponent },
//     { path: ':org', component: RepoListComponent,
//       children: [
//         { path: '', component: RepoDetailComponent },
//         { path: ':repo', component: RepoDetailComponent }
//       ]
//     }]
// }