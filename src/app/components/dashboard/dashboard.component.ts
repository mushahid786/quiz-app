import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router) { }


  ngOnInit(): void {
    if (!(localStorage.getItem('isLogin')) && !localStorage.getItem('username')) {

      this.router.navigate([`/`])

    }
  }

  logOut() {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('username')
    this.router.navigate([`/`])

  }

}
