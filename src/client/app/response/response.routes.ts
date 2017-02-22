import { Routes } from '@angular/router';

import { ResponsePageComponent }  from './response-page/response-page.component';

export const responseRouterConfig: Routes = [
  {path: ':query', component: ResponsePageComponent}
];