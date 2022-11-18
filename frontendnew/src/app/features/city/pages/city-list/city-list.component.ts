import { Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { City } from 'src/app/core/models';
import { Page } from 'src/app/core/models/dtos';
import { ConfirmOptions } from 'src/app/core/models/enums';
import { HttpCityService } from 'src/app/core/services/http-city.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SortableHeaderDirective, SortEvent } from 'src/app/shared/directives/sortable-header.directive';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit, OnDestroy {

  cities?: City[];
  currentPage: Page = {page: 1, size: 5, orderBy:'name', order: 'ASC', totalItems: 10 };

  @ViewChildren(SortableHeaderDirective)
  sortableHeaders?: QueryList<SortableHeaderDirective>;

  selectedCity?: City;

  subscriptions = new Subscription();


  //************************   Priimer za asynPipe */
  allCities$?: Observable<City[]>;
  constructor(private httpCity: HttpCityService,
              private toastService: ToastService,
              private modalService: NgbModal,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.httpCity.getAll().subscribe(
    //   (cities) => this.cities = cities
    // );
    /// ************  pimer za async pipe
    this.allCities$ = this.httpCity.getAll();
    // *****************************************
    const page = Number(this.activeRoute.snapshot.queryParams['page']);
    if (page) { this.currentPage.page = page;}

    const size = Number(this.activeRoute.snapshot.queryParams['size']);
    if (size) { this.currentPage.size = size;}

    const orderBy = this.activeRoute.snapshot.queryParams['orderBy'];
    if (orderBy) { this.currentPage.orderBy = orderBy;}

    const order = this.activeRoute.snapshot.queryParams['order'];
    if (order) { this.currentPage.order = order;}

    this.loadCitiesByPage();
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }


  loadCitiesByPage() {
    const subscription = this.httpCity.getByPage(this.currentPage).subscribe(
      cityPage =>  {
        this.cities = cityPage.content;
        this.currentPage.page = cityPage.page;
        this.currentPage.totalItems = cityPage.totalItems;
        this.toastService.showToast({classNames:'', header: 'Loadinig cities', message:'City loaded successfully'})
      }
    );

    this.subscriptions.add(subscription);

  }

  onSort(sortEvent: SortEvent) {
    console.log('sort event:', sortEvent);

    this.sortableHeaders?.forEach(
      sortableHeader =>  {
       if (sortableHeader.sortable !== sortEvent.columnName) {
        sortableHeader.direction = '';
       }
      }
    );
    this.currentPage = {page: 1, size: this.currentPage.size, orderBy: sortEvent.columnName , order: sortEvent.direction, totalItems: 0};
    this.loadCitiesByPage();
  }


  onDeleteClick(cityToDelete: City) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.header = 'Deleting city';
    modalRef.componentInstance.message = `Are you sure that you want to delete city ${cityToDelete.name} ?`;
    modalRef.result.then(
      result => (result ===ConfirmOptions.YES) && (this.deleteCity(cityToDelete))
    );
  }

  deleteCity(cityToDelete: City) {
    const subscription  = this.httpCity.deleteCity(cityToDelete.zip_code).subscribe(
     {
      next: (response) => {
        this.toastService.showToast({header: 'Deliting city', message: 'City deleted', delay: 2000, classNames:'bg-success'});
        this.loadCitiesByPage();
      },
      error: error => {
        this.toastService.showToast({header: 'Deliting city', message: 'City was not deleted', delay: 2000, classNames:'bg-danger'})
      }
     }
    );

    this.subscriptions.add(subscription);
  }

  onDetailsClick(city: City, cityDetailsTemplate: TemplateRef<any> ) {
    this.selectedCity = city;
    this.modalService.open(cityDetailsTemplate);
  }



  get tempContext() {
    return {number: 10};
  }
}
