import { Injectable } from "@angular/core";
import { Log } from "../models/Log";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LogService {
  logs: Log[];
  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  });
  selectedLog = this.logSource.asObservable();
  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();
  constructor() {
    // this.logs = [
    //   {
    //     id: "1",
    //     text: "Generated classes",
    //     date: new Date()
    //   },
    //   {
    //     id: "2",
    //     text: "Added classes",
    //     date: new Date()
    //   },
    //   {
    //     id: "3",
    //     text: "Sorting everything",
    //     date: new Date()
    //   }
    // ];
  }
  setFormLog(log: Log) {
    this.logSource.next(log);
  }
  getLogs(): Observable<Log[]> {
    if (localStorage.getItem("logs") === null) this.logs = [];
    else {
      this.logs = JSON.parse(localStorage.getItem("logs"));
    }
    return of(
      this.logs.sort((a, b) => {
        return b.date - a.date;
      })
    );
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }
  updateLog(log: Log) {
    this.logs.forEach((currentLog, currentIndex) => {
      if (currentLog.id === log.id) {
        this.logs.splice(currentIndex, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }

  deleteLog(log: Log): void {
    const id = typeof log == "number" ? log : log.id;
    this.logs.forEach((currentLog, currentIndex) => {
      if (currentLog.id === log.id) {
        this.logs.splice(currentIndex, 1);
      }
    });
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }
  clearState() {
    this.stateSource.next(true);
  }
}
