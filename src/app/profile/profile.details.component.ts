import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile.details.component.html',
  styleUrls: ['./profile.details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  account: any; // Define account type accordingly
  campaigns: any[]; // Define campaigns type accordingly

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    // Assuming you have logic to get the account details
    this.accountService.getAccountDetails().subscribe((accountDetails) => {
      this.account = accountDetails;
      this.loadCampaigns();
    });
  }

  loadCampaigns() {
    // Ensure account.id is converted to number if necessary
    this.accountService.getCampaignsByAccountId(Number(this.account.id)).subscribe((campaigns) => {
      this.campaigns = campaigns;
    });
  }
}
