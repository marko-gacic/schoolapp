import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;

  list = [
    { name: 'Home', icon: 'home', link: '/home' },
    { name: 'Students', icon: 'people', link: 'student/student-list' },
    { name: 'Professors', icon: 'person', link: 'professor/professor-list' },
    { name: 'Subjects', icon: 'book', link: 'subject/subject-list' },
    { name: 'Exams', icon: 'school', link: 'exam/exam-list' },
    { name: 'Literatures', icon: 'library_books', link: '/literature' },
    { name: 'User Profile', icon: 'person', link: 'user-profile' },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
