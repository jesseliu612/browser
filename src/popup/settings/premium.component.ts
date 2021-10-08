import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

import { ActiveAccountService } from 'jslib-common/abstractions/activeAccount.service';
import { ApiService } from 'jslib-common/abstractions/api.service';
import { I18nService } from 'jslib-common/abstractions/i18n.service';
import { PlatformUtilsService } from 'jslib-common/abstractions/platformUtils.service';

import { PremiumComponent as BasePremiumComponent } from 'jslib-angular/components/premium.component';

@Component({
    selector: 'app-premium',
    templateUrl: 'premium.component.html',
})
export class PremiumComponent extends BasePremiumComponent {
    priceString: string;

    constructor(i18nService: I18nService, platformUtilsService: PlatformUtilsService,
        apiService: ApiService, activeAccount: ActiveAccountService,
        private currencyPipe: CurrencyPipe) {
        super(i18nService, platformUtilsService, apiService, activeAccount);

        // Support old price string. Can be removed in future once all translations are properly updated.
        const thePrice = this.currencyPipe.transform(this.price, '$');
        this.priceString = i18nService.t('premiumPrice', thePrice);
        if (this.priceString.indexOf('%price%') > -1) {
            this.priceString = this.priceString.replace('%price%', thePrice);
        }
    }
}
