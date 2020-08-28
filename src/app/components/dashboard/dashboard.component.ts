import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  candiateResults = [];
  orderSuffalList = [];
  choiceOptionList = [];
  questionStoredList = [];
  isOptionCorrect: boolean = true;
  isOptionDisplay: boolean = false;
  isDisabledCheckBox: boolean = false;
  resultOfTest = 0;

  questionList = [
    {
      id: 1,
      ques: 'Who is the prime minister of India?',
      ans: 'Narender Modi',
      option: [
        { opt: 'Yogi Aditiya Nath' },
        { opt: 'Ram Nath Kobind' },
        { opt: 'Narender Modi' },
        { opt: 'Ashok Gehlot' },
      ],
    },
    {
      id: 2,
      ques: 'Who is the president of India?',
      ans: 'Ram Nath Kobind',
      option: [
        { opt: 'Narender Modi' },
        { opt: 'Ram Nath Kobind' },
        { opt: 'Amit Shah' },
        { opt: 'Ashok Gehlot' },
      ],
    },
    {
      id: 3,
      ques: 'Who is the home minister of India?',
      ans: 'Amit Shah',
      option: [
        { opt: 'Amit Shah' },
        { opt: 'Yogi Aditiya Nath' },
        { opt: 'Ram Nath Kobind' },
        { opt: 'Ashok Gehlot' },
      ],
    },
    {
      id: 4,
      ques: 'Who is the chif minister of Uttar Pradesh ?',
      ans: 'Yogi Aditiya Nath',
      option: [
        { opt: 'Narender Modi' },
        { opt: 'Ram Nath Kobind' },
        { opt: 'Ashok Gehlot' },
        { opt: 'Yogi Aditiya Nath' },
      ],
    },
    {
      id: 5,
      ques: 'Who is the chif minister of Rajisthan?',
      ans: 'Ashok Gehlot',
      option: [
        { opt: 'Narender Modi' },
        { opt: 'Amit Shah' },
        { opt: 'Ashok Gehlot' },
        { opt: 'Yogi Aditiya Nath' },
      ],
    },
  ];

  constructor(public router: Router) { }

  ngOnInit(): void {

    //checking the user is loged in or not.
    if (!localStorage.getItem('isLogin') && !localStorage.getItem('username')) {
      this.router.navigate([`/`]);
    }
    //Suffaling the question in array.
    for (let i = 0; i < this.questionList.length; i++) {
      this.questionStoredList.push(this.questionList[i]);
    }
    localStorage.setItem(
      'questionStoredList',
      JSON.stringify(this.questionStoredList)
    );
    this.getList(0);


  }

  nextQuestion(index) {
    console.log('index next', index);
    this.getList(index);
  }

  getList(start) {
    if (JSON.parse(localStorage.getItem('orderSuffalList'))) {
      this.questionStoredList = JSON.parse(
        localStorage.getItem('orderSuffalList')
      );
    }
    this.questionStoredList = JSON.parse(
      localStorage.getItem('questionStoredList')
    );
    if (start < this.questionStoredList.length) {
      this.orderSuffalList.push({
        ...this.questionStoredList[start],
        isOptionCorrect: true,
        isOptionDisplay: false,
        isDisabledCheckBox: false,
      });

      localStorage.setItem(
        'orderSuffalList',
        JSON.stringify(this.orderSuffalList)
      );
    } else {
    }

    // localStorage.removeItem("orderSuffalList")
    // this.orderSuffalList = [];
  }

  checked(option, answer, i, index) {
    console.log('Checked', option, answer);
    this.orderSuffalList[i]['isDisabledCheckBox'] = true;
    if (option == answer) {
      this.resultOfTest = this.resultOfTest + 2;
      this.orderSuffalList[i]['isOptionCorrect'] = true;
      this.orderSuffalList[i]['isOptionDisplay'] = true;
    } else {
      this.orderSuffalList[i]['isOptionCorrect'] = false;
      this.orderSuffalList[i]['isOptionDisplay'] = false;
    }

  }
  onFinalSubmit() {

    let candidateDetail = JSON.parse(localStorage.getItem('registeredUser'));
    for (let i = 0; i < candidateDetail.length; i++) {
      let objectOfDetails
      if (candidateDetail[i].username == localStorage.getItem('username')) {
        objectOfDetails = {

          name: candidateDetail[i].name,
          emailId: candidateDetail[i].username,
          scoreCard: this.resultOfTest
        }
      } else {
        objectOfDetails = {
          name: candidateDetail[i].name,
          emailId: candidateDetail[i].username,
        }
      }
      this.candiateResults.push(objectOfDetails)
      localStorage.setItem('candidateResults', JSON.stringify(this.candiateResults))
    }

    console.log('Submit suucessfully', JSON.parse(localStorage.getItem('candidateResults')));

    this.router.navigate([`/leaderboard`])
  }

  logOut() {
    localStorage.removeItem('isLogin');
    // localStorage.removeItem('username');
    this.router.navigate([`/`]);
  }
}
