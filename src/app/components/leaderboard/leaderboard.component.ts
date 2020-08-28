import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  candidateScoreCard = [];
  constructor(public router: Router) { }

  ngOnInit(): void {
    //checking the user is loged in or not.
    if (!localStorage.getItem('isLogin') && !localStorage.getItem('username')) {
      this.router.navigate([`/`]);
    }
    this.candidateScoreCard = JSON.parse(localStorage.getItem('candidateResults'))
  }

  logOut() {
    localStorage.removeItem('isLogin');
    this.router.navigate([`/`])
  }

}
