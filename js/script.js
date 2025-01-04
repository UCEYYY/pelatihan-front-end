document.querySelectorAll('a.btn-ta').forEach(button =>{
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId)?.scrollIntoView({
            behavior:'smooth'
        });

        });
    });