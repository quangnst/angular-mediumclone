import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from "rxjs";

import { registerAction } from 'src/app/auth/store/actions/register.actions';
import { isSubmittingSelector } from '../../store/selectors';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.initializeForm();
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
    console.log(this.form.value)
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))
  }

}
