$(document).ready(function() {
    var $form = $('#addPdForm');
    // support checkbox caption
    $("#enter-category").click(function() {
        let isChecked = $(this).is(":checked");
        let $newCategoryName = $("#new-category-name"),
            $productCategory = $("#product-category");
        if (!isChecked) {
            $productCategory.attr("disabled", false);
            $productCategory.attr("required", true);
            $newCategoryName.attr("required", false);
        } else {
            $productCategory.attr("disabled", true);
            $productCategory.attr("required", false);
            $newCategoryName.attr("required", true);
        }
    });
    $("#enter-category-e").click(function() {
        let isChecked = $(this).is(":checked");
        let $newCategoryName = $("#new-category-name-e"),
            $productCategory = $("#product-category-e");
        if (!isChecked) {
            $productCategory.attr("disabled", false);
            $productCategory.attr("required", true);
            $newCategoryName.attr("required", false);
        } else {
            $productCategory.attr("disabled", true);
            $productCategory.attr("required", false);
            $newCategoryName.attr("required", true);
        }
    });
    $("#product-barcode").on("dblclick", function() {
        $(this).attr("readonly", false);
    });
    $("#product-barcode").blur(function() {
        $(this).attr("readonly", true);
    });
    $("#submitAdd").click(e => {
        e.preventDefault();
        $form.find("input[type='submit']").trigger("click");
    })
    $form.submit(function(e) {
        e.preventDefault();
        let formData = new FormData(this);
        var category;
        if ($("#enter-category").is(":checked")) {
            category = $("#new-category-name").val();
        } else {
            category = $("#product-category").val();
        }
        formData.append("category", category);
        console.log(formData);
        $.ajax({
            url: '/admin/products',
            type: 'POST',
            data: formData,
            success: function(data) {
                console.log(data);
                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: '<span style="color: var(--bg-primary-color)">Add product successfully</span>',
                        showConfirmButton: false,
                        showCloseButton: true,
                        background: 'var(--text-primary-color)',
                        timer: 2000
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '<span style="color: var(--bg-primary-color)">Add product failed</span>',
                        text: data.message,
                        showConfirmButton: false,
                        showCloseButton: true,
                        background: 'var(--text-primary-color)',
                        timer: 2000
                    });
                }
            },
            error: function(data) {
                Swal.fire({
                    icon: 'error',
                    title: '<span style="color: var(--bg-primary-color)">Add product failed</span>',
                    text: data.responseJSON.message,
                    showConfirmButton: false,
                    showCloseButton: true,
                    background: 'var(--text-primary-color)',
                    timer: 2000
                });
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
});

const updateBtns = document.querySelectorAll(".updatePrd");
for (let i = 0; i < updateBtns.length; i++) {
    let thisBtn = updateBtns[i];
    thisBtn.addEventListener('click', async e => {
        const prdID = thisBtn.id;

        const response = await fetch("/admin/products/update/e", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body : JSON.stringify({prdID}),
        });

        const data = await response.json();
        console.log(data.data);

        localStorage.setItem('_id', prdID);
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('imp', data.data.imp);
        localStorage.setItem('ret', data.data.ret);
        localStorage.setItem('cat', data.data.cat);


        window.location.href = '/admin/products/update'
    })    
}

const delBtns = document.querySelectorAll(".deletePrd");
for (let i = 0; i < delBtns.length; i++) {
    let thisBtn = delBtns[i];
    thisBtn.addEventListener('click', async e => {
        const prdID = thisBtn.id;

        const response = await fetch(`/admin/products/del/${prdID}`, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body : JSON.stringify({prdID}),
        });

        const data = await response.json();
        if (data.status) {
            window.location.reload();
        }
    })
}