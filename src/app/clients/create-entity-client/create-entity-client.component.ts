import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientsService} from '../clients.service';
import {SettingsService} from '../../settings/settings.service';
import {ClientDetailsStepComponent} from '../entity-client-stepper/client-details-step/client-details-step.component';
import {
  ClientOfficeAddressStepComponent
} from '../entity-client-stepper/client-office-address-step/client-office-address-step.component';
import {ClientReviewStepComponent} from '../entity-client-stepper/client-review-step/client-review-step.component';
import {
  ClientBeneficiaryStepComponent
} from '../entity-client-stepper/client-beneficiary-step/client-beneficiary-step.component';

@Component({
  selector: 'mifosx-create-entity-client',
  templateUrl: './create-entity-client.component.html',
  styleUrls: ['./create-entity-client.component.scss']
})
export class CreateEntityClientComponent {

  /** Entity details Step */
  @ViewChild(ClientDetailsStepComponent, { static: true }) clientGeneralStep: ClientDetailsStepComponent;
  /** Office address step */
  @ViewChild(ClientOfficeAddressStepComponent, { static: true }) officeAddressStep: ClientOfficeAddressStepComponent;
  /** Entity owners */
  @ViewChild(ClientBeneficiaryStepComponent, { static: true }) beneficiaryStep: ClientBeneficiaryStepComponent;
  /** Details preview */
  @ViewChild(ClientReviewStepComponent, { static: true }) reviewStep: ClientReviewStepComponent;

  /** Client Template */
  clientTemplate: any;
  /** Client Address Field Config */
  clientAddressFieldConfig: any;

  /** loader when posting client data to API */
  loading: boolean;

  /**
   * Fetches client and address template from `resolve`
   * @param {ActivatedRoute} route Activated Route
   * @param {Router} router Router
   * @param {ClientsService} clientsService Clients Service
   * @param {SettingsService} settingsService Setting service
   */
  constructor(private route: ActivatedRoute,
              private router: Router,
              private clientsService: ClientsService,
              private settingsService: SettingsService) {
    this.route.data.subscribe((data: { clientTemplate: any, clientAddressFieldConfig: any }) => {
      this.clientTemplate = data.clientTemplate;
      this.clientAddressFieldConfig = data.clientAddressFieldConfig;
    });
  }

  /**
   * Retrieves general information about client.
   */
  get clientGeneralForm() {
    return this.clientGeneralStep.createClientForm;
  }

  /**
   * Retrieves office address information.
   */
  get officeAddressForm() {
    return this.officeAddressStep.addressForm;
  }

  /**
   * Retrieves office address information.
   */
  get beneficiaryOwnersForm() {
    return this.beneficiaryStep.beneficiaryForm;
  }

  /**
   * Retrieves the client object
   */
  get client() {
      return {
        ...this.clientGeneralStep.clientGeneralDetails,
        ...this.officeAddressStep.clientAddressDetails,
        ...this.beneficiaryStep.beneficiariesDetails
      };
  }
  /**
   * Submits the create client form.
   */
  submit() {
    this.loading = true;
    const locale = this.settingsService.language.code;
    const dateFormat = this.settingsService.dateFormat;
    // TODO: Update once language and date settings are setup
    const clientData = {
      ...this.client,
      dateFormat,
      locale
    };
    this.clientsService.createEntityClient(clientData).subscribe(
      (response: any) => {
        this.router.navigate(['../../', response.resourceId], {relativeTo: this.route});
      },
      (error: any) => {
        this.loading = false;
      });
  }
}
