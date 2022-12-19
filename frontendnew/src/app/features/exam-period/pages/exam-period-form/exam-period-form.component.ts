import { LiveAnnouncer } from "@angular/cdk/a11y";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs";
import { ExamPeriod } from "src/app/core/models";
import { HttpExamPeriodService } from "src/app/core/services/http-examperiod.service";
import { ToastService } from "src/app/core/services/toast.service";
import { DeleteDialogComponent } from "src/app/shared/components/delete-dialog/delete-dialog.component";
import { EditExamPeriodDialogComponent } from "./dialogs/exam-period-dialog/edit-exam-period-dialog.component";




@Component({
    selector: 'app-exam-period-form',
    templateUrl: './exam-period-form.component.html',
    styleUrls: ['./exam-period-form.component.css']
})

export class ExamPeriodFormComponent implements OnInit {
    displayedColumns: string[] = ['name', 'start', 'end', 'status', 'edit', 'delete'];
    examPeriods = new MatTableDataSource<ExamPeriod>();
    value = '';

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<ExamPeriod>;

    constructor(
        private formBuilder: FormBuilder = new FormBuilder(),
        private httpExamPeriod: HttpExamPeriodService,
        private toastService: ToastService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetectorRefs: ChangeDetectorRef,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private liveAnnouncer: LiveAnnouncer
    ) { }
    examPeriodForm = this.formBuilder.nonNullable.group({
        id: [],
        name: ['', Validators.required],
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
        status: [0, Validators.required],
    });

    onSubmit(form: any) {
        this.httpExamPeriod.post(form).subscribe(res => {
            if (res) {
                this.openSnackBar('Exam Period Created', 'Close');
                this.httpExamPeriod.getAll().subscribe()
                this.refresh();
            }
        })
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
            panelClass: ['snackbar']
        });
    }

    openDialog(examPeriod: ExamPeriod) {
        this.dialog.open(EditExamPeriodDialogComponent, { data: examPeriod }).afterClosed().subscribe(() => {
            this.refresh();
        });
    }

    deleteExamPeriod(id: number) {
        this.httpExamPeriod.delete(id).subscribe(() => {
            this.refresh();
        })
    }

    openDeleteDialog(examPeriod: any) {
        this.dialog.open(DeleteDialogComponent, {
            data: {
                title: 'Delete Exam Period',
                message: `Are you sure you want to delete ${examPeriod.name}?`,
                confirmButton: 'Delete',
            }
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.examPeriods.filter = filterValue.trim().toLowerCase();
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this.liveAnnouncer.announce('Sorting cleared');
        }
    }

    refresh() {
        this.httpExamPeriod.getAll().subscribe((data: any[]) => {
            this.examPeriods.data = data
            this.changeDetectorRefs.detectChanges();
        })
    }

    ngAfterViewInit() {
        this.examPeriods.sort = this.sort;
    }


    ngOnInit(): void {
        this.refresh()
    }

}