'use strict';

var config = require('../codecept.json');

Feature('Test searching an activity');

Scenario('Key some phrases and check if activity is getting filtered', (I) => {
	I.openPage(config.base_url + 'page/opsportal');
	I.waitForElement('.fcf-team-filter', config.wait_time);
	I.seeElement('.fcf-team-filter');
	I.wait(5);
	I.fillField('.fcf-team-filter', 'Find The One');
	I.wait(1);
	I.see('Find The One');
});