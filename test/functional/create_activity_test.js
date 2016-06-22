'use strict';

var config = require('../codecept.json');
var activityData = {}
	activityData.activity_name = 'Sample Activity 1';
	activityData.activity_alt_name = 'Sample Govt Activity 1';
	activityData.start_date = new Date();
	activityData.end_date = new Date();
	activityData.end_date.setDate(activityData.start_date.getDate() + 2);
	activityData.end_date.setMonth(activityData.start_date.getMonth() + 1);
	activityData.description ='Sample Description 1';
	activityData.alt_description = 'Govt Description 1';

Feature('Test creating an activity');

Scenario('Complete activity by uploading pics', (I) => {
	// Go to the activities page
	I.openPage(config.base_url + 'page/opsportal');
	I.dontSeeElement('.no-records-found');
	I.waitForVisible('.fcf-team-list', config.wait_time);
	I.seeElement('.fcf-team-list tbody tr');
	I.click('.fcf-team-list tbody tr');
	I.waitForEnabled('#fcf-activity-add-chooseteam-next', config.wait_time);
	I.click('#fcf-activity-add-chooseteam-next');
	// Check the activity existense
	I.waitForElement('.fcf-activity-list', config.wait_time);
	I.seeElement('.fcf-activity-list');
	I.see(activityData.activity_name);
	I.seeElement('.fcf-activity-list tbody tr[data-activity_name="' + activityData.activity_name + '"]')
	I.click('.fcf-activity-list tbody tr[data-activity_name="' + activityData.activity_name + '"]');
	I.waitForEnabled('#fcf-activity-add-chooseAssignment-next', config.wait_time);
	I.click('#fcf-activity-add-chooseAssignment-next');
	I.waitForElement('#fcf-activity-content-section', config.wait_time);
	I.seeElement('#fcf-activity-content-section');
	I.waitForElement('.fcf-activity-contentsection-activityList', config.wait_time);
	I.seeElement('.fcf-activity-contentsection-activityList');
	I.seeElement('.fcf-activity-activity-name');
	I.see(activityData.activity_name, '.fcf-activity-activity-name');

	// attach some files to hidden file input
	I.attachFile('.dz-hidden-input', './output/Complete_activity_by_uploading_pics.failed.png');
	I.pauseExecution();
	I.click('#fcf-activity-image-form-nav-finish');
});

Scenario('test if it has fcf activities module installed and try to create an activity', (I) => {
	// Get to the activities page
	I.openPage(config.base_url + 'page/opsportal'); // Call to a custom page object (See /custom_steps.js)
	I.dontSeeElement('.no-records-found'); // There must be at least one ministry in list
	I.waitForElement('.fcf-team-list', config.wait_time);
	I.seeElement('.fcf-team-list');
	I.waitForVisible('.fcf-team-list tbody tr', config.wait_time);
	I.seeElement('.fcf-team-list tbody tr');
	I.click('.fcf-team-list tbody tr');
	I.waitForEnabled('#fcf-activity-add-chooseteam-next', config.wait_time);
	I.click('#fcf-activity-add-chooseteam-next');
	I.waitForElement("#fcf-activity-add-chooseAssignment-addAssignment", config.wait_time);
	I.seeElement("#fcf-activity-add-chooseAssignment-addAssignment");
	I.click("#fcf-activity-add-chooseAssignment-addAssignment");
	I.waitForElement('#fcf-modal-new-Activity', config.wait_time);
	I.waitForVisible("#fcf-modal-new-Activity", config.wait_time);
	I.seeElement('#fcf-modal-new-Activity');

	// Form is now opened fill that
	I.fillActivityForm(activityData); // Again custom helper

	I.waitToHide('#fcf-modal-new-Activity', config.wait_time);
	I.waitForElement('.fcf-activity-list tbody tr[data-activity-name="Sample Activity 1"]', config.wait_time);
	I.see('.fcf-activity-list tbody tr[data-activity-name="Sample Activity 1"]');
});

Scenario('Check if the activity is available for edit', (I) => {
	// Go to the activities page
	I.openPage(config.base_url + 'page/opsportal');
	I.dontSeeElement('.no-records-found');
	I.waitForVisible('.fcf-team-list', config.wait_time);
	I.seeElement('.fcf-team-list tbody tr');
	I.click('.fcf-team-list tbody tr');
	I.waitForEnabled('#fcf-activity-add-chooseteam-next', config.wait_time);
	I.click('#fcf-activity-add-chooseteam-next');
	// Check the activity existense
	I.waitForElement('.fcf-activity-list', config.wait_time);
	I.seeElement('.fcf-activity-list');
	I.see(activityData.activity_name);
});


