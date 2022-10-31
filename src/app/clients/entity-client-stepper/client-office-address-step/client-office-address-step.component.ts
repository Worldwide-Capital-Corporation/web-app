import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../users/users.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'mifosx-client-office-address-step',
  templateUrl: './client-office-address-step.component.html',
  styleUrls: ['./client-office-address-step.component.scss']
})
export class ClientOfficeAddressStepComponent implements OnInit {

  /** Office address form. */
  addressForm: FormGroup;
  /** Client Template */
  @Input() clientTemplate: any;
  /** Countries Options */
  countryOptions: any;
  /** State / Province Options */
  stateOptions: any;

  /**
   * Retrieves the offices and roles data from `resolve`.
   * @param {FormBuilder} formBuilder Form Builder.
   * @param {UsersService} UsersService Users Service.
   * @param {ActivatedRoute} route Activated Route.
   * @param {Router} router Router for navigation.
   */
  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
    /** Subscribe to address templates */
    this.createAddressForm();
  }

  ngOnInit() {
    this.setOptions();
  }
  /**
   * Creates the user form.
   */
  createAddressForm() {
    this.addressForm = this.formBuilder.group({
      'addressTypeId': ['3'],
      'addressLine2': [''],
      'townVillage': ['', Validators.required],
      'city': ['', Validators.required],
      'stateProvinceId': ['', Validators.required],
      'countryId': ['', Validators.required],
      'postalCode': ['']
    });
  }

  /**
   * Sets select dropdown options.
   */
  setOptions() {
    this.countryOptions = this.clientTemplate.address[0].countryIdOptions;
    this.stateOptions = this.clientTemplate.address[0].stateProvinceIdOptions;
  }

  /**
   * Client Office Address Details
   */
  get clientAddressDetails() {
    return { address: [this.addressForm.value] };
  }
}
