import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app-routes-config';
import { HomeModule } from './home/home.module';
import { ProblemModule } from './problem/problem.module';
import { AdviceModule } from './advice/advice.module';
import { TermsAndConditionsModule } from './terms-and-conditions/terms-and-conditions.module';
import { ConversationModule } from './conversation/conversation.module';
import { AdviceFormModule } from './advice/advice-form/advice-form.module';
import { ProblemFormModule } from './problem/problem-form/problem-form.module';

@NgModule({
    imports: [
        HomeModule,
        AdviceModule,
        ProblemModule,
        TermsAndConditionsModule,
        ConversationModule,
        AdviceFormModule,
        ProblemFormModule,
        RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
