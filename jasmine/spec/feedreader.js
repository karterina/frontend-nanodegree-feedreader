/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('urls are defined', function() {
           for (var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url.length).not.toBe(0);
           };
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined', function() {
           for (var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name.length).not.toBe(0);
           };
         });
    });

    describe('The menu', function() {


        /* A test that ensures the menu element is
         * hidden by default.
         */
         it('menu is hidden by default', function() {
            const body = document.querySelector('body');
            // checking for class that hides the menu
            expect(body.classList).toContain('menu-hidden');
         });
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
          it('toggle menu on click', function() {
            const body = document.querySelector('body')
            // menu is visible
            document.getElementsByClassName('menu-icon-link')[0].click()
            expect(body.classList).not.toContain('menu-hidden');
            // menu is hidden
            document.getElementsByClassName('menu-icon-link')[0].click()
            expect(body.classList).toContain('menu-hidden');
         });
    });

    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function (done) {
           loadFeed(0, function () {
               done();
           });
         });
         //tests for at least one entry
         it('has at least one entry', function () {
           let entries = document.querySelectorAll('.feed .entry');
           expect(entries.length).toBeGreaterThan(0);
         });
      });

    describe('New Feed Selection', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let firstFeed;
         beforeEach(function(done) {
          loadFeed(0, function() {
              // store old feed
              oldFeed = document.querySelector('.feed').innerHTML;
              // get newer feed
              loadFeed(1, done);
           });
         });
         //tests for feeds being different by comparing their inner HTML
         it('loads different feed', function() {
           let secondFeed = document.querySelector('.feed').innerHTML;
           expect(secondFeed).not.toBe(firstFeed);
         });
    });
}());
