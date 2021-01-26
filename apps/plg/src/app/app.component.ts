import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'plg';

  headerHeight = 50;
  rowHeight = 42;
  minRowsToShow = undefined;
  maxRowsToShow = undefined;
  autoGrow = false;

  columnDefs = [{ field: 'value' }];

  rowData = [{ value: '1' }, { value: '2' }, { value: '3' }];

  constructor(
		private hostElement: ElementRef<HTMLElement>,
	) {}

  addRows(rowsNumber) {
    this.rowData = [
      ...this.rowData,
      ...[...new Array(Number(rowsNumber))].map((val, i) => {
        return { value: Number(i + this.rowData.length + 1).toString() };
      }),
    ];
  }

 /*  updateGridHeight() {
    const bodyViewport: HTMLElement = this.hostElement.nativeElement.querySelector('ag-grid-angular .ag-body-viewport');
    bodyViewport.style.minHeight = this.getMinHeight() + 'px';
    bodyViewport.style.height = this.getHeight();
    bodyViewport.style.maxHeight = this.getMaxHeight();
  } */

  calcHeaderHeight() {
    /* const bodyViewport: HTMLElement = this.hostElement.nativeElement.querySelector('ag-grid-angular .ag-body-viewport');
    const agGridElement: HTMLElement = this.hostElement.nativeElement.querySelector('ag-grid-angular');
    return (agGridElement && bodyViewport) ? agGridElement.getBoundingClientRect().height - bodyViewport.getBoundingClientRect().height : 10; */
    return 49;
  }

  getMinHeight() {
    let rowsToShow = 0;
    const isMinRowSet = this.minRowsToShow && this.minRowsToShow > -1;
    const isMaxRowSet =  this.maxRowsToShow && this.maxRowsToShow > 0;
    const minRowsToShow = Number(this.minRowsToShow) || 0;
    const maxRowsToShow = Number(this.maxRowsToShow) || 0;
    const totalRows = this.rowData.length;

    let normalizedMinRowsToShow = isMinRowSet ? minRowsToShow : 5;
    if (isMaxRowSet) {
      normalizedMinRowsToShow =
        normalizedMinRowsToShow > maxRowsToShow
          ? maxRowsToShow
          : normalizedMinRowsToShow;
    }

    if (this.autoGrow) {
      rowsToShow = totalRows;
      if (totalRows <= normalizedMinRowsToShow) {
        rowsToShow = normalizedMinRowsToShow;
      } else if (isMaxRowSet && totalRows > maxRowsToShow) {
        rowsToShow = maxRowsToShow;
      }
    } else {
      rowsToShow = normalizedMinRowsToShow;
    }
    return this.calcHeaderHeight() + this.rowHeight * rowsToShow;
  }

  getHeight() {
    return this.autoGrow ? '0' : '100%';
  }

  getMaxHeight() {
    return Number(this.maxRowsToShow) > 0
      ? (this.calcHeaderHeight() + this.rowHeight * Number(this.maxRowsToShow)) + 'px'
      : 'unset';
  }
}
