import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../_models/campaign'; // Replace with your actual model path
import { environment } from '../../environments/environment'; // Import environment for API baseUrl

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private baseUrl = `${environment.apiUrl}/campaign`; // Use the environment variable for the base API URL

  constructor(private http: HttpClient) { }

  // Create a new campaign with form data (including image)
  create(formData: FormData): Observable<Campaign> {
    return this.http.post<Campaign>(`${this.baseUrl}`, formData);
  }

  // Get all campaigns
  getAll(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.baseUrl}`);
  }

  // Get a campaign by ID
  getById(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.baseUrl}/${id}`);
  }

  // Update a campaign
  update(id: number, formData: FormData): Observable<Campaign> {
    return this.http.put<Campaign>(`${this.baseUrl}/${id}`, formData);
  }

  // Delete a campaign
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Approve a campaign (Admin only)
  approve(id: number): Observable<Campaign> {
    return this.http.put<Campaign>(`${this.baseUrl}/${id}/approve`, {});
  }

  // Reject a campaign (Admin only)
  reject(id: number): Observable<Campaign> {
    return this.http.put<Campaign>(`${this.baseUrl}/${id}/reject`, {});
  }

  getCampaignsByAccountId(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/account/${accountId}`);
  }
  
}
