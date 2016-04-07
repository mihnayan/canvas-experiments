(function (global) {
    'use strict';

    var htmlTemplate = [
        '<div class="star-parameters__star-head">',
            '<%head%>',
        '</div>',
        '<div>',
            '<button class="star-parameters__delete-parameters" type="button">',
                'x',
            '</button>',
        '</div>',
        '<label>',
        '    Level',
        '    <input class="star-parameters__star-level" type="text" value="3">',
        '</label>',
        '<label>',
        '    Increment',
        '    <input class="star-parameters__star-increment" type="text" value="0">',
        '</label>'
    ].join('\n');
    
    function StarParametersBlock (id, head) {
        var blockElement = document.createElement('div');
        var blockId = 'star-parameters' + (id ? '-' + id : '');

        blockElement.setAttribute('id', blockId);
        blockElement.setAttribute('class', 'star-parameters');
        
        var html = htmlTemplate.replace('<%head%>', head);
        blockElement.innerHTML = html;

        this.id = blockId;
        this.blockElement = blockElement;
    };

    StarParametersBlock.prototype.bind = function(eventName, callback) {
        if (eventName === 'removeParameters') {
            this.blockElement.querySelector('.star-parameters__delete-parameters')
                .addEventListener('click', callback);
        }
    };

    global.StarParametersBlock = StarParametersBlock;

})(window);