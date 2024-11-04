import { Routes } from '@angular/router';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '', 
        loadComponent:() => LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./domains/products/pages/list/list.component'),
            },
            {
                path: 'about',
                loadComponent:() => import('./domains/info/pages/about/about.component')
            },
            {
                path: 'product/:id',
                loadComponent:() => import('./domains/products/pages/detail/detail.component')
            }
        ]
    },
    {
        path: '**',
        loadComponent: ()=> NotFoundComponent
    }

];
