console.log("InvoiceGen V2 loaded!");


// =========================
// GET ELEMENTS
// =========================

const productsBody =
    document.getElementById("product-body");

const addProduct =
    document.getElementById("add-product");

const downloadInvoice =
    document.getElementById("download-invoice");

const whatsappButton =
    document.getElementById("whatsapp-button");

const themeButton =
    document.getElementById("theme-button");


// =========================
// BUSINESS
// =========================

const businessName =
    document.getElementById("business-name");

const businessEmail =
    document.getElementById("business-email");

const previewBusinessName =
    document.getElementById("preview-business-name");

const previewBusinessEmail =
    document.getElementById("preview-business-email");


// =========================
// CUSTOMER
// =========================

const customerName =
    document.getElementById("customer-name");

const customerContact =
    document.getElementById("customer-email-phone");

const customerNamePreview =
    document.getElementById("customer-name-preview");

const customerContactPreview =
    document.getElementById("customer-contact-preview");


// =========================
// INVOICE
// =========================

const invoice =
    document.getElementById("invoice");

const date =
    document.getElementById("date");

const previewInvoice =
    document.getElementById("preview-invoice");

const previewDate =
    document.getElementById("preview-date");


// =========================
// PREVIEW
// =========================

const previewProductBody =
    document.getElementById("preview-product-body");

const grandTotal =
    document.getElementById("grand-total");


// =========================
// BUSINESS PREVIEW
// =========================

businessName.addEventListener("input", function () {

    previewBusinessName.textContent =
        businessName.value.trim() ||
        "Business Name";

});


businessEmail.addEventListener("input", function () {

    previewBusinessEmail.textContent =
        businessEmail.value.trim() ||
        "business@email.com";

});


// =========================
// CUSTOMER PREVIEW
// =========================

customerName.addEventListener("input", function () {

    customerNamePreview.textContent =
        customerName.value.trim() ||
        "Customer Name";

});


customerContact.addEventListener("input", function () {

    customerContactPreview.textContent =
        customerContact.value.trim() ||
        "customer@email.com";

});


// =========================
// INVOICE NUMBER
// =========================

invoice.addEventListener("input", function () {

    previewInvoice.textContent =
        invoice.value.trim() ||
        "INV-001";

});


// =========================
// DATE
// =========================

const today =
    new Date();

const todayString =
    today.toISOString().split("T")[0];

date.value =
    todayString;


function formatDate(dateValue) {

    if (!dateValue) {

        return "Date";

    }

    const parts =
        dateValue.split("-");

    return (
        parts[2] +
        "/" +
        parts[1] +
        "/" +
        parts[0]
    );

}


previewDate.textContent =
    formatDate(date.value);


date.addEventListener("input", function () {

    previewDate.textContent =
        formatDate(date.value);

});


// =========================
// UPDATE PREVIEW PRODUCTS
// =========================

function updatePreviewProducts() {

    previewProductBody.innerHTML = "";

    const rows =
        productsBody.querySelectorAll("tr");


    rows.forEach(function (row) {

        const productName =
            row.querySelector(".product-name").value.trim();

        const quantity =
            row.querySelector(".quantity").value;

        const price =
            Number(
                row.querySelector(".price").value
            ) || 0;

        const total =
            Number(quantity || 0) * price;


        const previewRow =
            document.createElement("tr");


        previewRow.innerHTML = `

            <td>
                ${productName || "Product"}
            </td>

            <td>
                ${quantity || "0"}
            </td>

            <td>
                ${price.toFixed(2)} DH
            </td>

            <td>
                ${total.toFixed(2)} DH
            </td>

        `;


        previewProductBody.appendChild(
            previewRow
        );

    });

}


// =========================
// UPDATE GRAND TOTAL
// =========================

function updateInvoiceTotal() {

    let total =
        0;


    const rows =
        productsBody.querySelectorAll("tr");


    rows.forEach(function (row) {

        const quantity =
            Number(
                row.querySelector(".quantity").value
            ) || 0;

        const price =
            Number(
                row.querySelector(".price").value
            ) || 0;


        total +=
            quantity * price;

    });


    grandTotal.textContent =
        total.toFixed(2) + " DH";

}


// =========================
// SETUP PRODUCT ROW
// =========================

function setupRow(row) {

    const productName =
        row.querySelector(".product-name");

    const quantity =
        row.querySelector(".quantity");

    const price =
        row.querySelector(".price");

    const total =
        row.querySelector(".product-total");

    const deleteButton =
        row.querySelector(".delete-product");


    function calculateRowTotal() {

        const quantityValue =
            Number(quantity.value) || 0;

        const priceValue =
            Number(price.value) || 0;


        const result =
            quantityValue * priceValue;


        total.textContent =
            result.toFixed(2) + " DH";


        updatePreviewProducts();

        updateInvoiceTotal();

    }


    productName.addEventListener(
        "input",
        function () {

            updatePreviewProducts();

        }
    );


    quantity.addEventListener(
        "input",
        function () {

            calculateRowTotal();

        }
    );


    price.addEventListener(
        "input",
        function () {

            calculateRowTotal();

        }
    );


    deleteButton.addEventListener(
        "click",
        function () {

            const rows =
                productsBody.querySelectorAll("tr");


            if (rows.length === 1) {

                productName.value = "";

                quantity.value = 1;

                price.value = "";

                calculateRowTotal();

                return;

            }


            row.remove();

            updatePreviewProducts();

            updateInvoiceTotal();

        }
    );

}


// =========================
// FIRST ROW
// =========================

const firstRow =
    productsBody.querySelector("tr");

setupRow(firstRow);


// =========================
// ADD PRODUCT
// =========================

addProduct.addEventListener(
    "click",
    function () {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <input
                    type="text"
                    placeholder="Product name"
                    class="product-name"
                >

            </td>


            <td>

                <input
                    type="number"
                    class="quantity"
                    min="1"
                    value="1"
                >

            </td>


            <td>

                <input
                    type="number"
                    class="price"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                >

            </td>


            <td class="product-total">
                0.00 DH
            </td>


            <td>

                <button
                    type="button"
                    class="delete-product"
                >
                    🗑️
                </button>

            </td>

        `;


        productsBody.appendChild(row);


        setupRow(row);


        updatePreviewProducts();

        updateInvoiceTotal();

    }
);


// =========================
// INITIAL UPDATE
// =========================

updatePreviewProducts();

updateInvoiceTotal();


// =========================
// DARK / LIGHT MODE
// =========================

themeButton.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "light-mode"
        );


        if (
            document.body.classList.contains(
                "light-mode"
            )
        ) {

            themeButton.textContent =
                "☀️";

        } else {

            themeButton.textContent =
                "🌙";

        }

    }
);


// =========================
// DOWNLOAD PDF
// =========================

downloadInvoice.addEventListener(
    "click",
    async function () {

        const invoiceElement =
            document.querySelector(".invoice");


        const canvas =
            await html2canvas(
                invoiceElement,
                {
                    scale: 2,

                    backgroundColor: "#ffffff"
                }
            );


        const imageData =
            canvas.toDataURL("image/png");


        const {
            jsPDF
        } = window.jspdf;


        const pdf =
            new jsPDF(
                "p",
                "mm",
                "a4"
            );


        const pageWidth =
            pdf.internal.pageSize.getWidth();

        const pageHeight =
            pdf.internal.pageSize.getHeight();


        const imageWidth =
            pageWidth - 20;

        const imageHeight =
            canvas.height *
            imageWidth /
            canvas.width;


        let finalHeight =
            imageHeight;


        if (
            finalHeight >
            pageHeight - 20
        ) {

            finalHeight =
                pageHeight - 20;

        }


        pdf.addImage(
            imageData,
            "PNG",
            10,
            10,
            imageWidth,
            finalHeight
        );


        const invoiceNumber =
            invoice.value.trim() ||
            "INV-001";


        pdf.save(
            invoiceNumber + ".pdf"
        );

    }
);


// =========================
// WHATSAPP
// =========================

whatsappButton.addEventListener(
    "click",
    function () {

        const customer =
            customerName.value.trim() ||
            "there";


        const invoiceNumber =
            invoice.value.trim() ||
            "INV-001";


        const total =
            grandTotal.textContent;


        const message =

`Hello ${customer},

Here is your invoice ${invoiceNumber}.

Total: ${total}

Thank you for your business!`;

        
        const whatsappURL =
            "https://wa.me/?text=" +
            encodeURIComponent(message);


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);