console.log("Invoice generator loaded!");


// =========================
// GET ELEMENTS
// =========================

const productsBody = document.getElementById("product-body");
const addProduct = document.getElementById("add-product");
const downloadInvoice = document.getElementById("download-invoice");

const themeButton = document.getElementById("theme-button");


// =========================
// BUSINESS
// =========================

const businessName = document.getElementById("business-name");
const businessEmail = document.getElementById("business-email");

const previewBusinessName = document.getElementById("preview-business-name");
const previewBusinessEmail = document.getElementById("preview-business-email");


// =========================
// CUSTOMER
// =========================

const customerName = document.getElementById("customer-name");
const customerContact = document.getElementById("customer-email-phone");

const customerNamePreview = document.getElementById("customer-name-preview");
const customerContactPreview = document.getElementById("customer-contact-preview");


// =========================
// INVOICE
// =========================

const invoice = document.getElementById("invoice");
const date = document.getElementById("date");

const previewInvoice = document.getElementById("preview-invoice");
const previewDate = document.getElementById("preview-date");


// =========================
// PRODUCTS PREVIEW
// =========================

const previewProductBody = document.getElementById("preview-product-body");


// =========================
// GRAND TOTAL
// =========================

const invoiceTotal = document.querySelector(".invoice-total strong");


// =========================
// BUSINESS PREVIEW
// =========================

businessName.addEventListener("input", function() {

    if (businessName.value.trim() === "") {
        previewBusinessName.textContent = "Business Name";
    } else {
        previewBusinessName.textContent = businessName.value;
    }

});


businessEmail.addEventListener("input", function() {

    if (businessEmail.value.trim() === "") {
        previewBusinessEmail.textContent = "business@email.com";
    } else {
        previewBusinessEmail.textContent = businessEmail.value;
    }

});


// =========================
// CUSTOMER PREVIEW
// =========================

customerName.addEventListener("input", function() {

    if (customerName.value.trim() === "") {
        customerNamePreview.textContent = "Customer Name";
    } else {
        customerNamePreview.textContent = customerName.value;
    }

});


customerContact.addEventListener("input", function() {

    if (customerContact.value.trim() === "") {
        customerContactPreview.textContent = "customer@email.com";
    } else {
        customerContactPreview.textContent = customerContact.value;
    }

});


// =========================
// INVOICE PREVIEW
// =========================

invoice.addEventListener("input", function() {

    if (invoice.value.trim() === "") {
        previewInvoice.textContent = "INV-001";
    } else {
        previewInvoice.textContent = invoice.value;
    }

});


// =========================
// DATE
// =========================

const today = new Date();

const todayString = today.toISOString().split("T")[0];

date.value = todayString;


function formatDate(dateValue) {

    if (!dateValue) {
        return "Date";
    }

    const parts = dateValue.split("-");

    return parts[2] + "/" + parts[1] + "/" + parts[0];

}


previewDate.textContent = formatDate(date.value);


date.addEventListener("input", function() {

    previewDate.textContent = formatDate(date.value);

});


// =========================
// PRODUCT PREVIEW
// =========================

function updatePreviewProducts() {

    previewProductBody.innerHTML = "";

    const rows = productsBody.querySelectorAll("tr");

    rows.forEach(function(row) {

        const productName =
            row.querySelector('input[type="text"]').value.trim();

        const quantity =
            row.querySelector(".quantity").value;

        const price =
            row.querySelector(".price").value;

        const total =
            row.querySelector(".product-total").textContent;


        const previewRow = document.createElement("tr");


        previewRow.innerHTML = `
            <td>${productName || "Product"}</td>
            <td>${quantity || "0"}</td>
            <td>${price || "0.00"} DH</td>
            <td>${total}</td>
        `;


        previewProductBody.appendChild(previewRow);

    });

}


// =========================
// GRAND TOTAL
// =========================

function updateInvoiceTotal() {

    let grandTotal = 0;

    const rows = productsBody.querySelectorAll("tr");

    rows.forEach(function(row) {

        const quantity =
            Number(row.querySelector(".quantity").value) || 0;

        const price =
            Number(row.querySelector(".price").value) || 0;


        grandTotal += quantity * price;

    });


    invoiceTotal.textContent =
        "Total: " + grandTotal.toFixed(2) + " DH";

}


// =========================
// SETUP PRODUCT ROW
// =========================

function setupRow(row) {

    const productName =
        row.querySelector('input[type="text"]');

    const quantity =
        row.querySelector(".quantity");

    const price =
        row.querySelector(".price");

    const total =
        row.querySelector(".product-total");

    const deleteButton =
        row.querySelector(".delete-product");


    // =========================
    // CALCULATE TOTAL
    // =========================

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


    // =========================
    // PRODUCT NAME
    // =========================

    productName.addEventListener("input", function() {

        updatePreviewProducts();

    });


    // =========================
    // QUANTITY
    // =========================

    quantity.addEventListener("input", function() {

        calculateRowTotal();

    });


    // =========================
    // PRICE
    // =========================

    price.addEventListener("input", function() {

        calculateRowTotal();

    });


    // =========================
    // DELETE PRODUCT
    // =========================

    deleteButton.addEventListener("click", function() {

        row.remove();

        updatePreviewProducts();

        updateInvoiceTotal();

    });

}


// =========================
// FIRST PRODUCT
// =========================

const firstRow =
    productsBody.querySelector("tr");

setupRow(firstRow);


// =========================
// ADD PRODUCT
// =========================

addProduct.addEventListener("click", function() {

    const row =
        document.createElement("tr");


    row.innerHTML = `
        <td>
            <input
                type="text"
                placeholder="Product name">
        </td>

        <td>
            <input
                type="number"
                class="quantity"
                placeholder="1"
                min="1"
                value="1">
        </td>

        <td>
            <input
                type="number"
                class="price"
                placeholder="0.00"
                min="0"
                step="0.01">
        </td>

        <td class="product-total">
            0.00 DH
        </td>

        <td>
            <button
                type="button"
                class="delete-product">
                🗑️
            </button>
        </td>
    `;


    productsBody.appendChild(row);

    setupRow(row);

    updatePreviewProducts();

    updateInvoiceTotal();

});


// =========================
// INITIAL PREVIEW
// =========================

updatePreviewProducts();

updateInvoiceTotal();


// =========================
// DARK / LIGHT MODE
// =========================

themeButton.addEventListener("click", function() {

    document.body.classList.toggle("light-mode");


    if (document.body.classList.contains("light-mode")) {

        themeButton.textContent = "☀️";

    } else {

        themeButton.textContent = "🌙";

    }

});


// =========================
// DOWNLOAD / PRINT
// =========================

downloadInvoice.addEventListener("click", function() {

    window.print();

});
