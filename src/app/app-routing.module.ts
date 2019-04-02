import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app-routes-config';
import { HomeModule } from './home/home.module';
import { AdviceModule } from './advice/advice.module';
import { TermsAndConditionsModule } from './terms-and-conditions/terms-and-conditions.module';
import { ConversationModule } from './conversation/conversation.module';
import { AdviceFormModule } from './advice/advice-form/advice-form.module';

@NgModule({
    imports: [
        HomeModule,
        AdviceModule,
        TermsAndConditionsModule,
        ConversationModule,
        AdviceFormModule,
        RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
