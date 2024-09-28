import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';

@Component({
    templateUrl: './edit.component.html' // Make sure the path is correct
})
export class EditComponent implements OnInit {
    account = this.accountService.accountValue; // Retrieve account value
    form: FormGroup; // Define form group
    loading = false; // Loading state
    submitted = false; // Form submission state
    deleting = false; // Deleting state

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        // Initialize the form
        this.form = this.formBuilder.group({
            firstname: [this.account.acc_firstname, Validators.required],
            lastname: [this.account.acc_lastname, Validators.required],
            email: [this.account.acc_email, [Validators.required, Validators.email]],
            phone: [this.account.acc_pnumber, [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],
            role: [this.account.acc_role, Validators.required],
           // status: [this.account.acc_status, Validators.required]
        });     
    }

    // Convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
    
        if (this.form.invalid) {
            console.log('Form invalid:', this.form.errors);
            return;
        }
    
        if (!this.account.id) {
            console.error('Account ID is missing');
            this.alertService.error('Account ID is missing');
            this.loading = false;
            return;
        }
    
        this.loading = true;
        console.log('Submitting form data:', this.form.value); // Log the form data being submitted
    
        this.accountService.update(this.account.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: (updatedAccount) => {
                    console.log('Updated account:', updatedAccount); // Log updated account details
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    onDelete() {
        if (confirm('Are you sure you want to delete this account?')) {
            this.deleting = true;
            this.accountService.delete(this.account.id)
                .pipe(first())
                .subscribe(() => {
                    this.alertService.success('Account deleted successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['/accounts']);
                });
        }
    }

    // Define the goBack method
    goBack() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}
