function registerArticles() {
    $('.nav li h3').each(function() {
        var category = $(this).text().toLocaleLowerCase().replace(/[\.\s]+/g, '_');
        $(this).bind('click', function(evt) {
            collapseCategory($(this).siblings('ul .subnav'));
        });
        $(this).siblings('ul .subnav').each(function() {
            $(this).find('li').each(function() {
                var path = category + '/' + $(this).text().toLocaleLowerCase().replace(/[\.\s]+/g, '_');
                $(this).bind('click', function() {
                    loadArticle(path);
                });
            });
        });
    });
}

function loadArticle(path, firstTry) {
    if(path === '404' && !firstTry) {
        return;
    }

    $.ajax({
        url: 'content/' + path + '.html',
        success: function(data) {
            $('#container').html(data);
        },
        error: function(xhr, error) {
            loadArticle('404', firstTry ? false : true);
        }
    });
}

function collapseCategory(category) {
    category.children().each(function() {
        $(this).toggle();
    })
}

$('document').ready(function() {
    registerArticles();
});