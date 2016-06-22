var mod_extsprintf = require('extsprintf');

'use strict';

var config = require('./codecept.json');

// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    login: function (email, password) {
    	this.fillField('Email', email);
    	this.fillField('Password', password);
    	this.click('Submit');
    },

    openPage: function(url) {
    	this.amOnPage(url);
    	this.waitForElement('.app-label', config.wait_time);
		this.seeElement('.app-label');
		this.see('Menu', 'span');
		this.click('Menu', 'span');
		this.waitForText('Activities', config.wait_time);
		this.see('Activities');
		this.click('span[app-label-key="opp.areaFCFActivities"');
    },

    fillActivityForm: function (activityData) {
        this.waitForVisible('#activity_name', config.wait_time);
        this.fillField('#activity_name', activityData.activity_name);
        this.fillField('#activity_name_alt', activityData.activity_alt_name);

        var formattedDate = mod_extsprintf.sprintf('%02d', activityData.start_date.getMonth()) + '/';
        formattedDate += mod_extsprintf.sprintf('%02d', activityData.start_date.getDate()) + '/';
        formattedDate += activityData.start_date.getFullYear();
        this.fillField('#date_start', formattedDate);

        formattedDate = mod_extsprintf.sprintf('%02d', activityData.end_date.getMonth()) + '/';
        formattedDate += mod_extsprintf.sprintf('%02d', activityData.end_date.getDate()) + '/';
        formattedDate += activityData.end_date.getFullYear();
        this.fillField('#date_end', formattedDate);

        this.see('Find The One');
        this.see('Protect The One');
        this.see('Train The One');
        this.see('Find The One');
        this.waitForElement('input[value="1"][type="checkbox"][name="objective"]', config.wait_time);
        this.seeElement('input[value="1"][type="checkbox"][name="objective"]');

        /**
         * Not able to click or checkOption due to a bug in selenium driver, so just move on for time being
         * following 2 lines are victim btw
         * @see https://github.com/SeleniumHQ/selenium/issues/1202
         */
        this.scrollTo('input[value="1"][type="checkbox"][name="objective"]', 2,2);
        this.click('input[value="1"][type="checkbox"][name="objective"]');

        this.fillField('#activityDescription', activityData.description);
        this.fillField('#activityDescriptionGovt', activityData.alt_description);
        this.click('#add-assignment');

    }

  });
}
