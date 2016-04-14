(function (global) {
    'use strict';

    var htmlTemplate = [
        '<div class="star-parameters__head">',
            '<span class="head__star-name"><%head%></span>',
            '<button class="head__delete-button" type="button">',
                '&#215;',
            '</button>',
        '</div>',
        '<div class="star-parameters__levers">',
            '<div class="levers__number-lever levers__number-lever_star-level">',
                '<label>',
                    'Level',
                    '<input type="text">',
                '</label>',
            '</div>',
            '<div class="levers__number-lever levers__number-lever_star-radius">',
                '<label>',
                    'Radius',
                    '<input type="text">',
                '</label>',
            '</div>',
        '</div>'
    ].join('\n');

    function StarParametersBlock (id, data) {
        var blockElement = document.createElement('div');
        var blockId = 'star-parameters' + (id ? '-' + id : '');

        blockElement.setAttribute('id', blockId);
        blockElement.setAttribute('class', 'star-parameters');
        
        var html = htmlTemplate.replace('<%head%>', 'Star #' + id + ' parameters');
        blockElement.innerHTML = html;

        this.id = blockId;
        this.blockElement = blockElement;
        this.level = 0;
        this.radius = 0;

        if (data.level) {
            this.level = data.level;
        }
        if (data.radius) {
            this.radius = data.radius;
        }
        blockElement.querySelector('.levers__number-lever_star-level input').value = this.level;
        blockElement.querySelector('.levers__number-lever_star-radius input').value = this.radius;
    };

    StarParametersBlock.prototype.bind = function(eventName, callback) {
        var self = this;

        if (eventName === 'removeParameters') {
            self.blockElement.querySelector('.head__delete-button')
                .addEventListener('click', callback);
        } else if (eventName === 'changeParameters') {
            self.blockElement.querySelector('.levers__number-lever_star-level input')
                .addEventListener('change', function () {
                    self.level = this.value;
                    callback();
                });
            self.blockElement.querySelector('.levers__number-lever_star-radius input')
                .addEventListener('change', function () {
                    self.radius = this.value;
                    callback();
                });
        }
    };

    global.StarParametersBlock = StarParametersBlock;

})(window);