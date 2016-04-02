var starParametersBlock = (function () {

    return {
        getNewBlock: function (id, head) {
            var blockElement = document.createElement('div');
            var blockId = 'star-parameters' + (id ? '-' + id : '');
            var delButtonId = 'del-' + blockId;

            blockElement.setAttribute('id', blockId);
            blockElement.setAttribute('class', 'star-parameters');
            blockElement.innerHTML = [
                '<div class="star-parameters__star-head">',
                    head,
                '</div>',
                '<div>',
                    '<button class="star-parameters__delete-parameters" id="' 
                            + delButtonId 
                            + '" type="button">x</button>',
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

            blockElement.querySelector('#' + delButtonId)
                .addEventListener('click', function () {
                    blockElement.parentNode.removeChild(blockElement);
                });

            return blockElement;
        }
    }
})();