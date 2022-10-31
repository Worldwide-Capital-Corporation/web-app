import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {UsersService} from '../../../users/users.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'mifosx-client-beneficiary-step',
  templateUrl: './client-beneficiary-step.component.html',
  styleUrls: ['./client-beneficiary-step.component.scss']
})
export class ClientBeneficiaryStepComponent implements OnInit {

  /** Office address form. */
  beneficiaryForm: FormGroup;
  /** Client Template */
  @Input() clientTemplate: any;
  /** Countries Options */
  countryOptions: any;
  /** Source of funds Options */
  sourceOfFundsOptions: any;
  /** Source of funds Options */
  sourceOfWealthOptions: any;
  /** State / Province Options */
  stateOptions: any;
  /** Beneficiary owners Data */
  beneficiariesOwnerData: any[] = [];
  /** Editing owners Data */
  editingBeneficiary: boolean;
  editingBeneficiaryIndex?: number;

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
    this.createBeneficiaryForm();
  }

  ngOnInit() {
    this.setOptions();
  }
  /**
   * Creates the beneficiary form.
   */
  createBeneficiaryForm() {
    this.beneficiaryForm = this.formBuilder.group({
      'idNumber': ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      'firstName': ['', [Validators.required, Validators.pattern('(^[A-z]).*')]],
      'middleName': ['', Validators.pattern('(^[A-z]).*')],
      'lastName': ['', [Validators.required, Validators.pattern('(^[A-z]).*')]],
      'ownership': ['', [Validators.required, Validators.pattern('(?<=^| )\\d+(\\.\\d+)?(?=$| )'), Validators.min(0), Validators.max(100)]],
      'tin': ['', Validators.required],
      'sourceOfFundsId': ['', Validators.required],
      'sourceOfWealthId': ['', Validators.required],
      'street': [''],
      'town': ['', Validators.required],
      'city': ['', Validators.required],
      'stateId': ['', Validators.required],
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
    this.sourceOfFundsOptions = this.clientTemplate.clientSourceOfFundsOptions;
    this.sourceOfWealthOptions = this.clientTemplate.clientSourceOfWealthOptions;
  }

  /**
   * Client Office Address Details
   */
  get clientAddressDetails() {
    const beneficiaries = this.beneficiaryForm.value;
    return beneficiaries;
  }

  /**
   * Retrieves field Id from name.
   * Find pipe doesn't work with accordian.
   */
  getSelectedCountry(fieldId: any) {
    return (this.clientTemplate.address[0]['countryIdOptions'].find((fieldObj: any) => fieldObj.id === fieldId));
  }

  /**
   * Retrieves field Id from name.
   * Find pipe doesn't work with accordian.
   */
  getSelectedState(fieldId: any) {
    return (this.clientTemplate.address[0]['stateProvinceIdOptions'].find((fieldObj: any) => fieldObj.id === fieldId));
  }

  /**
   * Retrieves field Id from name.
   * Find pipe doesn't work with accordian.
   */
  getSelectedSourceOfFundsValue(fieldId: any) {
    return (this.clientTemplate.clientSourceOfFundsOptions.find((fieldObj: any) => fieldObj.id === fieldId));
  }

  /**
   * Retrieves field Id from name.
   * Find pipe doesn't work with accordian.
   */
  getSelectedSourceOfWealthValue(fieldId: any) {
    return (this.clientTemplate.clientSourceOfWealthOptions.find((fieldObj: any) => fieldObj.id === fieldId));
  }

  addBeneficiary(form: FormGroup, formGroupDirective: FormGroupDirective) {
    if (this.beneficiaryForm.valid) {
      const beneficiary = this.beneficiaryForm.value;
      if (this.editingBeneficiary) {
        this.beneficiariesOwnerData[this.editingBeneficiaryIndex] = beneficiary;
        this.resetBeneficiaryForm(form, formGroupDirective);
        this.editingBeneficiary = false;
      } else {
        if (!this.duplicateCheck(beneficiary)) {
          this.beneficiariesOwnerData.push(beneficiary);
          this.resetBeneficiaryForm(form, formGroupDirective);
        }
      }
    }
  }

  resetBeneficiaryForm(form: FormGroup, formGroupDirective: FormGroupDirective) {
    form.reset();
    form.markAsPristine();
    form.markAsUntouched();
    formGroupDirective.resetForm();
  }

  duplicateCheck(beneficiary: any): boolean {
    let duplicateFound = false;
    const duplicateId = this.beneficiariesOwnerData.filter( (addedBeneficiary: any) => addedBeneficiary.idNumber === beneficiary.idNumber);
    const duplicateTin = this.beneficiariesOwnerData.filter( (addedBeneficiary: any) => addedBeneficiary.tin === beneficiary.tin);
    if (duplicateId.length > 0) {
      this.beneficiaryForm.get('idNumber')?.setErrors({ duplicate: 'already added' });
      duplicateFound = true;
    }
    if (duplicateTin.length > 0) {
      this.beneficiaryForm.get('tin')?.setErrors({ duplicate: 'already added' });
      duplicateFound = true;
    }
    return duplicateFound;
  }

  editBeneficiary(beneficiary: any, index: number) {
    this.editingBeneficiary = true;
    this.editingBeneficiaryIndex = index;
    this.beneficiaryForm.reset(beneficiary);
  }

  deleteBeneficiary(beneficiary: any, index: number) {
    this.beneficiariesOwnerData.splice(index, 1);
  }

  /**
   * Returns the array of client beneficiaries
   */
  get beneficiariesDetails() {
    return { beneficiaries: this.beneficiariesOwnerData };
  }
}
