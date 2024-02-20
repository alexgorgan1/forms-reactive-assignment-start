import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectNames = ['Test'];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl(null, Validators.required, this.forbiddenNames),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl('Finished')
    })
  }

  // forbiddenNames(control:FormControl): {[s: string]: boolean} {
  //   if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
  //     return { projectnameIsForbidden: true }; 
  //   }
  //   return null;
  // }

  forbiddenNames(control:FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ nameIsForbidden: true });
        } else {
          resolve(null);
        }
      },1000)
    });
    return promise;
  }

  onSumbit() {
    console.log('Project Name:' + this.projectForm.value.name);
    console.log('Email:' + this.projectForm.value.email);
    console.log('Status:' + this.projectForm.value.status);
    console.log(this.projectForm);
  }
}
