import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ClientsService} from '../../clients.service';

/** Custom Services */

@Component({
  selector: 'mifosx-documents-tab',
  templateUrl: './documents-tab.component.html',
  styleUrls: ['./documents-tab.component.scss']
})
export class DocumentsTabComponent implements OnInit {

  riskRatingResponse: any;
  kycData: any;
  clientId: string;
  showFallback: boolean;
  corporation: boolean;
  individual: boolean;
  riskRatingColor: string;
  riskRatingText: string;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService
  ) {
    this.showFallback = true;
    this.riskRatingColor = 'accent';
    this.riskRatingText = 'No Data';
    this.route.data.subscribe((data: { screeningData: any }) => {
      if (data.screeningData) {
        this.kycData = data.screeningData.latest;
        this.riskRatingResponse = data.screeningData;
        this.showFallback = false;
        this.processResponse();
      }
    });
    this.clientId = this.route.parent.snapshot.paramMap.get('clientId');
  }

  ngOnInit() {
  }

  processResponse() {
    this.riskRatingText = this.kycData.riskRating.charAt(0).toUpperCase() + this.kycData.riskRating.substr(1).toLowerCase();
    this.corporation = this.kycData.clientType === 2;
    this.individual = this.kycData.clientType === 1;
    if (this.kycData.riskRating === 'HIGH') {
      this.riskRatingColor = 'warn';
    } else if (this.kycData.riskRating === 'MEDIUM') {
      this.riskRatingColor = 'status-pending';
    } else {
      this.riskRatingColor = 'primary';
    }
  }

  runRiskScreening() {
    this.loading = true;
    this.clientsService.runRiskScreening(this.clientId).subscribe(
      (response: any) => {
      this.kycData = response.latest;
      this.riskRatingResponse = response;
      this.showFallback = false;
      this.processResponse();
      this.loading = false;
    },
      (error: any) => {
        this.loading = false;
      });
  }

  screeningDate(epoc: number): string {
    return new Date(epoc).toLocaleString();
  }
}
