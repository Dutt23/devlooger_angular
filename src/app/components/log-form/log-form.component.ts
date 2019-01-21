import { Component, OnInit, ViewChild } from "@angular/core";
import { Log } from "../../models/Log";
import { LogService } from "../../services/log.service";

@Component({
  selector: "app-log-form",
  templateUrl: "./log-form.component.html",
  styleUrls: ["./log-form.component.css"]
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;
  isNew: boolean = true;
  @ViewChild("logForm") form: any;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logService.selectedLog.subscribe(log => {
      if (log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  onSubmit() {
    // Create new log
    if (this.isNew) {
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      };
      this.logService.addLog(newLog);
    } else {
      const updatedPost = {
        id: this.id,
        text: this.text,
        date: new Date()
      };
      this.logService.updateLog(updatedPost);
    }
    this.clearState();
  }
  clearState() {
    this.id = "";
    this.text = "";
    this.date = "";
    this.isNew = true;
    this.logService.clearState();
  }

  onClearField(text: string) {
    if (this.text !== undefined) {
      if (!this.text) {
        this.isNew = true;
        this.clearState();
      }
    }
  }

  generateId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
