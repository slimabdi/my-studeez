import { Injectable } from '@angular/core';
import { Component, Input, HostListener } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import * as FileSaver from 'file-saver';
import * as _ from  'lodash';
@Injectable()
export class ExelDownloadService {

  constructor() { }
data:any={}
cpt:any=0
  transformData (data : any) : Array<any>{
    let dataNew : Array<any> = [];
    var keys_arr = [];
    _.forEach(data, function(json){      
        var arr = _.filter(json, function(value,index){          
          if (typeof value !== "object"){
            keys_arr.push( _.startCase(index));
            return value;
          }            
        });
        dataNew.push(arr);
    });    
    dataNew.unshift(_.uniq(keys_arr));
    return dataNew;
  }

  sheetName: string = '';
  workbook: XLSX.IWorkBook = {
    Sheets: {},
    SheetNames: [],
    Props: {}
  }
  ws: any;
  wbout: any;

  


  sheet_from_array_of_arrays(data) {
    console.log('data',data);
    var ws = {};
    var endCell = { c: 10000000, r: 10000000 };
    var startCell = { c: 0, r: 0 };
    var range = { s: endCell, e: startCell };

    var wscols = [];

    for (var R = 0; R != data.length; ++R) {      
      for (var C = 0; C != data[R].length; ++C) {
        wscols.push({wch:20});
        if (range.s.r > R) range.s.r = R;
        if (range.s.c > C) range.s.c = C;
        if (range.e.r < R) range.e.r = R;
        if (range.e.c < C) range.e.c = C;
        var cell = { v: data[R][C], t: 's' , s : {}};
        
        if (R === 0){
          cell.s = {"font" : {"bold" : true, "sz" : 13, "alignment" : { "horizontal" : "center", "vertical" : "center"}}};          
        }
          

        if (cell.v == null) continue;
        var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
        if (typeof cell.v === 'number')
          cell.t = 'n';
        else if (typeof cell.v === 'boolean')
          cell.t = 'b';
        else
          cell.t = 's';
        ws[cell_ref] = cell;        
      }
    }
    ws['!cols'] = wscols;
    console.log("Worksheet goes here", ws);

    if (range.s.c < 10000000)
      ws['!ref'] = XLSX.utils.encode_range(endCell, startCell);

    return ws;
  }

  datenum(v, date1904?): any {
    if (date1904)
      v += 1462;
    var epoch = Date.parse(v);
    var dt: any = new Date(Date.UTC(1899, 11, 30));
    return (epoch - dt) / (24 * 60 * 60 * 1000);
  }

  generateExcelFile(name): any {
    this.cpt++
    this.ws = this.sheet_from_array_of_arrays(this.transformData(this.data));
    this.workbook.SheetNames.push((this.cpt).toString());
    this.workbook.Sheets[(this.cpt).toString()] = this.ws;
    this.wbout = XLSX.write(this.workbook, { bookType: 'xlsx', type: 'binary' });    
    return this.wbout;
  }

  s2ab(s: any): ArrayBuffer {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i)
      view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  downloadExcel(data,name): void {
    this.data=data
    FileSaver.saveAs(new Blob([this.s2ab(this.generateExcelFile(name))], { type: "application/octet-stream" }), name+".xlsx");
  }
}
