$(document).ready(function () {

    var myarray = [];
    var table = $('tbody');
    // for home.html
    $.ajax({
        url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20191010&json',
        method: "GET",
        dataType: "json",
        success: function (data) {

            myarray = data;
            fillTable(table, data);
            console.log(data);
            console.log(table);

        }
    });


    function getData() {

        $.ajax({
            url: "https://informer.minfin.com.ua/ua/gen/banks",
            dataType: "html",
            method: "GET",
            success: (data) => {
                console.log('from AJAX', data);
            }
        });

        var frame = $('iframe#minfin');

        frame.ready(() => {
            console.log({
                "content": frame.contents(),
                'context': frame.context
            });
        })
    }
    getData();


    $('.sort-by-code').click(function () {
        sortByClick("r030", $(this));
    });

    $('.sort-by-name').click(function () {
        sortByClick("txt", $(this));
    });

    $('.sort-by-course').click(function () {
        sortByClick("rate", $(this));
    });


    $('.sort-by-letter').click(function () {
        sortByClick("cc", $(this));
    });

    $('.most-common').click(function (event) {
        var copyarray = myarray.filter(function(item){
            if(parseFloat(item.rate) < 100 && parseFloat(item.rate) > 5 ){
                return item;
            }
        });
        table.html('');
        fillTable(table, copyarray);
    });
    $('.reset').click(function(event){
        table.html('');
        fillTable(table, myarray);
    });

    function sortByClick(key, el) {
        if(el.hasClass("min-to-max")){
            myarray.sort(function (a,b) {
                return minToMax(a, b, key);
             });
             el.removeClass("min-to-max");
        } else{
            myarray.sort(function (a, b) {
                return maxToMin(a, b, key)
            });
            el.addClass("min-to-max");
        }

        table.html('');
        fillTable(table, myarray);
    }

    function minToMax(a, b, key) {
        var a = a[key];
        var b = b[key];
        if (parseFloat(a) && parseFloat(b)) {
            return parseFloat(a) - parseFloat(b);
        } else {
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            } else if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    function maxToMin(a, b, key) {
        var a = a[key];
        var b = b[key];
        if (parseFloat(a) && parseFloat(b)) {
            return parseFloat(b) - parseFloat(a);
        } else {
            if (a.toLowerCase() > b.toLowerCase()) {
                return -1;
            } else if (a.toLowerCase() < b.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    function fillTable(table, arr) {
        for( var i = 0; i < arr.length; i++){
            var tr = document.createElement('tr');

            for (var prop in arr[i]) {
                // console.log(arr[i][prop]);
                var td = document.createElement('td');
                td.innerHTML = arr[i][prop];
                tr.appendChild(td);
              }

            table.append(tr);

        };
    };

});