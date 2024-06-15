'use strict';

$(function() {
    const API = 'api/index.php';

    // Initial poets load
    $.ajax({
        url: API,
        type: 'GET',
        data: {
            entity: 'catalog',
            information: 'authors'
        },
        success: function(data) {            
            JSON.parse(data).forEach(author => $('#cmbPoets').append($('<option>', {text: author})));
            $('#cmbPoets').trigger('change');
        }
    });

    // Poet selection
    $('#cmbPoets').on('change', function() {
        // Load of poet information
        $.ajax({
            url: API,
            type: 'GET',
            data: {
                entity: 'author',
                information: 'info',
                name: $('#cmbPoets > option:selected').text()
            },
            success: function(data) {
                const info = JSON.parse(data);
                let dates = `${info.birthPlace}, ${info.birthDate}`;
                if (info.deathDate !== undefined) {
                    dates += `- ${info.deathPlace}, ${info.deathDate}`;
                }
                $('#poetInfo').text(dates);
            }
        });
        
        // Load of poet's list of poems
        $.ajax({
            url: API,
            type: 'GET',
            data: {
                entity: 'author',
                information: 'poems',
                name: $('#cmbPoets > option:selected').text()
            },
            success: function(data) {
                $('#poems').empty();
                JSON.parse(data).forEach(function(poemTitle) {
                    let poem = $('<article>');
                    poem.append($('<h3>', {text: poemTitle, class: 'closedPoem'}));
                    poem.find('h3').bind('click', poemHandler);

                    $('#poems').append(poem);
                });
            }
        });
    });

    /**
     * Handles the click event on the title of a poem,
     * which causes the text of the poem to be loaded
     */
    function poemHandler() {
        const thisPoem = $(this);

        // If the poem text is visible, it removes it
        if (thisPoem.parent().html().includes('<div>')) {
            thisPoem.removeClass('openPoem');
            thisPoem.addClass('closedPoem');
            thisPoem.parent().find('div').remove();
        } else {    // If the poem is not visible, it loads it
            $.ajax({
                url: API,
                type: 'GET',
                data: {
                    entity: 'poem',
                    information: 'text',
                    authorName: $('#cmbPoets > option:selected').text(),
                    title: $(this).text()
                },
                success: function(data) {
                    const poemText = JSON.parse(data).text;
                    thisPoem.removeClass('closedPoem');
                    thisPoem.addClass('openPoem');
                    thisPoem.parent().append($('<div>', {html: poemText}));
                }
            });
        }
    }
});
