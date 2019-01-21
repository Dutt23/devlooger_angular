import { Component, OnInit, ViewChild } from "@angular/core";
import { Log } from "../../models/Log";
import { LogService } from "../../services/log.service";
@Component({
  selector: "app-logs",
  templateUrl: "./logs.component.html",
  styleUrls: ["./logs.component.css"]
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedLog = {
          id: "",
          text: "",
          date: ""
        };
      }
    });

    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
    });
  }
  onSelect(log: Log) {
    this.selectedLog = log;
    this.logService.setFormLog(log);
  }

  onDelete(log: Log) {
    this.logService.deleteLog(log);
  }
}
