import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { Literature, Professor } from 'src/app/core/models';
import { Page } from 'src/app/core/models/dtos';
import { ConfirmOptions } from 'src/app/core/models/enums';
import { HttpLiteratureService } from 'src/app/core/services/http-literature.service';
import { HttpProfessorService } from 'src/app/core/services/http-professor.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SortableHeaderDirective, SortEvent } from 'src/app/shared/directives/sortable-header.directive';

@Component({
  selector: 'app-literature-list',
  templateUrl: './literature-list.component.html',
  styleUrls: ['./literature-list.component.css']
})
export class LiteratureListComponent implements OnInit {
  professorMap: Map<number, Professor> = new Map();
  currentPage: Page = { page: 1, size: 5, orderBy: 'name', order: 'asc', totalItems: 10 };
  literatures?: Literature[];
  availablePageSizes = [3, 5, 10, 15, 20, 25, 30, 50, 100];
  @ViewChildren(SortableHeaderDirective)
  sortableHeaders?: QueryList<SortableHeaderDirective>;
  format: string = 'dd/MM/yyyy';
  subscriptions = new Subscription();
  allLiteratures$?: Observable<Literature[]>;
  selectedLiterature?: Literature;
  searchTerm: string = '';



  constructor(
    private httpProfessor: HttpProfessorService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastService: ToastService,
    private httpLiterature: HttpLiteratureService
  ) { }

  ngOnInit(): void {
    this.loadPageFromQueryParams();
    this.loadProfessors();
    this.loadLiteratures();
  }
  loadPageFromQueryParams() {
    const page = Number(this.activatedRoute.snapshot.queryParamMap.get('page'));
    if (page) {
      this.currentPage.page = page;
    }
    const size = Number(this.activatedRoute.snapshot.queryParamMap.get('size'));
    if (size) {
      this.currentPage.size = size;
    }
    const orderBy = this.activatedRoute.snapshot.queryParamMap.get('orderBy');
    if (orderBy) {
      this.currentPage.orderBy = orderBy;
    }
    const order = this.activatedRoute.snapshot.queryParamMap.get('order');
    if (order) {
      this.currentPage.order = order;
    }
  }

  loadProfessors() {
    this.httpProfessor.getAllProfessors().subscribe(
      professors => {
        professors.forEach(professor => {
          this.professorMap.set(professor.id, professor);
        });
      }
    );
  }

  loadLiteratures() {

    this.httpLiterature.getByPage(this.currentPage).subscribe(
      literaturePage => {
        this.literatures = literaturePage.content;
        this.currentPage.page = literaturePage.page;
        this.currentPage.totalItems = literaturePage.totalItems;
      }
    )
  }

  onPageSizeChange() {
    this.currentPage.page = 1;
    this.loadLiteratures();
  }

  onSort(sortEvent: SortEvent) {
    console.log(sortEvent, 'sortEvent');

    this.sortableHeaders?.forEach(
      sortableHeader => {
        if (sortableHeader.sortable !== sortEvent.columnName) {
          sortableHeader.direction = '';
        }
      }
    )
    this.currentPage = { page: 1, size: this.currentPage.size, orderBy: sortEvent.columnName, order: sortEvent.direction, totalItems: 0 };
    this.loadLiteratures();
  }

  openModal(content: any, literature?: Literature) {
    this.selectedLiterature = literature;
    this.modalService.open(content, { centered: true });
  }




  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get tempContext() {
    return { number: 10 }
  }





}
