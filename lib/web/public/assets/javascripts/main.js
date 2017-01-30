jQuery(document).ready(function($) {
    /* List View */
    //initialize list view
    $('.list-controls').show();
    $('.list-month').hide();
    $('.list-month:eq(0)').addClass('active').show();

    $('.list-event-prev').html('<span class="fa fa-chevron-left"></span>');

    $('.list-event-next').html('<span class="fa fa-chevron-right"></span>');


    //handle controls
    $('.list-month').each(function() {
        if ($(this).prev('.list-month').length > 0) {
            $(this).find('.list-event-prev').addClass('hasPrev');
        }
    });
    $('.list-month').each(function() {
        if ($(this).next('.list-month').length > 0) {
            $(this).find('.list-event-next').addClass('hasNext');
        }
    });

    $('.list-event-prev').click(function() {
        if ($('.list-month.active').prev('.list-month').length > 0) {
            $('.list-month.active').removeClass('active').hide().prev('.list-month').addClass('active').show();
        }
    });

    $('.list-event-next').click(function() {
        if ($('.list-month.active').next('.list-month').length > 0) {
            $('.list-month.active').removeClass('active').hide().next('.list-month').addClass('active').show();
        }
    });

    /* End of list view */

    $('select').select2({
        minimumResultsForSearch: Infinity
    });

    $(".profile.dropdown").on('click touchstart',  function(event) {
        event.preventDefault();
        /* Act on the event */
        $(this).toggleClass('open');
    });


    $(".profile.dropdown > .dropdown-menu li  a").on('click touchstart', function(event) {
        event.preventDefault();
        window.location = $(this).attr("href");
    });


    // for booking filters
    jQuery.extend({
        getQueryParameters : function(str) {
            return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
        }
    });
    $("select#agent_select").on('change', function(event) {
        event.preventDefault();
        /* Act on the event */
        var queryParams = $.getQueryParameters();
        delete queryParams[""];
        if (this.value != "") {
            queryParams.agent_id = this.value;
        } else {
            if(queryParams.agent_id) {
                delete queryParams.agent_id;
            } 
        }
        window.location = window.location.pathname + "?" + $.param(queryParams);
    });
    $("select#team_select").on('change', function(event) {
        event.preventDefault();
        /* Act on the event */
        var queryParams = $.getQueryParameters();
        delete queryParams[""];
        if (this.value != "") {
            queryParams.team_id = this.value;
        } else {
            if(queryParams.team_id) {
                delete queryParams.team_id;
            } 
        }
        window.location = window.location.pathname + "?" + $.param(queryParams);
    });

    $("form#module-search").on('submit',  function(event) {
        event.preventDefault();
        /* Act on the event */
        var q = $("form#module-search input#module-search-term").val();
        var queryParams = $.getQueryParameters();
        delete queryParams[""];
        if (q != ""){
            queryParams.q = q;
        } else {
            if (queryParams.q) {
                delete queryParams.q;
            }
        }
        window.location = window.location.pathname + "?" + $.param(queryParams);
    });
});
