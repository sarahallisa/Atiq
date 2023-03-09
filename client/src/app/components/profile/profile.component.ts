import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  sellers = ['Hicham', 'Yohanes', 'Najmi', 'Sarah', 'Test'];
  items = ['apple', 'orange', 'banana', 'ballon', 'kiwi', 'laptop', 'jacke','popo'];
  @Input() heartClicked: boolean;

  constructor() {
    this.heartClicked = true;
  }

  ngOnInit(): void {
  }

  onDislike() {
    this.heartClicked = !this.heartClicked;
  }

}
