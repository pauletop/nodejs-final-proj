$(document).ready(function() {
    var $form = $('#addPdForm');
    $form.submit(function(e) {
        e.preventDefault();
        let formData = new FormData(this);
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



// const addEmployeeForm = document.querySelector(".addPrd");
// addEmployeeForm.addEventListener("submit", async e => {
//     e.preventDefault();

//     const pname = document.querySelector("#pname").value;
//     const importPrice = document.querySelector("#importPrice").value;
//     const retailPrice = document.querySelector("#retailPrice").value;
//     const category = document.querySelector("#category").value;

//     // console.log(pname);
//     // console.log(category);   

//     const response = await fetch("/admin/products", {
//         method: "post",
//         headers: { "Content-Type": "application/json" },
//         body : JSON.stringify({pname, importPrice, retailPrice, category}),
//     });

//     const data = await response.json();
//     console.log(data);

//     if(!data.status) {
//         // window.location.reload();
//         document.querySelector(".message").innerHTML = "thêm k thành công";
//     } else {
//         // save to stored
//         // localStorage.setItem("empl", data.data);
//         window.location.reload();
//     };
// })

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