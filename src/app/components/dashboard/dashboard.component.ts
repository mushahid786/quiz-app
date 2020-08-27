import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  orderSuffalList = [];

  questionList = [
    {
      ques: "Who is the prime minister of India?",
      ans: "Narender Modi"
    },
    {
      ques: "Who is the president of India?",
      ans: "Ram Nath Kobind"
    },
    {
      ques: "Who is the home minister of India?",
      ans: "Amit Shah"
    },
    {
      ques: "Who is the chif minister of Uttar Pradesh ?",
      ans: "Yogi Aditiya Nath"
    },
    {
      ques: "Who is the chif minister of Rajisthan?",
      ans: "Ashok Gehlot"
    }
  ]


  constructor(public router: Router) { }


  ngOnInit(): void {

    //Suffaling the question in array.
    if (JSON.parse(localStorage.getItem("orderSuffalList"))) {
      this.questionList = JSON.parse(localStorage.getItem("orderSuffalList"));
    }
    for (let i = 0; i < this.questionList.length; i++) {
      this.orderSuffalList.push(this.questionList[i]);

    }
    this.orderSuffalList.push(this.questionList[0]);
    this.orderSuffalList.splice(0, 1);
    localStorage.setItem("orderSuffalList", JSON.stringify(this.orderSuffalList))

    //checking the user is loged in or not.
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
