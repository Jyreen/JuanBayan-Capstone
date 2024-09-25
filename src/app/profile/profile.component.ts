import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { Account } from '@app/_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  account: Account;
  currentSection: string = 'activities';
  
  rewards: any[] = [
    { name: 'Free T-shirt', description: 'A stylish volunteer t-shirt.', points: 500 },
    { name: 'Gift Card', description: '₱1000 Gift card for various stores.', points: 1000 },
    { name: 'Meal Voucher', description: '₱500 Meal voucher for selected restaurants.', points: 750 },
    { name: 'Volunteer Kit', description: 'A complete volunteer kit including a cap, badge, and notebook.', points: 1200 }
  ];
  
  password = {
    current: '',
    new: '',
    confirm: ''
  };

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.account.subscribe(account => {
      this.account = account;
    });
  }

  showSection(section: string) {
    this.currentSection = section;
  }

  openProfileModal() {
    // Logic to open modal (can be handled by Bootstrap JS or Angular modal service)
  }

  changePassword() {
    if (this.password.new !== this.password.confirm) {
      alert('New password and confirm password do not match.');
      return;
    }

    // Call API to change password
    console.log('Password change request:', this.password);
  }

  redeemReward(reward) {
    if (this.account.acc_totalpoints >= reward.points) {
      // Logic to handle reward redemption
      console.log('Redeeming reward:', reward);
    } else {
      alert('Not enough points to redeem this reward.');
    }
  }

  requestToCollect(campaign) {
    // Logic to handle campaign collection request
    console.log('Request to collect for campaign:', campaign);
  }
}
