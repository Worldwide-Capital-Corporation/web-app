import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Dates} from '../../../core/utils/dates';
import {SettingsService} from '../../../settings/settings.service';

@Component({
  selector: 'mifosx-client-details-step',
  templateUrl: './client-details-step.component.html',
  styleUrls: ['./client-details-step.component.scss']
})
export class ClientDetailsStepComponent implements OnInit {

  /** Maximum date allowed. */
  maxDate = new Date();

  /** Client Template */
  @Input() clientTemplate: any;
  /** Create Client Form */
  createClientForm: FormGroup;
  /** Office Options */
  officeOptions: any;
  /** Constitution Options */
  constitutionOptions: any;

  /**
   * @param {FormBuilder} formBuilder Form Builder
   * @param {Dates} dateUtils Date Utils
   * @param {SettingsService} settingsService Setting service
   */
  constructor(private formBuilder: FormBuilder,
              private dateUtils: Dates,
              private settingsService: SettingsService) {
    this.setClientForm();
  }

  ngOnInit() {
    this.maxDate = this.settingsService.businessDate;
    this.setOptions();
  }

  /**
   * Creates the client form.
   */
  setClientForm() {
    this.createClientForm = this.formBuilder.group({
      'officeId': ['', Validators.required],
      'legalFormId': [2],
      'registeredName': ['', Validators.required],
      'constitutionId': ['', Validators.required],
      'tin': ['', Validators.required],
      'incorpValidityTillDate': ['', Validators.required],
      'tradingLicenseNo': ['', Validators.required],
      'incorporationDate': ['', Validators.required],
      'incorpNumber': ['', Validators.required],
      'contactNumber': ['', Validators.required],
      'turnover': ['', [Validators.required, Validators.pattern('(?<=^| )\\d+(\\.\\d+)?(?=$| )')]],
      'emailAddress': ['', Validators.email],
    });
  }

  /**
   * Sets select dropdown options.
   */
  setOptions() {
    this.officeOptions = this.clientTemplate.officeOptions;
    this.constitutionOptions = this.clientTemplate.clientNonPersonConstitutionOptions;
  }

  /**
   * Client General Details
   */
  get clientGeneralDetails() {
    const locale = this.settingsService.language.code;
    const dateFormat = this.settingsService.dateFormat;
    const details = {
      officeId: this.createClientForm.value.officeId,
      legalFormId:  this.createClientForm.value.legalFormId,
      fullname: this.createClientForm.value.registeredName,
      clientNonPersonDetails: {
        ...this.createClientForm.value,
        incorporationDate: this.dateUtils.formatDate(this.createClientForm.value.incorporationDate, dateFormat),
        incorpValidityTillDate: this.dateUtils.formatDate(this.createClientForm.value.incorpValidityTillDate, dateFormat),
        dateFormat,
        locale
      }
    };
    return details;
  }
}
