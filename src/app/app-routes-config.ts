import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdviceComponent } from './advice/advice.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ConversationComponent } from './conversation/conversation.component';
import { AdviceFormComponent } from './advice/advice-form/advice-form.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'advice',
        component: AdviceComponent
    },
    {
        path: 'advice-form/:id',
        component: AdviceFormComponent
    },
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
    },
    {
        path: 'conversation/:type/:id',
        component: ConversationComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
