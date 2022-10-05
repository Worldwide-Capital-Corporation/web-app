import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

/** Custom Services */
import { ClientsService } from '../../clients.service';

@Component({
  selector: 'mifosx-documents-tab',
  templateUrl: './documents-tab.component.html',
  styleUrls: ['./documents-tab.component.scss']
})
export class DocumentsTabComponent implements OnInit {

  kycData: any;
  clientId: string;
  showFallback: boolean;


  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.showFallback = true;
    this.route.data.subscribe((data: { clientDocuments: any }) => {
        this.kycData = data.clientDocuments;
        this.showFallback = false;
    });
    this.clientId = this.route.parent.snapshot.paramMap.get('clientId');

  }

  ngOnInit() {
  }
}
