import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

/** Custom Services */

@Component({
  selector: 'mifosx-documents-tab',
  templateUrl: './documents-tab.component.html',
  styleUrls: ['./documents-tab.component.scss']
})
export class DocumentsTabComponent implements OnInit {

  kycData: any;
  clientId: string;
  showFallback: boolean;
  corporation: boolean;
  individual: boolean;


  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.showFallback = true;
    this.route.data.subscribe((data: { clientDocuments: any }) => {
      if (data.clientDocuments) {
        this.kycData = data.clientDocuments;
        this.showFallback = false;
        this.corporation = this.kycData.clientType === 2;
        this.individual = this.kycData.clientType === 1;
      }
    });
    this.clientId = this.route.parent.snapshot.paramMap.get('clientId');
  }

  ngOnInit() {
  }
}
