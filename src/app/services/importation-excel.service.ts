import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import * as XLSX from 'ts-xlsx';
@Injectable()
export class ImportationExcelService {
  public processFileToJson(object,file): Observable<any> {
        let reader = new FileReader();
        let _this = this;
        
        return Observable.create(observer => {
            reader.onload = function (e) {
                let data = e.target['result'];
                let workbook = XLSX.read(data, {
                    type: 'binary'
                });
                console.log('my file',workbook);
                
                object.sheets = {sheets:workbook.Sheets,sheetsNames:workbook.SheetNames}
                observer.next(object);
                observer.complete();
            }
            reader.readAsBinaryString(file);
        });
    }


    parseWorksheet(workbook, readCells, toJSON) {
        if (toJSON === true) {
            return this.to_json(workbook);
        }
        let sheets = {};
        _.forEachRight(workbook.SheetNames, function (sheetName) {
            let sheet = workbook.Sheets[sheetName];
            
            
            sheets[sheetName] = this.parseSheet(sheet, readCells);
        });
        
        return sheets;
    }

    parseSheet(sheet, readCells) {
        console.log("parse",sheet);
        
        let range = XLSX.utils.decode_range(sheet['!ref']);
        let sheetData = [];

        if (readCells === true) {
            _.forEachRight(_.range(range.s.r, range.e.r + 1), function (row) {
                let rowData = [];
                _.forEachRight(_.range(range.s.c, range.e.c + 1), function (column) {
                    let cellIndex = XLSX.utils.encode_cell({
                        'c': column,
                        'r': row
                    });
                    let cell = sheet[cellIndex];
                    rowData[column] = cell ? cell.v : undefined;
                });
                sheetData[row] = rowData;
            });
        }

    }

    to_json(workbook) {
        console.log("workbook",workbook);

        let result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
        return result;
    }
}
