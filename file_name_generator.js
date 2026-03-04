function toggleModal(show) {
        document.getElementById('infoModal').style.display = show ? 'block' : 'none';
    }

    function autoResize(id) {
        const el = document.getElementById(id);
        el.style.height = 'auto';
        el.style.height = (el.scrollHeight) + 'px';
    }

    function clearFields() {
        ['site', 'pID', 'trimester', 'optosOutput', 'remidioOutput'].forEach(id => {
            const el = document.getElementById(id);
            el.value = "";
            if (el.tagName === 'TEXTAREA') el.style.height = 'auto';
        });
        resetErrors();
    }

    function resetErrors() {
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        document.getElementById('error-msg').style.display = 'none';
    }

    function generateNames() {
        resetErrors();
        const site = document.getElementById('site');
        const pID = document.getElementById('pID');
        const trim = document.getElementById('trimester');
        
        let hasError = false;
        if (!site.value) { site.classList.add('error'); hasError = true; }
        if (!pID.value.trim()) { pID.classList.add('error'); hasError = true; }
        if (!trim.value) { trim.classList.add('error'); hasError = true; }

        if (hasError) {
            document.getElementById('error-msg').style.display = 'block';
            window.scrollTo(0,0);
            return;
        }

        const eyes = ['OD', 'OS'];
        const imgNums = ['#'];
        const fixations = ['TR', 'MR', 'BR', 'BL', 'ML', 'TL', 'RE', 'LE'];

        let optosList = [];
        let remidioList = [];

        eyes.forEach(eye => {
            imgNums.forEach(num => {
                optosList.push(`OPTOS_${site.value}_${pID.value.trim()}_${trim.value}_${eye}_${num}`);
            });
            fixations.forEach(fix => {
                imgNums.forEach(num => {
                    remidioList.push(`Rem_${site.value}_${pID.value.trim()}_${trim.value}_${eye}_${fix}_${num}`);
                });
            });
        });

        const optosBox = document.getElementById('optosOutput');
        const remidioBox = document.getElementById('remidioOutput');
        
        optosBox.value = optosList.join('\n');
        remidioBox.value = remidioList.join('\n');

        autoResize('optosOutput');
        autoResize('remidioOutput');
    }