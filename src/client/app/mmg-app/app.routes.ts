import { Routes } from '@angular/router';

import { searchRouterConfig }   from '../search/search.routes';
import { responseRouterConfig } from '../response/response.routes';

export const rootRouterConfig: Routes = [
  { path: 'home', children: [...searchRouterConfig] },                  // Eagerly loaded module (on start)
  { path: 'search', children: [...responseRouterConfig] },              // Eagerly loaded module (on start)
  { path: 'about', loadChildren: '../about/about.module#AboutModule' }, // Lazily loaded module (on navigate)
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