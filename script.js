// =====================================================
// COURIER SERVICE INTERFACE
// =====================================================

class CourierService {

    bookCourier() {
        throw new Error("Method must be implemented");
    }

    trackParcel() {
        throw new Error("Method must be implemented");
    }

    updateStatus() {
        throw new Error("Method must be implemented");
    }

}


// =====================================================
// COURIER CLASS
// =====================================================

class Courier extends CourierService {

    constructor(
        sender,
        receiver,
        address,
        parcelType,
        courierType
    ) {

        super();

        this.sender = sender;

        this.receiver = receiver;

        this.address = address;

        this.parcelType = parcelType;

        this.courierType = courierType;

        this.trackingId =
            "CT" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        this.status = "Booked";
    }


    bookCourier() {

        return this.trackingId;

    }


    trackParcel() {

        return this.status;

    }


    updateStatus(newStatus) {

        this.status = newStatus;

        return this.status;

    }

}


// =====================================================
// LOAD SAVED PARCELS
// =====================================================

let courierList =
    JSON.parse(
        localStorage.getItem("couriers")
    ) || [];


// =====================================================
// BOOK COURIER
// =====================================================

function bookCourier() {

    let sender =
        document
        .getElementById("sender")
        .value
        .trim();


    let receiver =
        document
        .getElementById("receiver")
        .value
        .trim();


    let address =
        document
        .getElementById("address")
        .value
        .trim();


    let parcelType =
        document
        .getElementById("parcelType")
        .value;


    let courierType =
        document
        .getElementById("courierType")
        .value;


    if (
        sender === "" ||
        receiver === "" ||
        address === "" ||
        parcelType === "" ||
        courierType === ""
    ) {

        alert(
            "Please fill all details."
        );

        return;

    }


    let courier =
        new Courier(
            sender,
            receiver,
            address,
            parcelType,
            courierType
        );


    courierList.push(courier);


    localStorage.setItem(
        "couriers",
        JSON.stringify(courierList)
    );


    document
        .getElementById("bookingResult")
        .innerHTML =

        "Courier booked successfully!<br>" +

        "Your Tracking ID: <b>" +

        courier.bookCourier() +

        "</b>";


    document
        .getElementById("sender")
        .value = "";


    document
        .getElementById("receiver")
        .value = "";


    document
        .getElementById("address")
        .value = "";


    document
        .getElementById("parcelType")
        .value = "";


    document
        .getElementById("courierType")
        .value = "";


    displayParcels();

}


// =====================================================
// TRACK PARCEL
// =====================================================

function trackParcel() {

    let trackingId =
        document
        .getElementById("trackingId")
        .value
        .trim();


    courierList =
        JSON.parse(
            localStorage.getItem("couriers")
        ) || [];


    let courier =
        courierList.find(
            c =>
            c.trackingId.toUpperCase() ===
            trackingId.toUpperCase()
        );


    if (courier) {

        document
            .getElementById("trackingResult")
            .innerHTML =

            `
            <div class="tracking-card">

                <h3>Parcel Found ✓</h3>

                <p>
                    <b>Tracking ID:</b>
                    ${courier.trackingId}
                </p>

                <p>
                    <b>Sender:</b>
                    ${courier.sender}
                </p>

                <p>
                    <b>Receiver:</b>
                    ${courier.receiver}
                </p>

                <p>
                    <b>Address:</b>
                    ${courier.address}
                </p>

                <p>
                    <b>Parcel Type:</b>
                    ${courier.parcelType}
                </p>

                <p>
                    <b>Courier Type:</b>
                    ${courier.courierType}
                </p>

                <p>
                    <b>Status:</b>
                    ${courier.status}
                </p>

            </div>
            `;

    }

    else {

        document
            .getElementById("trackingResult")
            .innerHTML =

            `
            <p>
                ❌ Tracking ID not found.
            </p>
            `;

    }

}


// =====================================================
// DISPLAY MY PARCELS
// =====================================================

function displayParcels() {

    courierList =
        JSON.parse(
            localStorage.getItem("couriers")
        ) || [];


    let parcelList =
        document.getElementById(
            "parcelList"
        );


    if (courierList.length === 0) {

        parcelList.innerHTML =

            `
            <p class="empty-message">
                No parcels booked yet.
            </p>
            `;

        return;

    }


    parcelList.innerHTML = "";


    courierList.forEach(
        courier => {

            parcelList.innerHTML +=

            `
            <div class="parcel-card">

                <h3>
                    📦 ${courier.trackingId}
                </h3>

                <p>
                    <b>Sender:</b>
                    ${courier.sender}
                </p>

                <p>
                    <b>Receiver:</b>
                    ${courier.receiver}
                </p>

                <p>
                    <b>Parcel:</b>
                    ${courier.parcelType}
                </p>

                <p>
                    <b>Courier:</b>
                    ${courier.courierType}
                </p>

                <p>
                    <b>Status:</b>
                    ${courier.status}
                </p>

            </div>
            `;

        }
    );

}


// =====================================================
// SHIPPING CALCULATOR
// =====================================================

function calculateShipping() {

    let weight =
        parseFloat(
            document
            .getElementById("weight")
            .value
        );


    let courierType =
        document
        .getElementById("calculatorType")
        .value;


    if (
        isNaN(weight) ||
        weight <= 0 ||
        courierType === ""
    ) {

        alert(
            "Please enter weight and courier type."
        );

        return;

    }


    let charge;


    if (courierType === "Normal") {

        charge = 50 + (weight * 20);

    }

    else if (courierType === "Express") {

        charge = 100 + (weight * 35);

    }


    document
        .getElementById(
            "calculationResult"
        )
        .innerHTML =

        `
        Estimated Shipping Charge:
        ₹${charge.toFixed(2)}
        `;

}


// =====================================================
// SHOW SECTION
// =====================================================

function showSection(sectionId) {

    document
        .getElementById(sectionId)
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================================
// LOAD PARCELS WHEN PAGE OPENS
// =====================================================

window.onload = function() {

    displayParcels();

};