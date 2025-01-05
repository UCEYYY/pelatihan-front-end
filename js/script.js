document.querySelectorAll('a.btn-ta').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId)?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const paketButtons = document.querySelectorAll('.card-button .btn-ta');

paketButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.3s';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });

    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Create Popup Container
        const popup = document.createElement('div');
        popup.classList.add('popup-container');
        popup.innerHTML = `
            <div class="popup">
                <h2>Konfirmasi Pesanan</h2>
                <p>Anda akan memesan paket: <strong>${button.closest('.card-paket').querySelector('h3').textContent}</strong></p>
                <p>Apakah Anda ingin melanjutkan ke proses pembayaran?</p>
                <div class="popup-actions">
                    <button class="popup-next">Lanjutkan</button>
                    <button class="popup-close">Batal</button>
                </div>
            </div>
        `;

        // Insert popup below the related paket section
        const paketSection = button.closest('#paket');
        paketSection.appendChild(popup);

        // Add Event Listeners for Actions
        popup.querySelector('.popup-close').addEventListener('click', () => {
            popup.remove();
        });

        popup.querySelector('.popup-next').addEventListener('click', () => {
            popup.innerHTML = `
                <div class="popup">
                    <h2>Proses Pembayaran</h2>
                    <p><strong>Nomor Rekening: 12398111</strong></p>
                    <label for="upload-bukti">Upload Bukti Transfer:</label>
                    <input type="file" id="upload-bukti" accept="image/*">
                    <label for="email">Email Anda:</label>
                    <input type="email" id="email" required placeholder="email@example.com">
                    <label for="phone">Nomor Handphone Anda:</label>
                    <input type="tel" id="phone" required placeholder="081234567890">
                    <div class="popup-actions">
                        <button class="popup-confirm">Kirim</button>
                        <button class="popup-close">Batal</button>
                    </div>
                </div>
            `;
            
            // Add Event Listeners for new popup actions
            popup.querySelector('.popup-close').addEventListener('click', () => {
                popup.remove();
            });

            popup.querySelector('.popup-confirm').addEventListener('click', () => {
                const fileInput = popup.querySelector('#upload-bukti');
                const emailInput = popup.querySelector('#email');
                const phoneInput = popup.querySelector('#phone');

                if (fileInput.files.length === 0 || !emailInput.value || !phoneInput.value) {
                    alert('Silakan unggah bukti transfer, dan lengkapi email serta nomor handphone Anda.');
                } else {
                    popup.innerHTML = `
                        <div class="popup">
                            <h2>Terima Kasih</h2>
                            <p>Terima kasih telah melakukan pembayaran. Kami membutuhkan waktu hingga <strong>30 menit</strong> untuk memeriksa dan memvalidasi pembayaran Anda.</p>
                            <p>Anda akan menerima konfirmasi melalui email atau telepon segera setelah pembayaran berhasil diverifikasi.</p>
                            <div class="popup-actions">
                                <button class="popup-close">Tutup</button>
                            </div>
                        </div>
                    `;
                    
                    // Add close event for the final popup
                    popup.querySelector('.popup-close').addEventListener('click', () => {
                        popup.remove();
                    });
                }
            });
        });
    });
});