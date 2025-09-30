import { Component } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  imports: [],
  template: `
    <div class="page-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
  @use 'variables' as *;
  div {
    margin: 0 auto;
    max-width: $container-width;
    width: 100%;
  }
  `
})
export class PageWrapper {

}
