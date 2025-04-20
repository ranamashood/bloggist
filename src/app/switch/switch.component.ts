import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-switch',
  imports: [NgIcon, NgClass],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css',
})
export class SwitchComponent {
  @Input() isChecked = false;
  @Input() isCheckedIcon = '';
  @Input() isUnCheckedIcon = '';
  @Input() onClick!: () => void;
}
