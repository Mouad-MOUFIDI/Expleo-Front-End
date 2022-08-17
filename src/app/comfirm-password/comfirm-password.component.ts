import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ConfirmedValidator } from '../ComfirmedValidator';


@Component({
  selector: 'app-comfirm-password',
  templateUrl: './comfirm-password.component.html',
  styleUrls: ['./comfirm-password.component.css']
})
export class ComfirmPasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  hide: boolean = false;
  hide2: boolean = false;
  authentificated : boolean = false;

  constructor(private fb: FormBuilder) {

    this.form = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      currentPassword: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
    console.log(this.form.value)
  }

  get f(){
    return this.form.controls;
  }

  get cuurentP(){
    return this.form.get('currentPassword');
  }

  submit(){
    console.log(this.form.value);
  }
  ngOnInit(){

  }


}
