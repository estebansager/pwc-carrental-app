import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector: 'error',
    templateUrl: './error.component.html',
    standalone: false
})
export class ErrorComponent {
    @Input() message$: Observable<string>
}