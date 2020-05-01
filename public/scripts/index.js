// Classes
class List {
    constructor(ID, color, title) {
        this.ID = ID,
        this.color = color;
        this.title = title;
    }

    createHTML() {
        let list = `
        <div class="list" id="${this.ID}">
            <div class="list-title ${this.color}">
                <h4 class="title">${this.title}</h4>
                <div class="btn-delete">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
            <div class="list-body"></div>
            <div class="add-item">
                <form action="/additem" method="POST">
                    <input class="input-item" type="text" name="newItem" placeholder="Add item" autocomplete="off">
                    <button class="btn-item ${this.color}" type="submit" name="listID"
                    value="${this.ID}">+</button>
                </form>
            </div>
        </div>
        `;

        return list;
    }
}

//New list
$('.btn-new-list').click((event) => {
    var inputValue = $('.input-new-list').val();
    var container = $('.main-container');
    var lastID = container.children().last().prop('id');

    if (lastID === undefined) {
        lastID = 0;
    } else {
        lastID = Number(lastID) + 1;
    }

    console.log(lastID)
    $.ajax({
        method: 'POST',
        url: '/newlist',
        data: {
            title: inputValue,
            listID: Number(lastID)
        },
        dataType: 'json'
    })
        .done((data) => {
            var newList;
            if (inputValue === '') {
                newList = new List(data.ID, data.color, data.title);
                container.append(newList.createHTML());
            } else {
                newList = new List(data.ID, data.color, inputValue);
                container.append(newList.createHTML());
            }
        })
})


//Delete list

$('.main-container').on('click', '.btn-delete', (event) => {
    var list = $(event.target).parent().parent().parent();
    var listID = list.prop('id');
    $.ajax({
        method: 'DELETE',
        url: '/delete',
        data: {
            listID: listID
        },
    })
        .done(() => {
            $(list).remove();
        })
        .fail(() => {
            alert('Ups! Something went wrong.Reloading page...');
            window.location.href = '/';
        });
})

// WORKING 
// $(".btn-delete").click((event) => {
//     var list = $(event.target).parent().parent().parent();
//     var listID = list.prop('id');
//     $.ajax({
//         method: 'DELETE',
//         url: '/delete',
//         data: {
//             listID: listID
//         },
//     })
//         .done(() => {
//             $(list).remove();
//         })
//         .fail(() => {
//             alert('Ups! Something went wrong.Reloading page...');
//             window.location.href = '/';
//         });
// })

//Change list title
$('.main-container').on('click', 'h4', (event) => {
    var title = $(event.target);
    var listID = title.parent().parent().prop('id');
    var input = $('<input>', {
        class: 'input-title',
        name: listID,
        value: title.text()
    })

    $(title).replaceWith(input);
    var newInput = $('.input-title');
    newInput.focus();

    $(newInput).focusout((event) => {
        var div = $('<h4>', {
            class: 'title',
            text: newInput.val()
        })
        if (newInput.val() !== title.text()) {
            $.ajax({
                method: 'PUT',
                url: '/update',
                data: {
                    listID: listID,
                    change: 'title',
                    title: newInput.val()
                }
            })
                .done(() => {
                    $(newInput).replaceWith(div);
                })
                .fail(() => {
                    alert('Ups! Something went wrong.Reloading page...');
                    window.location.href = '/';
                });
        }
    })

})

// List item checked/unchecked
$('.main-container').on('click', ':checkbox', (event) => {
    var checkbox = $(event.target);
    var itemID = checkbox.parent().prop('id');
    var listID = checkbox.parent().parent().parent().prop('id');
    var data = {
        listID: listID,
        itemID: itemID,
        change: 'item-done',
        done: Boolean
    }

    if (checkbox.is(':checked')) {
        checkbox.siblings().toggleClass('item-done');
        data.done = true;
    } else {
        checkbox.siblings().toggleClass('item-done');
        data.done = false;
    }

    $.ajax({
        method: 'PUT',
        url: '/update',
        data: data
    })
        .done(() => {
            console.log('Input change ok');
        })
        .fail(() => {
            alert('Ups! Something went wrong.Reloading page...');
            window.location.href = '/';
        });

    console.log(data);
})