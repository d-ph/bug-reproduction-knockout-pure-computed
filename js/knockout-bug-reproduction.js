(function ($, ko, window, console) {
    'use strict';

    function KnockoutBugReproduction() {
        this.pageNumber$ = ko.observable(0);
        this.listener1LocalVarPageNumberPlusTwenty$ = ko.observable(0);

        var self = this;

        // ----

        this.pageNumberPlusTen$ = ko.pureComputed(function () {
            console.log(
                'Computed:',
                'pageNumber: ' + self.pageNumber$(),
                'listener1LocalVarPageNumberPlusTwenty: ' + self.listener1LocalVarPageNumberPlusTwenty$()
            );

            return self.pageNumber$() + 10;
        });

        // ----

        this.pageNumber$.subscribe(function () {
            self.logTrace('Listener 1');

            self.listener1LocalVarPageNumberPlusTwenty$(self.pageNumber$() + 20);

            if (self.pageNumber$() === 5) {
                return;
            }

            self.pageNumber$(5);
        });

        this.pageNumber$.subscribe(function () {
            self.logTrace('Listener 2');
        });

        this.listener1LocalVarPageNumberPlusTwenty$.subscribe(function () {
            self.logTrace('Listener 3');
        });

        // this.pageNumberPlusTen$.subscribe(function () {
        //     self.logTrace('Listener 4, to pure computed');
        // });
    }

    KnockoutBugReproduction.prototype.logTrace = function (fromWhere) {
        console.log(
            fromWhere + ':',
            'pageNumber: ' + this.pageNumber$(),
            'pageNumberPlusTen: ' + this.pageNumberPlusTen$(),
            'listener1LocalVarPageNumberPlusTwenty: ' + this.listener1LocalVarPageNumberPlusTwenty$()
        );
    };

    window.knockoutBugReproduction = new KnockoutBugReproduction();
})($, ko, window, console);
