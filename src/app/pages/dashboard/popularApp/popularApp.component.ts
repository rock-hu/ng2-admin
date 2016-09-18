import {Component, ViewEncapsulation} from '@angular/core';

import {BaAppPicturePipe} from '../../../theme/pipes';

@Component({
  selector: 'popular-app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./popularApp.scss')],
  template: require('./popularApp.html')
})
export class PopularApp {

  ngOnInit() {
  }
}
