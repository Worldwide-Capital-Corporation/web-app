import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'mifosx-client-review-step',
  templateUrl: './client-review-step.component.html',
  styleUrls: ['./client-review-step.component.scss']
})
export class ClientReviewStepComponent {
  /** Client Address field configuration */
  @Input() clientAddressFieldConfig: any;
  /** Client Template */
  @Input() clientTemplate: any;
  /** Client Object */
  @Input() client: any;
  /** Form submission event */
  @Output() submit = new EventEmitter();

  /** Loader */
  @Input() loading: boolean;

  constructor() { }

  /**
   * Utilized in address preview.
   * Find pipe doesn't work with accordian.
   * @param {any} fieldName Field Name
   * @param {any} fieldId Field Id
   */
  getSelectedValue(fieldName: any, fieldId: any) {
    return (this.clientTemplate.address[0][fieldName].find((fieldObj: any) => fieldObj.id === fieldId));
  }

  /**
   * Utilized in address preview to check if field is enabled in configuration.
   * @param {any} fieldName Field Name
   */
  isFieldEnabled(fieldName: any) {
    return (this.clientAddressFieldConfig.find((fieldObj: any) => fieldObj.field === fieldName))?.isEnabled;
  }
}