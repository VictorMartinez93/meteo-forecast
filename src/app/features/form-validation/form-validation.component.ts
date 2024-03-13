import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../shared/services/layout.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionStorageService } from '../../shared/services/session-storage.service';
import { CONSTANTS } from '../../core/constants';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {
  public formGroup!: FormGroup;
  public submitted: boolean = false;
  public showConfirmation: boolean = false;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly fb: FormBuilder,
    private readonly sessionStorageService: SessionStorageService
  ) {
    layoutService.breadcrumb.set([{ label: 'Form Validation', routerLink: '/form-validation' }]);
  }

  ngOnInit() {
    if (this.sessionStorageService.get(CONSTANTS.FORM_STATUS)) {
      this.showConfirmation = true;
    } else {
      this.initForm();
    }
  }

  public submit(): void {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.showConfirmation = true;
      this.sessionStorageService.set(CONSTANTS.FORM_STATUS, true);
    }
  }

  private initForm(): void {
    const urlRegex = /\b(?:https?):\/\/[\w-]+(\.[\w-]+)+\S*/;
    const amountRegex = /^(?:€\d+(?:[,.]\d*)?|\d+(?:[,.]\d+)?€?)$/;

    this.formGroup = this.fb.group({
      emails: [null, [Validators.required, this.validateEmails]],
      amount: [null, [Validators.required, Validators.pattern(amountRegex)]],
      url: [null, [Validators.required, Validators.pattern(urlRegex)]]
    });
  }

  private validateEmails(control: FormControl) {
    const emails: string[] = control.value?.split(',');
    let isValid;
    if (emails?.length) {
      isValid = emails?.every((entry: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailRegex.test(entry.trim());
      });
    } else {
      // Valid as we don't have any and required is also applied.
      isValid = true;
    }

    return isValid ? null : { invalidEmails: true };
  }

}
