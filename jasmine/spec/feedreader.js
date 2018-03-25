$(function() {

    describe('RSS Feeds', function() {

        // Check if feed exists
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // A test that see if all feed objects have URLs.
        it('have URLs', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        // A test that see if all feed objects have names.
        it('have names', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });

    });


    describe('The menu', function() {

        // A test that see if menu element is hidden by default.
        it('should be hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        // A test that ensures that menu element's visibility changes on click.
        it('should be show and hide on click', function(){
            const menu = document.querySelector('.menu-icon-link');
            var clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            menu.dispatchEvent(clickEvent);
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            menu.dispatchEvent(clickEvent);
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });

    describe('Initial Entries', function() {

        // Load first feed before test
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // A test that ensures that initial entries are loaded on the page.
        it('are loaded', function(done) {
            const entries = $('.feed .entry');
            expect(entries).toBeDefined();
            expect(entries.length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function() {

        // First feed is loaded and its content is saved the second feed is loaded.
        let content;
        beforeEach(function(done) {
            loadFeed(0, function() {
                content = document.querySelector('.feed').textContent;
                loadFeed(1, function() {
                    done();
                });
            });
        });

        // A test that verfies if content is changing when a new feed is loaded.
        it('changes content', function(done) {
            const newContent = document.querySelector('.feed').textContent;
            expect(content).toBeDefined();
            expect(newContent).toBeDefined();
            expect(content).not.toBe(newContent);
            done();
        });

    });
}());
