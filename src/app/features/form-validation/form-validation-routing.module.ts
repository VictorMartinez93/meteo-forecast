import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormValidationComponent } from './form-validation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: FormValidationComponent,
            },
            { path: '**', redirectTo: 'form-validation' }
        ])
    ],
    exports: [RouterModule]
})
export class FormValidationRoutingModule { }