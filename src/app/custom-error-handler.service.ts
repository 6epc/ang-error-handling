import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {

  constructor(
    private snackbar: MatSnackBar,
    private zone: NgZone
    ) {}

  handleError(error: unknown) {
    this.zone.run(() => {
      this.snackbar.open(
        'Error was detected! We already work on it!',
        'Close',
        {
          duration: 5000,
        }
      );
    });

    console.warn(`Caught by Custom Error Handler: `, error);
  }
}
