document.addEventListener('DOMContentLoaded', () => {
  const contentArea = document.getElementById('content-area');
  const symptomBtn = document.getElementById('symptom-check-btn');
  const clearBtn = document.getElementById('clear-symp');
  const sympInput = document.getElementById('symptoms-input');
  const sympResults = document.getElementById('symptom-results');
  const intBtn = document.getElementById('check-int-btn');
  const intResult = document.getElementById('int-result');
  const intM1 = document.getElementById('int-m1');
  const intM2 = document.getElementById('int-m2');

  // 🔍 Sticky Search Bar
  const searchBar = document.createElement('div');
  searchBar.classList.add('search-bar');
  searchBar.innerHTML = `
    <div class="card search-card">
      <input type="text" id="search-input" placeholder="Search diseases or medicines...">
    </div>
    <div id="search-results"></div>
  `;
  contentArea.before(searchBar);

  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // 🩺 Data
  const diseases = [
    { name: 'Common Cold', symptoms: ['cough', 'sore throat', 'fever'], medicine: ['Paracetamol', 'Cough Syrup'] },
    { name: 'Diabetes', symptoms: ['frequent urination', 'fatigue', 'blurred vision'], medicine: ['Metformin', 'Insulin'] },
    { name: 'Hypertension', symptoms: ['headache', 'dizziness', 'blurred vision'], medicine: ['Amlodipine', 'Losartan'] },
    { name: 'Asthma', symptoms: ['shortness of breath', 'wheezing', 'cough'], medicine: ['Inhaler', 'Salbutamol'] },
    { name: 'Migraine', symptoms: ['headache', 'nausea', 'sensitivity to light'], medicine: ['Ibuprofen', 'Sumatriptan'] },
  ];

  const medicines = [
    { name: 'Paracetamol', usage: 'Fever and mild pain', interaction: 'Avoid alcohol' },
    { name: 'Metformin', usage: 'Controls blood sugar', interaction: 'Avoid with alcohol, may cause lactic acidosis' },
    { name: 'Insulin', usage: 'Regulates blood glucose', interaction: 'Risk of hypoglycemia with beta-blockers' },
    { name: 'Amlodipine', usage: 'Treats high blood pressure', interaction: 'Avoid grapefruit juice' },
    { name: 'Losartan', usage: 'Lowers blood pressure', interaction: 'Avoid potassium supplements' },
    { name: 'Ibuprofen', usage: 'Pain relief', interaction: 'Avoid alcohol and aspirin' },
    { name: 'Sumatriptan', usage: 'Treats migraine', interaction: 'Avoid MAO inhibitors' },
    { name: 'Salbutamol', usage: 'Relieves asthma symptoms', interaction: 'Avoid beta-blockers' },
  ];

  // Populate dropdowns
  medicines.forEach(m => {
    const opt1 = document.createElement('option');
    const opt2 = document.createElement('option');
    opt1.textContent = m.name;
    opt2.textContent = m.name;
    intM1.appendChild(opt1);
    intM2.appendChild(opt2);
  });

  // 🧭 Navigation buttons
  document.getElementById('nav-home').addEventListener('click', () => {
    setActive('home');
    contentArea.innerHTML = `<div class='card'><h2>Welcome to PharmaCare</h2><p>Explore diseases, learn about symptoms, and find suitable medicines for common health conditions.</p></div>`;
  });

  document.getElementById('nav-diseases').addEventListener('click', () => {
    setActive('diseases');
    contentArea.innerHTML = '<h2>Diseases</h2>' +
      diseases.map(d => `<div class='card'><h3>${d.name}</h3><p><b>Symptoms:</b> ${d.symptoms.join(', ')}</p><p><b>Medicines:</b> ${d.medicine.join(', ')}</p></div>`).join('');
  });

  document.getElementById('nav-medicines').addEventListener('click', () => {
    setActive('medicines');
    contentArea.innerHTML = '<h2>Medicines</h2>' +
      medicines.map(m => `<div class='card'><h3>${m.name}</h3><p><b>Usage:</b> ${m.usage}</p><p><b>Interaction:</b> ${m.interaction}</p></div>`).join('');
  });

  function setActive(id) {
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    document.getElementById('nav-' + id).classList.add('active');
  }

  // 🧠 Symptom Checker
  symptomBtn.addEventListener('click', () => {
    const input = sympInput.value.toLowerCase().split(',').map(s => s.trim());
    const matches = diseases.filter(d => d.symptoms.some(s => input.includes(s)));
    if (matches.length) {
      sympResults.innerHTML = '<h4>Possible Diseases:</h4>' + matches.map(d => `<div>${d.name}</div>`).join('');
    } else {
      sympResults.innerHTML = '<p>No match found. Please refine your symptoms.</p>';
    }
  });

  clearBtn.addEventListener('click', () => {
    sympInput.value = '';
    sympResults.innerHTML = '';
  });

  // 💊 Interaction Checker
  intBtn.addEventListener('click', () => {
    const m1 = intM1.value;
    const m2 = intM2.value;
    if (m1 === m2) {
      intResult.textContent = 'Same medicine selected.';
      return;
    }
    const m1Data = medicines.find(m => m.name === m1);
    const m2Data = medicines.find(m => m.name === m2);
    intResult.innerHTML = `<p><b>${m1}</b>: ${m1Data.interaction}</p><p><b>${m2}</b>: ${m2Data.interaction}</p>`;
  });

  // 🔎 Live Search functionality
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      searchResults.innerHTML = '';
      return;
    }

    const diseaseMatches = diseases.filter(d => d.name.toLowerCase().includes(query));
    const medMatches = medicines.filter(m => m.name.toLowerCase().includes(query));

    let html = '';
    if (diseaseMatches.length) {
      html += '<h3>Diseases</h3>' +
        diseaseMatches.map(d => `<div class='card'><h4>${d.name}</h4><p><b>Symptoms:</b> ${d.symptoms.join(', ')}</p><p><b>Medicines:</b> ${d.medicine.join(', ')}</p></div>`).join('');
    }
    if (medMatches.length) {
      html += '<h3>Medicines</h3>' +
        medMatches.map(m => `<div class='card'><h4>${m.name}</h4><p><b>Usage:</b> ${m.usage}</p><p><b>Interaction:</b> ${m.interaction}</p></div>`).join('');
    }
    searchResults.innerHTML = html || '<p>No matches found.</p>';
  });

  // Default view
  document.getElementById('nav-home').click();
});
