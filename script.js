document.addEventListener("DOMContentLoaded", function () {
    const formContainer = document.getElementById("form-container");
    const alphabetRegex = /^[A-Za-z\s]+$/; 
    let userData = { nama: "", jumlah: 0, pilihan: [] };
    
    function createInitialForm() {
        formContainer.innerHTML = `
            <h2 id="judul-awal">Masukkan Nama dan Jumlah Pilihan</h2>
            <label id="label-nama">Nama: <input type="text" id="nama"></label><br>
            <label id="label-jumlah">Jumlah Pilihan: <input type="number" id="jumlah" min="1"></label><br>
            <button id="ok-button" onclick="generateChoiceInputs()">OK</button>
        `;
    }

    window.generateChoiceInputs = function () {
        userData.nama = document.getElementById("nama").value.trim();
        userData.jumlah = parseInt(document.getElementById("jumlah").value);
       if (!userData.nama) {
        alert("Nama tidak boleh kosong.");
        return;
    }
    if (!alphabetRegex.test(userData.nama)) {
        alert("Nama hanya boleh berisi huruf alfabet (A-Z atau a-z) dan spasi.");
        return;
    }
    if (userData.jumlah < 1 || isNaN(userData.jumlah)) {
        alert("Jumlah harus lebih dari 0 dan tidak boleh kosong.");
        return;
        }
        
        document.getElementById("nama").disabled = true;
        document.getElementById("jumlah").disabled = true;
        document.getElementById("ok-button").disabled = true;
        document.getElementById("nama").style.opacity = "0.5";
        document.getElementById("jumlah").style.opacity = "0.5";
        document.getElementById("ok-button").style.opacity = "0.5";
        document.getElementById("ok-button").style.pointerEvents = "none";
        document.getElementById("judul-awal").style.color = "gray";
        document.getElementById("label-nama").style.color = "gray";
        document.getElementById("label-jumlah").style.color = "gray";

        let pilihanHTML = `<div id="pilihan-container">
            <h2>Masukkan Pilihan</h2>
        `;

        for (let i = 1; i <= userData.jumlah; i++) {
            pilihanHTML += `<label>Pilihan ${i}: <input type="text" id="pilihan${i}"></label><br>`;
        }
        pilihanHTML += `<button onclick="generateSelection()">OK</button></div>`;
        formContainer.innerHTML += pilihanHTML;
    };

    window.generateSelection = function () {
        userData.pilihan = [];
        for (let i = 1; i <= userData.jumlah; i++) {
            let value = document.getElementById(`pilihan${i}`).value.trim();
            if (!value) {
                alert("Semua pilihan harus diisi dan tidak boleh kosong");
                return;
            }
            userData.pilihan.push(value);
        }
        
        document.getElementById("pilihan-container").style.opacity = "0.5";
        document.getElementById("pilihan-container").style.pointerEvents = "none";
        document.getElementById("pilihan-container").style.color = "gray";

        let selectionHTML = `<div id="selection-container">
            <h2>Pilih Salah Satu</h2>
        `;

        selectionHTML += `<select id="dropdown">`;
        userData.pilihan.forEach((item) => {
            selectionHTML += `<option value="${item}">${item}</option>`;
        });
        selectionHTML += `</select><br><button onclick="showResult()">OK</button></div>`;
        formContainer.innerHTML += selectionHTML;
    };

    window.showResult = function () {
        const pilihanTerpilih = document.getElementById("dropdown").value;
        if (!pilihanTerpilih) {
            alert("Pilih salah satu opsi");
            return;
        }

        document.getElementById("selection-container").style.opacity = "0.5";
        document.getElementById("selection-container").style.pointerEvents = "none";
        document.getElementById("selection-container").style.color = "gray";

        let hasil = `Hallo, nama saya ${userData.nama}, saya mempunyai sejumlah ${userData.jumlah} pilihan yaitu `;
        hasil += userData.pilihan.join(", ");
        hasil += `, dan saya memilih ${pilihanTerpilih}`,'.';
        
        formContainer.innerHTML += `<h2>Hasil</h2><p>${hasil}</p>`;
    };

    createInitialForm();
});