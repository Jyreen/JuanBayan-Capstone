import { Component } from '@angular/core';
import { CampaignService } from '../_services/campaign.service'; // Update path as necessary
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent {
  createCampaignForm: FormGroup;
  selectedFile: File | null = null; // For storing the selected image file
  loading = false;
  submitted = false;
  errorMessage: string | null = null;
  campaigns: any[] = []; // Added campaigns property

  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private router: Router
  ) {
    this.createCampaignForm = this.formBuilder.group({
      Acc_ID: ['', Validators.required],
      Campaign_Name: ['', Validators.required],
      Campaign_Description: ['', Validators.required],
      Campaign_TargetFund: ['', Validators.required],
      Campaign_Start: ['', Validators.required],
      Campaign_End: ['', Validators.required],
      Campaign_Status: ['', Validators.required],
      Campaign_Category: ['', Validators.required],
      Campaign_Feedback: [''], // Optional field
      Campaign_Image: [null] // For the image file
    });
  }

  // Getter for form controls
  get f() {
    return this.createCampaignForm.controls;
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Open create campaign modal
  openCreateCampaignModal() {
    // Logic to open the modal (if applicable)
    console.log("Open create campaign modal");
  }

  // Form submit function
  createCampaign() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.createCampaignForm.invalid) {
      return;
    }

    this.loading = true;

    // Prepare form data for submission
    const formData = new FormData();
    formData.append('Acc_ID', this.f['Acc_ID'].value);
    formData.append('Campaign_Name', this.f['Campaign_Name'].value);
    formData.append('Campaign_Description', this.f['Campaign_Description'].value);
    formData.append('Campaign_TargetFund', this.f['Campaign_TargetFund'].value);
    formData.append('Campaign_Start', this.f['Campaign_Start'].value);
    formData.append('Campaign_End', this.f['Campaign_End'].value);
    formData.append('Campaign_Status', this.f['Campaign_Status'].value);
    formData.append('Campaign_Category', this.f['Campaign_Category'].value);
    formData.append('Campaign_Feedback', this.f['Campaign_Feedback'].value || '');

    // Append the image file if selected
    if (this.selectedFile) {
      formData.append('Campaign_Image', this.selectedFile, this.selectedFile.name);
    }

    // Call the create method from the CampaignService
    this.campaignService.create(formData).subscribe(
      (response) => {
        this.router.navigate(['/campaigns']); // Redirect to the campaign list after success
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
}
